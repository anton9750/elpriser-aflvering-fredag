import styled from 'styled-components'
import type { ReactNode } from 'react'

interface CirkelMaalerProps {
  // Diameter i pixels, så vi kan genbruge komponenten til både den store
  // måler på "lige nu"-siden og de to små på oversigts-siden
  størrelse: number

  // Hvor meget af ringen der skal være "fyldt" med accentfarven, 0-1.
  // Bruges til at vise hvor billig/dyr prisen er lige nu ift. dagens yderpunkter.
  fylde: number

  children: ReactNode
}

// En rund måler med en prikket baggrundsring og en grøn fremhævet bue,
// ligesom "0.242 KR"-cirklen i Figma-designet.
export function CirkelMaaler({ størrelse, fylde, children }: CirkelMaalerProps) {
  const strokeBredde = størrelse * 0.025
  const radius = størrelse / 2 - strokeBredde
  const omkreds = 2 * Math.PI * radius

  const fyldtLængde = omkreds * Math.max(0, Math.min(1, fylde))

  return (
    <Wrapper $størrelse={størrelse}>
      <svg width={størrelse} height={størrelse} viewBox={`0 0 ${størrelse} ${størrelse}`}>
        {/* Den prikkede baggrundsring, altid synlig som "spor" for måleren */}
        <circle
          cx={størrelse / 2}
          cy={størrelse / 2}
          r={radius}
          fill="none"
          stroke="#3A3B3E"
          strokeWidth={strokeBredde}
          strokeDasharray="2 6"
          strokeLinecap="round"
        />

        {/* Den grønne bue der viser hvor meget af cirklen der er "fyldt" */}
        <circle
          cx={størrelse / 2}
          cy={størrelse / 2}
          r={radius}
          fill="none"
          stroke="#55EC20"
          strokeWidth={strokeBredde}
          strokeDasharray={`${fyldtLængde} ${omkreds}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${størrelse / 2} ${størrelse / 2})`}
        />
      </svg>

      <Indhold>{children}</Indhold>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $størrelse: number }>`
  position: relative;
  width: ${(props) => props.$størrelse}px;
  height: ${(props) => props.$størrelse}px;
`

const Indhold = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`
