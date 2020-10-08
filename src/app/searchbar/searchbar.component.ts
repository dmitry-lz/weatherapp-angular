import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  myControl = new FormControl(); //dont really know how to name it
  // options: string[] = ['One', 'Two', 'Three'];
  options;
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
    map(data => data.response.GeoObjectCollection.featureMember.map(item => item.GeoObject))
  );

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    console.log(this.data);
    
  }
  

}
