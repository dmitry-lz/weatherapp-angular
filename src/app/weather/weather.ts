export interface GeocoderResponseMetaData {
  request: string;
  results: string;
  found: string;
}

export interface MetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

export interface Component {
  kind: string;
  name: string;
}

export interface Address {
  country_code: string;
  formatted: string;
  Components: Component[];
}

export interface Thoroughfare {
  ThoroughfareName: string;
}

export interface Locality {
  LocalityName: string;
  Thoroughfare: Thoroughfare;
}

export interface SubAdministrativeArea {
  SubAdministrativeAreaName: string;
  Locality: Locality;
}

export interface Thoroughfare2 {
  ThoroughfareName: string;
}

export interface Premise {
  PremiseName: string;
}

export interface DependentLocality {
  DependentLocalityName: string;
}

export interface Locality2 {
  LocalityName: string;
  Thoroughfare: Thoroughfare2;
  Premise: Premise;
  DependentLocality: DependentLocality;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  SubAdministrativeArea: SubAdministrativeArea;
  Locality: Locality2;
}

export interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

export interface AddressDetails {
  Country: Country;
}

export interface GeocoderMetaData {
  precision: string;
  text: string;
  kind: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

export interface MetaDataProperty2 {
  GeocoderMetaData: GeocoderMetaData;
}

export interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}

export interface BoundedBy {
  Envelope: Envelope;
}

export interface Point {
  pos: string;
}

export interface GeoObject {
  metaDataProperty: MetaDataProperty2;
  name: string;
  description: string;
  boundedBy: BoundedBy;
  Point: Point;
}

export interface FeatureMember {
  GeoObject: GeoObject;
}

export interface GeoObjectCollection {
  metaDataProperty: MetaDataProperty;
  featureMember: FeatureMember[];
}

export interface PlacesResponse {
  GeoObjectCollection: GeoObjectCollection;
}

export interface GetPlacesResponse {
  response: PlacesResponse;
}

export type PositionCoords = [string, string];

export interface Coords {
  lon: string;
  lat: string;
}

export interface CoordsWeather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: Hourly[];
  daily: Daily[];
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather {
  id: number;
  main: Main;
  description: Description;
  icon: Icon;
}

export enum Description {
  Дождь = 'дождь',
  НебольшаяОблачность = 'небольшая облачность',
  НебольшойДождь = 'небольшой дождь',
  ОблачноСПрояснениями = 'облачно с прояснениями',
  Пасмурно = 'пасмурно',
  ПеременнаяОблачность = 'переменная облачность',
  Ясно = 'ясно',
}

export enum Icon {
  The01N = '01n',
  The02N = '02n',
  The03N = '03n',
  The04D = '04d',
  The04N = '04n',
  The10D = '10d',
  The10N = '10n',
}

export enum Main {
  Clear = 'Clear',
  Clouds = 'Clouds',
  Rain = 'Rain',
}

export interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  pop: number;
  rain?: Rain;
}

export interface Rain {
  '1h': number;
}
