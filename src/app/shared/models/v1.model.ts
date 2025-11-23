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
}