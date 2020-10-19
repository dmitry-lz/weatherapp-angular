import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from './app.component';
import { WeatherModule } from './weather/weather.module';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WeatherModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
