import { getSupportedLanguages, isLanguageSupported, validateCityId, validateLanguage, validateLanguages, validateLanguageStrict, validateLanguageWithMode, validateRegionId, validateRegionIdStrict } from "../src";
import { Languages } from "../src/constants";
import { FirstMoroccanRegion, FirstMoroccanRegionCity, ProvidedLanguage } from "./index.test";

/**
 * Tested functions:
 * - validateLanguage
 * - validateLanguageStrict
 * - validateRegionId
 * - validateRegionIdStrict
 * - validateLanguageWithMode
 * - validateLanguages
 * - validateCityId
 * - isLanguageSupported
 * - getSupportedLanguages
 */

describe('Test Validation Functions',()=>{
    
   test('should validate a language and return the default one if it\'s unsupported',()=>{
      const arabicLanguage = validateLanguage(Languages.Arabic);
      const unSupportedLanguage = validateLanguage('unsupported-language');

      expect(arabicLanguage).toBe(Languages.Arabic);
      expect(unSupportedLanguage).toBe(Languages.English);
   });
   test('Should Stricly validate a language',()=>{
      const frenchLanguage = validateLanguageStrict(Languages.French);
      // Check french language is correcly validated
      expect(frenchLanguage).toBe(Languages.French);
      // Check that the given 'wrong-language' param value is not a supported language and will throw and error
      expect(() => validateLanguageStrict('wrong-language')).toThrow();
   });
   test('should validate a regionId',()=>{
      const validRegionId = validateRegionId(FirstMoroccanRegion.region_id);
      const invalidRegionId = validateRegionId(FirstMoroccanRegion.region_id+'make-it-wrong');
      
      // Check that the regionId is valid
      expect(validRegionId).toBe(true);
      // Check that the regionId is invalid
      expect(invalidRegionId).toBe(false);
   });

   test('should strictly validate a regionId',()=>{
      const regionId = validateRegionIdStrict(FirstMoroccanRegion.region_id);
      // Check that the regionId is valid
      expect(regionId).toBe(FirstMoroccanRegion.region_id);
      // Check that the regionId is invalid and the function will throw an error
      expect(() => validateRegionIdStrict(FirstMoroccanRegion.region_id+'make-it-wrong')).toThrow();
   });
    test('should validate language with a specific mode "strict" or "default" modes',()=>{
      const validateArabicLanguageStrictly = validateLanguageWithMode(Languages.Arabic,true);
      const validateFrenchLanguage = validateLanguageWithMode(Languages.French);
      // Check that the validateArabicLanguageStrictly is valid
      expect(validateArabicLanguageStrictly).toBe(Languages.Arabic);
      // Check that the validateFrenchLanguage is valid
      expect(validateFrenchLanguage).toBe(Languages.French);

      // Check that the language is invalid and the function will throw an error
      expect(() => validateLanguageWithMode('wrong-language',true)).toThrow();
   });
   test('should strictly validate all languages',()=>{
      const validateLanguagesList = validateLanguages(ProvidedLanguage);
      // Check that the all passed list of languages are supported
      expect(validateLanguagesList).toEqual(ProvidedLanguage);
      // Check that the some of the languages list is unsupported and the function will throw an error
      expect(() => validateLanguages(['wrong-language'],true)).toThrow();
   });
   test('should validate a city id',()=>{
      const validCityId = validateCityId(FirstMoroccanRegionCity.city_id);
      const invalidCityId = validateCityId(0);
      
      // Check that the cityId is valid
      expect(validCityId).toBe(true);
      // Check that the cityId is invalid
      expect(invalidCityId).toBe(false);
   });
   test('should check that a language supported or not',()=>{
      const isEnglishSupported = isLanguageSupported(Languages.English);
      const isWrongNameSupportedAsLanguage = isLanguageSupported('wrong-name');
      
      // Check that the isEnglishSupported is valid
      expect(isEnglishSupported).toBe(true);
      // Check that the isWrongNameSupportedAsLanguage is invalid
      expect(isWrongNameSupportedAsLanguage).toBe(false);
   });
   test('should get all supported languages',()=>{
       const supportedLanguages = getSupportedLanguages();
       // Check the supportedLanguages list is the same as the providedLnaguages
       expect(supportedLanguages).toEqual(ProvidedLanguage)
   });
});