import { Languages, regionsIds } from "../constants"

export const  validateLanguage = (language:string) =>{
    if(Object.values(Languages).includes(language.trim().toLowerCase() as Languages)) return language.trim().toLowerCase();
    return Languages.English
}

export const validateRegionId = (regionId:string)=>{
    if(!regionsIds.includes(regionId)) return false;
    return true;
}