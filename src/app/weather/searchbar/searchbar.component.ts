import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import {
  switchMap,
  startWith,
  distinctUntilChanged,
  debounceTime,
  filter,
  map,
} from 'rxjs/operators';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  constructor(private readonly weatherService: WeatherService) {}

  myControl = new FormControl();
  options: Observable<any[]>;
  selectedPlace: object;
  displayWith = (value) => value?.name;

  ngOnInit(): void {
    this.options = this.myControl.valueChanges.pipe(
      startWith(this.myControl.value),
      filter((value) => value?.length >= 3),
      distinctUntilChanged(),
      debounceTime(200),
      // move to service
      switchMap((value) => this.weatherService.searchPlaces(value)),
      map((data: any) =>
        data.response.GeoObjectCollection.featureMember.map(
          (item) => item.GeoObject
        )
      )
    );
  }

  selectValue(event) {
    this.selectedPlace = event.option.value;
  }
}
