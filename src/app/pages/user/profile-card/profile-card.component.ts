import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
