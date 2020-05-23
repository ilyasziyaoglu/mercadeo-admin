import {Component, Input, OnInit} from '@angular/core';
import {BasketService} from '../../../services/basket.service';
import {NbToastrService} from '@nebular/theme';

@Component({
    selector: 'ngx-basket-card',
    templateUrl: './basket-card.component.html',
    styleUrls: ['./basket-card.component.scss'],
})
export class BasketCardComponent implements OnInit {

    @Input() basket: any;

    constructor(
        private basketService: BasketService,
        private toastrService: NbToastrService,
    ) {
    }

    ngOnInit() {
    }

    onDeleteBasket() {
        const result = this.basketService.delete(this.basket);
        const message = result ? 'Product successfully deleted' : 'The product could not be deleted!';
        const status = result ? 'success' : 'danger';
        this.showToast(message, status);
    }

    showToast(message, status) {
        this.toastrService.show(status, message, {status});
    }

    onAmountUpdate() {
        window['storage'].updateItem('baskets');
    }
}
