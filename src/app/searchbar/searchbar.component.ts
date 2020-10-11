import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {
  switchMap,
  startWith,
  withLatestFrom,
  distinctUntilChanged,
  debounceTime,
  filter,
  map
} from 'rxjs/operators';

import { API_KEYS } from '../../shared/api-keys';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  myControl = new FormControl(); 
  displayWith = (value) => value?.name;
  options = [];
  optionSubscription: Subscription;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const options$ = this.myControl.valueChanges.pipe(
      startWith(this.myControl.value),
      filter((value) => value?.length >= 3),
      distinctUntilChanged(),
      debounceTime(200),
      // move to service
      switchMap((value) =>
        this.http.get(
          `${API_KEYS.geoUrl}?geocode=${value}&apikey=${API_KEYS.geoKey}&format=json`
        )
      ),
      map( (data: any ) => data.response.GeoObjectCollection.featureMember.map(item => item.GeoObject))
    );

    this.optionSubscription = options$.subscribe( options => this.options = options );
  }

  ngOnDestroy(): void {
    this.optionSubscription.unsubscribe();
  }

  selectValue(event) {
    console.log(event.option);
    
  }
  

}
