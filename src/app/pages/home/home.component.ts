import { Component, OnInit } from '@angular/core';
import {ProductModelService} from '../../services/product-model.service';
import {LimitedEditionService} from '../../services/limited-edition';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productModels: any = [];

  constructor(
      private limitedEditionService: LimitedEditionService,
  ) { }

  ngOnInit() {
    this.limitedEditionService.getAll(productModels => this.productModels = productModels.slice(0, 3));
  }
}
