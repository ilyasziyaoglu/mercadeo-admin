import { Injectable } from '@angular/core';
import {BaseService} from './base/base-service';
import {HttpService} from './base/http.service';

@Injectable({
  providedIn: 'root',
})
export class StockService extends BaseService {
  private basePath = 'stock';

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }
}
