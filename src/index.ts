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
export type { 
    Region, 
    City, 
    RegionWithCities, 
    SupportedLanguage,
    PackageConfig,
    ErrorType 
} from './types';

export {
    // Original functions
    getAllRegions,
    countMoroccanRegions,
    getAssignedMorrocanCities,
    getUnassignedCities,
    getRegionCities,
    countAllMoroccanCities,
    countAssignedCities,
    countRegionCities,
    countUnassignedCities,
    
    // Validation functions
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
    
    // Error functions
    createInvalidLanguageError,
    createInvalidRegionIdError,
    createInvalidCityIdError,
    createDataIntegrityError,
    isErrorType,
    throwInvalidLanguageError,
    throwInvalidRegionIdError,
    throwInvalidCityIdError,
    throwDataIntegrityError,
    
    // Configuration functions
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
    
    // Cache functions
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
    
    // Utility functions
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

export default {
    // Original functions
    getAllRegions,
    countMoroccanRegions,
    getAssignedMorrocanCities,
    getUnassignedCities,
    getRegionCities,
    countAllMoroccanCities,
    countAssignedCities,
    countRegionCities,
    countUnassignedCities,
    
    // Validation functions
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
    
    // Error functions
    createInvalidLanguageError,
    createInvalidRegionIdError,
    createInvalidCityIdError,
    createDataIntegrityError,
    isErrorType,
    throwInvalidLanguageError,
    throwInvalidRegionIdError,
    throwInvalidCityIdError,
    throwDataIntegrityError,
    
    // Configuration functions
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
    
    // Cache functions
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
    
    // Utility functions
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



