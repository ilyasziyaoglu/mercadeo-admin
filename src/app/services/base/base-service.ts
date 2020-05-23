import {HttpMethod, HttpService} from './http.service';

export abstract class BaseService {

    GUEST = '/guest';

    protected constructor(
        private httpService: HttpService,
    ) {
    }

    abstract getBasePath(): string;

    getHttpService(): HttpService {
        return this.httpService;
    }

    get(id, cb): void {
        this.httpService.doRequest(HttpMethod.GET, `${this.getBasePath()}${this.GUEST}/${id}`, '', cb);
    }

    post(request, cb?): void {
        this.httpService.doRequest(HttpMethod.POST, this.getBasePath(), request, cb);
    }

    put(request, cb?): void {
        this.httpService.doRequest(HttpMethod.PUT, this.getBasePath(), request, cb);
    }

    delete(id, cb): void {
        this.httpService.doRequest(HttpMethod.DELETE, `${this.getBasePath()}/${id}`, '', cb);
    }

    getAll(cb): void {
        this.httpService.doRequest(HttpMethod.GET, `${this.getBasePath()}${this.GUEST}/all`, '', cb);
    }

    filter(pageReq, cb): void {
        this.httpService.doRequest(HttpMethod.POST, `${this.getBasePath()}${this.GUEST}/filter`, pageReq, cb);
    }
}
