# 🇲🇦 Moroccan Regions and Cities

A comprehensive, type-safe Node.js package for handling Moroccan regions and cities with advanced features including caching, validation, search functionality, and multi-language support.

## ✨ Features

- 🌍 **Multi-language support** (Arabic, French, English)
- 🔍 **Search functionality** for regions and cities
- ⚡ **Intelligent caching** with configurable TTL
- 🛡️ **Type-safe** with full TypeScript support
- ✅ **Input validation** with customizable strictness
- 🎯 **Utility functions** for advanced data operations
- 📊 **Data integrity validation**
- ⚙️ **Configurable** behavior and settings

## 🚀 Installation

Install the package via npm:

```bash
npm install moroccan-regions-cities
```

## 🚀 Quick Start

```javascript
// ES Modules
import { getAllRegions, searchCities, setConfig } from 'moroccan-regions-cities';

// CommonJS
const { getAllRegions, searchCities, setConfig } = require('moroccan-regions-cities');

// Get all regions in French
const regions = getAllRegions('french');
console.log(regions);

// Search for cities
const cities = searchCities('Casa', 'english');
console.log(cities);

// Configure the package
setConfig({
  defaultLanguage: 'french',
  enableCaching: true,
  strictValidation: true
});
```

## 📚 API Reference

### Core Functions

#### `getAllRegions(language?)`
Returns all Moroccan regions in the specified language.

**Parameters:**
- `language` (optional): `'english'` | `'french'` | `'arabic'` (default: `'english'`)

**Returns:** `Region[]`

```javascript
const regions = getAllRegions('french');
// [{ regionId: 'uuid', regionName: 'Tanger-Tétouan-Al Hoceïma' }, ...]
```

#### `countMoroccanRegions()`
Returns the total number of regions in Morocco.

**Returns:** `number`

```javascript
const count = countMoroccanRegions(); // 12
```

### City Functions

#### `getAssignedMorrocanCities(language?)`
Returns cities that are assigned to regions.

**Parameters:**
- `language` (optional): Language for city names

**Returns:** `string[]`

```javascript
const cities = getAssignedMorrocanCities('arabic');
// ['طنجة', 'أصيلا', 'القصر الكبير', ...]
```

#### `getUnassignedCities(language?)`
Returns cities that are not assigned to any region.

**Parameters:**
- `language` (optional): Language for city names

**Returns:** `string[]`

```javascript
const unassigned = getUnassignedCities('french');
// ['Rich', 'Arbaoua', 'Sebta', ...]
```

#### `getRegionCities(regionId?, language?)`
Returns cities within a specific region.

**Parameters:**
- `regionId` (optional): Region UUID (default: first region)
- `language` (optional): Language for city names

**Returns:** `string[]`

```javascript
const regionCities = getRegionCities('region-uuid', 'english');
// ['Tanger', 'Tetouan', 'Alhoceima', ...]
```

### Search Functions

#### `searchRegions(query, language?)`
Search for regions by name.

**Parameters:**
- `query`: Search term
- `language` (optional): Language to search in

**Returns:** `Region[]`

```javascript
const results = searchRegions('Casa', 'english');
// [{ regionId: 'uuid', regionName: 'Casablanca-Settat' }]
```

#### `searchCities(query, language?)`
Search for cities by name.

**Parameters:**
- `query`: Search term
- `language` (optional): Language to search in

**Returns:** `string[]`

```javascript
const cities = searchCities('Rabat', 'french');
// ['Rabat', 'Rabat-Salé', ...]
```

### Utility Functions

#### `getRegionByName(regionName, language?)`
Find a region by its name.

**Returns:** `Region | null`

```javascript
const region = getRegionByName('Casablanca-Settat');
// { regionId: 'uuid', regionName: 'Casablanca-Settat' }
```

#### `getCityDetails(cityName, language?)`
Get detailed information about a city.

**Returns:** City details object or `null`

```javascript
const details = getCityDetails('Casablanca');
// { cityId: 1, cityName: 'Casablanca', regionId: 'uuid', isAssigned: true }
```

#### `getAllCities(language?)`
Get all cities in Morocco.

**Returns:** `string[]`

```javascript
const allCities = getAllCities('english');
// ['Casablanca', 'Rabat', 'Fez', ...]
```

#### `cityExists(cityName, language?)`
Check if a city exists in the dataset.

**Returns:** `boolean`

```javascript
const exists = cityExists('Casablanca'); // true
```

#### `regionExists(regionName, language?)`
Check if a region exists in the dataset.

**Returns:** `boolean`

```javascript
const exists = regionExists('Casablanca-Settat'); // true
```

### Count Functions

#### `countAllMoroccanCities()`
Returns the total number of cities.

**Returns:** `number`

```javascript
const total = countAllMoroccanCities(); // 114
```

#### `countAssignedCities()`
Returns the count of cities assigned to regions.

**Returns:** `number`

```javascript
const assigned = countAssignedCities(); // 92
```

#### `countUnassignedCities()`
Returns the count of unassigned cities.

**Returns:** `number`

```javascript
const unassigned = countUnassignedCities(); // 22
```

#### `countRegionCities(regionId?)`
Returns the count of cities in a specific region.

**Parameters:**
- `regionId` (optional): Region UUID

**Returns:** `number`

```javascript
const count = countRegionCities('region-uuid'); // 9
```

#### `getCitiesCountByRegion(regionId)`
Get the number of cities in a specific region.

**Parameters:**
- `regionId`: Region UUID (required)

**Returns:** `number`

```javascript
const count = getCitiesCountByRegion('region-uuid'); // 15
```

### Random Functions

#### `getRandomRegions(count, language?)`
Get random regions.

**Parameters:**
- `count`: Number of regions to return
- `language` (optional): Language for region names

**Returns:** `Region[]`

```javascript
const random = getRandomRegions(3, 'french');
// [{ regionId: 'uuid', regionName: 'Marrakech-Safi' }, ...]
```

#### `getRandomCities(count, language?)`
Get random cities.

**Parameters:**
- `count`: Number of cities to return
- `language` (optional): Language for city names

**Returns:** `string[]`

```javascript
const randomCities = getRandomCities(5, 'arabic');
// ['الدار البيضاء', 'الرباط', ...]
```

## ⚙️ Configuration

### Configuration Options

```javascript
import { setConfig, getConfig } from 'moroccan-regions-cities';

// Set configuration
setConfig({
  defaultLanguage: 'french',    // Default language for all functions
  enableCaching: true,          // Enable/disable caching
  cacheTimeout: 300000,         // Cache timeout in milliseconds (5 min)
  strictValidation: false,      // Enable strict validation mode
  enableDebugMode: false        // Enable debug logging
});

// Get current configuration
const config = getConfig();
console.log(config);
```

### Individual Configuration Functions

```javascript
// Language settings
setDefaultLanguage('french');
const lang = getDefaultLanguage();

// Caching settings
setCachingEnabled(true);
const isCaching = isCachingEnabled();

setCacheTimeout(600000); // 10 minutes
const timeout = getCacheTimeout();

// Validation settings
setStrictValidationEnabled(true);
const isStrict = isStrictValidationEnabled();

// Debug mode
setDebugModeEnabled(true);
const isDebug = isDebugModeEnabled();

// Reset to defaults
resetConfig();
```

## 🗄️ Cache Management

```javascript
import { 
  getCacheStats, 
  clearCache, 
  cleanupExpiredEntries,
  setCacheValue,
  getCacheValue 
} from 'moroccan-regions-cities';

// Get cache statistics
const stats = getCacheStats();
console.log(stats); // { size: 10, keys: [...], isEnabled: true, defaultTtl: 300000 }

// Clear all cache
clearCache();

// Clean expired entries
const removed = cleanupExpiredEntries();
console.log(`Removed ${removed} expired entries`);

// Manual cache operations
setCacheValue('my-key', { data: 'value' }, 60000); // 1 minute TTL
const cached = getCacheValue('my-key');
```

## ✅ Validation

### Input Validation

```javascript
import { 
  validateLanguage, 
  validateLanguageStrict,
  validateRegionId,
  validateRegionIdStrict,
  isLanguageSupported 
} from 'moroccan-regions-cities';

// Flexible validation (returns fallback)
const lang = validateLanguage('invalid'); // Returns 'english'

// Strict validation (throws error)
try {
  const strictLang = validateLanguageStrict('invalid');
} catch (error) {
  console.log(error.name); // 'InvalidLanguageError'
}

// Check if language is supported
const isSupported = isLanguageSupported('french'); // true

// Region validation
const isValidRegion = validateRegionId('some-uuid'); // boolean
```

### Data Integrity

```javascript
import { 
  validateDataIntegrity, 
  validateDataIntegrityStrict,
  performDataHealthCheck 
} from 'moroccan-regions-cities';

// Check data integrity
const integrity = validateDataIntegrity();
if (!integrity.isValid) {
  console.log('Errors:', integrity.errors);
}

// Strict validation (throws if invalid)
try {
  validateDataIntegrityStrict();
} catch (error) {
  console.log('Data integrity issue:', error.message);
}

// Comprehensive health check
const health = performDataHealthCheck();
console.log('Health status:', health.isHealthy);
console.log('Recommendations:', health.recommendations);
```

## 🛡️ Error Handling

The package provides function-based error handling:

```javascript
import { 
  createInvalidLanguageError,
  createInvalidRegionIdError,
  isErrorType,
  throwInvalidLanguageError 
} from 'moroccan-regions-cities';

// Create custom errors
const error = createInvalidLanguageError('unknown');

// Check error types
if (isErrorType(error, 'InvalidLanguageError')) {
  console.log('This is a language error');
}

// Throw errors directly
try {
  throwInvalidLanguageError('bad-language');
} catch (err) {
  console.log(err.message); // "Invalid language: bad-language..."
}
```

## 📊 Types (TypeScript)

```typescript
import type { 
  Region, 
  City, 
  RegionWithCities, 
  SupportedLanguage,
  PackageConfig,
  ErrorType 
} from 'moroccan-regions-cities';

// Use types in your code
const region: Region = {
  regionId: 'uuid',
  regionName: 'Casablanca-Settat'
};

const config: PackageConfig = {
  defaultLanguage: 'english',
  enableCaching: true,
  cacheTimeout: 300000,
  strictValidation: false,
  enableDebugMode: false
};
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Lint the code
npm run lint

# Format the code
npm run format
```

## 📈 Performance

- **Caching**: Intelligent caching system reduces repeated data processing
- **Lazy Loading**: Data is loaded only when needed
- **Memory Efficient**: Optimized data structures and garbage collection
- **Type Safety**: Full TypeScript support prevents runtime errors

## 🌍 Language Support

The package supports three languages for all region and city names:

- **English** (`'english'`) - Default
- **French** (`'french'`) - Français
- **Arabic** (`'arabic'`) - العربية

```javascript
// Get regions in different languages
const englishRegions = getAllRegions('english');
const frenchRegions = getAllRegions('french');
const arabicRegions = getAllRegions('arabic');
```

## 🤝 Contributing

We welcome contributions to improve and expand this package! Here are some ways you can contribute:

### 🎯 Areas for Contribution

**1. Additional Features:**
- Geographic coordinates for regions and cities
- Population data integration
- Economic indicators
- Tourism information
- Weather data integration

**2. Performance Improvements:**
- Database integration options
- Advanced caching strategies
- Memory optimization
- Query optimization

**3. Developer Experience:**
- Better documentation
- More examples
- Interactive demos
- CLI tools

**4. Data Quality:**
- Additional city data
- Data verification
- Multilingual improvements
- Administrative divisions

### 📋 How to Contribute

1. **Fork the Repository**
   ```bash
   https://github.com/Ezzagmoute-Hamza/moroccan-regions-cities.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **Make Your Changes**
   - Implement your feature
   - Add tests
   - Update documentation
   - Follow the coding standards

4. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   git push origin feature/amazing-new-feature
   ```

6. **Create a Pull Request**
   - Describe your changes
   - Include tests and documentation
   - Reference any related issues

### 📝 Development Guidelines

- **Code Style**: Follow TypeScript best practices
- **Testing**: Write tests for new features
- **Documentation**: Update README and JSDoc comments
- **Performance**: Consider performance implications
- **Type Safety**: Maintain full TypeScript support

## 📊 Data Statistics

```javascript
import { getDataStatistics, performDataHealthCheck } from 'moroccan-regions-cities';

// Get dataset statistics
const stats = getDataStatistics();
console.log(stats);
// {
//   regionsCount: 12,
//   assignedCitiesCount: 92,
//   unassignedCitiesCount: 22,
//   totalCitiesCount: 114,
//   averageCitiesPerRegion: 7.67
// }

// Perform comprehensive health check
const health = performDataHealthCheck();
console.log(health.isHealthy); // true/false
console.log(health.recommendations); // Array of improvement suggestions
```

## 🔐 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/CHANGELOG.md/moroccan-regions-cities/issues)
- **Documentation**: [Full Documentation](https://github.com/CHANGELOG.md/moroccan-regions-cities#readme)
<!-- - **Examples**: [Example Repository](https://github.com/CHANGELOG.md/moroccan-regions-cities-examples) -->

## 🙏 Acknowledgments

- Data sourced from official Moroccan administrative divisions
- Community contributors and maintainers
- Open source libraries and tools used in this project

## 📈 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes in each version.

---

**Made with ❤️ for the Moroccan developer community**
