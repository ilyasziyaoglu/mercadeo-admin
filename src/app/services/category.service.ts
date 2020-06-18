import { Injectable } from '@angular/core';
import {BaseService} from './base/base-service';
import {HttpService} from './base/http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  private basePath = 'category';

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  getCategoryTree(cb) {
    this.getAll(categories => {
      const firstLevels = categories.filter(c => c.level === 1);
      firstLevels.forEach(flevel => {
        flevel.children = categories.filter(c => c.parentId === flevel.id);
        flevel.children.forEach(slevel => {
          slevel.children = categories.filter(c => c.parentId === slevel.id);
        });
      });
      cb(firstLevels);
    });
  }
}
