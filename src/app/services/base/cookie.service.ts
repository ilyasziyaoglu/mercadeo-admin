import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {

  constructor() {
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    const regex = RegExp(/([a-zA-Z0-9_]){1,1000}=([a-zA-Z0-9_]){1,1000}/g);
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i];
      if (regex.test(c)) {
        const [key, value] = c.split('=');
        try {
          this[key] = JSON.parse(value);
        } catch (e) {
          this[key] = value;
        }
      }
    }
  }

  setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();

    this[cname] = cvalue;
    if (typeof cvalue !== 'string') {
      cvalue = JSON.stringify(cvalue);
    }
    document.cookie = cname + '=' + cvalue + ';' + expires;
  }

  updateCookie(cname) {
    this.setCookie(cname, this[cname]);
  }
}
