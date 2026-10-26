// Typer der matcher den rå json-respons fra elprisenligenu.dk's API.
// Se dokumentation: https://www.elprisenligenu.dk/elpris-api

export interface ElprisRaa {
  DKK_per_kWh: number
  EUR_per_kWh: number
  EXR: number
  time_start: string
  time_end: string
}

// De to danske prisområder, som API'et opererer med.
// DK1 = Vest for Storebælt (Jylland/Fyn), DK2 = Øst for Storebælt (Sjælland/København)
export type Prisklasse = 'DK1' | 'DK2'

// Et enkelt behandlet prispunkt, klar til at blive vist i UI'et.
export interface Prispunkt {
  dkkPerKwh: number
  timeStart: Date
  timeSlut: Date
}
