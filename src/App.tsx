import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { SettingsPanel } from './components/SettingsPanel'
import { SettingsProvider } from './context/SettingsContext'
import { LigeNuPage } from './pages/LigeNuPage'
import { OversigtPage } from './pages/OversigtPage'
import { HistorikPage } from './pages/HistorikPage'

// Topniveau-komponenten. Nav og Footer ligger herinde, så de vises på alle sider,
// og selve sideindholdet skifter via BrowserRouter alt efter url'en.
function App() {
  return (
    <SettingsProvider>
      {/* basename matcher Vites "base" i vite.config.ts, så links virker både
          lokalt på "/" og på GitHub Pages under "/hygge/" */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Nav />

        <Routes>
          <Route path="/" element={<LigeNuPage />} />
          <Route path="/oversigt" element={<OversigtPage />} />
          <Route path="/historik" element={<HistorikPage />} />
        </Routes>

        <Footer />

        {/* Indstillings-panelet ligger uden for Routes, så det kan åbnes fra enhver side */}
        <SettingsPanel />
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
