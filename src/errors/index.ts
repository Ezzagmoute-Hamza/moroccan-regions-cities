import { Languages } from '../constants';

/**
 * Error types for better error handling
 */
export type ErrorType = 'InvalidLanguageError' | 'InvalidRegionIdError' | 'InvalidCityIdError' | 'DataIntegrityError';

/**
 * Creates an error for invalid language parameter
 */
export function createInvalidLanguageError(language: string): Error {
  const supportedLanguages = [Languages.English, Languages.French, Languages.Arabic].join(', ');
  const error = new Error(`Invalid language: ${language}. Supported languages are: ${supportedLanguages}`);
  error.name = 'InvalidLanguageError';
  return error;
}

/**
 * Creates an error for invalid region ID parameter
 */
export function createInvalidRegionIdError(regionId: string): Error {
  const error = new Error(`Invalid region ID: ${regionId}`);
  error.name = 'InvalidRegionIdError';
  return error;
}

/**
 * Creates an error for invalid city ID parameter
 */
export function createInvalidCityIdError(cityId: string | number): Error {
  const error = new Error(`Invalid city ID: ${cityId}`);
  error.name = 'InvalidCityIdError';
  return error;
}

/**
 * Creates an error for data integrity issues
 */
export function createDataIntegrityError(message: string): Error {
  const error = new Error(`Data integrity error: ${message}`);
  error.name = 'DataIntegrityError';
  return error;
}

/**
 * Helper function to check if an error is of a specific type
 */
export function isErrorType(error: Error, type: ErrorType): boolean {
  return error.name === type;
}

/**
 * Helper function to throw invalid language error
 */
export function throwInvalidLanguageError(language: string): never {
  throw createInvalidLanguageError(language);
}

/**
 * Helper function to throw invalid region ID error
 */
export function throwInvalidRegionIdError(regionId: string): never {
  throw createInvalidRegionIdError(regionId);
}

/**
 * Helper function to throw invalid city ID error
 */
export function throwInvalidCityIdError(cityId: string | number): never {
  throw createInvalidCityIdError(cityId);
}

/**
 * Helper function to throw data integrity error
 */
export function throwDataIntegrityError(message: string): never {
  throw createDataIntegrityError(message);
}
