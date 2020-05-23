/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils';
import {StorageService} from './services/base/storage.service';
import {CookieService} from './services/base/cookie.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService) {
  }

  ngOnInit(): void {
    window['storage'] = new StorageService();
    window['cookie'] = new CookieService();
    this.analytics.trackPageViews();
  }
}
