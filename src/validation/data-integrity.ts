/**
 * Data integrity validation functions
 */

import { DataIntegrityResult } from '../types';
import { createDataIntegrityError } from '../errors';
import data from '../data/regions.json';

/**
 * Validates the integrity of the regions and cities data
 * @returns Data integrity result with validation status and errors
 */
export function validateDataIntegrity(): DataIntegrityResult {
  const errors: string[] = [];
  
  try {
    // Check if data exists
    if(!data || !Array.isArray(data.regions) || !Array.isArray(data.unassigned_cities)) {
      errors.push('Missing required data structure');
      return { isValid: false, errors };
    }
    
    // Check if all regions have required fields
    (data.regions as any[]).forEach((region: any, index: number) => {
      if (!region.region_id || typeof region.region_id !== 'string') {
        errors.push(`Region at index ${index} is missing or has invalid region_id`);
      }
      
      if (!region.region_english || typeof region.region_english !== 'string') {
        errors.push(`Region at index ${index} is missing or has invalid region_english`);
      }
      
      if (!region.region_french || typeof region.region_french !== 'string') {
        errors.push(`Region at index ${index} is missing or has invalid region_french`);
      }
      
      if (!region.region_arabic || typeof region.region_arabic !== 'string') {
        errors.push(`Region at index ${index} is missing or has invalid region_arabic`);
      }
      
      if (!Array.isArray(region.cities)) {
        errors.push(`Region at index ${index} has invalid cities array`);
        return;
      }
      
      // Check if all cities in region have required fields
      region.cities.forEach((city: any, cityIndex: number) => {
        if (!city.city_id || typeof city.city_id !== 'number') {
          errors.push(`City at index ${cityIndex} in region ${region.region_id} is missing or has invalid city_id`);
        }
        
        if (!city.city_english || typeof city.city_english !== 'string') {
          errors.push(`City at index ${cityIndex} in region ${region.region_id} is missing or has invalid city_english`);
        }
        
        if (!city.city_french || typeof city.city_french !== 'string') {
          errors.push(`City at index ${cityIndex} in region ${region.region_id} is missing or has invalid city_french`);
        }
        
        if (!city.city_arabic || typeof city.city_arabic !== 'string') {
          errors.push(`City at index ${cityIndex} in region ${region.region_id} is missing or has invalid city_arabic`);
        }
      });
    });
    
    // Check unassigned cities
    if (!Array.isArray(data.unassigned_cities)) {
      errors.push('Unassigned cities is not an array');
    } else {
      (data.unassigned_cities as any[]).forEach((city: any, index: number) => {
        if (!city.city_id || typeof city.city_id !== 'number') {
          errors.push(`Unassigned city at index ${index} is missing or has invalid city_id`);
        }
        
        if (!city.city_english || typeof city.city_english !== 'string') {
          errors.push(`Unassigned city at index ${index} is missing or has invalid city_english`);
        }
        
        if (!city.city_french || typeof city.city_french !== 'string') {
          errors.push(`Unassigned city at index ${index} is missing or has invalid city_french`);
        }
        
        if (!city.city_arabic || typeof city.city_arabic !== 'string') {
          errors.push(`Unassigned city at index ${index} is missing or has invalid city_arabic`);
        }
      });
    }
    
    // Check for duplicate region IDs
    const regionIds = (data.regions as any[]).map((region: any) => region.region_id);
    const uniqueRegionIds = new Set(regionIds);
    if (regionIds.length !== uniqueRegionIds.size) {
      errors.push('Duplicate region IDs found');
    }
    
    // Check for duplicate city IDs
    const allCities = [
      ...(data.regions as any[]).flatMap((region: any) => region.cities),
      ...data.unassigned_cities
    ];
    const cityIds = allCities.map((city: any) => city.city_id);
    const uniqueCityIds = new Set(cityIds);
    if (cityIds.length !== uniqueCityIds.size) {
      errors.push('Duplicate city IDs found');
    }
    
  } catch (error) {
    errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates data integrity and throws error if invalid
 * @throws DataIntegrityError if data is invalid
 */
export function validateDataIntegrityStrict(): void {
  const result = validateDataIntegrity();
  if (!result.isValid) {
    throw createDataIntegrityError(result.errors.join('; '));
  }
}

/**
 * Gets statistics about the dataset
 * @returns Dataset statistics
 */
export function getDataStatistics() {
  const regionsCount = data.regions.length;
  const assignedCitiesCount = (data.regions as any[]).reduce((total, region: any) => total + region.cities.length, 0);
  const unassignedCitiesCount = data.unassigned_cities.length;
  const totalCitiesCount = assignedCitiesCount + unassignedCitiesCount;
  
  return {
    regionsCount,
    assignedCitiesCount,
    unassignedCitiesCount,
    totalCitiesCount,
    averageCitiesPerRegion: Math.round((assignedCitiesCount / regionsCount) * 100) / 100
  };
}

/**
 * Checks if the dataset appears to be complete
 * @returns true if dataset appears complete
 */
export function isDatasetComplete(): boolean {
  const stats = getDataStatistics();
  
  // Basic completeness checks
  if (stats.regionsCount < 10) return false; // Morocco should have reasonable number of regions
  if (stats.totalCitiesCount < 50) return false; // Should have reasonable number of cities
  if (stats.averageCitiesPerRegion < 1) return false; // Each region should have at least some cities on average
  
  return true;
}

/**
 * Performs a comprehensive data health check
 * @returns Comprehensive health check result
 */
export function performDataHealthCheck(): {
  isHealthy: boolean;
  integrity: DataIntegrityResult;
  statistics: ReturnType<typeof getDataStatistics>;
  isComplete: boolean;
  recommendations: string[];
} {
  const integrity = validateDataIntegrity();
  const statistics = getDataStatistics();
  const isComplete = isDatasetComplete();
  const recommendations: string[] = [];
  
  if (!integrity.isValid) {
    recommendations.push('Fix data integrity issues');
  }
  
  if (!isComplete) {
    recommendations.push('Consider adding more cities and regions');
  }
  
  if (statistics.averageCitiesPerRegion < 5) {
    recommendations.push('Some regions might need more cities');
  }
  
  if (statistics.unassignedCitiesCount > statistics.assignedCitiesCount * 0.1) {
    recommendations.push('Consider assigning unassigned cities to regions');
  }
  
  return {
    isHealthy: integrity.isValid && isComplete,
    integrity,
    statistics,
    isComplete,
    recommendations
  };
}
