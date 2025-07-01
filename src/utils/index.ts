/**
 * Utility functions for the Moroccan regions and cities package
 */

import { validateLanguage, validateRegionIdStrict, isLanguageSupported } from '../validation';
import { RegionLanguageKeyMap, CityLanguageKeyMap, Languages } from '../constants';
import { Region, City, RegionWithCities, SupportedLanguage } from '../types';
import { throwInvalidRegionIdError } from '../errors';
import { getCacheValue, setCacheValue, createCacheKey } from '../cache';
import data from '../data/regions.json';

/**
 * Gets a region by its name
 * @param regionName - Name of the region to find
 * @param language - Language for the search (default: English)
 * @returns Region object or null if not found
 */
export function getRegionByName(regionName: string, language: string = Languages.English): Region | null {
  const validatedLanguage = validateLanguage(language);
  const regionKey = RegionLanguageKeyMap[validatedLanguage as Languages];
  
  const cacheKey = createCacheKey('region-by-name', regionName.toLowerCase(), validatedLanguage);
  const cached = getCacheValue<Region | null>(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  
  const region = data.regions.find(r => 
    r[regionKey].toLowerCase() === regionName.toLowerCase()
  );
  
  const result = region ? {
    regionId: region.region_id,
    regionName: region[regionKey]
  } : null;
  
  setCacheValue(cacheKey, result);
  return result;
}

/**
 * Gets detailed information about a city
 * @param cityName - Name of the city to find
 * @param language - Language for the search (default: English)
 * @returns City details or null if not found
 */
export function getCityDetails(cityName: string, language: string = Languages.English) {
  const validatedLanguage = validateLanguage(language);
  const cityKey = CityLanguageKeyMap[validatedLanguage as Languages];
  
  const cacheKey = createCacheKey('city-details', cityName.toLowerCase(), validatedLanguage);
  const cached = getCacheValue(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  
  // Search in assigned cities
  for (const region of data.regions) {
    const city = region.cities.find(c => c[cityKey].toLowerCase() === cityName.toLowerCase());
    if (city) {
      const result = {
        cityId: city.city_id,
        cityName: city[cityKey],
        regionId: region.region_id,
        regionName: region[RegionLanguageKeyMap[validatedLanguage as Languages]],
        isAssigned: true
      };
      setCacheValue(cacheKey, result);
      return result;
    }
  }
  
  // Search in unassigned cities
  const unassignedCity = data.unassigned_cities.find(c => 
    c[cityKey].toLowerCase() === cityName.toLowerCase()
  );
  
  if (unassignedCity) {
    const result = {
      cityId: unassignedCity.city_id,
      cityName: unassignedCity[cityKey],
      regionId: null,
      regionName: null,
      isAssigned: false
    };
    setCacheValue(cacheKey, result);
    return result;
  }
  
  setCacheValue(cacheKey, null);
  return null;
}

/**
 * Searches for regions by query string
 * @param query - Search query
 * @param language - Language for the search (default: English)
 * @returns Array of matching regions
 */
export function searchRegions(query: string, language: string = Languages.English): Region[] {
  const validatedLanguage = validateLanguage(language);
  const regionKey = RegionLanguageKeyMap[validatedLanguage as Languages];
  
  const cacheKey = createCacheKey('search-regions', query.toLowerCase(), validatedLanguage);
  const cached = getCacheValue<Region[]>(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) {
    return [];
  }
  
  const results = data.regions
    .filter(region => 
      region[regionKey].toLowerCase().includes(normalizedQuery)
    )
    .map(region => ({
      regionId: region.region_id,
      regionName: region[regionKey]
    }));
  
  setCacheValue(cacheKey, results);
  return results;
}

/**
 * Searches for cities by query string
 * @param query - Search query
 * @param language - Language for the search (default: English)
 * @returns Array of matching city names
 */
export function searchCities(query: string, language: string = Languages.English): string[] {
  const validatedLanguage = validateLanguage(language);
  const cityKey = CityLanguageKeyMap[validatedLanguage as Languages];
  
  const cacheKey = createCacheKey('search-cities', query.toLowerCase(), validatedLanguage);
  const cached = getCacheValue<string[]>(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) {
    return [];
  }
  
  const allCities = [
    ...(data.regions as any[]).flatMap((region: any) => region.cities),
    ...data.unassigned_cities
  ];
  
  const results = allCities
    .filter(city => city[cityKey].toLowerCase().includes(normalizedQuery))
    .map(city => city[cityKey])
    .filter((city, index, self) => self.indexOf(city) === index); // Remove duplicates
  
  setCacheValue(cacheKey, results);
  return results;
}

/**
 * Gets cities count for a specific region
 * @param regionId - ID of the region
 * @returns Number of cities in the region
 */
export function getCitiesCountByRegion(regionId: string): number {
  validateRegionIdStrict(regionId);
  
  const cacheKey = createCacheKey('cities-count', regionId);
  const cached = getCacheValue<number>(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  
  const region = data.regions.find(r => r.region_id === regionId);
  if (!region) {
    throwInvalidRegionIdError(regionId);
  }
  
  const count = region.cities.length;
  setCacheValue(cacheKey, count);
  return count;
}

/**
 * Gets all cities across all regions
 * @param language - Language for city names (default: English)
 * @returns Array of all city names
 */
export function getAllCities(language: string = Languages.English): string[] {
  const validatedLanguage = validateLanguage(language);
  const cityKey = CityLanguageKeyMap[validatedLanguage as Languages];
  
  const cacheKey = createCacheKey('all-cities', validatedLanguage);
  const cached = getCacheValue<string[]>(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  
  const allCities = [
    ...(data.regions as any[]).flatMap((region: any) => region.cities),
    ...data.unassigned_cities
  ];
  
  const results = allCities
    .map(city => city[cityKey])
    .filter((city, index, self) => self.indexOf(city) === index) // Remove duplicates
    .sort(); // Sort alphabetically
  
  setCacheValue(cacheKey, results);
  return results;
}

/**
 * Checks if a city exists in the dataset
 * @param cityName - Name of the city to check
 * @param language - Language for the search (default: English)
 * @returns true if city exists, false otherwise
 */
export function cityExists(cityName: string, language: string = Languages.English): boolean {
  return getCityDetails(cityName, language) !== null;
}

/**
 * Checks if a region exists in the dataset
 * @param regionName - Name of the region to check
 * @param language - Language for the search (default: English)
 * @returns true if region exists, false otherwise
 */
export function regionExists(regionName: string, language: string = Languages.English): boolean {
  return getRegionByName(regionName, language) !== null;
}

/**
 * Gets random regions
 * @param count - Number of random regions to get
 * @param language - Language for region names (default: English)
 * @returns Array of random regions
 */
export function getRandomRegions(count: number, language: string = Languages.English): Region[] {
  const validatedLanguage = validateLanguage(language);
  const regionKey = RegionLanguageKeyMap[validatedLanguage as Languages];
  
  const allRegions = data.regions.map(region => ({
    regionId: region.region_id,
    regionName: region[regionKey]
  }));
  
  // Shuffle and take first 'count' items
  const shuffled = allRegions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allRegions.length));
}

/**
 * Gets random cities
 * @param count - Number of random cities to get
 * @param language - Language for city names (default: English)
 * @returns Array of random city names
 */
export function getRandomCities(count: number, language: string = Languages.English): string[] {
  const allCities = getAllCities(language);
  
  // Shuffle and take first 'count' items
  const shuffled = allCities.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allCities.length));
}
