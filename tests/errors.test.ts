import { createDataIntegrityError, createInvalidCityIdError, createInvalidLanguageError, createInvalidRegionIdError, isErrorType, throwDataIntegrityError, throwInvalidCityIdError, throwInvalidLanguageError, throwInvalidRegionIdError } from "../src";

/**
 * Should Test Error Handling functions:
 * - createInvalidLanguageError
 * - createInvalidRegionIdError
 * - createInvalidCityIdError
 * - createDataIntegrityError
 * - isErrorType
 * - throwInvalidLanguageError
 * - throwInvalidRegionIdError
 * - throwInvalidCityIdError
 * - throwDataIntegrityError
 */

describe('Error Handling Functions',()=>{
   test('createInvalidLanguageError returns proper error', () => {
    const err = createInvalidLanguageError('wrong-language');
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('InvalidLanguageError');
    expect(err.message).toContain('wrong-language');
    expect(err.message).toContain('Supported languages');
  });
  test('createInvalidRegionIdError returns proper error', () => {
    const err = createInvalidRegionIdError('bad-region-id');
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('InvalidRegionIdError');
    expect(err.message).toContain('bad-region-id');
  });
  test('createInvalidCityIdError returns proper error', () => {
    const err = createInvalidCityIdError(123);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('InvalidCityIdError');
    expect(err.message).toContain('123');
  });
  test('createDataIntegrityError returns proper error', () => {
    const err = createDataIntegrityError('missing field');
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('DataIntegrityError');
    expect(err.message).toContain('missing field');
  });
  test('isErrorType correctly identifies error type', () => {
    const err = createInvalidRegionIdError('bad-id');
    expect(isErrorType(err, 'InvalidRegionIdError')).toBe(true);
    expect(isErrorType(err, 'InvalidLanguageError')).toBe(false);
  });
  test('throwInvalidLanguageError throws', () => {
    expect(() => throwInvalidLanguageError('wrong-language')).toThrow();
  });
  test('throwInvalidRegionIdError throws', () => {
    expect(() => throwInvalidRegionIdError('bad-id')).toThrow();
  });
  test('throwInvalidCityIdError throws', () => {
    expect(() => throwInvalidCityIdError(123)).toThrow();
  });
  test('throwDataIntegrityError throws', () => {
    expect(() => throwDataIntegrityError('missing field')).toThrow('Data integrity error: missing field');
  });
})