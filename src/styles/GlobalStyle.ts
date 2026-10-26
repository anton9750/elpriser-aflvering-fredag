import { createGlobalStyle } from 'styled-components'

// Global nulstilling og grundlæggende typografi for hele appen.
// Holdes bevidst enkel, resten af det visuelle ligger i de enkelte komponenter.
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${(props) => props.theme.colors.baggrund};
    color: ${(props) => props.theme.colors.tekst};
    font-family: ${(props) => props.theme.skrifttype};

    /* Lidt luft mellem linjer generelt, så teksten ikke føles presset sammen */
    line-height: 1.6;

    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: inherit;
  }

  button,
  input,
  select {
    font-family: inherit;
  }
`
