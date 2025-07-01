/**
 * Configuration module for the Moroccan regions and cities package
 */

import { SupportedLanguage } from '../types';
import { Languages } from '../constants';

/**
 * Package configuration interface
 */
export interface PackageConfig {
  defaultLanguage: SupportedLanguage;
  enableCaching: boolean;
  cacheTimeout: number;
  strictValidation: boolean;
  enableDebugMode: boolean;
}

/**
 * Default configuration values
 */
const defaultConfig: PackageConfig = {
  defaultLanguage: Languages.English,
  enableCaching: true,
  cacheTimeout: 300000, // 5 minutes
  strictValidation: false,
  enableDebugMode: false
};

/**
 * Current configuration state
 */
let currentConfig: PackageConfig = { ...defaultConfig };

/**
 * Gets the current configuration
 * @returns Current package configuration
 */
export function getConfig(): PackageConfig {
  return { ...currentConfig };
}

/**
 * Sets partial configuration options
 * @param config - Partial configuration to merge with current config
 */
export function setConfig(config: Partial<PackageConfig>): void {
  currentConfig = { ...currentConfig, ...config };
}

/**
 * Resets configuration to default values
 */
export function resetConfig(): void {
  currentConfig = { ...defaultConfig };
}

/**
 * Gets the default language from configuration
 * @returns The default language setting
 */
export function getDefaultLanguage(): SupportedLanguage {
  return currentConfig.defaultLanguage;
}

/**
 * Sets the default language
 * @param language - The language to set as default
 */
export function setDefaultLanguage(language: SupportedLanguage): void {
  currentConfig.defaultLanguage = language;
}

/**
 * Checks if caching is enabled
 * @returns true if caching is enabled
 */
export function isCachingEnabled(): boolean {
  return currentConfig.enableCaching;
}

/**
 * Sets caching enabled/disabled
 * @param enabled - Whether to enable caching
 */
export function setCachingEnabled(enabled: boolean): void {
  currentConfig.enableCaching = enabled;
}

/**
 * Gets the cache timeout value
 * @returns Cache timeout in milliseconds
 */
export function getCacheTimeout(): number {
  return currentConfig.cacheTimeout;
}

/**
 * Sets the cache timeout
 * @param timeout - Timeout in milliseconds
 */
export function setCacheTimeout(timeout: number): void {
  currentConfig.cacheTimeout = timeout;
}

/**
 * Checks if strict validation is enabled
 * @returns true if strict validation is enabled
 */
export function isStrictValidationEnabled(): boolean {
  return currentConfig.strictValidation;
}

/**
 * Sets strict validation enabled/disabled
 * @param enabled - Whether to enable strict validation
 */
export function setStrictValidationEnabled(enabled: boolean): void {
  currentConfig.strictValidation = enabled;
}

/**
 * Checks if debug mode is enabled
 * @returns true if debug mode is enabled
 */
export function isDebugModeEnabled(): boolean {
  return currentConfig.enableDebugMode;
}

/**
 * Sets debug mode enabled/disabled
 * @param enabled - Whether to enable debug mode
 */
export function setDebugModeEnabled(enabled: boolean): void {
  currentConfig.enableDebugMode = enabled;
}

/**
 * Validates configuration values
 * @param config - Configuration to validate
 * @returns true if valid, throws error if invalid
 */
export function validateConfig(config: Partial<PackageConfig>): boolean {
  if (config.cacheTimeout !== undefined && config.cacheTimeout < 0) {
    throw new Error('Cache timeout must be non-negative');
  }
  
  if (config.defaultLanguage !== undefined) {
    const validLanguages = [Languages.English, Languages.French, Languages.Arabic];
    if (!validLanguages.includes(config.defaultLanguage as Languages)) {
      throw new Error(`Invalid default language: ${config.defaultLanguage}`);
    }
  }
  
  return true;
}

/**
 * Sets configuration with validation
 * @param config - Configuration to set
 */
export function setConfigSafe(config: Partial<PackageConfig>): void {
  validateConfig(config);
  setConfig(config);
}
