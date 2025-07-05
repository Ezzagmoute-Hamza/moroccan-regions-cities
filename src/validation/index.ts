import { Languages, regionsIds } from "../constants";
import { SupportedLanguage } from "../types";
import { 
    throwInvalidLanguageError, 
    throwInvalidRegionIdError,
    createInvalidLanguageError,
    createInvalidRegionIdError 
} from "../errors";

/**
 * Validates language input with fallback to English
 * @param language - The language to validate
 * @returns Validated language or English as fallback
 */
export const validateLanguage = (language: string): string => {
    const normalizedLanguage = language.trim().toLowerCase();
    const validLanguages = [Languages.English, Languages.French, Languages.Arabic];
    
    if (validLanguages.includes(normalizedLanguage as Languages)) {
        return normalizedLanguage;
    }
    return Languages.English;
};

/**
 * Strictly validates language input and throws error for invalid languages
 * @param language - The language to validate
 * @returns Validated language
 * @throws InvalidLanguageError if language is not supported
 */
export const validateLanguageStrict = (language: string): SupportedLanguage => {
    const normalizedLanguage = language.trim().toLowerCase();
    const validLanguages = [Languages.English, Languages.French, Languages.Arabic];
    
    if (!validLanguages.includes(normalizedLanguage as Languages)) {
        throwInvalidLanguageError(language);
    }
    return normalizedLanguage as SupportedLanguage;
};

/**
 * Validates region ID
 * @param regionId - The region ID to validate
 * @returns true if valid, false otherwise
 */
export const validateRegionId = (regionId: string): boolean => {
    if (!regionsIds.includes(regionId)) return false;
    return true;
};

/**
 * Strictly validates region ID and throws error for invalid IDs
 * @param regionId - The region ID to validate
 * @returns The validated region ID
 * @throws InvalidRegionIdError if region ID is invalid
 */
export const validateRegionIdStrict = (regionId: string): string => {
    if (!regionsIds.includes(regionId)) {
        throwInvalidRegionIdError(regionId);
    }
    return regionId;
};

/**
 * Validates if a string is not empty or only whitespace
 * @param value - The string to validate
 * @param fieldName - Name of the field for error messages
 * @returns true if valid
 * @throws Error if invalid
 */
export const validateNonEmptyString = (value: string, fieldName: string): boolean => {
    if (!value || value.trim().length === 0) {
        throw new Error(`${fieldName} cannot be empty or only whitespace`);
    }
    return true;
};

/**
 * Validates and normalizes language input with optional strict mode
 * @param language - The language to validate
 * @param strict - Whether to use strict validation (throws error) or fallback mode
 * @returns Validated language
 */
export const validateLanguageWithMode = (language: string, strict: boolean = false): SupportedLanguage => {
    if (strict) {
        return validateLanguageStrict(language);
    }
    return validateLanguage(language) as SupportedLanguage;
};

/**
 * Validates multiple languages at once
 * @param languages - Array of languages to validate
 * @param strict - Whether to use strict validation
 * @returns Array of validated languages
 */
export const validateLanguages = (languages: string[], strict: boolean = false): SupportedLanguage[] => {
    return languages.map(lang => validateLanguageWithMode(lang, strict));
};

/**
 * Validates city ID (should be a positive number)
 * @param cityId - The city ID to validate
 * @returns true if valid
 */
export const validateCityId = (cityId: number | string): boolean => {
    const numericId = typeof cityId === 'string' ? parseInt(cityId, 10) : cityId;
    return !isNaN(numericId) && numericId > 0;
};

/**
 * Checks if a language is supported
 * @param language - The language to check
 * @returns true if supported, false otherwise
 */
export const isLanguageSupported = (language: string): boolean => {
    const normalizedLanguage = language.trim().toLowerCase();
    const validLanguages = [Languages.English, Languages.French, Languages.Arabic];
    return validLanguages.includes(normalizedLanguage as Languages);
};

/**
 * Gets all supported languages
 * @returns Array of supported languages
 */
export const getSupportedLanguages = (): string[] => {
    return [Languages.English, Languages.French, Languages.Arabic];
};