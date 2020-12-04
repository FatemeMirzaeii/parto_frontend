import SQLite from 'react-native-sqlite-storage';
import Database from './index';
import moment from 'moment';
import {
  USER,
  USER_REMINDER,
  USER_TRACKING_OPTION,
  CURRENT_SCHEMA_VERSION,
  REMINDER,
  PERIOD,
  PROFILE,
  PREGNANCY,
} from '../../constants/database-tables';
import { OPTIONS } from '../../constants/health-tracking-info';
import { getInUseDbVersion, updateInUseDbVersion } from './query';
import { DATETIME_FORMAT } from '../../constants/cycle';
const db = new Database();

export async function migration() {
  let inUseDbVersion = await getInUseDbVersion();
  console.log('inUseDbVersion', inUseDbVersion);
  if (CURRENT_SCHEMA_VERSION < inUseDbVersion) console.log('Downgrading!!!');
  while (inUseDbVersion < CURRENT_SCHEMA_VERSION) {
    switch (inUseDbVersion) {
      case 1:
        v1Tov2();
        break;
      case 2:
        v2ToV3();
        break;
      case 3:
        break;
      default:
        break;
    }
    inUseDbVersion = getInUseDbVersion();
  }
}
async function v2ToV3() {
  const defaultDate = moment().format(DATETIME_FORMAT);
  // console.log('I arrived here');
  await db.exec(
    `ALTER TABLE ${USER_TRACKING_OPTION} ADD COLUMN created_at datetime NOT NULL DEFAULT '${defaultDate}'`,
  );
  await db.exec(
    `ALTER TABLE ${USER_TRACKING_OPTION} ADD COLUMN updated_at datetime DEFAULT '${defaultDate}'`,
  );
  await db.exec(
    `ALTER TABLE ${USER_TRACKING_OPTION} ADD COLUMN state INTEGER DEFAULT 1`,
  );
  await db.exec(
    `ALTER TABLE ${USER} ADD COLUMN created_at datetime NOT NULL DEFAULT '${defaultDate}'`,
  );
  await db.exec(
    `ALTER TABLE ${USER} ADD COLUMN updated_at datetime DEFAULT '${defaultDate}'`,
  );
  await db.exec(`ALTER TABLE ${USER} ADD COLUMN phone varchar(255)`);
  await db.exec(
    `ALTER TABLE ${REMINDER} ADD COLUMN created_at datetime NOT NULL DEFAULT '${defaultDate}'`,
  );
  await db.exec(
    `ALTER TABLE ${REMINDER} ADD COLUMN updated_at datetime DEFAULT '${defaultDate}'`,
  );
  await db.exec(
    `ALTER TABLE ${USER_REMINDER} ADD COLUMN created_at datetime NOT NULL DEFAULT '${defaultDate}'`,
  );
  await db.exec(
    `ALTER TABLE ${USER_REMINDER} ADD COLUMN updated_at datetime DEFAULT '${defaultDate}'`,
  );
  await db.exec(
    `ALTER TABLE ${PERIOD} ADD COLUMN created_at datetime NOT NULL DEFAULT '${defaultDate}'`,
  );
  await db.exec(
    `ALTER TABLE ${PERIOD} ADD COLUMN updated_at datetime DEFAULT '${defaultDate}'`,
  );
  await db.exec(`ALTER TABLE ${PROFILE} ADD COLUMN last_sync_time datetime`);
  await db.exec(`ALTER TABLE ${PREGNANCY} ADD COLUMN state INTEGER DEFAULT 1`);
  //todo: must be tested again and again
  // const test = await db.exec(`SELECT * from ${USER}`);
  // console.log('commands executed now we are testing one of tables', test);
  updateInUseDbVersion(3);
}
async function v1Tov2() {
  SQLite.enablePromise(true);
  await SQLite.openDatabase(
    {
      name: 'periodcalendar.db',
      createFromLocation: '/data/periodcalendar.db',
    },
    transferOldData,
  );
  updateInUseDbVersion(2);
}

//transferring data from parto v1 to v2
async function transferOldData(odb) {
  odb.transaction(async (tx) => {
    const [fn, res] = await tx.executeSql('SELECT * FROM DailyInfo');
    var len = res.rows.length;
    for (let i = 0; i < len; i++) {
      let row = res.rows.item(i);
      db.exec(
        `INSERT INTO ${USER_TRACKING_OPTION} (date, tracking_option_id) VALUES ('${
          row.StartDate
        }', ${
          OPTIONS[row.StatusValue]
        }) ON CONFLICT(date, tracking_option_id) DO NOTHING`,
        USER_TRACKING_OPTION,
      );
    }
  });
}
