import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BrandService} from '../../services/brand.service';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../user/user.component';
import {OrderService} from '../../services/order.service';

export interface Order {
    position: number;
    id: number;
    user: User;
    buyerNote: string;
    status: string;
    history: string;
    shippingInfo: string;
    reason: string;
    receiverName: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverAddress: string;
    orderProducts: Array<OrderProduct>;
}

export interface OrderProduct {
    id: number;
    order: Order;
    productId: number;
    colorIds: Array<number>;
    sizeIds: Array<number>;
}

@Component({
    selector: 'ngx-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

    data: Array<Order> = [];
    displayedColumns: string[] = [
        'select',
        'operations',
        'id',
        'user',
        'buyerNote',
        'status',
        'history',
        'shippingInfo',
        'reason',
        'receiverName',
        'receiverPhone',
        'receiverEmail',
        'receiverAddress',
        'orderProducts',
    ];
    dataSource = new MatTableDataSource<Order>(this.data);
    selection = new SelectionModel<Order>(true, []);
    editMode: boolean = false;


    constructor(
        private fb: FormBuilder,
        private service: OrderService,
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
    checkboxLabel(row?: Order): string {
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

    mapper(obj1, obj2) {
        const keys = Object.keys(obj2);
        keys.forEach(key => {
            obj1[key] = obj2[key];
        });
        return obj1;
    }

    onEditItem(element: any) {
        this.editMode = true;
        const editElement = this.dataSource.data.find(item => item.id === element.id);
        this.mapper(editElement, element);
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
