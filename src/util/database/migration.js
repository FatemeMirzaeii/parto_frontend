import SQLite from 'react-native-sqlite-storage';
import Database from './index';
import {
  USER,
  USER_REMINDER,
  USER_TRACKING_OPTION,
  CURRENT_SCHEMA_VERSION,
  REMINDER,
  PERIOD,
  PROFILE,
} from '../../constants/database-tables';
import { OPTIONS } from '../../constants/health-tracking-info';
import { getInUseDbVersion, updateInUseDbVersion } from './query';
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
        //v2ToV2_6();
        break;
      default:
        break;
    }
    inUseDbVersion = getInUseDbVersion();
  }
}
async function v2ToV2_6() {
  db.exec(
    `ALTER TABLE ${USER_TRACKING_OPTION} ADD COLUMN created_at datetime NOT NULL;
    ALTER TABLE ${USER_TRACKING_OPTION} ADD COLUMN updated_at datetime NOT NULL;
    ALTER TABLE ${USER} ADD COLUMN created_at datetime NOT NULL;
    ALTER TABLE ${USER} ADD COLUMN updated_at datetime NOT NULL;
    ALTER TABLE ${USER} ADD COLUMN phone varchar(255);
    ALTER TABLE ${REMINDER} ADD COLUMN created_at datetime NOT NULL;
    ALTER TABLE ${REMINDER} ADD COLUMN updated_at datetime NOT NULL;
    ALTER TABLE ${USER_REMINDER} ADD COLUMN created_at datetime NOT NULL;
    ALTER TABLE ${USER_REMINDER} ADD COLUMN updated_at datetime NOT NULL;
    ALTER TABLE ${PERIOD} ADD COLUMN created_at datetime NOT NULL;
    ALTER TABLE ${PERIOD} ADD COLUMN updated_at datetime NOT NULL;
    ALTER TABLE ${PROFILE} ADD COLUMN last_sync_time datetime;
    `,
  ); //todo: must be tested
  updateInUseDbVersion(2.6);
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
