import Database from '../../lib/database';
import { PROFILE, USER_TRACKING_OPTION } from '../../constants/database-tables';
const db = new Database();

export async function getProfileData() {
  const res = await db.rawQuery(`SELECT * FROM ${PROFILE}`, [], PROFILE);
  const data = res[0];
  return data ? data : 0;
}
export function saveProfileData(profileSchema) {
  //todo: need test
  db.rawQuery(
    `INSERT INTO ${PROFILE}
             (pregnant, pregnancy_try, avg_period_length, avg_cycle_length, 
              birthdate, created_at, last_period_date)
             VALUES(
                ${profileSchema.pregnant},
                ${profileSchema.pregnancyTry},
                ${profileSchema.periodLength},
                ${profileSchema.cycleLength},
                '${profileSchema.birthdate}',
                '${profileSchema.today.format('YYYY-MM-DD')}',
                '${profileSchema.lastPeriodDate}')`,
    PROFILE,
  ).then((res) => {
    return res;
  });
}
export function updateProfileData(profileSchema) {
  //todo: need test
  db.rawQuery(
    `UPDATE ${PROFILE} SET avg_period_length=${profileSchema.periodLength},
                             avg_cycle_length=${profileSchema.cycleLength},
                             pms_length=${profileSchema.pmsLength}`,
    PROFILE,
  ).then((res) => {
    return res;
  });
}
export function getCycleInfoFromProfile() {
  //todo: need test
  db.rawQuery(
    `SELECT avg_period_length, avg_cycle_length, pms_length FROM ${PROFILE}`,
    PROFILE,
  ).then((n) => {
    const data = n[0];
    return data ? data : 0;
  });
}
export async function getUserAllPeriodDays() {
  const res = await db.rawQuery(
    `SELECT * FROM ${USER_TRACKING_OPTION} WHERE tracking_option_id IN (1,2,3,4)`,
  );
  return res ? res : 0;
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
export async function addNewPeriod(startDate, EndDate, time) {
  db.rawQuery(``);
}
