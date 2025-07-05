import { getCacheTimeout, getConfig, getDefaultLanguage, isCachingEnabled, isDebugModeEnabled, isStrictValidationEnabled, resetConfig, setCacheTimeout, setCachingEnabled, setConfig, setConfigSafe, setDebugModeEnabled, setDefaultLanguage, setStrictValidationEnabled, validateConfig } from "../src";
import { Languages } from "../src/constants";

/**
 * should Test Configuration functions:
 * - getConfig
 * - setConfig
 * - resetConfig
 * - getDefaultLanguage
 * - setDefaultLanguage
 * - isCachingEnabled
 * - setCachingEnabled
 * - getCacheTimeout
 * - setCacheTimeout
 * - isStrictValidationEnabled
 * - setStrictValidationEnabled
 * - isDebugModeEnabled
 * - setDebugModeEnabled
 * - validateConfig
 * - setConfigSafe
 */

describe('Testing Configuration functions',()=>{
   afterEach(() => {
    resetConfig();
   });
   test('getConfig returns current config', () => {
    const config = getConfig();
    expect(config).toHaveProperty('defaultLanguage');
    expect(config).toHaveProperty('enableCaching');
    expect(config).toHaveProperty('cacheTimeout');
    expect(config).toHaveProperty('strictValidation');
    expect(config).toHaveProperty('enableDebugMode');
   });
  test('setConfig updates config partially', () => {
    setConfig({ enableCaching: false });
    expect(getConfig().enableCaching).toBe(false);
    setConfig({ cacheTimeout: 1000 });
    expect(getConfig().cacheTimeout).toBe(1000);
   });
  test('resetConfig resets to default', () => {
    setConfig({ enableCaching: false, cacheTimeout: 1000 });
    resetConfig();
    expect(getConfig().enableCaching).toBe(true);
    expect(getConfig().cacheTimeout).toBe(300000);
   });
  test('getDefaultLanguage and setDefaultLanguage', () => {
    setDefaultLanguage(Languages.French);
    expect(getDefaultLanguage()).toBe(Languages.French);
   });
   test('isCachingEnabled and setCachingEnabled', () => {
    setCachingEnabled(false);
    expect(isCachingEnabled()).toBe(false);
    setCachingEnabled(true);
    expect(isCachingEnabled()).toBe(true);
  });
  test('getCacheTimeout and setCacheTimeout', () => {
    setCacheTimeout(12345);
    expect(getCacheTimeout()).toBe(12345);
  });
  test('isStrictValidationEnabled and setStrictValidationEnabled', () => {
    setStrictValidationEnabled(true);
    expect(isStrictValidationEnabled()).toBe(true);
    setStrictValidationEnabled(false);
    expect(isStrictValidationEnabled()).toBe(false);
  });
  test('isDebugModeEnabled and setDebugModeEnabled', () => {
    setDebugModeEnabled(true);
    expect(isDebugModeEnabled()).toBe(true);
    setDebugModeEnabled(false);
    expect(isDebugModeEnabled()).toBe(false);
  });
  test('validateConfig throws on invalid cacheTimeout', () => {
    expect(() => validateConfig({ cacheTimeout: -1 })).toThrow();
  });
  test('validateConfig throws on invalid defaultLanguage', () => {
    expect(() => validateConfig({ defaultLanguage: 'wrong-language' as any })).toThrow();
  });
  test('validateConfig returns true for valid config', () => {
    expect(validateConfig({ cacheTimeout: 1000, defaultLanguage: Languages.Arabic })).toBe(true);
  });
  test('setConfigSafe validates and sets config', () => {
    setConfigSafe({ cacheTimeout: 9999 });
    expect(getConfig().cacheTimeout).toBe(9999);
    expect(() => setConfigSafe({ cacheTimeout: -5 })).toThrow();
  });

})