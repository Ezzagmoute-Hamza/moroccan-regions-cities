# Moroccan Regions and Cities

A Node.js package to handle Moroccan regions and cities.

## Installation
Install the package via npm:

```bash
npm install moroccan-regions-cities
```

## Key Functions

Here are the key functions provided by this package, along with descriptions, parameters, and usage examples.

<strong>getAllRegions:</strong>
Returns a list of all Moroccan regions in specified language.
<ul>
  <li>
     Parameters: </br>
      <ul>
         <li>"language" parameter of type string, provided options are ('arabic','french','english') and the default value is 'english'</li>
      </ul>
  </li>
  <li>
     Example: </br>

     const { getAllRegions } = require('moroccan-regions-cities');
     const regions = getAllRegions('french');
     console.log(regions); Output: [{
            regionId: 'ba12f287-a8ea-4b11-9445-122c5f2e6a6c',
            regionName: 'Guelmim-Oued Noun'
        },
        {
            regionId: '51e3d7bb-fc82-4201-a852-bee031abe895',
            regionName: 'Laâyoune-Sakia El Hamra'
        },...]
        
  </li>
</ul>
---------------------------------------------------------<br>
<strong>countMoroccanRegions:</strong>
Returns the total number of regions in Morocco.
<ul>
  <li>
     Parameters: None </br>
  </li>
  <li>
     Example: </br>

     const { countMoroccanRegions } = require('moroccan-regions-cities'); 
     const regionCount = countMoroccanRegions();
     console.log(regionCount);  Output: 12
  </li>
</ul>

---------------------------------------------------------<br>
<strong>getAssignedMorrocanCities:</strong>
Returns a list of cities that are assigned to regions.
<ul>
  <li>
     Parameters: </br>
      <ul>
         <li>"language" parameter of type string, provided options are ('arabic','french','english') and the default value is 'english'</li>
      </ul>
  </li>
  <li>
     Example: </br>

     const { getAssignedMorrocanCities } = require('moroccan-regions-cities'); 
     const assignedCities = getAssignedMorrocanCities('arabic');
     console.log(assignedCities);  Output: ['طنجة','أصيلا','القصر الكبير',...]
    
  </li>
</ul>
---------------------------------------------------------<br>
<strong>getUnassignedCities:</strong>
Returns a list of cities that are Unassigned to regions.
<ul>
  <li>
     Parameters: </br>
      <ul>
         <li>"language" parameter of type string, provided options are ('arabic','french','english') and the default value is 'english'</li>
      </ul>
  </li>
  <li>
     Example: </br>

     const { getUnassignedCities } = require('moroccan-regions-cities');
     const unassignedCities = getUnassignedCities('french');</br>
     console.log(unassignedCities);  Output: ['Rich','Arbaoua','Sebta'...]
    
  </li>
</ul>

---------------------------------------------------------<br>
<strong>getRegionCities:</strong>
Returns a list of cities within a specific region in the specified language.
<ul>
  <li>
     Parameters: </br>
      <ul>
         <li>"regionId" parameter of type string, form of uuid, you can get it from the returned list of 'getAllRegions' function. </br>
         it's default value is the first regionId
         </li>
         <li>"language" parameter of type string, provided options are ('arabic','french','english') and the default value is 'english'
         </li>
      </ul>
  </li>
  <li>
     Example: </br>

     const { getRegionCities } = require('moroccan-regions-cities');
     const regionCities = getRegionCities();
     console.log(regionCities); Output: ['Tanger','Tetouan','Alhoceima'...]
    
  </li>
</ul>

---------------------------------------------------------<br>
<strong>countAllMoroccanCities:</strong>
Returns the total number of cities in Morocco.
<ul>
  <li>
     Parameters: None </br>
  </li>
  <li>
     Example: </br>

     const { countAllMoroccanCities } = require('moroccan-regions-cities');
     const countMorrocanCities = countAllMoroccanCities();
     console.log(countMorrocanCities); Output: 114 
  </li>
</ul>

---------------------------------------------------------<br>
<strong>countAssignedCities:</strong>
Returns the total count of cities that are assigned to regions.
<ul>
  <li>
     Parameters: None </br>
  </li>
  <li>
     Example: </br>

     const { countAssignedCities } = require('moroccan-regions-cities');
     const countMorrocanAssignedCities = countAssignedCities();
     console.log(countMorrocanAssignedCities); Output: 92 
  </li>
</ul>

---------------------------------------------------------<br>
<strong>countRegionCities:</strong>
Returns the total count of cities that are assigned to regions.
<ul>
  <li>
     Parameters: </br>
      <ul>
         <li>"regionId" parameter of type string, form of uuid, you can get it from the returned list of 'getAllRegions' function. </br>
         it's default value is the first regionId of 'getAllRegions' returned list
         </li>
      </ul>
  </li>
  <li>
     Example: </br>

     const { countRegionCities } = require('moroccan-regions-cities');
     const countregionCities = countRegionCities();
     console.log(countregionCities); Output: 9 
     Note: the Output is the number of cities of the first region of 'getAllRegions' list.
  </li>
</ul>

---------------------------------------------------------<br>
<strong>countUnassignedCities:</strong>
Returns the total count of cities that are assigned to regions.
<ul>
  <li>
     Parameters: None </br>
  </li>
  <li>
     Example: </br>

     const { countUnassignedCities } = require('moroccan-regions-cities'); 
     const countUnassignedcities = countUnassignedCities();
     console.log(countUnassignedcities); Output: 22 
  </li>
</ul>

## Note : 
### Functions are available for both CommonJS (require) and ES Modules (import): <br>
#### So you can do both of : 

```bash 
const {functionName} = require('moroccan-regions-cities');
import {functionName} from 'moroccan-regions-cities';
```
```bash
import allFunction from 'moroccan-regions-cities';
```
then call the function like this : `allFunction.functionName(?params)`

