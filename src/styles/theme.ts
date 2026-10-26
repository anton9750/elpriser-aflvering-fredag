// Farvepalette og layout-variabler hentet direkte fra Figma-designet.
// Al styling i appen bør bruge disse værdier, så det hele hænger visuelt sammen.

export const theme = {
  colors: {
    // Baggrunde
    baggrund: '#201E1E',
    kortBaggrund: '#27282B',
    kortKant: '#3A3B3E',

    // Tekst
    tekst: '#EBEBEB',
    tekstDæmpet: '#8D8D8D',

    // Branding / accent
    accent: '#55EC20',

    // Prisfarver, fra billigst til dyrest.
    // Bruges af utils/prisfarve.ts til at farvelægge priser i lister og grafer.
    prisskala: ['#00FF29', '#33FF00', '#B8FF22', '#EDFF23', '#FFD645', '#FF7A00', '#FF8717', '#FF4D00'],
  },

  skrifttype: "'Roboto', sans-serif",

  // Breakpoint hvor vi skifter fra mobil-layout til desktop-dashboard.
  breakpoints: {
    desktop: '1024px',
  },

  radius: {
    lille: '8px',
    mellem: '14px',
    stor: '22px',
  },
}

export type Theme = typeof theme
