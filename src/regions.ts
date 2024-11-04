import { Languages, RegionLanguageKeyMap } from './constants';
import data from './data/regions.json';
import { validateLanguage } from './validation';

/**
 * Gets all moroccan regions.
 * @param {string} language  
 * @returns {{regionId:string,regionName:string}[]}
 */

export function getAllRegions(language:string = Languages.English): {regionId:string,regionName:string}[]{

   language = validateLanguage(language);

   const regionLanguageKey = RegionLanguageKeyMap[language as Languages] || RegionLanguageKeyMap.default;

   const moroccanRegions = data.regions.map(region => (
      {regionId:region.region_id,regionName:region[regionLanguageKey]}
   ));

   return moroccanRegions;
}

/**
 * Count Moroccan regions.
 * @returns {number} number of regions
 */

export function countMoroccanRegions(): number {
   return data.regions.length;
}