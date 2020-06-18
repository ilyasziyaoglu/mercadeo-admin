import { Injectable } from '@angular/core';
import {BaseService} from './base/base-service';
import {HttpService} from './base/http.service';

@Injectable({
  providedIn: 'root',
})
export class SizeService extends BaseService {
  private basePath = 'size';

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }
}
