import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Topnavigationen. Ligger i App.tsx så den vises på alle sider.
// Mobil: logo til venstre, faner til højre.
// Desktop: logo + sidenavn til venstre, faner til højre, lidt mere luft generelt.
export function Nav() {
  return (
    <Wrapper>
      <Indhold>
        <LogoLink to="/">
          <LogoCirkel>
            <FontAwesomeIcon icon={faBolt} />
          </LogoCirkel>
          <SiteNavn>ELPrisen.nu</SiteNavn>
        </LogoLink>

        <Faner>
          <Fane to="/oversigt">OVERSIGT</Fane>
          <Fane to="/" end>LIGE NU</Fane>
          <Fane to="/historik">HISTORIK</Fane>
        </Faner>
      </Indhold>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  padding: 20px 20px 0;
`

const Indhold = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
`

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.tekst};
`

const LogoCirkel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px dashed ${(props) => props.theme.colors.accent};

  color: ${(props) => props.theme.colors.accent};
  font-size: 12px;
`

const SiteNavn = styled.span`
  display: none;
  font-weight: 700;
  letter-spacing: 0.02em;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: inline;
  }
`

const Faner = styled.nav`
  display: flex;
  gap: 18px;
`

const Fane = styled(NavLink)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: ${(props) => props.theme.colors.tekstDæmpet};

  &.active {
    color: ${(props) => props.theme.colors.accent};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    font-size: 13px;
    color: ${(props) => props.theme.colors.tekst};

    &.active {
      color: ${(props) => props.theme.colors.accent};
    }
  }
`
