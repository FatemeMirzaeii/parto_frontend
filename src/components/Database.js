import SQLite from 'react-native-sqlite-storage';
import {EMPTY_TABLE} from '../constants/TableDataBase';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'parto.db';
const database_location = '~parto1.db';

export default class Database {
  initDB(tableName) {
    let db;
    return new Promise((resolve) => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase({
            name: database_name,
            createFromLocation: database_location,
          })
            .then((DB) => {
              db = DB;
              db.executeSql(`SELECT 1 FROM ${tableName} LIMIT 1`)
                .then(() => {})
                .catch((error) => {
                  db.transaction((tx) => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS user_profile (id, name)',
                    );
                  })
                    .then(() => {})
                    .catch((error) => {});
                });
              resolve(db);
            })
            .catch((error) => {});
        })
        .catch((error) => {});
    });
  }
  //function for the close Database connection
  closeDatabase(db) {
    if (db) {
      db.close()
        .then((status) => {})
        .catch((error) => {});
    } else {
    }
  }
  //function to get the results

  async rawQuery(_Query, _Values = [], _Table) {
    return await new Promise((resolve) => {
      let arr = [];
      this.initDB(_Table)
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(_Query, _Values).then(([tx, results]) => {
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                row.data === undefined
                  ? arr.push(row)
                  : arr.push(JSON.parse(row.data));
              }
              if (arr.length > 0) {
                resolve(arr);
              } else {
                resolve({rows: EMPTY_TABLE, insertId: results.insertId});
              }
            });
          })
            .then((result) => {
              this.closeDatabase();
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
}
