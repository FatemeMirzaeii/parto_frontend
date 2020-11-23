import Database from '../database';
import {
  PROFILE,
  USER_TRACKING_OPTION,
  PREGNANCY,
  REMINDER,
  USER_REMINDER,
  VERSION,
  EMPTY_TABLE,
} from '../../constants/database-tables';
import moment from 'moment';
import { FORMAT } from '../../constants/cycle';
import { OPTIONS } from '../../constants/health-tracking-info';
const db = new Database();

export async function getProfileData() {
  const res = await db.exec(`SELECT * FROM ${PROFILE}`, PROFILE);
  return res === EMPTY_TABLE ? [] : res[0];
}
export async function saveProfileData(profileSchema) {
  const birthdate = !profileSchema.birthdate
    ? null
    : `'${profileSchema.birthdate}'`;
  const lperiodDate = !profileSchema.lastPeriodDate
    ? null
    : `'${profileSchema.lastPeriodDate}'`;
  const periodLength = !profileSchema.periodLength
    ? null
    : `${profileSchema.periodLength}`;

  const cycleLength = !profileSchema.cycleLength
    ? null
    : `${profileSchema.cycleLength}`;
  const res = await db.exec(
    `INSERT INTO ${PROFILE}
             (pregnant, pregnancy_try, avg_period_length, avg_cycle_length, 
              birthdate, last_period_date, created_at)
             VALUES(
                ${profileSchema.pregnant},
                ${profileSchema.pregnancyTry},
                ${periodLength},
                ${cycleLength},
                ${birthdate},
                ${lperiodDate},
                '${moment().format('YYYY-MM-DD')}')`,
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
                             avg_sleeping_hour=${avgSleepingHours}`,
    PROFILE,
  );
}
export async function pregnancyMode() {
  const res = await db.exec(`SELECT pregnant FROM ${PROFILE}`, PROFILE);
  return res === EMPTY_TABLE ? [] : res[0].pregnant;
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
    `UPDATE ${PROFILE} SET pregnant=${pregnant}, pregnancy_try=${pregnancyTry}`,
    PROFILE,
  );
}
export async function getFormerPregnancyData() {
  const res = await db.exec(`SELECT * FROM ${PREGNANCY}`, PREGNANCY);
  console.log('all pregnancy data', res);
  return res === EMPTY_TABLE ? [] : res;
}
export async function getActivePregnancyData() {
  const res = await db.exec(
    `SELECT * FROM ${PREGNANCY} ORDER BY id DESC LIMIT 1`,
    PREGNANCY,
  );
  console.log('active pregnancy data', res);
  return res === EMPTY_TABLE ? [] : res[0];
}
export async function updatePregnancyData(dueDate, abortionDate) {
  return abortionDate
    ? await db.exec(
        `UPDATE ${PREGNANCY} SET abortion=1, due_date=null, abortion_date='${abortionDate}'`,
        PREGNANCY,
      )
    : await db.exec(
        `UPDATE ${PREGNANCY} SET abortion=0, due_date='${dueDate}', abortion_date=null`,
        PREGNANCY,
      );
}
export async function savePregnancyData(pregnancySchema) {
  const dueDate = !pregnancySchema.dueDate
    ? null
    : `'${pregnancySchema.dueDate}'`;
  const conceptionDate = !pregnancySchema.conceptionDate
    ? null
    : `'${pregnancySchema.conceptionDate}'`;
  const res = await db.exec(
    `INSERT INTO ${PREGNANCY} (due_date, conception_date, user_id) VALUES(
      ${dueDate},${conceptionDate}, 1)`,
    PREGNANCY,
  );
  return res ?? 0;
}
export function updateProfileData(profileSchema) {
  db.exec(
    `UPDATE ${PROFILE} SET avg_period_length=${profileSchema.periodLength},
                             avg_cycle_length=${profileSchema.cycleLength},
                             pms_length=${profileSchema.pmsLength}`,
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
      (${OPTIONS.SPOTTING}, ${OPTIONS.LIGHT}, ${OPTIONS.MEDIUM}, ${OPTIONS.HEAVY})`,
    USER_TRACKING_OPTION,
  );
  console.log('kkkk', res);
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
                                FROM user_tracking_option u WHERE u.tracking_option_id = o.id AND date='${date}'
                          )
                        )
                      ) 
              FROM health_tracking_option o WHERE o.category_id = c.id
            )         
          )
          AS data FROM health_tracking_category c ORDER By id ASC`,
    'health_tracking_category',
  );
  return res;
}
export async function getUserVaginalAndSleepOptions() {
  const res = await db.exec(
    `SELECT * FROM ${USER_TRACKING_OPTION} WHERE tracking_option_id IN
      (${OPTIONS.ABNORMAL}, ${OPTIONS.CREAMY}, ${OPTIONS.EGGWHITE}, ${OPTIONS.STICKY}, 
        ${OPTIONS.AVERAGE_SLEEP}, ${OPTIONS.LITTLE_SLEEP}, ${OPTIONS.LOTS_SLEEP}, ${OPTIONS.NO_SLEEP})`,
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
    }`,
    PROFILE,
  );
}
export async function setBleedingDays(days, removed) {
  if (removed) {
    removed.forEach(async (rday) => {
      const res = await db.exec(
        `DELETE FROM ${USER_TRACKING_OPTION} WHERE date='${rday}' AND tracking_option_id IN
        (${OPTIONS.SPOTTING}, ${OPTIONS.LIGHT}, ${OPTIONS.MEDIUM}, ${OPTIONS.HEAVY})`,
        USER_TRACKING_OPTION,
      );
    });
  }
  days.forEach(async (day) => {
    console.log('set period here', day);
    await db.exec(
      `INSERT INTO ${USER_TRACKING_OPTION} (date, tracking_option_id) VALUES ('${day}',${OPTIONS.MEDIUM})
      ON CONFLICT(date, tracking_option_id) DO NOTHING`,
      USER_TRACKING_OPTION,
    );
  });
}
export async function setLock(isLock) {
  return await db.exec(`UPDATE ${PROFILE} SET locked=${isLock}`, PROFILE);
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
    `INSERT INTO ${USER_REMINDER} (reminder_id, user_id, active, custom_message , custom_time, Xdays_ago) VALUES 
    (${reminderId}, ${1}, ${
      isActive ? 1 : 0
    }, '${message}', '${time}', ${daysAgo}) ON CONFLICT (user_id, reminder_id) DO UPDATE SET active=${
      isActive ? 1 : 0
    }, custom_message='${message}', custom_time='${time}', Xdays_ago=${daysAgo}`,
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
  return db.exec(`UPDATE ${VERSION} SET version=${version}`, VERSION);
}
