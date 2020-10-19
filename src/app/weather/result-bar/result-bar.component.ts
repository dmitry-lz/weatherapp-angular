import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeoObject, WeatherResponse } from '../weather';
import Swiper, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-result-bar',
  templateUrl: './result-bar.component.html',
  styleUrls: ['./result-bar.component.scss'],
})
export class ResultBarComponent implements OnInit {
  @Input() place: GeoObject;
  @Input() weather: WeatherResponse;
  config: SwiperOptions = {
    loop: false,
    slidesPerView: 4,
    slidesPerGroup: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      425: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
    },
    on: {
      paginationUpdate: (swiper: Swiper, paginationEl: HTMLElement): void => {
        console.log(swiper.activeIndex);
        this.changeURL(swiper.activeIndex);
      },
    },
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  changeURL(slideId) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: { slideId },
    });
  }

  ngOnInit(): void {}
}
