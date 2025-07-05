
import {cityExists, countAllMoroccanCities, countAssignedCities, countMoroccanRegions, countRegionCities, countUnassignedCities, getAllCities, getAllRegions, getAssignedMorrocanCities, getCityDetails, getRandomCities, getRandomRegions, getRegionByName, getRegionCities, getUnassignedCities, regionExists, searchCities, searchRegions} from '../src';
import { Languages, moroccoGlobals } from '../src/constants';
import data from '../src/data/regions.json';
/**
 * Tested functions:
 * - getAllRegions
 * - countMoroccanRegions
 * - getAssignedMorrocanCities
 * - getUnassignedCities
 * - getRegionCities
 * - countAllMoroccanCities
 * - countAssignedCities
 * - countRegionCities
 * - countUnassignedCities
 */
const moroccoGlobalInformation = {
   ...moroccoGlobals,
   selectedRegionCitiesNumber:0
}
export const FirstMoroccanRegion = data.regions[0];
export const FirstMoroccanRegionCity = data.regions[0].cities[0];
export const ProvidedLanguage = Object.values(Languages);

describe('Moroccan Regions And Cities Tests', () => {
  test('Should count regions', () => {
    const countRegions = countMoroccanRegions();

    // Check that regionsNumber is a number
    expect(typeof countRegions).toBe('number');
    expect(countRegions).toBeGreaterThanOrEqual(moroccoGlobalInformation.regions);

  });
  test('should get all regions', () => {
    const allRegions = getAllRegions();

    // Check that allRegions is an array
    expect(Array.isArray(allRegions)).toBe(true);

     // Check that each region has a regionId,regionName fields
    allRegions.forEach(region => {
      expect(region).toHaveProperty('regionId');
      expect(region).toHaveProperty('regionName');
    });
    
    expect(allRegions.length).toBeGreaterThanOrEqual(moroccoGlobalInformation.regions);

  });
  test('Should count cities', () => {
    const moroccanCities = countAllMoroccanCities();
    // Check that moroccanCities is a number
    expect(typeof moroccanCities).toBe('number');
    expect(moroccanCities).toBeGreaterThanOrEqual(moroccoGlobalInformation.allCities);

  });
  test('should get all cities', () => {
    const allCities = getAllCities();

    // Check that allCities is an array
    expect(Array.isArray(allCities)).toBe(true);

    // Check that each city name is a string
    allCities.forEach(city => {
      expect(typeof city).toBe('string');
    });
    
    expect(allCities.length).toBeGreaterThanOrEqual(moroccoGlobalInformation.allCities);

  });
  test('Should count assigned Cities', () => {
    const assignedCitiesNumber = countAssignedCities();
    // Check that assignedCitiesNumber is a number
    expect(typeof assignedCitiesNumber).toBe('number');
    expect(assignedCitiesNumber).toBeGreaterThanOrEqual(moroccoGlobalInformation.assignedCities);

  });
  test('should get all assigned cities', () => {
    const allAssignedCities = getAssignedMorrocanCities();

    // Check that allAssignedCities is an array
    expect(Array.isArray(allAssignedCities)).toBe(true);

    // Check that each city name is a string
    allAssignedCities.forEach(city => {
      expect(typeof city).toBe('string');
    });
    
    expect(allAssignedCities.length).toBeGreaterThanOrEqual(moroccoGlobalInformation.assignedCities);

  });
  test('Should count Unassigned Cities', () => {
    const unAssignedCitiesNumber = countUnassignedCities();
    // Check that unAssignedCitiesNumber is a number
    expect(typeof unAssignedCitiesNumber).toBe('number');
    expect(unAssignedCitiesNumber).toBeGreaterThanOrEqual(moroccoGlobalInformation.unassignedCities);

  });
  test('should get all unAssigned cities', () => {
    const allUnssignedCities = getUnassignedCities();

    // Check that allUnssignedCities is an array
    expect(Array.isArray(allUnssignedCities)).toBe(true);

    // Check that each city name is a string
    allUnssignedCities.forEach(city => {
      expect(typeof city).toBe('string');
    });
    
    expect(allUnssignedCities.length).toBeGreaterThanOrEqual(moroccoGlobalInformation.unassignedCities);

  });
  test('should count a region cities', () => {
    const citiesNumber = countRegionCities();
    // Check that citiesNumber is a number
    expect(typeof citiesNumber).toBe('number');
    expect(citiesNumber).toBeGreaterThan(0);
    moroccoGlobalInformation.selectedRegionCitiesNumber = citiesNumber;
  });
  test('should get a region cities', () => {
    const regionCities = getRegionCities();
    // Check that regionCities is an array
    expect(Array.isArray(regionCities)).toBe(true);
    expect(regionCities.length).toBe(moroccoGlobalInformation.selectedRegionCitiesNumber);

     // Check that each city value is a string
    regionCities.forEach(city => {
      expect(typeof city).toBe('string');
    });
  });
  test('should get a region by its name', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const region = getRegionByName(FirstMoroccanRegion[`region_${selectedLanguage}`],selectedLanguage);
    // Check that region object field
    expect(region).toHaveProperty('regionId');
    expect(region).toHaveProperty('regionName');

  });
  test('should not get a region by a wrong name', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const region = getRegionByName(`${FirstMoroccanRegion[`region_${selectedLanguage}`]}-wrong-name`,selectedLanguage);
    // Check that region is null
    expect(region).toBe(null);
  });
  test('should get a city details', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const city = getCityDetails(FirstMoroccanRegionCity[`city_${selectedLanguage}`],selectedLanguage);
    // Check that city object field
    expect(city).toHaveProperty('cityId');
    expect(city).toHaveProperty('cityName');
    expect(city).toHaveProperty('regionId');
    expect(city).toHaveProperty('regionName');
    expect(city).toHaveProperty('isAssigned');
  });
  test('should not get a city details with a wrong name', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const city = getCityDetails(`${FirstMoroccanRegionCity[`city_${selectedLanguage}`]}-wrong-name`,selectedLanguage);
    // Check that city is null
    expect(city).toBe(null);
  });
  test('should search for regions with a specific query', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const foundRegions = searchRegions(`${FirstMoroccanRegion[`region_${selectedLanguage}`].slice(0,3)}`,selectedLanguage);
    // Check that foundRegions is an array
    expect(Array.isArray(foundRegions)).toBe(true);
    
    foundRegions.forEach(region => {
      expect(region).toHaveProperty('regionId');
      expect(region).toHaveProperty('regionName');
    });
  });
  test('should search for cities with a specific query', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const foundCities = searchCities(`${FirstMoroccanRegionCity[`city_${selectedLanguage}`].slice(0,3)}`,selectedLanguage);
    // Check that foundCities is an array
    expect(Array.isArray(foundCities)).toBe(true);
    // Check that all cities type is string 
    foundCities.forEach(city => {
      expect(typeof city).toBe('string');
    });
  });
  test('should check if a city is exists or not', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const isCityExists = cityExists(FirstMoroccanRegionCity[`city_${selectedLanguage}`],selectedLanguage);
    // Check that city exists or not
    expect(typeof isCityExists).toBe('boolean');
  });
  test('should check if a region is exists or not', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const isRegionExists = regionExists(FirstMoroccanRegion[`region_${selectedLanguage}`],selectedLanguage);
    // Check that region exists or not
    expect(typeof isRegionExists).toBe('boolean');
  });
  test('should get x number of random regions', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const desiredNumberOfRegions = 5;
    const regions = getRandomRegions(desiredNumberOfRegions,selectedLanguage);
    // Check that regions is an array
    expect(Array.isArray(regions)).toBe(true);
    expect(regions.length).toBe(desiredNumberOfRegions);

     // Check that each region has a regionId,regionName fields
    regions.forEach(region => {
      expect(region).toHaveProperty('regionId');
      expect(region).toHaveProperty('regionName');
    });
  });
  test('should get x number of random cities', () => {
    const randomIndex = Math.floor(Math.random() * ProvidedLanguage.length);
    const selectedLanguage = ProvidedLanguage[randomIndex];
    const desiredNumberOfCities = 5;
    const cities = getRandomCities(desiredNumberOfCities,selectedLanguage);
    // Check that cities is an array
    expect(Array.isArray(cities)).toBe(true);
    expect(cities.length).toBe(desiredNumberOfCities);

     // Check that each city type is a string
    cities.forEach(city => {
      expect(typeof city).toBe('string');
    });
  });
});
