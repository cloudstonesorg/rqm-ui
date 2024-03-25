// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MSAL_CONFIG, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { ConfigurationService } from './configuration.service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MsalModule
  ],
  providers: [
    ConfigurationService,
    {
      provide: MSAL_CONFIG,
      useFactory: (configService: ConfigurationService) => configService.getMsalConfig(),
      deps: [ConfigurationService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MsalInterceptorConfiguration,
      useFactory: (configService: ConfigurationService) => configService.getMsalInterceptorConfig(),
      deps: [ConfigurationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




















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