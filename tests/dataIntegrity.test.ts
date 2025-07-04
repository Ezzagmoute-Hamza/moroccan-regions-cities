import {getDataStatistics, isDatasetComplete, performDataHealthCheck, validateDataIntegrity, validateDataIntegrityStrict} from '../src/validation/data-integrity';

/**
 * Should Test Data-Integrity functions:
 * - validateDataIntegrity
 * - validateDataIntegrityStrict
 * - getDataStatistics
 * - isDatasetComplete
 * - performDataHealthCheck
 */
describe('Testing Data-Integrity functions',()=>{
   test('validateDataIntegrity returns valid result structure', () => {
    const result = validateDataIntegrity();
    expect(result).toHaveProperty('isValid');
    expect(result).toHaveProperty('errors');
    expect(Array.isArray(result.errors)).toBe(true);
    expect(result.errors.length).toBe(0);
    expect(typeof result.isValid).toBe('boolean');
    expect(result.isValid).toBe(true);
    
  });

  test('validateDataIntegrityStrict should not throw an error if data is valid', () => {
    expect(() => validateDataIntegrityStrict()).not.toThrow();
  });

  test('getDataStatistics returns correct structure', () => {
    const stats = getDataStatistics();
    expect(stats).toHaveProperty('regionsCount');
    expect(stats).toHaveProperty('assignedCitiesCount');
    expect(stats).toHaveProperty('unassignedCitiesCount');
    expect(stats).toHaveProperty('totalCitiesCount');
    expect(stats).toHaveProperty('averageCitiesPerRegion');
    expect(typeof stats.regionsCount).toBe('number');
    expect(typeof stats.assignedCitiesCount).toBe('number');
    expect(typeof stats.unassignedCitiesCount).toBe('number');
    expect(typeof stats.totalCitiesCount).toBe('number');
    expect(typeof stats.averageCitiesPerRegion).toBe('number');
  });

  test('isDatasetComplete returns a boolean', () => {
    const complete = isDatasetComplete();
    expect(typeof complete).toBe('boolean');
  });
   test('performDataHealthCheck returns correct structure', () => {
    const health = performDataHealthCheck();
    expect(health).toHaveProperty('isHealthy');
    expect(health).toHaveProperty('integrity');
    expect(health).toHaveProperty('statistics');
    expect(health).toHaveProperty('isComplete');
    expect(health).toHaveProperty('recommendations');
    expect(typeof health.isHealthy).toBe('boolean');
    expect(typeof health.isComplete).toBe('boolean');
    expect(Array.isArray(health.recommendations)).toBe(true);
    expect(health.integrity).toHaveProperty('isValid');
    expect(health.integrity).toHaveProperty('errors');
    expect(health.statistics).toHaveProperty('regionsCount');
  });
})