import { Injectable } from '@angular/core';
import {BaseService} from './base/base-service';
import {HttpService} from './base/http.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  private basePath = 'order';
  public order: any;

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }
  getBasePath(): string {
    return this.basePath;
  }
}
