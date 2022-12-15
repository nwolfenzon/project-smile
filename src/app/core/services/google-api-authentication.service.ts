import { Injectable } from '@angular/core';

import { BusyService } from './busy.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiAuthenticationService {
  
  google: any;
  googleClient: any;

  constructor(private busyService: BusyService) { }

  initGoogleAuthSdk() {
    this.google = (<any>window).google;

    this.googleClient = this.google.accounts.oauth2.initTokenClient({
      client_id: environment.google.aiClientId,
      scope: environment.google.aiScope,
      callback: (event) => this.handleCredentialResponse(event, this)
    });

  }

  login() {
    this.googleClient.requestAccessToken();
  }

  handleCredentialResponse(event: any, that: any) {
      // TODO: Check for successful login response
      if (event) {
        sessionStorage.setItem('access_token', event.access_token);
        that.busyService.updateIsLoggedIn(true);
      } else {
        sessionStorage.setItem('access_token', undefined);
        that.busyService.updateIsLoggedIn(false);
      }
  }
}
