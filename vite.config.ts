import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // "base" sættes normalt til "/" (lokal dev/build). GitHub Pages-workflowet
  // (.github/workflows/deploy.yml) overstyrer den ved build-tid med
  // "vite build --base=/<repo-navn>/", fordi Pages server dette repo under en
  // undermappe og ikke på domænets rod.
})
