export interface V1Horse {
    id?: string;
    name?: string;
    sire?: string;
    dam?: string;
    year?: number;
    gender?: string;
    height?: number;
    color?: string;
    breeder?: string;
    owner?: string;
    profile?: string;
    filter?: string[];
    registration?: string[];
    family?: string[];
    info?: string[];
    available?: boolean;
    sold?: boolean;
    progeny?: string[];
    pedigree?: {
        sire?: string;
        gsiretop?: string;
        gsiretopsire?: string;
        gsiretopdam?: string;
        gdamtop?: string;
        gdamtopsire?: string;
        gdamtopdam?: string;
        dam?: string;
        gsirebtm?: string;
        gsirebtmsire?: string;
        gsirebtmbtm?: string;
        gdambtm?: string;
        gdambtmsire?: string;
        gdambtmbtm?: string;
    };
    // Show results / accolades
    accolades?: Array<{ year?: number; description?: string }>;
}