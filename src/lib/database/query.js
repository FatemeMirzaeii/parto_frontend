import Database from '../../lib/database';
import {
  PROFILE,
  USER_TRACKING_OPTION,
  PREGNANCY,
} from '../../constants/database-tables';
import moment from 'moment';
import { FORMAT } from '../../constants/cycle';
import {
  SPOTTING,
  LIGHT,
  MEDIUM,
  HEAVY,
} from '../../constants/health-tracking-info';
const db = new Database();

export async function getProfileData() {
  const res = await db.rawQuery(`SELECT * FROM ${PROFILE}`, [], PROFILE);
  const data = res[0];
  return data ?? 0;
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
  const res = await db.rawQuery(
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
    [],
    PROFILE,
  );
  return res ?? 0;
}
export async function pregnancyMode() {
  const res = await db.rawQuery(`SELECT pregnant FROM ${PROFILE}`, [], PROFILE);
  const data = res[0];
  return data.pregnant ?? 0;
}
export async function getPregnancyData() {
  const res = await db.rawQuery(`SELECT * FROM ${PREGNANCY}`, [], PREGNANCY);
  const data = res[0];
  console.log('hi from queries', data);
  return data ?? 0;
}
export async function savePregnancyData(pregnancySchema) {
  const dueDate = !pregnancySchema.dueDate
    ? null
    : `'${pregnancySchema.dueDate}'`;
  const conceptionDate = !pregnancySchema.conceptionDate
    ? null
    : `'${pregnancySchema.conceptionDate}'`;
  const res = await db.rawQuery(
    `INSERT INTO ${PREGNANCY} (due_date, conception_date) VALUES(
      ${dueDate},${conceptionDate})`,
    [],
    PREGNANCY,
  );
  return res ?? 0;
}
export function updateProfileData(profileSchema) {
  db.rawQuery(
    `UPDATE ${PROFILE} SET avg_period_length=${profileSchema.periodLength},
                             avg_cycle_length=${profileSchema.cycleLength},
                             pms_length=${profileSchema.pmsLength}`,
    [],
    PROFILE,
  ).then((res) => {
    return res;
  });
}
export async function getCycleInfoFromProfile() {
  const res = await db.rawQuery(
    `SELECT avg_period_length, avg_cycle_length, pms_length FROM ${PROFILE}`,
    [],
    PROFILE,
  );
  const data = res[0];
  return data ?? 0;
}
export async function getUserAllPeriodDays() {
  const res = await db.rawQuery(
    `SELECT * FROM ${USER_TRACKING_OPTION} WHERE tracking_option_id IN
      (${SPOTTING}, ${LIGHT}, ${MEDIUM}, ${HEAVY})`,
    [],
    USER_TRACKING_OPTION,
  );
  console.log('kkkk', res);
  return res ?? 0;
}
export async function getTrackingOptionData(date) {
  const res = db.rawQuery(
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
    [],
    'health_tracking_category',
  );
  return res;
}
export async function getLastPeriodDate() {
  const res = await db.rawQuery(
    `SELECT last_period_date FROM ${PROFILE}`,
    [],
    PROFILE,
  );
  const data = res[0];
  return data ? data.last_period_date : null;
}
export async function setLastPeriodDate(date) {
  return await db.rawQuery(
    `UPDATE ${PROFILE} SET last_period_date='${date.format(FORMAT)}'`,
    [],
    PROFILE,
  );
}
export function setBleedingDays(days, removed) {
  if (removed) {
    removed.forEach(async (rday) => {
      const res = await db.rawQuery(
        `DELETE FROM ${USER_TRACKING_OPTION} WHERE date='${rday}' AND tracking_option_id IN
        (${SPOTTING}, ${LIGHT}, ${MEDIUM}, ${HEAVY})`,
        [],
        USER_TRACKING_OPTION,
      );
      console.log('hi from queries', res);
    });
  }
  days.forEach(async (day) => {
    console.log('set period here', day);
    await db.rawQuery(
      `INSERT INTO ${USER_TRACKING_OPTION} (date, tracking_option_id) VALUES ('${day}',${MEDIUM})
      ON CONFLICT(date, tracking_option_id) DO NOTHING`,
      [],
      USER_TRACKING_OPTION,
    );
  });
}
