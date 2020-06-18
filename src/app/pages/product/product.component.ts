import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from '../../services/product.service';
import {Brand} from '../brand/brand.component';
import {Category} from '../category/category.component';

export interface Product {
    position: number;
    id: number;
    code: [''];
    name: [''];
    brand: Brand;
    imgUrl: [''];
    price: number;
    category1: Category;
    category2: Category;
    category3: Category;
    collection: [''];
    description: [''];
    status: [''];
    productColors: any;
    isColorsOptional: boolean;
    stocks: Array<any>;
    sizes: Array<any>;
    isSizesOptional: boolean;
    feature: [''];
    tags: [''];
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
        'position',
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
    private editMode: boolean = false;
    private editElement: any;

    constructor(
        private fb: FormBuilder,
        private service: ProductService,
    ) {
    }

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
        status: ['', Validators.required],
        productColors: [null, Validators.required],
        isColorsOptional: [false],
        stocks: [[]],
        sizes: [[]],
        isSizesOptional: [false],
        feature: [''],
        tags: [''],
    });
    filterValue: string;

    ngOnInit() {
        this.service.getAll(results => {
            for (let i = 0; i < results.length; i ++) {
                results[i].position = i;
                this.data.push(results[i]);
            }
            this.dataSource.data = this.data;
        });
    }

    onAddNewBrand() {
        if ( this.productForm.valid ) {
            if ( this.editMode ) {
                this.service.put(this.productForm.value, result => {
                    if ( result ) {
                        this.editElement.name = result.name;
                        this.editElement.imgUrl = result.imgUrl;
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
        this.productForm = this.fb.group({
            id: [element.id],
            name: [element.name, Validators.required],
            brand: [element.brand, Validators.required],
            imgUrl: [element.imgUrl, Validators.required],
            price: [element.price, Validators.required],
            category1: [element.category1, Validators.required],
            category2: [element.category2, Validators.required],
            category3: [element.category3, Validators.required],
            collection: [element.collection],
            description: [element.description],
            status: [element.status, Validators.required],
            productColors: [element.productColors, Validators.required],
            isColorsOptional: [element.isColorsOptional],
            stocks: [element.stocks],
            sizes: [element.sizes],
            isSizesOptional: [element.isSizesOptional],
            feature: [element.feature],
            tags: [element.tags],
        });
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
            status: ['', Validators.required],
            productColors: [null, Validators.required],
            isColorsOptional: [false],
            stocks: [[]],
            sizes: [[]],
            isSizesOptional: [false],
            feature: [''],
            tags: [''],
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
