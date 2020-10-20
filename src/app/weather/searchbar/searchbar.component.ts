import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  switchMap,
  startWith,
  distinctUntilChanged,
  debounceTime,
  filter,
  map,
  tap,
  shareReplay,
} from 'rxjs/operators';

import { Observable, Subject } from 'rxjs';
import { WeatherService } from '../weather.service';
import { GeoObject, Coords, CoordsWeather } from '../weather';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  myControl = new FormControl();
  options: Observable<GeoObject[]>;
  selectedPlace = new Subject<GeoObject>();
  weatherItem: Observable<CoordsWeather> = this.selectedPlace.pipe(
    map((place) => this.coordsOfPlace(place)),
    startWith(this.initialCoords()),
    filter((coords) => this.filterCoords(coords)),
    tap((coords) => this.writeCoords(coords)),
    switchMap((coords) => this.weatherService.getCoordsWeather(coords)),
    shareReplay(1)
  );

  displayWith = (value: GeoObject) => value?.name;

  private filterCoords(coords: Coords): boolean {
    console.log('filterCoords %o', coords);

    return Boolean(coords?.lat) && Boolean(coords?.lon);
  }

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

  private initialCoords(): Coords {
    const params = this.route.snapshot.queryParamMap;

    return { lat: params.get('lat'), lon: params.get('lon') };
  }

  private coordsOfPlace(place: GeoObject): Coords {
    if (!place) {
      return null;
    }

    const [lon, lat] = place.Point.pos.split(' ');

    return { lat, lon };
  }

  private writeCoords(coords: Coords): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: coords,
      queryParamsHandling: 'merge',
    });
  }
}
