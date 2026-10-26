import styled from 'styled-components'
import { Card } from '../components/Card'
import { CirkelMaaler } from '../components/CirkelMaaler'
import { PrisListeLinje } from '../components/PrisListeLinje'
import { useElpriser } from '../hooks/useElpriser'
import { useSettings } from '../context/SettingsContext'
import { medEventueltMoms, formaterPris } from '../utils/pris'
import { formaterKlokkeslæt } from '../utils/dato'
import { prisfarve } from '../utils/prisfarve'

// Panelet der viser et overblik over hele dagens priser: laveste/højeste måler
// øverst, og en liste med alle 24 timer nedenunder.
export function OversigtPanel() {
  const { region, visMedMoms } = useSettings()
  const { priser, henterData, fejl } = useElpriser(new Date(), region)

  const alleDkkPriser = priser.map((p) => p.dkkPerKwh)
  const minPris = alleDkkPriser.length > 0 ? Math.min(...alleDkkPriser) : 0
  const maxPris = alleDkkPriser.length > 0 ? Math.max(...alleDkkPriser) : 0

  return (
    <Card>
      <Titel>OVERSIGT</Titel>

      {henterData && <StatusTekst>Henter priser...</StatusTekst>}
      {fejl && <StatusTekst>{fejl}</StatusTekst>}

      {!henterData && !fejl && (
        <>
          <MåleRække>
            <MålerMedLabel>
              <CirkelMaaler størrelse={90} fylde={1}>
                <LilleStorPris>{formaterPris(medEventueltMoms(minPris, visMedMoms))} KR</LilleStorPris>
                <MikroTekst>PR. KWH</MikroTekst>
              </CirkelMaaler>
              <Label>LAVESTE PRIS</Label>
            </MålerMedLabel>

            <MålerMedLabel>
              <CirkelMaaler størrelse={90} fylde={1}>
                <LilleStorPris>{formaterPris(medEventueltMoms(maxPris, visMedMoms))} KR</LilleStorPris>
                <MikroTekst>PR. KWH</MikroTekst>
              </CirkelMaaler>
              <Label>HØJESTE PRIS</Label>
            </MålerMedLabel>
          </MåleRække>

          <Liste>
            {priser.map((punkt) => (
              <PrisListeLinje
                key={punkt.timeStart.toISOString()}
                klokkeslæt={formaterKlokkeslæt(punkt.timeStart)}
                pris={formaterPris(medEventueltMoms(punkt.dkkPerKwh, visMedMoms))}
                farve={prisfarve(punkt.dkkPerKwh, minPris, maxPris)}
              />
            ))}
          </Liste>
        </>
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

const StatusTekst = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.tekstDæmpet};
  font-size: 13px;
`

const MåleRække = styled.div`
  display: flex;
  justify-content: center;
  gap: 28px;

  margin-bottom: 26px;
`

const MålerMedLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const LilleStorPris = styled.span`
  display: block;
  color: ${(props) => props.theme.colors.accent};
  font-size: 11px;
  font-weight: 700;
`

const MikroTekst = styled.span`
  font-size: 8px;
  color: ${(props) => props.theme.colors.tekstDæmpet};
`

const Label = styled.span`
  font-size: 10px;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.colors.tekstDæmpet};
`

const Liste = styled.div`
  max-height: 420px;
  overflow-y: auto;
`
