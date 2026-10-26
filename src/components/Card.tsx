import styled from 'styled-components'
import type { ReactNode } from 'react'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSettings } from '../context/SettingsContext'

interface CardProps {
  children: ReactNode

  // Nogle paneler (fx indstillinger) vil ikke have tandhjulet, så det er valgfrit
  skjulTandhjul?: boolean
}

// Det mørke, afrundede kort som alle fire sider (lige nu, oversigt, historik,
// indstillinger) er bygget op omkring. Tandhjulet øverst til højre åbner altid
// indstillings-panelet, uanset hvilken side man står på.
export function Card({ children, skjulTandhjul }: CardProps) {
  const { åbnIndstillinger } = useSettings()

  return (
    <Boks>
      {!skjulTandhjul && (
        <TandhjulKnap type="button" onClick={åbnIndstillinger} aria-label="Åbn indstillinger">
          <FontAwesomeIcon icon={faGear} />
        </TandhjulKnap>
      )}

      {children}
    </Boks>
  )
}

const Boks = styled.div`
  position: relative;

  background: ${(props) => props.theme.colors.kortBaggrund};
  border: 1px solid ${(props) => props.theme.colors.kortKant};
  border-radius: ${(props) => props.theme.radius.stor};

  padding: 28px 20px 24px;
`

const TandhjulKnap = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: transparent;

  color: ${(props) => props.theme.colors.tekst};
  font-size: 15px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`
