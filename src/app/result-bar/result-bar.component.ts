import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEYS } from '../../shared/api-keys';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result-bar',
  templateUrl: './result-bar.component.html',
  styleUrls: ['./result-bar.component.scss']
})
export class ResultBarComponent implements OnInit {
  @Input() place: object;
  placeCoords = this.place?.Point.pos.split(' '); //pos: string '32.123 23.321' to ['32.123', '23.321']
  placeSubscription: Subscription;
  places = [];
  weatherPlace;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.placeCoords = this.place;
    // if (this.placeCoords) {
    //   const request$ = this.http.get(`${API_KEYS}.weatherUrl?lat=${this.placeCoords[0]}&lon=${this.placeCoords[1]}&units=metric&appid=${API_KEYS.weatherKey}`);
    //   this.placeSubscription = request$.subscribe( place => this.weatherPlace = place);
    // }
  }

  ngOnDestroy(): void {
    this.placeSubscription.unsubscribe();
  }

  log(): void {
    console.log(this.placeCoords);
  }
}
