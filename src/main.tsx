import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'
import { theme } from './styles/theme'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
)

// Registrerer vores egen håndskrevne service worker (public/sw.js), så appen
// kan køre offline. Det er ren vanilla javascript, React er ikke involveret,
// så det sker uden for React-træet, kun én gang når siden indlæses.
//
// Kun i produktion: under "npm run dev" sender Vite hele tiden nye
// modul-forespørgsler (HMR), og service workeren vil forsøge at cache/
// genbruge dem, hvilket forstyrrer Vites eget opdateringssystem.
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      // Fanger fejlen stille: hvis brugeren fx er offline ved indlæsning,
      // fejler forsøget på at (gen)registrere, men den service worker der
      // allerede er installeret fra sidste besøg bliver ved med at virke
      // import.meta.env.BASE_URL matcher vite.config.ts' "base", så sw.js
      // findes både på "/" lokalt og under "/hygge/" på GitHub Pages
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})
    })
  } else {
    // Rydder op efter tidligere tests, hvor service workeren ved en fejl også
    // blev registreret under "npm run dev" og forstyrrede Vites HMR-opdateringer
    navigator.serviceWorker.getRegistrations().then((registreringer) => {
      registreringer.forEach((registrering) => registrering.unregister())
    })
  }
}
