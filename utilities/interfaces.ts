export interface Country {
 name: Name
 tld: string[]
 currencies: Currencies
 capital: string[]
 region: string
 subregion: string
 languages: Languages
 borders: string[]
 population: number
 flags: Flags
}

export interface Flags {
 png: string
 svg: string
}

export interface Languages {
 [key: string]: string
}

export interface Currencies {
 [key: string]: Currency
}

export interface Currency {
 name: string
 symbol: string
}

export interface Name {
 common: string
 official: string
 nativeName: NativeName
}

export interface NativeName {
 [key: string]: NativeNames
}

export interface NativeNames {
 official: string
 common: string
}
