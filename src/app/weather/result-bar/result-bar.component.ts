import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swiper, { SwiperOptions } from 'swiper';
import { CoordsWeather } from '../weather';

@Component({
  selector: 'app-result-bar',
  templateUrl: './result-bar.component.html',
  styleUrls: ['./result-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultBarComponent implements OnInit {
  @Input() result: CoordsWeather;

  config: SwiperOptions = {
    // initialSlide: this.getInitialSlide(),
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
      paginationUpdate: (swiper: Swiper): void => {
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

  private getInitialSlide(): number {
    return parseInt(this.route.snapshot.queryParamMap.get('slideId'), 10) ?? 0;
  }
}
