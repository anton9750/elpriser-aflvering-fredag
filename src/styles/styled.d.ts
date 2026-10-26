// Giver styled-components kendskab til formen på vores eget theme-objekt,
// så vi får autocomplete og typetjek når vi skriver props => props.theme.xxx

import 'styled-components'
import type { Theme } from './theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
