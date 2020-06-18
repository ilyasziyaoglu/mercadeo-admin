import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BasketService {

    constructor() {
    }

    add(basket) {
        if (window['storage'].baskets) {
            if (!this.includes(basket)) {
                window['storage'].baskets.push(basket);
                window['storage'].updateItem('baskets');
                return true;
            }
        } else {
            window['storage'].baskets = [basket];
            window['storage'].updateItem('baskets');
            return true;
        }
    }

    includes(basket) {
        if (window['storage'].baskets) {
            for (const po of window['storage'].baskets) {
                if (basket.id === po.id) {
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    updateBasket(newProduct) {
        if (window['storage'].baskets) {
            let index = 0;
            for (const productInBasket of window['storage'].baskets) {
                if (newProduct.id === productInBasket.id) {
                    productInBasket.quantity += newProduct.quantity;
                    productInBasket.selectedProductColors =
                        productInBasket.selectedProductColors.concat(newProduct.selectedProductColors);
                    productInBasket.selectedSizes = productInBasket.selectedSizes.concat(newProduct.selectedSizes);
                    window['storage'].updateItem('baskets');
                    return true;
                }
                index ++;
            }
        }
        return false;
    }

    delete(basket) {
        if (window['storage'].baskets) {
            let index = 0;
            for (const po of window['storage'].baskets) {
                if (basket.id === po.id) {
                    window['storage'].baskets.splice(index, 1);
                    window['storage'].updateItem('baskets');
                    return true;
                }
                index ++;
            }
        }
        return false;
    }
}
