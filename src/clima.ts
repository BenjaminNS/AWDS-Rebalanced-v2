export type Clima  =  'Soleado'|'Nevado'|'Lluvioso'|'Tormeta de arena';
// ¿Debería hacer funciones por clima?

const CLIMAS: Clima[] = ['Soleado', 'Nevado', 'Lluvioso', 'Tormeta de arena']
export function esClima(valor: string): valor is Clima {
  return CLIMAS.includes(valor as Clima)
}