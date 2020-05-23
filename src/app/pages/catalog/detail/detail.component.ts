import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {MyFavoritesService} from '../../../services/my-favorites.service';
import {BasketService} from '../../../services/basket.service';
import {NbToastrService} from '@nebular/theme';

@Component({
    selector: 'ngx-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    private product: any;
    features: any = ['Iyi', 'Mukemmel', 'Harika'];
    private productModel: any;
    private productOption: any;
    private basketButtonContent: any;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private myFavoritesService: MyFavoritesService,
        private basketService: BasketService,
        private toastrService: NbToastrService,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.productService.get(parseInt(params.get('productId'), 10), result => {
                this.product = result;
                const defaultModelId = parseInt(params.get('id'), 10);
                this.productModel = this.product.productModels.find(model => model.id === defaultModelId);
                this.sortProductOptions(this.productModel.productOptions);
                this.productOption = this.productModel.productOptions.find(option => option.productSize === 'S');
                const inBaskets = this.basketService.includes(this.productOption);
                this.basketButtonContent = inBaskets ?
                    {title: 'Remove From Basket', icon: 'fas fa-cart-arrow-down'} :
                    {title: 'Add To Basket', icon: 'fas fas fa-cart-plus'};
            });
        });
    }

    onAddToBasket() {
        const basket = {...this.productOption};
        basket.productModel = {...this.productModel};
        basket.product = {...this.product};
        this.basketService.add(basket);
        const inBaskets = this.basketService.includes(basket);
        const message = inBaskets ? 'Product added to cart' : 'The product could not be added to the cart!';
        const status = inBaskets ? 'success' : 'danger';
        this.showToast('top-right', message, status);
    }

    showToast(position, message, status?) {
        this.toastrService.show(
            status || 'success',
            message,
            {position, status});
    }

    onToggleFavorite() {
        this.myFavoritesService.toggle(this.productModel);
    }

    getHeartIcon() {
        const inFavorites = this.myFavoritesService.includes(this.productModel);
        return inFavorites ? 'heart' : 'heart-outline';
    }

    sortProductOptions(productOptions) {
        productOptions.sort((a, b) => {
            return (a.productSize < b.productSize) ? 1 : (a.productSize === b.productSize) ? 0 : - 1;
        });
        productOptions
            .map(po => {
                po.amount = 1;
                return po;
            });
    }

    onChangeModel(model: any) {
        this.sortProductOptions(model.productOptions);
        this.productOption = model.productOptions[0];
        this.productModel = model;
    }
}
