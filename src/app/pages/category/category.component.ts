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
    parent: Category;
    children: Array<Category>;
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
    editMode: boolean = false;
    private editElement: any;
    private parent1: number;
    private parent2: number;
    categoryTree: Array<Category> = [];
    flevelCategory: Category;
    slevelCategory: Category;
    tlevelCategory: Category;

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
        parent: [null],
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

        this.service.getCategoryTree(results => this.categoryTree = results);
    }

    onAddNewBrand() {
        if ( this.categoryForm.valid ) {
            const formValue = Object.assign({}, this.categoryForm.value);
            formValue.parent = this.slevelCategory ? this.slevelCategory : this.flevelCategory;
            if ( this.editMode ) {
                this.service.put(formValue, result => {
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
                this.service.post(formValue, result => {
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
            parent: [element.parent],
            status: [element.status, Validators.required],
        });
        let flevelid;
        let slevelid;
        if (element.level === 3) {
            flevelid = element.parent.parent.id;
            slevelid = element.parent.id;
        } else if ( element.level === 2) {
            flevelid = element.parent.id;
        }

        if ( flevelid ) {
            this.flevelCategory = this.categoryTree.find(value => value.id === flevelid);
        }
        if ( slevelid ) {
            this.slevelCategory = this.flevelCategory.children.find(value => value.id === slevelid);
        }
    }

    resetForm() {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            level: [null, Validators.required],
            order: [null, Validators.required],
            imgUrl: [''],
            parent: [null],
            status: ['ACTIVE', Validators.required],
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
