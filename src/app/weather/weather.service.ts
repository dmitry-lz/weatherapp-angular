import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  GeoObject,
  GetPlacesResponse,
  Point,
  PositionCoords,
  ResultItem,
  WeatherResponse,
} from './weather';

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

  public getWeatherByPoint(point: Point): Observable<WeatherResponse> {
    const coords = point.pos.split(' ') as PositionCoords;

    return this.http.get<WeatherResponse>(environment.api_keys.weatherUrl, {
      params: {
        lon: coords[0],
        lat: coords[1],
        units: 'metirc',
        lang: 'ru',
        appid: environment.api_keys.weatherKey,
      },
    });
  }

  public getWeatherByPlace(place: GeoObject): Observable<ResultItem> {
    const coords = place.Point.pos.split(' ') as PositionCoords;

    return this.http
      .get<WeatherResponse>(environment.api_keys.weatherUrl, {
        params: {
          lon: coords[0],
          lat: coords[1],
          units: 'metric',
          lang: 'ru',
          exclude: 'current,minutely,alerts',
          appid: environment.api_keys.weatherKey,
        },
      })
      .pipe(map((weather) => ({ weather, place })));
  }
}
