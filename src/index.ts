/**
 * @fileoverview Moroccan Regions and Cities Package
 * 
 * A comprehensive, type-safe Node.js package for handling Moroccan regions and cities 
 * with advanced features including caching, validation, search functionality, and 
 * multi-language support.
 * 
 * @version 2.0.0
 * @author Ezzagmoute Hamza <ezzagmoute.hamza@gmail.com>
 * @contributor Abdelkabir Ouadoukou <abdelkabir.ouadoukou@gmail.com>
 * @license MIT
 * 
 * @example
 * ```typescript
 * import { getAllRegions, searchCities, setConfig } from 'moroccan-regions-cities';
 * 
 * // Get all regions in French
 * const regions = getAllRegions('french');
 * 
 * // Search for cities
 * const cities = searchCities('Casa', 'english');
 * 
 * // Configure the package
 * setConfig({
 *   defaultLanguage: 'french',
 *   enableCaching: true,
 *   strictValidation: true
 * });
 * ```
 */

import {
    getAllRegions,
    countMoroccanRegions
} from './regions';

import {
    getAssignedMorrocanCities,
    getUnassignedCities,
    getRegionCities,
    countAllMoroccanCities,
    countAssignedCities,
    countRegionCities,
    countUnassignedCities
} from './cities';

// Import validation functions
import {
    validateLanguage,
    validateLanguageStrict,
    validateRegionId,
    validateRegionIdStrict,
    validateNonEmptyString,
    validateLanguageWithMode,
    validateLanguages,
    validateCityId,
    isLanguageSupported,
    getSupportedLanguages
} from './validation';

// Import data-integrity functions
import {
    isDatasetComplete,
    performDataHealthCheck,
    getDataStatistics,
    validateDataIntegrity,
    validateDataIntegrityStrict
} from './validation/data-integrity';

// Import error functions
import {
    createInvalidLanguageError,
    createInvalidRegionIdError,
    createInvalidCityIdError,
    createDataIntegrityError,
    isErrorType,
    throwInvalidLanguageError,
    throwInvalidRegionIdError,
    throwInvalidCityIdError,
    throwDataIntegrityError
} from './errors';

// Import configuration functions
import {
    getConfig,
    setConfig,
    resetConfig,
    getDefaultLanguage,
    setDefaultLanguage,
    isCachingEnabled,
    setCachingEnabled,
    getCacheTimeout,
    setCacheTimeout,
    isStrictValidationEnabled,
    setStrictValidationEnabled,
    isDebugModeEnabled,
    setDebugModeEnabled,
    validateConfig,
    setConfigSafe
} from './config';

// Import cache functions
import {
    setCacheValue,
    getCacheValue,
    hasCacheValue,
    deleteCacheValue,
    clearCache,
    getCacheSize,
    getCacheKeys,
    cleanupExpiredEntries,
    getCacheStats,
    createCacheKey,
    memoize
} from './cache';

// Import utility functions
import {
    getRegionByName,
    getCityDetails,
    searchRegions,
    searchCities,
    getCitiesCountByRegion,
    getAllCities,
    cityExists,
    regionExists,
    getRandomRegions,
    getRandomCities
} from './utils';

// Import types
/**
 * @namespace Types
 * @description Core TypeScript interfaces and type definitions for the package
 */
export type { 
    Region, 
    City, 
    RegionWithCities, 
    SupportedLanguage,
    PackageConfig,
    ErrorType 
} from './types';

/**
 * @namespace CoreFunctions
 * @description Main exported functions for working with Moroccan regions and cities
 */
export {
    // ===== CORE REGION & CITY FUNCTIONS =====
    /**
     * @group Core Functions
     * @description Original functions for basic region and city operations
     */
    
    /** Get all Moroccan regions with optional language support */
    getAllRegions,
    /** Count the total number of Moroccan regions */
    countMoroccanRegions,
    /** Get cities that are assigned to specific regions */
    getAssignedMorrocanCities,
    /** Get cities that are not assigned to any region */
    getUnassignedCities,
    /** Get all cities within a specific region */
    getRegionCities,
    /** Count all cities (assigned + unassigned) */
    countAllMoroccanCities,
    /** Count cities that are assigned to regions */
    countAssignedCities,
    /** Count cities within a specific region */
    countRegionCities,
    /** Count cities that are not assigned to any region */
    countUnassignedCities,
    
    // ===== VALIDATION FUNCTIONS =====
    /**
     * @group Validation
     * @description Functions for input validation with flexible and strict modes
     */
    
    /** Validate language input with fallback to English */
    validateLanguage,
    /** Strictly validate language input (throws error for invalid languages) */
    validateLanguageStrict,
    /** Validate region ID format */
    validateRegionId,
    /** Strictly validate region ID (throws error for invalid IDs) */
    validateRegionIdStrict,
    /** Validate that a string is not empty or whitespace-only */
    validateNonEmptyString,
    /** Validate language with configurable strict/flexible mode */
    validateLanguageWithMode,
    /** Validate multiple languages at once */
    validateLanguages,
    /** Validate city ID format (positive number) */
    validateCityId,
    /** Check if a language is supported by the package */
    isLanguageSupported,
    /** Get list of all supported languages */
    getSupportedLanguages,
    
    /**
     * @group Data-Integrity
     * @description Functions For checking the Data integrity
    */

    /** Checks if the dataset appears to be complete */
    isDatasetComplete,
    /** Performs a comprehensive data health check */
    performDataHealthCheck,
    /** Gets statistics about the dataset */
    getDataStatistics,
    /** Validates the integrity of the regions and cities data */
    validateDataIntegrity,
    /** Validates data integrity and throws error if invalid */
    validateDataIntegrityStrict,

    // ===== ERROR HANDLING FUNCTIONS =====
    /**
     * @group Error Handling
     * @description Function-based error creation and management utilities
     */
    
    /** Create an error for invalid language parameters */
    createInvalidLanguageError,
    /** Create an error for invalid region ID parameters */
    createInvalidRegionIdError,
    /** Create an error for invalid city ID parameters */
    createInvalidCityIdError,
    /** Create an error for data integrity issues */
    createDataIntegrityError,
    /** Check if an error is of a specific type */
    isErrorType,
    /** Throw an invalid language error */
    throwInvalidLanguageError,
    /** Throw an invalid region ID error */
    throwInvalidRegionIdError,
    /** Throw an invalid city ID error */
    throwInvalidCityIdError,
    /** Throw a data integrity error */
    throwDataIntegrityError,
    
    // ===== CONFIGURATION FUNCTIONS =====
    /**
     * @group Configuration
     * @description Package configuration and settings management
     */
    
    /** Get current package configuration */
    getConfig,
    /** Set package configuration options */
    setConfig,
    /** Reset configuration to default values */
    resetConfig,
    /** Get the default language setting */
    getDefaultLanguage,
    /** Set the default language */
    setDefaultLanguage,
    /** Check if caching is enabled */
    isCachingEnabled,
    /** Enable or disable caching */
    setCachingEnabled,
    /** Get the current cache timeout value */
    getCacheTimeout,
    /** Set the cache timeout duration */
    setCacheTimeout,
    /** Check if strict validation is enabled */
    isStrictValidationEnabled,
    /** Enable or disable strict validation */
    setStrictValidationEnabled,
    /** Check if debug mode is enabled */
    isDebugModeEnabled,
    /** Enable or disable debug mode */
    setDebugModeEnabled,
    /** Validate configuration values */
    validateConfig,
    /** Set configuration with validation */
    setConfigSafe,
    
    // ===== CACHING FUNCTIONS =====
    /**
     * @group Caching
     * @description Intelligent caching system with TTL support
     */
    
    /** Set a value in the cache with optional TTL */
    setCacheValue,
    /** Get a value from the cache */
    getCacheValue,
    /** Check if a key exists in the cache and is not expired */
    hasCacheValue,
    /** Delete a specific key from the cache */
    deleteCacheValue,
    /** Clear all cache entries */
    clearCache,
    /** Get the number of items in the cache */
    getCacheSize,
    /** Get all cache keys */
    getCacheKeys,
    /** Remove expired entries from the cache */
    cleanupExpiredEntries,
    /** Get cache statistics and information */
    getCacheStats,
    /** Create a cache key from multiple parts */
    createCacheKey,
    /** Memoize function results with caching */
    memoize,
    
    // ===== UTILITY & SEARCH FUNCTIONS =====
    /**
     * @group Utilities
     * @description Advanced search, lookup, and utility functions
     */
    
    /** Get a region by its name */
    getRegionByName,
    /** Get detailed information about a city */
    getCityDetails,
    /** Search for regions by query string */
    searchRegions,
    /** Search for cities by query string */
    searchCities,
    /** Get the number of cities in a specific region */
    getCitiesCountByRegion,
    /** Get all cities across all regions */
    getAllCities,
    /** Check if a city exists in the dataset */
    cityExists,
    /** Check if a region exists in the dataset */
    regionExists,
    /** Get random regions */
    getRandomRegions,
    /** Get random cities */
    getRandomCities
};

/**
 * Default export object containing all package functions
 * 
 * @description This default export provides access to all package functionality
 * through a single object. Useful for CommonJS imports or when you prefer
 * object-style access to functions.
 * 
 * @example
 * ```typescript
 * // ES Modules
 * import moroccanData from 'moroccan-regions-cities';
 * const regions = moroccanData.getAllRegions('french');
 * 
 * // CommonJS
 * const moroccanData = require('moroccan-regions-cities').default;
 * const regions = moroccanData.getAllRegions('french');
 * ```
 */
export default {
    // ===== CORE REGION & CITY FUNCTIONS =====
    getAllRegions,
    countMoroccanRegions,
    getAssignedMorrocanCities,
    getUnassignedCities,
    getRegionCities,
    countAllMoroccanCities,
    countAssignedCities,
    countRegionCities,
    countUnassignedCities,
    
    // ===== VALIDATION FUNCTIONS =====
    validateLanguage,
    validateLanguageStrict,
    validateRegionId,
    validateRegionIdStrict,
    validateNonEmptyString,
    validateLanguageWithMode,
    validateLanguages,
    validateCityId,
    isLanguageSupported,
    getSupportedLanguages,
    isDatasetComplete,
    performDataHealthCheck,
    getDataStatistics,
    validateDataIntegrity,
    validateDataIntegrityStrict,
    
    // ===== ERROR HANDLING FUNCTIONS =====
    createInvalidLanguageError,
    createInvalidRegionIdError,
    createInvalidCityIdError,
    createDataIntegrityError,
    isErrorType,
    throwInvalidLanguageError,
    throwInvalidRegionIdError,
    throwInvalidCityIdError,
    throwDataIntegrityError,
    
    // ===== CONFIGURATION FUNCTIONS =====
    getConfig,
    setConfig,
    resetConfig,
    getDefaultLanguage,
    setDefaultLanguage,
    isCachingEnabled,
    setCachingEnabled,
    getCacheTimeout,
    setCacheTimeout,
    isStrictValidationEnabled,
    setStrictValidationEnabled,
    isDebugModeEnabled,
    setDebugModeEnabled,
    validateConfig,
    setConfigSafe,
    
    // ===== CACHING FUNCTIONS =====
    setCacheValue,
    getCacheValue,
    hasCacheValue,
    deleteCacheValue,
    clearCache,
    getCacheSize,
    getCacheKeys,
    cleanupExpiredEntries,
    getCacheStats,
    createCacheKey,
    memoize,
    
    // ===== UTILITY & SEARCH FUNCTIONS =====
    getRegionByName,
    getCityDetails,
    searchRegions,
    searchCities,
    getCitiesCountByRegion,
    getAllCities,
    cityExists,
    regionExists,
    getRandomRegions,
    getRandomCities
};



