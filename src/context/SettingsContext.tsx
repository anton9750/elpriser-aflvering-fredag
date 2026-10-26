import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Prisklasse } from '../types/elpris'

// Samler al den indstilling-relaterede tilstand ét sted, så alle sider
// (lige nu, historik, oversigt) viser priser på samme måde.
interface SettingsContextType {
  // Hvilket af de to danske prisområder brugeren kigger på
  region: Prisklasse
  sætRegion: (region: Prisklasse) => void

  // Om priserne der vises skal inkludere moms (25%) eller ej
  visMedMoms: boolean
  sætVisMedMoms: (værdi: boolean) => void

  // Om brugeren vil have besked ved laveste pris (kun en UI-tilstand her, ingen rigtig notifikation)
  lavesteprisAlarm: boolean
  sætLavesteprisAlarm: (værdi: boolean) => void

  // Om indstillings-panelet er åbent lige nu (bruges til modal på desktop / fuld side på mobil)
  indstillingerÅben: boolean
  åbnIndstillinger: () => void
  lukIndstillinger: () => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [region, sætRegion] = useState<Prisklasse>('DK2')
  const [visMedMoms, sætVisMedMoms] = useState(false)
  const [lavesteprisAlarm, sætLavesteprisAlarm] = useState(true)
  const [indstillingerÅben, sætIndstillingerÅben] = useState(false)

  const værdi: SettingsContextType = {
    region,
    sætRegion,
    visMedMoms,
    sætVisMedMoms,
    lavesteprisAlarm,
    sætLavesteprisAlarm,
    indstillingerÅben,
    åbnIndstillinger: () => sætIndstillingerÅben(true),
    lukIndstillinger: () => sætIndstillingerÅben(false),
  }

  return <SettingsContext.Provider value={værdi}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useSettings skal bruges indenfor en SettingsProvider')
  }

  return context
}

// Henter navnet på regionen til visning i footeren, fx "Øst Danmark"
export function regionsNavn(region: Prisklasse): string {
  return region === 'DK2' ? 'Øst Danmark' : 'Vest Danmark'
}
