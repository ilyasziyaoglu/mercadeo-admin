import {Component} from '@angular/core';
import {HttpMethod, HttpService} from '../../services/base/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../services/base/storage.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username;
  password;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private storageService: StorageService,
  ) {
  }


  onLogin() {
    const data = {
      email: this.username,
      password: this.password,
    };
    this.httpService.doRequest(HttpMethod.POST, 'auth/login', data, (response) => {
      window['storage'].setItem('token', response.token);
      window['storage'].setItem('user', response.userResponse);
      this.router.navigateByUrl('pages/design');
    });
  }
}
