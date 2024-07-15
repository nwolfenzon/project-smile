import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BusyService } from 'src/app/core/services/busy.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  isBusy: boolean;
  isBusySubscription: Subscription;
  constructor(private busyService: BusyService) { }

  ngOnInit(): void {
    this.isBusySubscription = this.busyService.isBusy$.subscribe(busy => this.isBusy = busy);
  }

  ngOnDestroy() {
    this.isBusySubscription.unsubscribe();
  }

}
