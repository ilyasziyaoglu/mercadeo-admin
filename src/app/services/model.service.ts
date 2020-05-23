import {Injectable} from '@angular/core';
import {HttpMethod, HttpService} from './base/http.service';
import {environment} from '../../environments/environment';
import {BaseService} from './base/base-service';

@Injectable({
  providedIn: 'root',
})
export class ModelService extends BaseService {

  basePath = 'model';

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  getModels(cb) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.basePath}${this.GUEST}/all`, '', (models) => {
      for (let i = 0; i < models.length; i++) {
        models[i] = this.setImgUrls(models[i]);
        try {
          models[i].colors = JSON.parse(models[i].colors);
        } catch (e) {
          console.warn(e);
        }
      }
      cb(models);
    });
  }

  saveModel(model) {
    const clone = {...model};
    clone.colors = JSON.stringify(clone.colors);
    delete clone.isActive;
    delete clone.currentColor;
    delete clone.isModel;

    this.getHttpService().doRequest(HttpMethod.POST, this.basePath, clone, null);
  }

  saveColors(model) {
    this.saveModel(model);
  }

  setImgUrls(model) {
    const basePath = `${environment.baseModelImgUrl + model.category.toLowerCase()}/${model.name.toLowerCase()}/`;
    model.src = `${basePath + model.name.toLowerCase()}.png`;
    model.angles = [];
    for (let i = 0; i < 8; i++) {
      model.angles.push(`${basePath + model.name.toLowerCase()}_${i}.png`);
    }
    return model;
  }
}
