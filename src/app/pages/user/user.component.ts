import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BrandService} from '../../services/brand.service';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../services/user.service';

export interface User {
    position: number;
    id: number;
    username: string;
    imageUrl: string;
    fullName: string;
    status: string;
    email: string;
    gender: string;
    birthdate: string;
    country: string;
    phone: string;
    addresses: string;
    roles: string;
}

@Component({
    selector: 'ngx-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

    data: Array<User> = [];
    displayedColumns: string[] = [
        'select',
        'operations',
        'id',
        'username',
        'imageUrl',
        'fullName',
        'status',
        'email',
        'phone',
        'gender',
        'birthdate',
        'country',
        'roles',
        'addresses',
    ];
    dataSource = new MatTableDataSource<User>(this.data);
    selection = new SelectionModel<User>(true, []);
    private infoElement: any;

    constructor(
        private service: UserService,
    ) {
    }

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
    checkboxLabel(row?: User): string {
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

    onClickInfo(element: any) {
        this.infoElement = element;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
