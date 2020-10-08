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


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  // @Output()optionSelected: EventEmitter<MatAutocompleteSelectedEvent>;

  myControl = new FormControl(); 
//i dont really know what happens from line 25 to line 34
  public data = this.myControl.valueChanges.pipe(
    startWith(this.myControl.value),
    filter((value) => value?.length >= 3),
    distinctUntilChanged(),
    debounceTime(200),
    switchMap((value) =>
      this.http.get(
        `${API_KEYS.geoUrl}?geocode=${value}&apikey=${API_KEYS.geoKey}&format=json`
      )
    ),
    map( (data: any ) => data.response.GeoObjectCollection.featureMember.map(item => item.GeoObject))
  );

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  selectValue(event) {
    console.log(event.option._mostRecentViewValue);
    
  }
  

}
