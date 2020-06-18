import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { HttpService } from './base/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  basePath = 'user';

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  logOut() {
    window['storage'].setItem('token', null);
    window['storage'].setItem('user', null);
  }
}
