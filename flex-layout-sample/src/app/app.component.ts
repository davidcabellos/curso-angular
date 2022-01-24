import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

const PRINT_MOBILE = 'print and (max-width: 600px)';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'flexLayout';

  private mediaSubscription!: Subscription;
  private activeMediaQuery = '';
  deviceXs!: boolean;
  constructor(public mediaObserver: MediaObserver) {}

  ngOnInit() {
    // if (this.mediaObserver.isActive('xs') && !this.mediaObserver.isActive(PRINT_MOBILE)) {
    //   this.deviceXs = true;
    // }
    // else {
    //   this.deviceXs = false;
    // }

    this.mediaSubscription = this.mediaObserver
      .asObservable()
      .subscribe((changes) => {
        changes[0].mqAlias === 'xs'
          ? (this.deviceXs = true)
          : (this.deviceXs = false);
      });
    // .pipe(filter((change: MediaChange[]) => change[0].mqAlias == 'xs'))
    // .subscribe(() => {
    //   this.deviceXs = true
    // });

    // .subscribe(
    //   (change) => {
    //     change.forEach((item) => {

    //       this.activeMediaQuery = item  ? `'${item.mqAlias}' = (${item.mediaQuery})`: '';
    //       console.log('activeMediaQuery', this.activeMediaQuery);

    //       (item && item.mqAlias === 'xs') ? this.deviceXs = true: this.deviceXs = false;

    //     });
    //   }
    // );
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }
}
