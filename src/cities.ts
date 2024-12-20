import data from './data/regions.json';
import { CityLanguageKeyMap, Languages, regionsIds } from './constants';
import { validateRegionId,validateLanguage } from './validation';

/**
 * Gets cities within a specified region.
 * @param {string} regionId // uuid
 * @param {string} language // 'english'|'french'|'arabic'
 * @returns {string[]} - Array of cities in the region.
 */

export function getRegionCities(regionId:string = regionsIds[0],language:string = Languages.English):string[] {
 
  if (!validateRegionId(regionId)){
    regionId =  regionsIds[0];
  }

  language = validateLanguage(language);

  const cityKey = CityLanguageKeyMap[language as Languages] || CityLanguageKeyMap.default;

  const region = data.regions.find(region => region.region_id === regionId);
  if (!region) return [];

  const regionCities = region.cities.map(city => city[cityKey]);

  return regionCities;

}

/**
 * Gets all Unassigned cities.
 * @param {string} language // 'english'|'french'|'arabic'
 * @returns {string[]} - Array of cities.
 */

export function getUnassignedCities(language:string = Languages.English):string[] {

  language = validateLanguage(language);

  const cityLanguageKey = CityLanguageKeyMap[language as Languages] || CityLanguageKeyMap.default;

  const moroccanUnassignedCities = data.unassigned_cities.map(city => city[cityLanguageKey]);

  return moroccanUnassignedCities;
}

/**
 * Gets Assigned moroccan cities.
 * @param {string} language // 'english'|'french'|'arabic'
 * @returns {string[]} - Array of cities.
 */

export function getAssignedMorrocanCities(language:string = Languages.English): string[] {

   language = validateLanguage(language);

   const cityLanguageKey = CityLanguageKeyMap[language as Languages] || CityLanguageKeyMap.default ;
  
   const assignedMoroccanCities = data.regions.flatMap(region =>
     region.cities.map(city => city[cityLanguageKey])
   );
 
   return assignedMoroccanCities;
}

/**
 * Count region cities.
 * @param {string} regionId 
 * @returns {number} - the number of region cities.
 */

export function countRegionCities(regionId:string = regionsIds[0]): number {
  
  if (!validateRegionId(regionId)) return 0;

  const region = data.regions.find(region => region.region_id === regionId);

  if (!region) return 0;

  return region.cities.length;
}

/**
 * Count Unassigned cities.
 * @returns {number} number of Unassigned cities
 */

export function countUnassignedCities(): number {

  return data.unassigned_cities.length;
  
}

/**
 * Count assigned cities.
 * @returns {number} number of assigned cities
 */

export function countAssignedCities(): number {

  return getAssignedMorrocanCities(Languages.English).length;

}

/**
 * Count All Moroccan cities  (Assigned + Unassigned) Cities.
 * @returns {number} number of Moroccan cities.
 */

export function countAllMoroccanCities(): number {

  return countUnassignedCities() + getAssignedMorrocanCities(Languages.English).length;

}



