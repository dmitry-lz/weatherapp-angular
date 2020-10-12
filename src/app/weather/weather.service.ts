import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly http: HttpClient) {}

  public searchPlaces(geocode: string): Observable<any[]> {
    return this.http.get<any[]>(environment.api_keys.geoUrl, {
      params: { geocode, apikey: environment.api_keys.geoKey, format: 'json' },
    });
  }
}
