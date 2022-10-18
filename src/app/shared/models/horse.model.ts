import { Timestamp } from "firebase/firestore";

export interface Horse {
    id           : string,
    name         : string,
    year?         : number,
    dateOfBirth  : string,
    colour       : string,
    height       : number,
    gender       : HorseGender,
    registrations: string[],
    notes        : string[],
    sire         : string,
    dam          : string,
    images       : HorseImages
    route        : string,
    dateCreated  : Timestamp
    dateModified : Timestamp,
    isArchived   : boolean,
    progeny?      : string[],
    showResults?  : ShowResult[],
    relatedMares? : string[],
    webFilters : HorseWebFilter[]
}

export enum HorseGender {
    Unknown  = 0,
    Stallion = 1,
    Mare     = 2,
    Gelding  = 3
}

export enum HorseWebFilter {
    Unknown = 0,
    Breeding,
    Showing,
    Mare,
    Stallion, 
    Foal,
    Featured,
    Reference
}

export interface HorseImages {
    profileUrl    : string,
    profileAltText: string,
    gallery       : string[]
}

export interface ShowResult {
    id         : string,
    year       : number,
    title      : string,
    description: string,
    award      : string,
    location   : string
}