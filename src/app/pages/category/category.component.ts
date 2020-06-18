import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {CategoryService} from '../../services/category.service';

export interface Category {
    position: number;
    id: number;
    name: string;
    status: string;
    level: number;
    order: number;
    imgUrl: string;
    parent1: Category;
    parent2: Category;
}

@Component({
    selector: 'ngx-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

    data: Array<Category> = [];
    displayedColumns: string[] = [
        'select',
        'operations',
        'position',
        'id',
        'name',
        'status',
        'imgUrl',
        'level',
        'order',
        'parent1',
        'parent2',
    ];
    dataSource = new MatTableDataSource<Category>(this.data);
    selection = new SelectionModel<Category>(true, []);
    private editMode: boolean = false;
    private editElement: any;
    private parent1: number;
    private parent2: number;

    constructor(
        private fb: FormBuilder,
        private service: CategoryService,
    ) {
    }

    categoryForm = this.fb.group({
        name: ['', Validators.required],
        level: [null, Validators.required],
        order: [null, Validators.required],
        imgUrl: [''],
        parent1: [null],
        parent2: [null],
        status: ['ACTIVE', Validators.required],
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
        if ( this.categoryForm.valid ) {
            if ( this.editMode ) {
                this.service.put(this.categoryForm.value, result => {
                    if ( result ) {
                        this.editElement.name = result.name;
                        this.editElement.logoImgUrl = result.logoImgUrl;
                        this.editElement.status = result.status;
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
                this.service.post(this.categoryForm.value, result => {
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
            this.categoryForm.markAllAsTouched();
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
    checkboxLabel(row?: Category): string {
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
                this.categoryForm.reset();
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

    onEditItem(element: Category) {
        this.editMode = true;
        this.editElement = element;
        this.categoryForm = this.fb.group({
            id: [element.id, Validators.required],
            name: [element.name, Validators.required],
            level: [element.level, Validators.required],
            order: [element.order, Validators.required],
            imgUrl: [element.imgUrl],
            parent1: [element.parent1],
            parent2: [element.parent2],
            status: [element.status, Validators.required],
        });
    }

    resetForm() {
        this.categoryForm = this.fb.group({
            id: [null],
            name: ['', Validators.required],
            level: [null, Validators.required],
            order: [null, Validators.required],
            imgUrl: [''],
            parent1: [null],
            parent2: [null],
            status: ['ACTIVE', Validators.required],
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getCategoriesByLevel(level: number) {
        if ( level === 1 ) {
            return this.data.filter(c => c.level === 1);
        }
        if ( level === 2 && this.categoryForm.controls.parent1.value ) {
            const levels2 = this.data.filter(c => c.level === 2
                && c.parent1 &&
                c.parent1.id === this.categoryForm.controls.parent1.value);
            return levels2;
        }
    }

    onParent1Change() {
        // this.parent1 = this.data.filter(c => c.id === this.parent1);
    }

    onParent2Change() {

    }
}
