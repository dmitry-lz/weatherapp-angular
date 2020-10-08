interface ApiKeys {
  geoKey: string,
  geoUrl: string,
  weatherKey?: string,
  weatherUrl?: string
}

export const API_KEYS: ApiKeys = {
  geoKey: '0aa5a112-1461-4070-ae3d-31b73d94583c',
  geoUrl: 'https://geocode-maps.yandex.ru/1.x/'
}
