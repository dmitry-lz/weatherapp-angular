import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GeoObject, GetPlacesResponse, Point, PositionCoords } from './weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly http: HttpClient) {}

  public searchPlaces(geocode: string): Observable<GeoObject[]> {
    return this.http
      .get<GetPlacesResponse>(environment.api_keys.geoUrl, {
        params: {
          geocode,
          apikey: environment.api_keys.geoKey,
          format: 'json',
        },
      })
      .pipe(
        map((placesResponse) =>
          placesResponse.response.GeoObjectCollection.featureMember.map(
            (member) => member.GeoObject
          )
        )
      );
  }

  public getWeatherByPoint(point: Point): Observable<any> {
    const coords = point.pos.split(' ') as PositionCoords;

    return this.http.get(environment.api_keys.weatherUrl, {
      params: {
        lat: coords[0],
        lon: coords[1],
        units: 'metirc',
        appid: environment.api_keys.weatherKey,
      },
    });
  }
}
