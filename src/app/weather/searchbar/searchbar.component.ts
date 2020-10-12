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
import { GeoObject, WeatherResponse } from '../weather';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface ResultItem {
  place: GeoObject;
  weather: WeatherResponse;
}

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  constructor(private readonly weatherService: WeatherService) {}

  public options: Observable<GeoObject[]>;
  public searchControl = new FormControl();
  public selectedPlace = new Subject<GeoObject>();

  public weatherItems: Observable<ResultItem[]> = this.selectedPlace.pipe(
    switchMap((place) => this.weatherService.getWeatherByPlace(place)),
    scan((items, resultItem) => [...items, resultItem], [])
  );

  public displayWith = (value: GeoObject) => value?.name;

  public ngOnInit(): void {
    this.options = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      filter((value) => value?.length >= 3),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap((value) => this.weatherService.searchPlaces(value))
    );
  }

  public selectValue(event: MatAutocompleteSelectedEvent): void {
    const place: GeoObject = event.option.value;

    this.selectedPlace.next(place);
  }
}
