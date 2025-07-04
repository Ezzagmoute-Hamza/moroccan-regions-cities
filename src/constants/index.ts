import data from '../data/regions.json';


export const regionsIds:string[] = data.regions.map(region => region.region_id);

export enum Languages {
    English = "english",
    French = "french",
    Arabic = "arabic"
}

type RegionLanguageKey = 'region_english' | 'region_french' | 'region_arabic';
type CityLanguageKey = 'city_english' | 'city_french' | 'city_arabic';

export const RegionLanguageKeyMap: Record<Languages | "default", RegionLanguageKey> = {
    [Languages.English]: "region_english",
    [Languages.French]: "region_french",
    [Languages.Arabic]: "region_arabic",
    default: "region_english"
};

export const CityLanguageKeyMap: Record<Languages | "default", CityLanguageKey> = {
    [Languages.English]: "city_english",
    [Languages.French]: "city_french",
    [Languages.Arabic]: "city_arabic",
    default: "city_english"
};

export const moroccoGlobals = {
   regions : 12,
   assignedCities:92,
   unassignedCities:22,
   allCities:92+22,
   selectedRegionCitiesNumber:0
}
