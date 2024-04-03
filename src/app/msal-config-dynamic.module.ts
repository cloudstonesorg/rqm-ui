import { NgModule, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { IPublicClientApplication, PublicClientApplication, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadConfigService } from './services/load-config.service';

const AUTH_CONFIG_URL_TOKEN = new InjectionToken<string>('AUTH_CONFIG_URL');

export function initializerFactory(env: LoadConfigService, configUrl: string): any {
    const promise = env.init(configUrl).then((value) => {
        console.log('finished getting configuration dynamically');
    });
    return () => promise;
  }

export function loggerCallback(logLevel: LogLevel, message: string){
        console.log(message)
  }

export function MSALInstanceFactory(config: LoadConfigService): IPublicClientApplication {
    return new PublicClientApplication({
        auth: config.getSettings('msal').auth,
        cache: config.getSettings('msal').cache,
      system: {
        loggerOptions: {
          loggerCallback,
          logLevel: LogLevel.Info,
          piiLoggingEnabled: false
        }       
      }
    });
  }

export function MSALInterceptorConfigFactory(config: LoadConfigService): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>(config.getSettings('interceptor').protectedResourceMap)
    return {
      interactionType: config.getSettings('interceptor').interactionType,
      protectedResourceMap
    };
  }

export function MSALGuardConfigFactory(config: LoadConfigService): MsalGuardConfiguration {
    return {
      interactionType: config.getSettings('guard').interactionType,
      authRequest: config.getSettings('guard').authRequest,
      loginFailedRoute: config.getSettings('guard').loginFailedRoute,
    };
  }
  
@NgModule({
    providers: [],
    imports: [MsalModule]
})
export class MsalConfigDynamicModule { 

    static forRoot(configFile: string){
        return {
            ngModule: MsalConfigDynamicModule,
            providers: [
                LoadConfigService,
                {   provide: AUTH_CONFIG_URL_TOKEN, useValue: configFile},
                {
                    provide: APP_INITIALIZER, useFactory: initializerFactory,
                    deps: [LoadConfigService, AUTH_CONFIG_URL_TOKEN], multi: true
                },
                {
                    provide: MSAL_INSTANCE,
                    useFactory: MSALInstanceFactory,
                    deps: [LoadConfigService],
                },
                {
                    provide: MSAL_GUARD_CONFIG,
                    useFactory: MSALGuardConfigFactory,
                    deps: [LoadConfigService],
                },
                {
                    provide: MSAL_INTERCEPTOR_CONFIG,
                    useFactory: MSALInterceptorConfigFactory,
                    deps: [LoadConfigService],
                },
                MsalService,
                MsalGuard,
                MsalBroadcastService,
                {
                    PROVIDE: HTTP_INTERCEPTORS,
                    useClass: MsalInterceptor,
                    Multi:true
                }
            ]
          };
          }
          }