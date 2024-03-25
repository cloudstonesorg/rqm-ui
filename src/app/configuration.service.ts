// configuration.service.ts
import { Injectable } from '@angular/core';
import { Configuration, InteractionType, MsalInterceptorConfiguration } from '@azure/msal-angular'; // Ensure 'InteractionType' is imported

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor() {}

  getMsalConfig(): Configuration {
    // Fetch MSAL configuration from a remote source or environment variables
    return {
      auth: {
        clientId: 'YOUR_CLIENT_ID',
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
        // Other optional parameters like scopes can be added here
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
      }
    };
  }

  getMsalInterceptorConfig(): MsalInterceptorConfiguration {
    return {
      interactionType: InteractionType.Redirect, // or InteractionType.Popup
      protectedResourceMap: new Map<string, Array<string>>(),
    };
  }
}
