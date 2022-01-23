import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';
import { Horse, HorseGender, HorseImages, HorseWebFilter } from '../models/horse.model';
import { Strings } from '../strings';
import { Utilities } from '../utilities';
import { Timestamp } from 'firebase/firestore';
import { stringify } from '@angular/compiler/src/util';
import { Route } from '../models/web.models';

@Injectable({
    providedIn: 'root'
})

export class DataImport {

    private horses: Horse[] = [];

    constructor(
        private firestore: FirestoreService,
    ) { 
        this.horses = [ 
            {
                id           : "5R2RCqklBxZSrcoxoXy1",
                name         : "TLF Painted Affair",
                dateOfBirth  : "04/01/2014",
                colour       : "Bay Pinto",
                height       : 32,
                gender       : HorseGender.Mare,
                registrations: ["AMHA"],
                notes        : [""],
                sire         : "Donabi UK Uno Romantic Affair",
                dam          : "Tazaeos Pecans Inspiration",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "tlf-painted-affair",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Foal, HorseWebFilter.Mare]
            },
            {
                id           : "SkTm5L67Ixdss80oXPvo",
                name         : "TLF Afire Affair",
                dateOfBirth  : "21/01/2015",
                colour       : "Bay Pinto",
                height       : 32,
                gender       : HorseGender.Mare,
                registrations: ["AMHA"],
                notes        : [""],
                sire         : "Donabi UK Uno Romantic Affair",
                dam          : "Tazaeos Pecans Inspiration",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "tlf-afire-affair",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Foal, HorseWebFilter.Mare]
            },
            {
                id           : "uDJcxjQhzp0rXaLBS4X3",
                name         : "TLF Starring Affair",
                dateOfBirth  : "04/06/2018",
                colour       : "Bay",
                height       : 30,
                gender       : HorseGender.Mare,
                registrations: ["AMHA"],
                notes        : [""],
                sire         : "Donabi UK Uno Romantic Affair",
                dam          : "Tazaeos Pecans Inspiration",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "tlf-starring-affair",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Foal, HorseWebFilter.Mare]
            },
            {
                id           : "cVOFChamGT63cmHE85Jv",
                name         : "TLF Bellatrix",
                dateOfBirth  : "06/03/2020",
                colour       : "Bay Pinto",
                height       : 32,
                gender       : HorseGender.Mare,
                registrations: ["AMHA"],
                notes        : [""],
                sire         : "Exquisite Dazzles Batshuayi",
                dam          : "TLF Afire Affair",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "tlf-bellatrix",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Foal, HorseWebFilter.Mare]
            },
            {
                id           : "7PtgxTD9pRgmqPPfTjIz",
                name         : "TLF War Paint",
                dateOfBirth  : "04/07/2017",
                colour       : "Bay Pinto",
                height       : 32,
                gender       : HorseGender.Mare,
                registrations: ["AMHA"],
                notes        : [""],
                sire         : "JSW Beaus War Cry",
                dam          : "TLF Painted Affair",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "tlf-war-paint",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Foal, HorseWebFilter.Mare],
                relatedMares : ["dopXwPp7zhgKNODM1Zt8", "5R2RCqklBxZSrcoxoXy1", "SkTm5L67Ixdss80oXPvo", "uDJcxjQhzp0rXaLBS4X3", "cVOFChamGT63cmHE85Jv"]
            },
            {
                id           : "dopXwPp7zhgKNODM1Zt8",
                name         : "TLF Minx",
                dateOfBirth  : "06/07/2021",
                colour       : "Bay",
                height       : 32,
                gender       : HorseGender.Mare,
                registrations: ["AMHA"],
                notes        : [""],
                sire         : "Black Mountain Majestic Midnight",
                dam          : "TLF Starring Affair",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "tlf-minx",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Foal, HorseWebFilter.Mare]
            },
            {
                id           : "4WNnm9F65he5eHFDnvL8",
                name         : "Pecan Grove Bolerso Alessandra",
                dateOfBirth  : "04/01/2018",
                colour       : "Sorrel",
                height       : 32,
                gender       : HorseGender.Mare,
                registrations: ["AMHA", "AMHR"],
                notes        : [""],
                sire         : "SMO Bolero De Suerte",
                dam          : "ERL Cuttys Berry Blitz",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "pecan-grove-boleros-alessandra",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Mare]
            },
            {
                id           : "jnkFbrPQz5m6GNDfpaQP",
                name         : "Exquisite Boleros Evangelista",
                dateOfBirth  : "04/01/2014",
                colour       : "Sorrel",
                height       : 34,
                gender       : HorseGender.Mare,
                registrations: ["AMHA", "AMHR"], 
                notes        : [""],
                sire         : "SMO Bolero De Suerte",
                dam          : "RHA Captivating Hot Socks",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "exquisite-boleros-evangelista",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Mare]
            },
            {
                id           : "KKkVeUv52q7e9hTlepFq",
                name         : "AE Sheza Rouge",
                dateOfBirth  : "04/01/2018",
                colour       : "Bay Pinto",
                height       : 33,
                gender       : HorseGender.Mare,
                registrations: ["AMHA", "AMHR", "ASPC"],
                notes        : [""],
                sire         : "AE Revolution",
                dam          : "AE Detinys Darling",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "ae-sheza-rouge",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Mare]
            },
            {
                id           : "NKdxNmR4mUp6vORkHl05",
                name         : "Tazaeos Pecans Inspiration",
                dateOfBirth  : "04/04/2010",
                colour       : "Bay Pinto",
                height       : 30,
                gender       : HorseGender.Mare,
                registrations: ["AMHA"],
                notes        : [""],
                sire         : "Pecan Grove Spectacular Bid",
                dam          : "Squaw Creeks Unos Fancy",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "tazaeos-pecans-inspiration",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Mare]
            },
            {
                id           : "uRLBWpeuhjxQJXeAgQLl",
                name         : "Black Mountain Majestic Midnight",
                dateOfBirth  : "04/01/2009",
                colour       : "Black",
                height       : 32,
                gender       : HorseGender.Stallion,
                registrations: ["AMHA", "AMHR"],
                notes        : [""],
                sire         : "Sequoia Majestic Mime",
                dam          : "Alliance Miss Virginia",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "black-mountain-majestic-midnight",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Stallion]
            },
            {
                id           : "XVH6BkBFhyz717lIEL86",
                name         : "TLF Marvel",
                dateOfBirth  : "01/06/2021",
                colour       : "Bay",
                height       : 32,
                gender       : HorseGender.Stallion,
                registrations: ["AMHA"],
                notes        : [""],
                sire         : "Black Mountain Majestic Midnight",
                dam          : "Exquisite Boleros Evangelista",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "tlf-marvel",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Foal, HorseWebFilter.Stallion]
            },
            {
                id           : "QpUER4SEIX6q7cX4Bx1W",
                name         : "LV Roadmaster Sir Lancelot",
                dateOfBirth  : "04/01/2019",
                colour       : "Black Pinto",
                height       : 34,
                gender       : HorseGender.Stallion,
                registrations: ["AMHA", "AMHR", "ASPC"],
                notes        : [""],
                sire         : "Platinum Image Roadmaster",
                dam          : "SMO Assured 2 B Blu",
                images       : { profileUrl: "", profileAltText: "", gallery : [""] },
                route        : "lv-roadmaster-sir-lancelot",
                dateCreated  : Timestamp.now(),
                dateModified : Timestamp.now(),
                isArchived   : false,
                webFilters   : [HorseWebFilter.Breeding, HorseWebFilter.Stallion]
            }
        ]; 
    }

    public ImportHorses() {
        return this.firestore.reset(Strings.horsesCollection, this.horses).then(_ => {
            
            this.SetupHorseRoutes();
        });
    }

    private SetupHorseRoutes() {
        
        var routes = this.horses.map(horse => {
            return  {
                horseId: horse.id,
                id: horse.route
            } as Route;
        });
        
        return this.firestore.reset(Strings.routesCollection, routes);
    }

}
