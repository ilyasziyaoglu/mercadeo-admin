import { Component, OnInit } from '@angular/core';
import {HttpMethod, HttpService} from '../../services/base/http.service';
import {Router} from '@angular/router';
import {StorageService} from '../../services/base/storage.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullName: any;
  email: any;
  password: any;
  password2: any;
  gender: any;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
  }

  onRegister() {
    if (this.password === this.password2) {
      const data = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        gender: this.gender,
      };

      this.httpService.doRequest(HttpMethod.POST, 'auth/register', data, (response) => {
        window['storage'].setItem('token', response.token);
        window['storage'].setItem('user', response.userResponse);
        this.router.navigateByUrl('pages/design');
      });
    }
  }
}
