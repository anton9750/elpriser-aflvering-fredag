// Små hjælpefunktioner til at arbejde med datoer, så API-kald og visning stemmer overens.

function totocifret(tal: number): string {
  return tal.toString().padStart(2, '0')
}

// Laver et Date-objekt om til "ÅR/MÅNED-DAG" delene som API'et forventer i url'en
export function tilApiDatoDele(dato: Date): { aar: string; maaned: string; dag: string } {
  return {
    aar: dato.getFullYear().toString(),
    maaned: totocifret(dato.getMonth() + 1),
    dag: totocifret(dato.getDate()),
  }
}

// Formaterer en dato som "14-10-2023", ligesom i Historik-visningen
export function formaterDatoKort(dato: Date): string {
  return `${totocifret(dato.getDate())}-${totocifret(dato.getMonth() + 1)}-${dato.getFullYear()}`
}

// Formaterer en dato til brug i et <input type="date">, som kræver "ÅÅÅÅ-MM-DD"
export function tilInputDato(dato: Date): string {
  const { aar, maaned, dag } = tilApiDatoDele(dato)
  return `${aar}-${maaned}-${dag}`
}

// Formaterer et timeinterval som "kl. 19.00", ligesom i prislisterne
export function formaterKlokkeslæt(dato: Date): string {
  return `kl. ${totocifret(dato.getHours())}.00`
}
