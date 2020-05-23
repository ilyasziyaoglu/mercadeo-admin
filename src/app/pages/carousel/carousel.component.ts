import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {

  carouselItems: any = [
    {
      src: 'https://cdn.gomoxie.com/wp-content/uploads/2016/06/email-banner-1920x500-2.jpg',
      name: 'Aaaaa',
    },
    {
      src: 'https://cdn.gomoxie.com/wp-content/uploads/2016/06/email-banner-1920x500-1-1.jpg',
      name: 'Bbbbb',
    },
    {
      src: 'https://cdn.gomoxie.com/wp-content/uploads/blog-banner-1920x500.jpg',
      name: 'Ccccc',
    },
    {
      src: 'https://cdn.gomoxie.com/wp-content/uploads/2016/07/ci-wss-banner-1920x500-v2.jpg',
      name: 'Ddddd',
    },
    {
      src: 'https://cdn.gomoxie.com/wp-content/uploads/2016/06/email-banner-1920x500-v5-2.jpg',
      name: 'Eeeee',
    },
  ];

  currentCarouselItem: any = this.carouselItems[0];

  constructor() { }

  ngOnInit() {
    let carouselItemIndex = 1;
    setInterval(() => {
      this.currentCarouselItem = this.carouselItems[carouselItemIndex];
      if (carouselItemIndex === 4) {
        carouselItemIndex = 0;
      } else {
        carouselItemIndex++;
      }
    }, 3000);
  }

}
