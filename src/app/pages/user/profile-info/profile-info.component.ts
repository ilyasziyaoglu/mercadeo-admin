import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {

  @Input() user;
  addresses: any = [];

  constructor() { }

  ngOnInit() {
    this.addresses = JSON.parse(this.user.addresses) || [{name: '', value: ''}];
  }

  onAddressChange() {
    setTimeout(() => {
      this.user.addresses = JSON.stringify(this.addresses);
    }, 500);
  }

  addNewAddress() {
    this.addresses.push({
      name: '',
      value: '',
    });
  }

  updateProfile() {

  }

  deleteAddress(i: number) {
    this.addresses.splice(i, 1);
    this.onAddressChange();
  }
}
