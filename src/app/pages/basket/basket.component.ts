import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'ngx-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {

  baskets: any = [];

  constructor(
      private basketService: BasketService,
  ) { }

  ngOnInit() {
    this.baskets = window['storage'].baskets;
  }

  calculateTotalPrice() {
    return this.baskets.map(basket => basket.price * basket.amount).reduce((a, b) => a + b);
  }

  checkout() {

  }
}
