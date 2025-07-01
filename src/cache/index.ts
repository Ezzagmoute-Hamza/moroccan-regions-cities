/**
 * Caching module for the Moroccan regions and cities package
 */

import { getConfig } from '../config';

/**
 * Cache entry interface
 */
interface CacheEntry<T> {
  value: T;
  expiry: number;
}

/**
 * Cache storage
 */
const cache = new Map<string, CacheEntry<any>>();

/**
 * Sets a value in the cache with optional TTL
 * @param key - Cache key
 * @param value - Value to cache
 * @param ttl - Time to live in milliseconds (optional, uses config default)
 */
export function setCacheValue<T>(key: string, value: T, ttl?: number): void {
  const config = getConfig();
  if (!config.enableCaching) {
    return;
  }
  
  const actualTtl = ttl ?? config.cacheTimeout;
  const expiry = Date.now() + actualTtl;
  
  cache.set(key, {
    value,
    expiry
  });
}

/**
 * Gets a value from the cache
 * @param key - Cache key
 * @returns Cached value or undefined if not found/expired
 */
export function getCacheValue<T>(key: string): T | undefined {
  const config = getConfig();
  if (!config.enableCaching) {
    return undefined;
  }
  
  const entry = cache.get(key);
  if (!entry) {
    return undefined;
  }
  
  // Check if expired
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return undefined;
  }
  
  return entry.value as T;
}

/**
 * Checks if a key exists in the cache and is not expired
 * @param key - Cache key
 * @returns true if key exists and is valid
 */
export function hasCacheValue(key: string): boolean {
  const config = getConfig();
  if (!config.enableCaching) {
    return false;
  }
  
  const entry = cache.get(key);
  if (!entry) {
    return false;
  }
  
  // Check if expired
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return false;
  }
  
  return true;
}

/**
 * Deletes a specific key from the cache
 * @param key - Cache key to delete
 */
export function deleteCacheValue(key: string): void {
  cache.delete(key);
}

/**
 * Clears all cache entries
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Gets the number of items in the cache
 * @returns Number of cached items
 */
export function getCacheSize(): number {
  return cache.size;
}

/**
 * Gets all cache keys
 * @returns Array of cache keys
 */
export function getCacheKeys(): string[] {
  return Array.from(cache.keys());
}

/**
 * Removes expired entries from the cache
 * @returns Number of entries removed
 */
export function cleanupExpiredEntries(): number {
  let removedCount = 0;
  const now = Date.now();
  
  for (const [key, entry] of cache.entries()) {
    if (now > entry.expiry) {
      cache.delete(key);
      removedCount++;
    }
  }
  
  return removedCount;
}

/**
 * Gets cache statistics
 * @returns Cache statistics object
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
  isEnabled: boolean;
  defaultTtl: number;
} {
  const config = getConfig();
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
    isEnabled: config.enableCaching,
    defaultTtl: config.cacheTimeout
  };
}

/**
 * Creates a cache key from multiple parts
 * @param parts - Parts to join into a cache key
 * @returns Cache key string
 */
export function createCacheKey(...parts: (string | number)[]): string {
  return parts.join(':');
}

/**
 * Memoization function that caches function results
 * @param fn - Function to memoize
 * @param keyGenerator - Function to generate cache key from arguments
 * @param ttl - Time to live for cached results
 * @returns Memoized function
 */
export function memoize<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  keyGenerator: (...args: TArgs) => string,
  ttl?: number
): (...args: TArgs) => TReturn {
  return (...args: TArgs): TReturn => {
    const key = keyGenerator(...args);
    const cachedValue = getCacheValue<TReturn>(key);
    
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    
    const result = fn(...args);
    setCacheValue(key, result, ttl);
    return result;
  };
}
