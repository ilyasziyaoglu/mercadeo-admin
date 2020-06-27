import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'ngx-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {


  MENU_ITEMS: NbMenuItem[] = [
    {
      title: 'Product',
      link: '/pages/product',
      home: true,
      children: [
        {
          title: 'Filter',
          link: '/pages/product/filter',
        },
        {
          title: 'Create',
          link: '/pages/product/create',
        },
        {
          title: 'Update',
          link: '/pages/product/update',
        },
      ],
    },
    {
      title: 'Brand',
      link: '/pages/brand',
      children: [
        {
          title: 'Filter',
          link: '/pages/brand/filter',
        },
        {
          title: 'Create',
          link: '/pages/brand/create',
        },
        {
          title: 'Update',
          link: '/pages/brand/update',
        },
      ],
    },
    {
      title: 'Category',
      link: '/pages/category',
      children: [
        {
          title: 'Filter',
          link: '/pages/category/filter',
        },
        {
          title: 'Create',
          link: '/pages/category/create',
        },
        {
          title: 'Update',
          link: '/pages/category/update',
        },
      ],
    },
    {
      title: 'Colors',
      link: '/pages/color',
      children: [
        {
          title: 'Filter',
          link: '/pages/colors/filter',
        },
        {
          title: 'Create',
          link: '/pages/colors/create',
        },
        {
          title: 'Update',
          link: '/pages/colors/update',
        },
      ],
    },
    {
      title: 'Order',
      link: '/pages/order',
      children: [
        {
          title: 'Filter',
          link: '/pages/order/filter',
        },
        {
          title: 'Create',
          link: '/pages/order/create',
        },
        {
          title: 'Update',
          link: '/pages/order/update',
        },
      ],
    },
    {
      title: 'Size',
      link: '/pages/size',
      children: [
        {
          title: 'Filter',
          link: '/pages/size/filter',
        },
        {
          title: 'Create',
          link: '/pages/size/create',
        },
        {
          title: 'Update',
          link: '/pages/size/update',
        },
      ],
    },
    {
      title: 'User',
      link: '/pages/user',
      children: [
        {
          title: 'Filter',
          link: '/pages/user/filter',
        },
        {
          title: 'Create',
          link: '/pages/user/create',
        },
        {
          title: 'Update',
          link: '/pages/user/update',
        },
      ],
    },
    {
      title: 'Property',
      link: '/pages/property',
      children: [
        {
          title: 'Filter',
          link: '/pages/property/filter',
        },
        {
          title: 'Create',
          link: '/pages/property/create',
        },
        {
          title: 'Update',
          link: '/pages/property/update',
        },
      ],
    },
  ];
  selectedItem: NbMenuItem;
  selectedSubItem: NbMenuItem;

  constructor() { }

  ngOnInit() {
  }

}
