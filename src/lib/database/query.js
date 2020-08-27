import Database from '../../lib/database';
import { PROFILE, USER_TRACKING_OPTION } from '../../constants/database-tables';
import moment from 'moment';
const db = new Database();

export async function getProfileData() {
  const res = await db.rawQuery(`SELECT * FROM ${PROFILE}`, [], PROFILE);
  const data = res[0];
  return data ?? 0;
}
export async function saveProfileData(profileSchema) {
  //todo: need test
  const res = await db.rawQuery(
    `INSERT INTO ${PROFILE}
             (pregnant, pregnancy_try, avg_period_length, avg_cycle_length, 
              birthdate, last_period_date, created_at)
             VALUES(
                ${profileSchema.pregnant},
                ${profileSchema.pregnancyTry},
                ${profileSchema.periodLength},
                ${profileSchema.cycleLength},
                '${profileSchema.birthdate}',
                '${profileSchema.lastPeriodDate}',
                '${moment()}')`,
    [],
    PROFILE,
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
    `SELECT * FROM ${USER_TRACKING_OPTION} WHERE tracking_option_id IN (1,2,3,4)`,
    [],
    USER_TRACKING_OPTION,
  );
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
  const date = await db.rawQuery(
    `SELECT last_period_date FROM ${PROFILE}`,
    [],
    PROFILE,
  );
  return date[0].last_period_date;
}
export async function setLastPeriodDate(date) {
  return await db.rawQuery(
    `UPDATE ${PROFILE} SET last_period_date='${date}'`,
    [],
    PROFILE,
  );
}
export function setPeriod(days) {
  days.forEach(async (day) => {
    console.log('dyyyyy', day);
    await db.rawQuery(
      `INSERT INTO ${USER_TRACKING_OPTION} (date, tracking_option_id) VALUES ('${day}',3)`,
      [],
      USER_TRACKING_OPTION,
    );
  });
}
