// Dansk moms er 25%. API'et leverer priser uden moms og afgifter,
// så her lægger vi moms oveni hvis brugeren har slået det til i indstillinger.
const MOMSSATS = 1.25

export function medEventueltMoms(prisUdenMoms: number, visInklMoms: boolean): number {
  return visInklMoms ? prisUdenMoms * MOMSSATS : prisUdenMoms
}

// Formaterer en pris pænt til visning, fx "0.242" ligesom tallene i Figma-designet
export function formaterPris(pris: number): string {
  return pris.toFixed(3)
}
