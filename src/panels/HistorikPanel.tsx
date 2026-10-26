import styled from 'styled-components'
import { useState, type ChangeEvent } from 'react'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from '../components/Card'
import { PrisListeLinje } from '../components/PrisListeLinje'
import { useElpriser } from '../hooks/useElpriser'
import { useSettings } from '../context/SettingsContext'
import { medEventueltMoms, formaterPris } from '../utils/pris'
import { formaterDatoKort, formaterKlokkeslæt, tilInputDato } from '../utils/dato'
import { prisfarve } from '../utils/prisfarve'

// Historik-panelet, hvor man kan vælge en vilkårlig dato og se timepriserne for den dag.
// Elprisenligenu.dk's API understøtter historik tilbage til 1. november 2022.
export function HistorikPanel() {
  const { region, visMedMoms } = useSettings()
  const [valgtDato, sætValgtDato] = useState(new Date())

  const { priser, henterData, fejl } = useElpriser(valgtDato, region)

  const alleDkkPriser = priser.map((p) => p.dkkPerKwh)
  const minPris = alleDkkPriser.length > 0 ? Math.min(...alleDkkPriser) : 0
  const maxPris = alleDkkPriser.length > 0 ? Math.max(...alleDkkPriser) : 0

  function håndterDatoÆndring(event: ChangeEvent<HTMLInputElement>) {
    const nyDato = event.target.valueAsDate

    if (nyDato) {
      // input[type=date] giver dato i UTC midnat, så vi justerer til lokal tid
      sætValgtDato(new Date(nyDato.getUTCFullYear(), nyDato.getUTCMonth(), nyDato.getUTCDate()))
    }
  }

  return (
    <Card>
      <Titel>HISTORIK</Titel>

      <DatoVælgerBoks>
        <DatoInput type="date" value={tilInputDato(valgtDato)} onChange={håndterDatoÆndring} max={tilInputDato(new Date())} />
        <KalenderIkon>
          <FontAwesomeIcon icon={faCalendarDays} />
        </KalenderIkon>
      </DatoVælgerBoks>

      <Undertitel>ELPRISERNE D. {formaterDatoKort(valgtDato)}</Undertitel>

      {henterData && <StatusTekst>Henter priser...</StatusTekst>}
      {fejl && <StatusTekst>{fejl}</StatusTekst>}

      {!henterData && !fejl && (
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
      )}
    </Card>
  )
}

const Titel = styled.h1`
  margin: 0 0 20px;

  text-align: center;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.06em;
`

const DatoVælgerBoks = styled.div`
  position: relative;
  margin-bottom: 18px;
`

const DatoInput = styled.input`
  width: 100%;
  padding: 10px 36px 10px 12px;

  background: ${(props) => props.theme.colors.baggrund};
  border: 1px solid ${(props) => props.theme.colors.kortKant};
  border-radius: ${(props) => props.theme.radius.lille};

  color: ${(props) => props.theme.colors.tekst};
  font-size: 13px;

  /* Skjuler browserens eget kalender-ikon, så vores FontAwesome-ikon ikke dubleres */
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
`

const KalenderIkon = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);

  color: ${(props) => props.theme.colors.accent};
  font-size: 13px;
  pointer-events: none;
`

const Undertitel = styled.p`
  margin: 0 0 16px;

  text-align: center;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: ${(props) => props.theme.colors.tekstDæmpet};
`

const StatusTekst = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.tekstDæmpet};
  font-size: 13px;
`

const Liste = styled.div`
  max-height: 420px;
  overflow-y: auto;
`
