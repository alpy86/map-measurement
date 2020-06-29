import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {TranslateService} from '@ngx-translate/core';
import { AndroidService } from './services/android.service';
import { DialogAndroidComponent } from './dialog-android/dialog-android.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'measure-app';

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    private androidService: AndroidService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    if (this.androidService.isAndroid()) {
      const dialogRef = this.dialog.open(DialogAndroidComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    };
  }

}
