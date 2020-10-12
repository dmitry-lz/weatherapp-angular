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
