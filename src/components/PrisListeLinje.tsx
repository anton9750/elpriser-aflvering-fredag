import styled from 'styled-components'

interface PrisListeLinjeProps {
  klokkeslæt: string
  pris: string
  farve: string
}

// En enkelt linje i pris-listerne på Historik- og Oversigt-siderne,
// fx "kl. 19.00 ........ 0.524 kr"
export function PrisListeLinje({ klokkeslæt, pris, farve }: PrisListeLinjeProps) {
  return (
    <Linje>
      <Klokkeslæt>{klokkeslæt}</Klokkeslæt>
      <Pris $farve={farve}>{pris} kr</Pris>
    </Linje>
  )
}

const Linje = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 2px;
  border-bottom: 1px solid #333436;

  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }
`

const Klokkeslæt = styled.span`
  color: ${(props) => props.theme.colors.tekstDæmpet};
`

const Pris = styled.span<{ $farve: string }>`
  font-weight: 700;
  color: ${(props) => props.$farve};
`
