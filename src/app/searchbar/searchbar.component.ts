import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { API_KEYS } from '../../shared/api-keys';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  myControl = new FormControl(); //dont really know how to name it
  options: string[] = ['One', 'Two', 'Three'];
  data;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onKeyUp() {
    if (this.myControl.value.length >= 3) {
      const URL: string = `${API_KEYS.geoUrl}?geocode=${this.myControl.value}&apikey=${API_KEYS.geoKey}`;
      this.http.get(URL).subscribe(data => this.data = data); //КАК ЭТО РАБОТАЕТ? 
      console.log(this.data);



    }

  }

}
