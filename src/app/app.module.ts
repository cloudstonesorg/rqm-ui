import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInterceptor, MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { MsalConfigDynamicModule } from './msal-config-dynamic.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MsalConfigDynamicModule.forRoot('assets/app.config.json'),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    MsalGuard,
    DatePipe,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})

export class AppModule {
  constructor () {

  }
 }




















// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// // Authentication
// // import { MsalInterceptor, MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
// // import { MsalModule, MSAL_CONFIG, MSAL_CONFIG_ANGULAR } from '@azure/msal-angular';
// import { MsalModule, MSAL_CONFIG, MsalInterceptorConfiguration } from '@azure/msal-angular';

// import { ConfigurationService } from './configuration.service';
// import { HttpClientModule } from '@angular/common/http';



// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     MsalModule
//   ],
//   providers: [
//     ConfigurationService,
//     {
//       provide: MSAL_CONFIG,
//       useFactory: (configService: ConfigurationService) => configService.getMsalConfig(),
//       deps: [ConfigurationService]
//     },
//     {
//       provide: MSAL_CONFIG_ANGULAR,
//       useFactory: (configService: ConfigurationService) => configService.getMsalAngularConfig(),
//       deps: [ConfigurationService]
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }