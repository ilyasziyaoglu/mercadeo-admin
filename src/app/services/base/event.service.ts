import {AfterViewInit, Injectable, isDevMode} from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(
    private httpService: HttpService,
  ) {
  }

  request(operation: string, request: any, cb?) {

    const data = {
      operation,
      request
    };

    if (isDevMode()) {
      this.httpService.doRequest('post', 'operation', data, cb);
    } else {
      // TODO prod alimi yaparken yildizi site domaini ile degistir
      window.parent.postMessage(data, '*');

      window.onmessage = (response) => {
        console.log('EventRequest', operation);
        if (response.data && response.data.success === true) {
          if (cb) {
            cb(response.data.results);
          }
        } else {
          console.log(operation, request, response);
        }
      };
    }
  }
}
