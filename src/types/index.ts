export interface Region {
  regionId: string;
  regionName: string;
}

export interface City {
  cityId: number;
  cityName: string;
}

export interface RegionWithCities extends Region {
  cities: City[];
}

export interface CityDetails {
  cityId: number;
  cityName: string;
  regionId: string | null;
  isAssigned: boolean;
}

export type SupportedLanguage = 'english' | 'french' | 'arabic';

export interface PackageConfig {
  defaultLanguage: SupportedLanguage;
  enableCaching: boolean;
  cacheTimeout: number;
  strictValidation: boolean;
}

export interface DataIntegrityResult {
  isValid: boolean;
  errors: string[];
}

export type ErrorType = 'InvalidLanguageError' | 'InvalidRegionIdError' | 'InvalidCityIdError' | 'DataIntegrityError';
