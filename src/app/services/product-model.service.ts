import {Injectable} from '@angular/core';
import {HttpMethod, HttpService} from './base/http.service';
import {BaseService} from './base/base-service';

@Injectable({
    providedIn: 'root',
})
export class ProductModelService extends BaseService {

    private basePath = 'product-model';

    constructor(
        httpService: HttpService,
    ) {
        super(httpService);
    }

    getBasePath(): string {
        return this.basePath;
    }

    getColorList(cb) {
        this.getHttpService().doRequest(HttpMethod.GET, `${this.basePath}${this.GUEST}/color-list`, '', cb);
    }
}
