import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BrandService} from '../../services/brand.service';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';

export interface Brand {
    position: number;
    id: number;
    name: string;
    logoImgUrl: string;
    status: string;
}

@Component({
    selector: 'ngx-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {

    data: Array<Brand> = [];
    displayedColumns: string[] = ['select', 'operations', 'position', 'id', 'name', 'status', 'logoImgUrl'];
    dataSource = new MatTableDataSource<Brand>(this.data);
    selection = new SelectionModel<Brand>(true, []);
    private editMode: boolean = false;
    private editElement: any;

    constructor(
        private fb: FormBuilder,
        private service: BrandService,
    ) {
    }

    brandForm = this.fb.group({
        name: ['', Validators.required],
        logoImgUrl: [''],
        status: ['ACTIVE'],
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
        if ( this.brandForm.valid ) {
            if ( this.editMode ) {
                this.service.put(this.brandForm.value, result => {
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
                this.service.post(this.brandForm.value, result => {
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
            this.brandForm.markAllAsTouched();
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
    checkboxLabel(row?: Brand): string {
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
                this.brandForm.reset();
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
        this.brandForm = this.fb.group({
            id: [element.id],
            name: [element.name, Validators.required],
            logoImgUrl: [element.logoImgUrl],
            status: [element.status],
        });
    }

    resetForm() {
        this.brandForm = this.fb.group({
            id: [null],
            name: ['', Validators.required],
            logoImgUrl: [''],
            status: ['ACTIVE'],
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
