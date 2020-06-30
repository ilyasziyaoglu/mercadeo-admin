import { Injectable } from '@angular/core';
import {HttpMethod, HttpService} from './base/http.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private basePath = 'file';

  constructor(
      private httpService: HttpService,
  ) {}

  uploadFile(file, cb?): void {
    this.httpService.doRequest(HttpMethod.POST, `${this.basePath}/upload`, file, result => {
      cb(result);
      // this.showResult(result);
    });
  }

  uploadAllFiles(files, cb?): void {
    this.httpService.doRequest(HttpMethod.POST, `${this.basePath}/upload-all`, files, result => {
      cb(result);
      // this.showResult(result);
    });
  }

  deleteFile(fileName, cb?): void {
    this.httpService.doRequest(HttpMethod.DELETE, `${this.basePath}/delete/${fileName}`, '', result => {
      cb(result);
      // this.showResult(result);
    });
  }

  deleteAllFiles(fileNames, cb?): void {
    this.httpService.doRequest(HttpMethod.POST, `${this.basePath}/upload`, fileNames, result => {
      cb(result);
      // this.showResult(result);
    });
  }

  showResult(result) {
    if ( result ) {
      Swal.fire({
        title: 'Info',
        icon: 'success',
        text: 'Upload is successful!',
      });
    } else {
      Swal.fire({
        title: 'Info',
        icon: 'error',
        text: 'Upload failed!',
      });
    }
  }
}
