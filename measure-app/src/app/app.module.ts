import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { DialogAndroidComponent } from './dialog-android/dialog-android.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    MapComponent,
    DialogAndroidComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
