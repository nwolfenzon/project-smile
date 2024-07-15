import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusyService } from 'src/app/core/services/busy.service';
import { GoogleApiAuthenticationService } from 'src/app/core/services/google-api-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {

  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;

  constructor(
    private auth: GoogleApiAuthenticationService,
    private busyService: BusyService) { }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.busyService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.auth.initGoogleAuthSdk();
  }

  onLogin(): void {
    this.auth.login();
  }

}