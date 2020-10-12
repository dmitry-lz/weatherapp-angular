import { Component, Input, OnInit } from '@angular/core';
import { GeoObject, WeatherResponse } from '../weather';

@Component({
  selector: 'app-result-bar',
  templateUrl: './result-bar.component.html',
  styleUrls: ['./result-bar.component.scss'],
})
export class ResultBarComponent implements OnInit {
  @Input() place: GeoObject;
  @Input() weather: WeatherResponse;

  ngOnInit(): void {}

  log(): void {
    console.log(this.place);
  }
}
