import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'master';
const database_location = '~sqlite.db';

export default class Database {
  initDatabse() {
    return new Promise((resolve) => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase({
            name: database_name,
            createFromLocation: database_location,
          })
            .then((db) => {
              resolve(db);
            })
            .catch((error) => {
              console.error("Can't open database: " + error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  //function for the close Database connection
  closeDatabase(db = "master") {
    if (db) {
      db.close()
        .then((status) => {
          console.info(status);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
    }
  }
  //function to get the result of query
  async rawQuery(_Query, _Values = []) {
    return await new Promise((resolve) => {
      let arr = [];
      this.initDatabse()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(_Query, _Values).then(([tx, results]) => {
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                arr.push(row);
              }
              if (arr.length > 0) {
                resolve(arr);
              }
            });
          })
            .then((result) => {
              this.closeDatabase();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
}
