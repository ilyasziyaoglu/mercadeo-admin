import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductModelService} from '../../../services/product-model.service';

@Component({
    selector: 'ngx-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

    @Output() onFilter = new EventEmitter();

    colors: any = [];
    selectedColors: any = [];
    filter = {minPrice: null, maxPrice: null, categories: [], colors: []};

    constructor(
        private productModelService: ProductModelService,
    ) {
    }

    ngOnInit() {
        this.productModelService.getColorList(colors => {
            this.colors = colors;
        });
    }

    onFilterEvent() {
        this.filter.colors = this.selectedColors.map(c => c.colorCode);
        this.onFilter.emit(this.filter);
    }

    onColorSelect(color: any) {
        if (this.colorIncludes(color)) {
            this.deleteColor(color);
        } else {
            this.selectedColors.push(color);
        }
    }

    colorIncludes(color) {
        return this.selectedColors.find(c => c.colorCode === color.colorCode);
    }

    deleteColor(color) {
        const index = this.selectedColors.findIndex(c => c.colorCode === color.colorCode);
        this.selectedColors.splice(index, 1);
    }
}
