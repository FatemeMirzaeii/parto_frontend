import SQLite from 'react-native-sqlite-storage';
import Database from '../database';
import {
  USER_TRACKING_OPTION,
  USER_LOG,
  CURRENT_SCHEMA_VERSION,
} from '../../constants/database-tables';
import { OPTIONS } from '../../constants/health-tracking-info';
import { getInUseDbVersion } from './query';
const db = new Database();

export async function migration() {
  let inUseDbVersion = await getInUseDbVersion();
  console.log('inUseDbVersion', inUseDbVersion);
  while (inUseDbVersion < CURRENT_SCHEMA_VERSION) {
    switch (inUseDbVersion) {
      case 1:
        v1Tov2();
        break;
      default:
        break;
    }
    inUseDbVersion = getInUseDbVersion();
  }
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
  db.exec(`UPDATE ${USER_LOG} SET version=${CURRENT_SCHEMA_VERSION}`, USER_LOG);
}

async function transferOldData(odb) {
  console.log('odb', odb);
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
