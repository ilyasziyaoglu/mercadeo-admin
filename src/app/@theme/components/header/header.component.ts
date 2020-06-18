import {Component, OnDestroy} from '@angular/core';
import {NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import {Subject} from 'rxjs';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  storage = window['storage'];
  defaultUserImg = 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogOut() {
    this.userService.logOut();
  }
}
