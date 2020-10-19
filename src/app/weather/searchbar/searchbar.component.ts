import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  switchMap,
  startWith,
  distinctUntilChanged,
  debounceTime,
  filter,
  scan,
} from 'rxjs/operators';

import { Observable, Subject } from 'rxjs';
import { WeatherService } from '../weather.service';
import { GeoObject, WeatherResponse, ResultItem } from '../weather';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  constructor(private readonly weatherService: WeatherService) {}

  myControl = new FormControl();
  options: Observable<GeoObject[]>;
  selectedPlace = new Subject<GeoObject>();
  selectedWeather: Observable<WeatherResponse>;
  weatherItem: Observable<ResultItem> = this.selectedPlace.pipe(
    switchMap((place) => this.weatherService.getWeatherByPlace(place))
  );

  displayWith = (value: GeoObject) => value?.name;

  ngOnInit(): void {
    this.options = this.myControl.valueChanges.pipe(
      startWith(this.myControl.value),
      filter((value) => value?.length >= 3),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap((value) => this.weatherService.searchPlaces(value))
    );
  }

  selectValue(event: MatAutocompleteSelectedEvent): void {
    const place: GeoObject = event.option.value;

    this.selectedPlace.next(place);
  }
}
