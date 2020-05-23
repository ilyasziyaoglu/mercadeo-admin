import { Component, OnInit } from '@angular/core';
import {JewelryService} from '../../services/jewelry';

@Component({
  selector: 'ngx-jewelry',
  templateUrl: './jewelry.component.html',
  styleUrls: ['./jewelry.component.scss'],
})
export class JewelryComponent implements OnInit {

  constructor(
      private service: JewelryService,
  ) { }

  ngOnInit() {
  }

}
