import {Injectable} from '@angular/core';
import {HttpMethod, HttpService} from './base/http.service';
import {BaseService} from './base/base-service';

@Injectable({
  providedIn: 'root',
})
export class ModelAccessoryService extends BaseService {

  basePath = 'model-accessory';

  constructor(
      httpService: HttpService,
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  getProperties(modelId, accessoryId, cb) {
    const url = this.basePath + this.GUEST + '?modelId=' + modelId + '&accessoryId=' + accessoryId;
    this.getHttpService().doRequest(HttpMethod.GET, url, '', result => {
      if ( result ) {
        result.props = JSON.parse(result.props);
      }
      cb(result);
    });
  }

  saveProperties(properties) {
    const clone = {...properties};
    clone.props = JSON.stringify(clone.props);
    let propertiesToSave: Properties;
    try {
      propertiesToSave = {...clone};
      this.getHttpService().doRequest(HttpMethod.POST, this.basePath, propertiesToSave);
    } catch (e) {
      console.error('Properties doesnt match with right request template. Properties: ', clone, e);
    }
  }
}

export class Properties {
  id: number;
  modelId: number;
  accessoryId: number;
  props: string;
}
