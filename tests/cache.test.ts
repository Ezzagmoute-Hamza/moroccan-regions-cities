import { cleanupExpiredEntries, clearCache, createCacheKey, deleteCacheValue, getCacheKeys, getCacheSize, getCacheStats, getCacheValue, hasCacheValue, memoize, resetConfig, setCacheValue, setConfig } from "../src";

/**
 * Should Test Caching functions:
 * - setCacheValue
 * - getCacheValue
 * - hasCacheValue
 * - deleteCacheValue
 * - clearCache
 * - getCacheSize
 * - getCacheKeys
 * - cleanupExpiredEntries
 * - getCacheStats
 * - createCacheKey
 * - memoize
 */

describe('Testing Caching functions',()=>{
   beforeEach(() => {
    clearCache();
    resetConfig();
    setConfig({ enableCaching: true, cacheTimeout: 100 });
  });

  afterEach(() => {
    clearCache();
    resetConfig();
  });

  test('setCacheValue and getCacheValue store and retrieve values', () => {
    setCacheValue('testKey', 123);
    expect(getCacheValue('testKey')).toBe(123);
  });

  test('getCacheValue returns undefined for missing key', () => {
    expect(getCacheValue('missingKey')).toBeUndefined();
  });
  test('hasCacheValue returns true for valid key', () => {
    setCacheValue('exists', 'value');
    expect(hasCacheValue('exists')).toBe(true);
  });

  test('hasCacheValue returns false for missing or expired key', done => {
    setCacheValue('temp', 'value', 10);
    setTimeout(() => {
      expect(hasCacheValue('temp')).toBe(false);
      done();
    }, 20);
  });

  test('deleteCacheValue removes a key', () => {
    setCacheValue('toDelete', 'value');
    deleteCacheValue('toDelete');
    expect(getCacheValue('toDelete')).toBeUndefined();
  });

  test('clearCache removes all keys', () => {
    setCacheValue('a', 1);
    setCacheValue('b', 2);
    clearCache();
    expect(getCacheSize()).toBe(0);
  });

  test('getCacheSize returns correct size', () => {
    setCacheValue('a', 1);
    setCacheValue('b', 2);
    expect(getCacheSize()).toBe(2);
  });

  test('getCacheKeys returns all keys', () => {
    setCacheValue('k1', 1);
    setCacheValue('k2', 2);
    expect(getCacheKeys().sort()).toEqual(['k1', 'k2']);
  });

  test('cleanupExpiredEntries removes expired items', done => {
    setCacheValue('exp1', 'v1', 10);
    setCacheValue('exp2', 'v2', 50);
    setTimeout(() => {
      const removed = cleanupExpiredEntries();
      expect(removed).toBeGreaterThanOrEqual(1);
      expect(hasCacheValue('exp1')).toBe(false);
      done();
    }, 20);
  });
  test('getCacheStats returns correct stats', () => {
    setCacheValue('stat1', 1);
    const stats = getCacheStats();
    expect(stats).toHaveProperty('size');
    expect(stats).toHaveProperty('keys');
    expect(stats).toHaveProperty('isEnabled');
    expect(stats).toHaveProperty('defaultTtl');
    expect(stats.keys).toContain('stat1');
    expect(typeof stats.size).toBe('number');
    expect(typeof stats.isEnabled).toBe('boolean');
    expect(typeof stats.defaultTtl).toBe('number');
  });

  test('createCacheKey joins parts correctly', () => {
    expect(createCacheKey('a', 1, 'b')).toBe('a:1:b');
  });

  test('memoize caches function results', () => {
    let callCount = 0;
    const fn = (x: number) => { 
      callCount++; 
      return x * 2; 
    };
    const memoized = memoize(fn, x => `double:${x}`);

    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(callCount).toBe(1); // Only called once, second call is cached
  });
  test('cache disables when enableCaching is false', () => {
    setConfig({ enableCaching: false });
    setCacheValue('disabled', 42);
    expect(getCacheValue('disabled')).toBeUndefined();
    expect(hasCacheValue('disabled')).toBe(false);
    expect(getCacheStats().isEnabled).toBe(false);
  });
})