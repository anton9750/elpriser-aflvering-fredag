import { useEffect, useState } from 'react'
import type { ElprisRaa, Prisklasse, Prispunkt } from '../types/elpris'
import { tilApiDatoDele } from '../utils/dato'

interface UseElpriserResultat {
  priser: Prispunkt[]
  henterData: boolean
  fejl: string | null
}

// Henter elpriser for en given dag og region fra elprisenligenu.dk's gratis API.
// Bruger kun useState + useEffect, helt uden useCallback/useMemo, som aftalt.
export function useElpriser(dato: Date, region: Prisklasse): UseElpriserResultat {
  const [priser, sætPriser] = useState<Prispunkt[]>([])
  const [henterData, sætHenterData] = useState(true)
  const [fejl, sætFejl] = useState<string | null>(null)

  useEffect(() => {
    // "annulleret" bruges til at undgå at opdatere state, hvis komponenten
    // er skiftet til en ny dato/region inden det gamle kald er færdigt
    let annulleret = false

    async function hentPriser() {
      sætHenterData(true)
      sætFejl(null)

      try {
        const { aar, maaned, dag } = tilApiDatoDele(dato)
        const url = `https://www.elprisenligenu.dk/api/v1/prices/${aar}/${maaned}-${dag}_${region}.json`

        const svar = await fetch(url)

        if (!svar.ok) {
          throw new Error('Kunne ikke hente elpriserne lige nu')
        }

        const raaData: ElprisRaa[] = await svar.json()

        if (!annulleret) {
          const behandletData = raaData.map((punkt) => ({
            dkkPerKwh: punkt.DKK_per_kWh,
            timeStart: new Date(punkt.time_start),
            timeSlut: new Date(punkt.time_end),
          }))

          sætPriser(behandletData)
        }
      } catch {
        if (!annulleret) {
          sætFejl('Kunne ikke hente elpriser. Prøv igen om lidt.')
          sætPriser([])
        }
      } finally {
        if (!annulleret) {
          sætHenterData(false)
        }
      }
    }

    hentPriser()

    return () => {
      annulleret = true
    }
  }, [dato.getFullYear(), dato.getMonth(), dato.getDate(), region])

  return { priser, henterData, fejl }
}
