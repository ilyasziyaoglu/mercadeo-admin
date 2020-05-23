import {Component, Input, OnInit} from '@angular/core';
import {MyFavoritesService} from '../../../services/my-favorites.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() productModel;
  @Input() category;

  constructor(
      private myFavoritesService: MyFavoritesService,
  ) { }

  ngOnInit() {
  }

  onToggleFavorite() {
    this.myFavoritesService.toggle(this.productModel);
  }

  getHeartIcon() {
    const inFavorites = this.myFavoritesService.includes(this.productModel);
    return inFavorites ? 'heart' : 'heart-outline';
  }

}
