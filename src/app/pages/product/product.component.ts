import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from '../../services/product.service';
import {Brand} from '../brand/brand.component';
import {Category} from '../category/category.component';
import {BrandService} from '../../services/brand.service';
import {CategoryService} from '../../services/category.service';
import {ColorService} from '../../services/color.service';
import {Color} from '../color/color.component';
import {Size} from '../size/size.component';
import {SizeService} from '../../services/size.service';
import {StockService} from '../../services/stock.service';

export interface Product {
    position: number;
    id: number;
    code: string;
    name: string;
    brand: Brand;
    imgUrl: string;
    price: number;
    category1: Category;
    category2: Category;
    category3: Category;
    collection: string;
    description: string;
    status: string;
    productColors: any;
    isColorsOptional: boolean;
    stocks: Array<any>;
    sizes: Array<any>;
    isSizesOptional: boolean;
    feature: string;
    tags: string;
}

@Component({
    selector: 'ngx-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

    data: Array<Product> = [];
    displayedColumns: string[] = [
        'select',
        'operations',
        // 'position',
        'id',
        'code',
        'name',
        'imgUrl',
        'brand',
        'price',
        'category1',
        'category2',
        'category3',
        'collection',
        'status',
        // 'description',
        // 'productColors',
        // 'isColorsOptional',
        // 'stocks',
        // 'sizes',
        // 'isSizesOptional',
        // 'feature',
        // 'tags',
    ];
    dataSource = new MatTableDataSource<Product>(this.data);
    selection = new SelectionModel<Product>(true, []);
    editMode: boolean = false;
    private editElement: any;

    productForm = this.fb.group({
        position: [null],
        id: [null],
        name: ['', Validators.required],
        brand: [null, Validators.required],
        imgUrl: ['', Validators.required],
        price: [null, Validators.required],
        category1: [null, Validators.required],
        category2: [null, Validators.required],
        category3: [null, Validators.required],
        collection: [''],
        description: [''],
        status: ['ACTIVE', Validators.required],
        productColors: [[]],
        isColorsOptional: [false],
        stocks: [[]],
        sizes: [[]],
        isSizesOptional: [false],
        features: [''],
        tags: [''],
    });
    filterValue: string;
    brands: Array<Brand>;
    categoryTree: Array<Category>;
    flevelCategory: Category;
    slevelCategory: Category;
    tlevelCategory: Category;
    colors: Array<Color>;
    sizes: Array<Size>;
    stockColor: Color;
    stockSize: Size;
    stockAmount: number;
    stocks: Array<any> = [];

    constructor(
        private fb: FormBuilder,
        private service: ProductService,
        private brandService: BrandService,
        private categoryService: CategoryService,
        private colorService: ColorService,
        private sizeService: SizeService,
    ) {
    }

    ngOnInit() {
        this.service.getAll(results => {
            this.data = results.map((product, i) => {
                product.position = i;
                return product;
            })
                .sort((a, b) => (a.id > b.id) ? 1 : - 1);
            this.dataSource.data = this.data;
        });
        this.brandService.getAll(results => this.brands = results);
        this.categoryService.getCategoryTree(results => this.categoryTree = results);
        this.colorService.getAll(results => this.colors = results);
        this.sizeService.getAll(results => this.sizes = results);
    }

    onAddNewItem() {
        if ( this.productForm.valid ) {
            if ( this.editMode ) {
                this.service.put(this.productForm.value, result => {
                    if ( result ) {
                        this.onEditItem(result);
                        Swal.fire({
                            title: 'Info',
                            icon: 'success',
                            text: 'Item saved successfully!',
                        });
                    } else {
                        Swal.fire({
                            title: 'Info',
                            icon: 'error',
                            text: 'Item can not save!',
                        });
                    }
                });
            } else {
                this.service.post(this.productForm.value, result => {
                    if ( result ) {
                        result.position = this.data.length;
                        this.data.push(result);
                        this.dataSource.data = this.data;
                        Swal.fire({
                            title: 'Info',
                            icon: 'success',
                            text: 'Item saved successfully!',
                        });
                    } else {
                        Swal.fire({
                            title: 'Info',
                            icon: 'error',
                            text: 'Item can not save!',
                        });
                    }
                });
            }
        } else {
            this.productForm.markAllAsTouched();
        }
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Product): string {
        if ( !row ) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    onDeleteItem(id: number) {
        this.service.delete(id, result => {
            if ( result ) {
                this.data = this.removeItem(id, this.data);
                this.dataSource.data = this.data;
                this.productForm.reset();
                Swal.fire({
                    title: 'Info',
                    icon: 'success',
                    text: 'Item deleted successfully!',
                });
            } else {
                Swal.fire({
                    title: 'Info',
                    icon: 'error',
                    text: 'Item can not delete!',
                });
            }
        });
    }

    removeItem(id, arr) {
        for (let i = 0; i < arr.length; i ++) {
            if ( id === arr[i].id ) {
                arr.splice(i, 1);
                return arr;
            }
        }
    }

    onDeleteSelecteds() {
        const ids = this.selection.selected.map(value => value.id);
        this.service.deleteAll(ids, result => {
            if ( result ) {
                this.selection.clear();
                ids.forEach(id => {
                    this.data = this.removeItem(id, this.data);
                });
                this.dataSource.data = this.data;
                Swal.fire({
                    title: 'Info',
                    icon: 'success',
                    text: 'Items deleted successfully!',
                });
            } else {
                Swal.fire({
                    title: 'Info',
                    icon: 'error',
                    text: 'Items can not delete!',
                });
            }
        });
    }

    onEditItem(element: any) {
        this.editMode = true;
        this.editElement = element;
        const sizeIds = element.sizes.map(value => value.id);
        element.productColors.forEach(pc => {
            pc.color = this.colors.find(color => pc.color.id === color.id);
        });
        this.stocks = element.stocks;
        this.productForm = this.fb.group({
            id: [element.id],
            name: [element.name, Validators.required],
            brand: [this.brands.find(b => b.id === element.brand.id), Validators.required],
            imgUrl: [element.imgUrl, Validators.required],
            price: [element.price, Validators.required],
            category1: [element.category1, Validators.required],
            category2: [element.category2, Validators.required],
            category3: [element.category3, Validators.required],
            collection: [element.collection],
            description: [element.description],
            status: [element.status, Validators.required],
            productColors: [element.productColors],
            isColorsOptional: [element.isColorsOptional],
            stocks: [this.stocks],
            sizes: [this.sizes.filter(value => sizeIds.includes(value.id))],
            isSizesOptional: [element.isSizesOptional],
            features: [element.feature],
            tags: [element.tags],
        });
        this.flevelCategory = this.categoryTree.find(value => value.id === element.category1.id);
        if ( this.flevelCategory ) {
            this.slevelCategory = this.flevelCategory.children.find(value => value.id === element.category2.id);
        }
        if ( this.slevelCategory ) {
            this.tlevelCategory = this.slevelCategory.children.find(value => value.id === element.category3.id);
        }
    }

    resetForm() {
        this.productForm = this.fb.group({
            position: [null],
            id: [null],
            name: ['', Validators.required],
            brand: [null, Validators.required],
            imgUrl: ['', Validators.required],
            price: [null, Validators.required],
            category1: [null, Validators.required],
            category2: [null, Validators.required],
            category3: [null, Validators.required],
            collection: [''],
            description: [''],
            status: ['ACTIVE', Validators.required],
            productColors: [[]],
            isColorsOptional: [false],
            stocks: [[]],
            sizes: [[]],
            isSizesOptional: [false],
            features: [''],
            tags: [''],
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onAddNewStock() {
        const stock = {
            color: this.stockColor,
            size: this.stockSize,
            stock: this.stockAmount,
        };

        const oldStock = this.stocks
            .find(value => value.color.id === stock.color.id && value.size.id === stock.size.id);

        if ( oldStock !== undefined ) {
            oldStock.stock = stock.stock;
        } else {
            this.stocks.push(stock);
        }
    }

    onSetAllStocks() {
        if ( this.productForm.controls.productColors && this.productForm.controls.sizes ) {
            this.stocks = [];
            this.productForm.controls.productColors.value.forEach(pc => {
                this.productForm.controls.sizes.value.forEach(size => {
                    const stock = {
                        color: pc.color,
                        size: size,
                        stock: this.stockAmount,
                    };
                    this.stocks.push(stock);
                });
            });
        }
    }

    onAddProductColor() {
        this.productForm.controls.productColors.value.push({
            color: this.colors[0],
            status: 'ACTIVE',
            imgUrl: '',
        });
    }

    onDeleteProductColor(productColor: any) {
        const index = this.productForm.controls.productColors.value.indexOf(productColor);
        this.productForm.controls.productColors.value.splice(index, 1);
    }
}
