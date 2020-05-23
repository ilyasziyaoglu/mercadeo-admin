import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-catalog-home',
    templateUrl: './catalog-home.component.html',
    styleUrls: ['./catalog-home.component.scss'],
})
export class CatalogHomeComponent implements OnInit {

    @Input() service: any;

    productModels: any = [];

    constructor() {
    }

    ngOnInit() {
        this.service.getAll(productModels => this.productModels = productModels);
    }

    onFilter(filter: any) {
        const pageReq = {
            filterDto: filter,
            page: 0,
            size: 100,
        };
        this.service.filter(pageReq, results => {
            this.productModels = results.data;
        });
    }
}
