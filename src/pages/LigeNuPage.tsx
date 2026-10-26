import { DashboardLayout } from '../panels/DashboardLayout'

// Forsiden / "Lige nu"-siden. På mobil er det hele siden, på desktop
// bidrager den blot "ligenu" som det aktive panel (bruges ikke til noget visuelt der).
export function LigeNuPage() {
  return <DashboardLayout aktivtPanel="ligenu" />
}
