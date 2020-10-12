import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  switchMap,
  startWith,
  distinctUntilChanged,
  debounceTime,
  filter,
} from 'rxjs/operators';

import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';
import { GeoObject, WeatherResponse } from '../weather';
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
  selectedPlace: GeoObject;
  selectedWeather: Observable<WeatherResponse>;

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

    this.selectedPlace = place;
    this.selectedWeather = this.weatherService.getWeatherByPoint(place.Point);
  }
}
