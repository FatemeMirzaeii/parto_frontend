import SQLite from 'react-native-sqlite-storage';
import { EMPTY_TABLE } from '../../constants/database-tables';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'parto.db';
const database_location = '~parto.db';

export default class Database {
  async open(_table) {
    const _db = await SQLite.openDatabase({
      name: database_name,
      createFromLocation: database_location,
    });
    // const exists = await _db.executeSql(`SELECT 1 FROM ${_table} LIMIT 1`);
    // if (!exists) {
    //   _db.transaction((tx) => {
    //     tx.executeSql(`CREATE TABLE IF NOT EXISTS ${_table} (id, name)`);
    //   });
    // }
    return _db;
  }

  async close(_db) {
    await _db.close();
  }

  async exec(_query, _table) {
    let arr = [];
    const _db = await this.open(_table);
    try {
      await _db.transaction(async (tx) => {
        const [fn, res] = await tx.executeSql(_query);
        var len = res.rows.length;
        for (let i = 0; i < len; i++) {
          let item = res.rows.item(i);
          item.data === undefined
            ? arr.push(item)
            : arr.push(JSON.parse(item.data));
        }
      });
    } catch (error) {
      console.error(error.message);
    }
    // this.close(_db);
    return arr.length > 0 ? arr : EMPTY_TABLE; //todo: should correct insertId
  }
}
