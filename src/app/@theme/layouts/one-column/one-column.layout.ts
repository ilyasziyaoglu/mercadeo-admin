import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ngx-sidebar-menu></ngx-sidebar-menu>
      </nb-sidebar>

      <nb-layout-column style="position: static; width: 100%; padding: 0;">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

<!--      <nb-layout-footer style="position: static; width: 100%;">-->
<!--        <ngx-footer></ngx-footer>-->
<!--      </nb-layout-footer>-->
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {}
