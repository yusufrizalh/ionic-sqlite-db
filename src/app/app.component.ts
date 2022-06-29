import { Component } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
  // konfigurasi sqlite
  // databaseObj: SQLiteObject;
  // readonly database_name: string = 'inixindo.db';

  // constructor(private platform: Platform, private sqlite: SQLite) {
  //   this.platform
  //     .ready()
  //     .then(() => {
  //       console.log('Platform is ready');
  //       this.createDB();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // // membuat database baru
  // createDB() {
  //   this.sqlite
  //     .create({
  //       name: this.database_name,
  //       location: 'default',
  //     })
  //     .then((db: SQLiteObject) => {
  //       this.databaseObj = db;
  //       console.log('DB Created');
  //       alert('Database is created!');
  //     })
  //     .catch((error) => {
  //       alert('error: ' + JSON.stringify(error));
  //     })
  //     .finally(() => {
  //       console.log('Finally is triggered!');
  //     });
  // }
}
