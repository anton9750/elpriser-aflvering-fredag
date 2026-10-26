import { theme } from '../styles/theme'

// Finder en farve fra prisskalaen ud fra hvor "billig" eller "dyr" en pris er,
// sammenlignet med den billigste og dyreste pris samme dag.
// ratio 0 = billigst (grøn), ratio 1 = dyrest (rød)
export function prisfarve(pris: number, min: number, max: number): string {
  const skala = theme.colors.prisskala

  // Hvis alle priser er ens, er der ingen variation at vise, så vi bruger den billigste farve
  if (max === min) {
    return skala[0]
  }

  const ratio = (pris - min) / (max - min)
  const index = Math.min(skala.length - 1, Math.floor(ratio * skala.length))

  return skala[index]
}
