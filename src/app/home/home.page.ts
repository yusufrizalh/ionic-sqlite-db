import { Component } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // konfigurasi sqlite
  databaseObj: SQLiteObject;
  db = new SQLite();
  readonly database_name: string = 'inixindo.db';
  readonly table_name: string = 'inixindotable';
  model_name: string = '';
  row_data: any = [];

  update_active: boolean;
  to_update_item: any;

  // constructor() {}
  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform
      .ready()
      .then(() => {
        console.log('Platform is ready');
        this.createDB();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // membuat database baru
  createDB(): void {
    this.sqlite
      .create({
        name: this.database_name,
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        console.log('DB Created');
        alert('Database is created!');
      })
      .catch((error) => {
        alert('error: ' + JSON.stringify(error));
      })
      .finally(() => {
        console.log('Finally is triggered!');
      });
  }

  // membuat tabel baru
  createTable() {
    this.databaseObj
      .executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.table_name} (uid INTEGER PRIMARY KEY, uname VARCHAR(30))`,
        []
      )
      .then(() => {
        alert('Table is created!');
      })
      .catch((error) => {
        alert('error: ' + JSON.stringify(error));
      })
      .finally(() => {
        console.log('Finally is triggered!');
      });
  }

  // memasukkan data ke tabel
  insertRow() {
    if (!this.model_name.length) {
      alert('Please enter the value!');
      return;
    }
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.table_name} (uname) VALUES ('${this.model_name}')`,
        []
      )
      .then(() => {
        alert('New row is inserted!');
        this.getAllData();
      })
      .catch((error) => {
        alert('error: ' + JSON.stringify(error));
      });
  }

  // mengambil semua data
  getAllData() {
    this.databaseObj
      .executeSql(`SELECT * FROM ${this.table_name} ORDER BY uid DESC`, [])
      .then((res) => {
        this.row_data = []; // kosong
        if (res.rows.length > 0) {
          for (var a = 0; a < res.rows.length; a++) {
            this.row_data.push(res.rows.item(a));
          }
        }
      })
      .catch((error) => {
        alert('error: ' + JSON.stringify(error));
      })
      .finally(() => {
        console.log('Finally is triggered!');
      });
  }

  // menghapus data
  deleteRow(item) {
    this.databaseObj
      .executeSql(`DELETE FROM ${this.table_name} WHERE uid = ${item.uid}`, [])
      .then((res) => {
        alert('Row is deleted!');
        this.getAllData();
      })
      .catch((error) => {
        alert('error: ' + JSON.stringify(error));
      })
      .finally(() => {
        console.log('Finally is triggered!');
      });
  }

  // mengubah data
  enableUpdate(item) {
    this.update_active = true;
    this.to_update_item = item;
    this.model_name = item.uname;
  }
  updateRow() {
    this.databaseObj
      .executeSql(
        `UPDATE ${this.table_name} SET uname = '${this.model_name}' WHERE uid = ${this.to_update_item}`,
        []
      )
      .then(() => {
        alert('Row is updated!');
        this.update_active = false;
        this.getAllData();
      })
      .catch((error) => {
        alert('error: ' + JSON.stringify(error));
      })
      .finally(() => {
        console.log('Finally is triggered!');
      });
  }
}
