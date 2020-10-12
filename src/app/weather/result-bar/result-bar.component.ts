import { Component, Input, OnInit } from '@angular/core';
import { GeoObject } from '../weather';

@Component({
  selector: 'app-result-bar',
  templateUrl: './result-bar.component.html',
  styleUrls: ['./result-bar.component.scss'],
})
export class ResultBarComponent implements OnInit {
  @Input() place: GeoObject;

  ngOnInit(): void {}

  log(): void {
    console.log(this.place);
  }
}
