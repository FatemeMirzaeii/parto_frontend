import Database from '../database';
import {
  PROFILE,
  USER_TRACKING_OPTION,
  PREGNANCY,
  REMINDER,
  USER_REMINDER,
  VERSION,
  EMPTY_TABLE,
  HEALTH_TRACKING_CATEGORY,
  HEALTH_TRACKING_OPTION,
  USER,
} from '../../constants/database-tables';
import moment from 'moment';
import { DATETIME_FORMAT, FORMAT } from '../../constants/cycle';
import { OPTIONS } from '../../constants/health-tracking-info';
const db = new Database();
export async function getUser() {
  const [res] = await db.exec(`SELECT * FROM ${USER}`, USER);
  return res === EMPTY_TABLE ? [] : res;
}
export async function getProfileData() {
  const res = await db.exec(`SELECT * FROM ${PROFILE}`, PROFILE);
  return res === EMPTY_TABLE ? [] : res[0];
}
export async function saveProfileData(profileSchema) {
  const exists = await db.exec(`SELECT 1 FROM ${PROFILE} LIMIT 1`);
  if (exists === EMPTY_TABLE) {
    const birthdate = !profileSchema.birthdate
      ? null
      : `'${profileSchema.birthdate}'`;
    const lperiodDate = !profileSchema.last_period_date
      ? null
      : `'${profileSchema.last_period_date}'`;
    const periodLength = !profileSchema.avg_period_length
      ? null
      : `${profileSchema.avg_period_length}`;

    const cycleLength = !profileSchema.avg_cycle_length
      ? null
      : `${profileSchema.avg_cycle_length}`;
    const res = await db.exec(
      `INSERT INTO ${PROFILE}
             (pregnant, pregnancy_try, avg_period_length, avg_cycle_length, 
              birthdate, last_period_date, user_id, created_at)
             VALUES(
                ${profileSchema.pregnant},
                ${profileSchema.pregnancy_try},
                ${periodLength},
                ${cycleLength},
                ${birthdate},
                ${lperiodDate},
                ${profileSchema.userId},
                '${moment().format(DATETIME_FORMAT)}')`,
      PROFILE,
    );
    return res ?? 0;
  }
}

export async function addProfileData(profileSchema) {
  const birthdate = !profileSchema.birthdate
    ? null
    : `'${profileSchema.birthdate}'`;
  const lperiodDate = !profileSchema.last_period_date
    ? null
    : `'${profileSchema.last_period_date}'`;
  const periodLength = !profileSchema.avg_period_length
    ? null
    : `${profileSchema.avg_period_length}`;

  const cycleLength = !profileSchema.avg_cycle_length
    ? null
    : `${profileSchema.avg_cycle_length}`;
  const res = await db.exec(
    `INSERT OR REPLACE INTO ${PROFILE}
             (id, pregnant, pregnancy_try, avg_period_length, avg_cycle_length, 
              birthdate, last_period_date, pms_length, blood_type, weight, height, avg_sleeping_hour, user_id, created_at)
             VALUES(
              (SELECT id FROM ${PROFILE} WHERE user_id=${profileSchema.userId}),
                ${profileSchema.pregnant},
                ${profileSchema.pregnancy_try},
                ${periodLength},
                ${cycleLength},
                ${birthdate},
                ${lperiodDate},
                ${profileSchema.pms_length},
                '${profileSchema.blood_type}',
                ${profileSchema.weight},
                ${profileSchema.height},
                ${profileSchema.avg_sleeping_hour},
                ${profileSchema.userId},
                '${moment().format(DATETIME_FORMAT)}')`,
    PROFILE,
  );
  return res ?? 0;
}
export async function saveProfileHealthData(
  bloodType,
  weight,
  height,
  birthdate,
  avgSleepingHours,
) {
  return await db.exec(
    `UPDATE ${PROFILE} SET blood_type='${bloodType}',
                             weight=${weight},
                             height=${height},
                             birthdate='${birthdate}',
                             avg_sleeping_hour=${avgSleepingHours},
                             updated_at='${moment().format(DATETIME_FORMAT)}'`,
    PROFILE,
  );
}
export async function pregnancyMode() {
  const res = await db.exec(`SELECT pregnant FROM ${PROFILE}`, PROFILE);
  return res === EMPTY_TABLE ? false : res[0].pregnant;
}
export async function getUserStatus() {
  const res = await db.exec(
    `SELECT pregnant, pregnancy_try FROM ${PROFILE}`,
    PROFILE,
  );
  return res === EMPTY_TABLE ? [] : res[0];
}
export async function updateUserStatus(pregnant, pregnancyTry) {
  return await db.exec(
    `UPDATE ${PROFILE} SET pregnant=${pregnant}, pregnancy_try=${pregnancyTry}, updated_at='${moment().format(
      DATETIME_FORMAT,
    )}'`,
    PROFILE,
  );
}
export async function getFormerPregnancyData() {
  const res = await db.exec(
    `SELECT * FROM ${PREGNANCY} WHERE state=3 OR state=2 `, //former pregnancy states is 3
    PREGNANCY,
  );
  console.log('former pregnancy data', res);
  return res === EMPTY_TABLE ? [] : res;
}
export async function correctFormerPregnancyStates() {
  await db.exec(
    `UPDATE ${PREGNANCY} SET state=3 WHERE id NOT IN (
      SELECT id FROM ${PREGNANCY} WHERE state=1 ORDER BY id DESC LIMIT 1)
      AND id NOT IN (SELECT id FROM ${PREGNANCY} WHERE state=2)`,
  );
}
export async function getActivePregnancyData() {
  correctFormerPregnancyStates();
  //this function is temp and could have been deleted if we went sure all users updated to new versions.
  const res = await db.exec(
    `SELECT * FROM ${PREGNANCY} WHERE state=1`,
    PREGNANCY,
  );
  console.log('active pregnancy data', res);
  return res === EMPTY_TABLE ? [] : res[0];
}
export async function getPregnancyEndDate() {
  const hasActivePregnancy = await getActivePregnancyData();
  if (hasActivePregnancy.length > 0) return null;
  const res = await db.exec(
    `SELECT due_date, abortion_date FROM ${PREGNANCY} WHERE state=3 ORDER BY id DESC LIMIT 1`, //former pregnancy states is 3
    PREGNANCY,
  );
  return res === EMPTY_TABLE ? null : res[0].abortion_date ?? res[0].due_date;
}
export async function updatePregnancyData(dueDate) {
  return await db.exec(
    `UPDATE ${PREGNANCY} SET due_date='${dueDate}',
        updated_at='${moment().format(DATETIME_FORMAT)}' WHERE state=1`,
    PREGNANCY,
  );
}
export async function endPregnancy(dueDate, abortionDate) {
  return abortionDate
    ? await db.exec(
        `UPDATE ${PREGNANCY} SET abortion=1, due_date=null, abortion_date='${abortionDate}', state=3,
        updated_at='${moment().format(DATETIME_FORMAT)}' WHERE state=1`,
        PREGNANCY,
      )
    : await db.exec(
        `UPDATE ${PREGNANCY} SET abortion=0, due_date='${dueDate}', abortion_date=null, state=3,
        updated_at='${moment().format(DATETIME_FORMAT)}' WHERE state=1`,
        PREGNANCY,
      );
}
export async function addPregnancy(pregnancySchema) {
  //todo: if record exists?
  const dueDate = !pregnancySchema.dueDate
    ? null
    : `'${pregnancySchema.dueDate}'`;
  const conceptionDate = !pregnancySchema.conceptionDate
    ? null
    : `'${pregnancySchema.conceptionDate}'`;
  const res = await db.exec(
    `INSERT INTO ${PREGNANCY} (due_date, conception_date, created_at) VALUES(
      ${dueDate},${conceptionDate}, '${moment().format(DATETIME_FORMAT)}')`,
    PREGNANCY,
  );
  return res ?? 0;
}
export async function deletePregnancyData() {
  return await db.exec(
    `UPDATE ${PREGNANCY} SET state=2,
    updated_at='${moment().format(DATETIME_FORMAT)}' WHERE state=1`,
    PREGNANCY,
  );
}
export function updateProfileData(profileSchema) {
  db.exec(
    `UPDATE ${PROFILE} SET avg_period_length=${profileSchema.periodLength},
                             avg_cycle_length=${profileSchema.cycleLength},
                             pms_length=${profileSchema.pmsLength},
                             updated_at='${moment().format(DATETIME_FORMAT)}'`,
    PROFILE,
  ).then((res) => {
    return res;
  });
}
export async function getCycleInfoFromProfile() {
  const res = await db.exec(
    `SELECT avg_period_length, avg_cycle_length, pms_length FROM ${PROFILE}`,
    PROFILE,
  );
  return res === EMPTY_TABLE ? [] : res[0];
}
export async function getUserAllPeriodDays() {
  const res = await db.exec(
    `SELECT * FROM ${USER_TRACKING_OPTION} WHERE tracking_option_id IN
      (${OPTIONS.LIGHT}, ${OPTIONS.MEDIUM}, ${OPTIONS.HEAVY}) AND state=1`,
    USER_TRACKING_OPTION,
  );
  console.log('getUserAllPeriodDays()', res);
  return res === EMPTY_TABLE ? [] : res;
}
export async function getUserAllBleedingDays() {
  const res = await db.exec(
    `SELECT * FROM ${USER_TRACKING_OPTION} WHERE tracking_option_id IN
      (${OPTIONS.SPOTTING}, ${OPTIONS.LIGHT}, ${OPTIONS.MEDIUM}, ${OPTIONS.HEAVY}) AND state=1`,
    USER_TRACKING_OPTION,
  );
  console.log('getUserAllBleedingDays()', res);
  return res === EMPTY_TABLE ? [] : res;
}
export async function getCycleSpottingDays(cycleStartDay, cycleEndDay) {
  const res = await db.exec(
    `SELECT * FROM ${USER_TRACKING_OPTION} WHERE tracking_option_id=${OPTIONS.SPOTTING} AND state=1 AND
    date > '${cycleStartDay}' AND date <= '${cycleEndDay}' `,
    USER_TRACKING_OPTION,
  );
  console.log('getCycleSpottingDays()', cycleStartDay, cycleEndDay, res);
  return res === EMPTY_TABLE ? [] : res;
}
export async function getTrackingOptionData(date) {
  const res = db.exec(
    `SELECT JSON_OBJECT('id',id,'title',title,'hasMultipleChoice',has_multiple_choice,
        'color',color,'icon',icon,'options',(
          SELECT JSON_GROUP_ARRAY(
                  JSON_OBJECT('id',id,'title',title,'icon',icon,'selected',(
                            SELECT JSON_GROUP_ARRAY(
                                    JSON_OBJECT('id',id,'tracking_option_id',tracking_option_id)
                                                )
                                FROM ${USER_TRACKING_OPTION} u WHERE u.tracking_option_id = o.id AND date='${date}' AND u.state=1
                          )
                        )
                      ) 
              FROM ${HEALTH_TRACKING_OPTION} o WHERE o.category_id = c.id
            )         
          )
          AS data FROM ${HEALTH_TRACKING_CATEGORY} c ORDER By id ASC`,
    HEALTH_TRACKING_CATEGORY,
  );
  return res;
}
export async function getUserVaginalAndSleepOptions() {
  const res = await db.exec(
    `SELECT * FROM ${USER_TRACKING_OPTION} WHERE tracking_option_id IN
      (${OPTIONS.ABNORMAL}, ${OPTIONS.CREAMY}, ${OPTIONS.EGGWHITE}, ${OPTIONS.STICKY}, 
        ${OPTIONS.AVERAGE_SLEEP}, ${OPTIONS.LITTLE_SLEEP}, ${OPTIONS.LOTS_SLEEP}, ${OPTIONS.NO_SLEEP}) AND state=1`,
    USER_TRACKING_OPTION,
  );
  return res ?? [];
}
export async function getLastPeriodDate() {
  const res = await db.exec(`SELECT last_period_date FROM ${PROFILE}`, PROFILE);
  const data = res[0];
  return data ? data.last_period_date : null;
}
export async function setLastPeriodDate(date) {
  return await db.exec(
    `UPDATE ${PROFILE} SET last_period_date=${
      date ? `'${date.format(FORMAT)}'` : null
    }, updated_at='${moment().format(DATETIME_FORMAT)}'`,
    PROFILE,
  );
}
export async function deselectTrackingOption(optionId, date) {
  return await db.exec(
    `UPDATE ${USER_TRACKING_OPTION} SET state=2,
    updated_at='${moment().format(DATETIME_FORMAT)}'
    WHERE tracking_option_id=${optionId} AND date='${date}'`,
    USER_TRACKING_OPTION,
  );
}
export async function addTrackingOption(optionId, date) {
  return await db.exec(
    `INSERT INTO ${USER_TRACKING_OPTION} (tracking_option_id, date, created_at) VALUES (${optionId}, '${date}',
    '${moment().format(DATETIME_FORMAT)}')
    ON CONFLICT(date, tracking_option_id) DO UPDATE SET state=1,
    updated_at='${moment().format(DATETIME_FORMAT)}'`,
    USER_TRACKING_OPTION,
  );
}
export async function replaceTrackingOption(
  optionId,
  date,
  sameCategoryOptions,
) {
  await db.exec(
    `UPDATE ${USER_TRACKING_OPTION} SET state=2, updated_at='${moment().format(
      DATETIME_FORMAT,
    )}' WHERE date='${date}' AND tracking_option_id IN (${sameCategoryOptions});`,
    USER_TRACKING_OPTION,
  );
  await addTrackingOption(optionId, date);
}
export async function setBleedingDays(days, removed) {
  if (removed) {
    removed.forEach(async (rday) => {
      //state 2 means deleted
      await db.exec(
        `UPDATE ${USER_TRACKING_OPTION} SET state=2, updated_at='${moment().format(
          DATETIME_FORMAT,
        )}' WHERE date='${rday}' AND tracking_option_id IN
        (${OPTIONS.SPOTTING}, ${OPTIONS.LIGHT}, ${OPTIONS.MEDIUM}, ${
          OPTIONS.HEAVY
        })`,
        USER_TRACKING_OPTION,
      );
    });
  }
  days.forEach(async (date) => {
    console.log('set period here', date);
    await addTrackingOption(OPTIONS.MEDIUM, date);
  });
}
export async function setLock(isLock) {
  return await db.exec(
    `UPDATE ${PROFILE} SET locked=${isLock}, updated_at='${moment().format(
      DATETIME_FORMAT,
    )}'`,
    PROFILE,
  );
}
export async function lockStatus() {
  const res = await db.exec(`SELECT locked FROM ${PROFILE}`, PROFILE);
  const data = res[0] ? res[0] : 0;
  return data.locked;
}
export async function saveReminder(
  reminderId,
  isActive,
  message,
  time,
  daysAgo,
) {
  const res = await db.exec(
    `INSERT INTO ${USER_REMINDER} (reminder_id, user_id, active, custom_message , custom_time, Xdays_ago, created_at) VALUES 
    (${reminderId}, ${1}, ${
      isActive ? 1 : 0
    }, '${message}', '${time}', ${daysAgo}, '${moment().format(
      DATETIME_FORMAT,
    )}') ON CONFLICT (user_id, reminder_id) DO UPDATE SET active=${
      isActive ? 1 : 0
    }, custom_message='${message}', custom_time='${time}', Xdays_ago=${daysAgo}, updated_at='${moment().format(
      DATETIME_FORMAT,
    )}'`,
    USER_REMINDER,
  );
  return res ?? 0;
}
export async function getReminder(userId, reminderId) {
  const res = await db.exec(
    `SELECT * FROM ${USER_REMINDER} WHERE user_id=${userId} AND reminder_id=${reminderId}`,
    USER_REMINDER,
  );
  const data = res[0] ? res[0] : [];
  return data;
}
export async function getReminders() {
  const res = await db.exec(`SELECT * FROM ${REMINDER}`, REMINDER);
  return res === EMPTY_TABLE ? [] : res;
}
export async function getUserReminders(userId) {
  const res = await db.exec(
    `SELECT * FROM ${USER_REMINDER} WHERE user_id=${userId}`,
    USER_REMINDER,
  );
  return res === EMPTY_TABLE ? [] : res;
}
export async function getInUseDbVersion() {
  const [res] = await db.exec(`SELECT version FROM ${VERSION}`, VERSION);
  return res ? res.version : 0;
}
export async function updateInUseDbVersion(version) {
  return await db.exec(`UPDATE ${VERSION} SET version=${version}`, VERSION);
}
export async function getLastSyncTime() {
  const [res] = await db.exec(`SELECT last_sync_time FROM ${PROFILE}`, PROFILE);
  //todo: should be tested
  return res ? res.last_sync_time : 0;
}
export async function updateLastSyncTime(lastSyncTime) {
  return db.exec(
    `UPDATE ${PROFILE} SET last_sync_time='${lastSyncTime}', updated_at='${moment().format(
      DATETIME_FORMAT,
    )}'`,
    VERSION,
  );
}
export async function findUnsyncedTrackingOptions(lastSyncTime) {
  let res;
  if (lastSyncTime) {
    res = await db.exec(
      `SELECT * FROM  ${USER_TRACKING_OPTION} WHERE created_at > '${lastSyncTime}' OR updated_at > '${lastSyncTime}' OR created_at=null`,
      USER_TRACKING_OPTION,
    );
  } else {
    res = await db.exec(
      `SELECT * FROM  ${USER_TRACKING_OPTION}`,
      USER_TRACKING_OPTION,
    );
  }

  return res === EMPTY_TABLE ? [] : res;
}
export async function findUnsyncedProfileData(lastSyncTime) {
  const res = lastSyncTime
    ? await db.exec(
        `SELECT * FROM  ${PROFILE} WHERE created_at > '${lastSyncTime}' OR updated_at > '${lastSyncTime}'`,
        PROFILE,
      )
    : await db.exec(`SELECT * FROM  ${PROFILE}`, PROFILE);
  return res === EMPTY_TABLE ? [] : res;
}
export async function findUnsyncedPregnancyInfo(lastSyncTime) {
  const res = lastSyncTime
    ? await db.exec(
        `SELECT * FROM  ${PREGNANCY} WHERE created_at > '${lastSyncTime}' OR updated_at > '${lastSyncTime}'`,
        PREGNANCY,
      )
    : await db.exec(`SELECT * FROM  ${PREGNANCY}`, PREGNANCY);
  return res === EMPTY_TABLE ? [] : res;
}
export async function cleanDatabase() {
  await db.exec(`DELETE FROM ${USER_REMINDER}`, USER_REMINDER);
  await db.exec(`DELETE FROM ${PREGNANCY}`, PREGNANCY);
  await db.exec(`DELETE FROM ${USER_TRACKING_OPTION}`, USER_TRACKING_OPTION);
  await db.exec(`DELETE FROM ${PROFILE}`, PROFILE);
  await db.exec(`DELETE FROM ${USER}`, USER);
}
export async function resetDatabase() {
  await db.exec(`DELETE FROM ${USER_REMINDER}`, USER_REMINDER);
  await db.exec(`DELETE FROM ${PREGNANCY}`, PREGNANCY);
  await db.exec(`DELETE FROM ${USER_TRACKING_OPTION}`, USER_TRACKING_OPTION);
  await db.exec(
    `UPDATE ${PROFILE} SET avg_cycle_length=28,
                             avg_period_length=7,
                             last_period_date=null,
                             blood_type=null,
                             weight=null,
                             height=null,
                             birthdate=null,
                             avg_sleeping_hour=null,
                             ovulation_perdiction=null,
                             period_perdiction=null,
                             pms_length=null,
                             pregnancy_try=0,
                             pregnant=0,
                             updated_at='${moment().format(DATETIME_FORMAT)}'`,
    PROFILE,
  );
}
