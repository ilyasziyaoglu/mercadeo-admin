import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyFavoritesService {

  constructor() { }

  toggle(productModel) {
    if (window['storage'].favorites) {
      if (this.includes(productModel)) {
        return this.delete(productModel);
      } else {
        window['storage'].favorites.push(productModel);
        window['storage'].updateItem('favorites');
        return true;
      }
    } else {
      window['storage'].favorites = [productModel];
      window['storage'].updateItem('favorites');
      return true;
    }
  }

  includes(productModel) {
    if (window['storage'].favorites) {
      for (const pm of window['storage'].favorites) {
        if (productModel.id == pm.id) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  delete(productModel) {
    if (window['storage'].favorites) {
      let index = 0;
      for (const pm of window['storage'].favorites) {
        if (productModel.id == pm.id) {
          window['storage'].favorites.splice(index, 1);
          window['storage'].updateItem('favorites');
          return true;
        }
        index++;
      }
    }
    return false;
  }
}
