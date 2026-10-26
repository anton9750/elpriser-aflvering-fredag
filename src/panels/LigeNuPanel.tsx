import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { CirkelMaaler } from '../components/CirkelMaaler'
import { useElpriser } from '../hooks/useElpriser'
import { useSettings } from '../context/SettingsContext'
import { medEventueltMoms, formaterPris } from '../utils/pris'
import { formaterKlokkeslæt } from '../utils/dato'

// Panelet der viser den aktuelle elpris lige nu, med den store runde måler.
// Bruges både som sin egen side på mobil, og som venstre kolonne i dashboardet på desktop.
export function LigeNuPanel() {
  const { region, visMedMoms } = useSettings()

  // "nu" opdateres hvert minut, så siden automatisk hopper videre til næste
  // time uden at brugeren skal genindlæse siden
  const [nu, sætNu] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      sætNu(new Date())
    }, 60_000)

    return () => clearInterval(interval)
  }, [])

  const { priser, henterData, fejl } = useElpriser(nu, region)

  const nuværendeTime = nu.getHours()
  const nuværendePunkt = priser.find((p) => p.timeStart.getHours() === nuværendeTime)

  const alleDkkPriser = priser.map((p) => p.dkkPerKwh)
  const minPris = alleDkkPriser.length > 0 ? Math.min(...alleDkkPriser) : 0
  const maxPris = alleDkkPriser.length > 0 ? Math.max(...alleDkkPriser) : 0

  const visningsPris = nuværendePunkt ? medEventueltMoms(nuværendePunkt.dkkPerKwh, visMedMoms) : 0

  // Jo billigere prisen er lige nu ift. dagens udsving, jo mere fyldt er måleren
  const fylde = maxPris === minPris || !nuværendePunkt ? 1 : 1 - (nuværendePunkt.dkkPerKwh - minPris) / (maxPris - minPris)

  // Finder den billigste sammenhængende time på dagen, til teksten under måleren
  const billigsteTime = priser.reduce<(typeof priser)[number] | null>((billigst, punkt) => {
    if (!billigst || punkt.dkkPerKwh < billigst.dkkPerKwh) {
      return punkt
    }
    return billigst
  }, null)

  return (
    <Card>
      <Titel>ELPRISEN LIGE NU</Titel>

      <MålerOmråde>
        {henterData && <StatusTekst>Henter priser...</StatusTekst>}
        {fejl && <StatusTekst>{fejl}</StatusTekst>}

        {!henterData && !fejl && (
          <CirkelMaaler størrelse={210} fylde={fylde}>
            <StorPris>{formaterPris(visningsPris)} KR</StorPris>
            <LilleTekst>PR. KWH</LilleTekst>
          </CirkelMaaler>
        )}
      </MålerOmråde>

      {billigsteTime && (
        <BilligsteInterval>
          {formaterKlokkeslæt(billigsteTime.timeStart)} - {formaterKlokkeslæt(billigsteTime.timeSlut)}
        </BilligsteInterval>
      )}
    </Card>
  )
}

const Titel = styled.h1`
  margin: 0 0 24px;

  text-align: center;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.06em;
`

const MålerOmråde = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 210px;
  margin-bottom: 20px;
`

const StatusTekst = styled.p`
  color: ${(props) => props.theme.colors.tekstDæmpet};
  font-size: 13px;
`

const StorPris = styled.span`
  display: block;
  margin-bottom: 6px;

  color: ${(props) => props.theme.colors.accent};
  font-size: 26px;
  font-weight: 700;
`

const LilleTekst = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.colors.tekstDæmpet};
  letter-spacing: 0.04em;
`

const BilligsteInterval = styled.p`
  margin: 0;
  text-align: center;

  color: ${(props) => props.theme.colors.accent};
  font-size: 14px;
  font-weight: 600;
`
