import styled from 'styled-components'
import { useSettings, regionsNavn } from '../context/SettingsContext'

// Footer-teksten der går igen nederst på hver side, med de to grønne links
// der matcher designet ("ex. moms" og regionsnavnet).
export function Footer() {
  const { region } = useSettings()

  return (
    <Wrapper>
      <p>
        Priserne er <Accent as="span">ex. moms</Accent> og afgifter
      </p>
      <p>
        Du vises lige nu priserne for <Accent as="span">{regionsNavn(region)}</Accent>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  max-width: 1100px;
  margin: 32px auto 24px;
  padding: 0 20px;

  text-align: center;
  font-size: 11px;
  color: ${(props) => props.theme.colors.tekstDæmpet};

  p {
    margin: 6px 0;
  }
`

const Accent = styled.span`
  color: ${(props) => props.theme.colors.accent};
`
