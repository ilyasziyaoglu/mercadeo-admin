import { Injectable } from '@angular/core';
import {HttpService} from './base/http.service';
import {BaseService} from './base/base-service';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseService {
  private basePath = 'brand';

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }
}
