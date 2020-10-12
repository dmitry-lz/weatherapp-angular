import { ApiKeys } from './api-keys';

export const environment = {
  production: true,
  api_keys: {
    geoKey: '0aa5a112-1461-4070-ae3d-31b73d94583c',
    geoUrl: 'https://geocode-maps.yandex.ru/1.x/',
    weatherKey: '09e9879c47b2100b6e33141332699804',
    weatherUrl: 'https://api.openweathermap.org/data/2.5/weather',
  } as ApiKeys,
};
