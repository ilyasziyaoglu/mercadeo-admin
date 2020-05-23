import { Component, OnInit } from '@angular/core';
import {LimitedEditionService} from '../../services/limited-edition';

@Component({
  selector: 'ngx-limited-edition',
  templateUrl: './limited-edition.component.html',
  styleUrls: ['./limited-edition.component.scss'],
})
export class LimitedEditionComponent implements OnInit {

  constructor(
      private service: LimitedEditionService,
  ) { }

  ngOnInit() {
  }

}
