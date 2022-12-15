import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  // isBusy
  private _isBusySource = new Subject<boolean>();
  isBusy$ = this._isBusySource.asObservable();

  // isLoggedIn
  _isLoggedInSource = new Subject<boolean>();
  isLoggedIn$ = this._isLoggedInSource.asObservable();

  constructor() { }

  updateIsBusy(val: boolean) {
    this._isBusySource.next(val);
  }

  updateIsLoggedIn(val: boolean) {
    this._isLoggedInSource.next(val);
  }

}
