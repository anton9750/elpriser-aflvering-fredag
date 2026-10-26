import styled from 'styled-components'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSettings } from '../context/SettingsContext'
import type { Prisklasse } from '../types/elpris'

// Indstillings-panelet. Er altid i DOM'et, men vises kun når indstillingerÅben er true.
// På mobil fylder det hele skærmen som en "side", på desktop lægger det sig
// som en modal oven på dashboardet med en halvgennemsigtig baggrund.
export function SettingsPanel() {
  const { indstillingerÅben, lukIndstillinger, visMedMoms, sætVisMedMoms, lavesteprisAlarm, sætLavesteprisAlarm, region, sætRegion } =
    useSettings()

  if (!indstillingerÅben) {
    return null
  }

  return (
    <Baggrund onClick={lukIndstillinger}>
      {/* stopPropagation så et klik inde i selve boksen ikke lukker panelet */}
      <Boks onClick={(event) => event.stopPropagation()}>
        <LukKnap type="button" onClick={lukIndstillinger} aria-label="Luk indstillinger">
          <FontAwesomeIcon icon={faCircleXmark} />
        </LukKnap>

        <Titel>INDSTILLINGER</Titel>

        <Linje>
          <LinjeTekst>PRISER INKL. MOMS</LinjeTekst>
          <Toggle $aktiv={visMedMoms} onClick={() => sætVisMedMoms(!visMedMoms)} type="button">
            <ToggleKnap $aktiv={visMedMoms} />
          </Toggle>
        </Linje>

        <Linje>
          <LinjeTekst>LAVESTE PRIS ALARM</LinjeTekst>
          <Toggle $aktiv={lavesteprisAlarm} onClick={() => sætLavesteprisAlarm(!lavesteprisAlarm)} type="button">
            <ToggleKnap $aktiv={lavesteprisAlarm} />
          </Toggle>
        </Linje>

        <Linje>
          <LinjeTekst>VÆLG REGION</LinjeTekst>
          <Select value={region} onChange={(event) => sætRegion(event.target.value as Prisklasse)}>
            <option value="DK2">REGION ØST</option>
            <option value="DK1">REGION VEST</option>
          </Select>
        </Linje>
      </Boks>
    </Baggrund>
  )
}

const Baggrund = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  background: ${(props) => props.theme.colors.baggrund};

  /* På desktop ligger panelet som en modal med mørk, halvgennemsigtig baggrund */
  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
  }
`

const Boks = styled.div`
  width: 100%;
  max-width: 420px;
  margin-top: 90px;

  position: relative;

  background: ${(props) => props.theme.colors.kortBaggrund};
  border: 1px solid ${(props) => props.theme.colors.kortKant};
  border-radius: ${(props) => props.theme.radius.stor};

  padding: 32px 24px;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    margin-top: 0;
  }
`

const LukKnap = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;

  color: ${(props) => props.theme.colors.accent};
  font-size: 20px;
  cursor: pointer;
`

const Titel = styled.h1`
  margin: 0 0 32px;

  text-align: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.06em;
`

const Linje = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px 0;
  border-bottom: 1px solid #333436;

  &:last-child {
    border-bottom: none;
  }
`

const LinjeTekst = styled.span`
  font-size: 12px;
  letter-spacing: 0.04em;
`

const Toggle = styled.button<{ $aktiv: boolean }>`
  position: relative;

  width: 42px;
  height: 24px;
  border: none;
  border-radius: 999px;
  cursor: pointer;

  background: ${(props) => (props.$aktiv ? props.theme.colors.accent : '#4A4B4E')};
  transition: background 0.15s ease;
`

const ToggleKnap = styled.span<{ $aktiv: boolean }>`
  position: absolute;
  top: 3px;
  left: ${(props) => (props.$aktiv ? '21px' : '3px')};

  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.kortBaggrund};

  transition: left 0.15s ease;
`

const Select = styled.select`
  padding: 8px 10px;

  background: ${(props) => props.theme.colors.baggrund};
  border: 1px solid ${(props) => props.theme.colors.kortKant};
  border-radius: ${(props) => props.theme.radius.lille};

  color: ${(props) => props.theme.colors.tekst};
  font-size: 11px;
  letter-spacing: 0.04em;
`
