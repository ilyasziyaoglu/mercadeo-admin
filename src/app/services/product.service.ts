import { Injectable } from '@angular/core';
import {BaseService} from './base/base-service';
import {HttpService} from './base/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  private basePath = 'product';

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }
  getBasePath(): string {
    return this.basePath;
  }
}
