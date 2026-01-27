import { Comandante } from './comandante'
import type { UnidadCasilla } from '../unidades/unidades'

// Hyper Repair
// Falta el cambio de reglas (o de clima)
// Ej: Poder activar la regla de FOW o el clima a Nevado (al menos en el caso de Sonja y de Olaf)
// Aunque siento que igual el cambio que quiero hacer a Olaf va a quitar la necesidad de cambiar el clima
// (pienso que mejor reducir la movilidad  de las unidades directamente en vez de vincularlo directament con el clima)
function hyperRepairActivacion (unidades: UnidadCasilla[], adversarios: UnidadCasilla[]){
  unidades.forEach((unidad) => {
    unidad.repararUnidad(30)
  })
}
function hyperRepairDesactivacion (unidades: UnidadCasilla[]){
  unidades.forEach((unidad) => {
    unidad.repararUnidad(30)
  })
}

// Creo que solo ocupo que regrese a su estado normal y volver a usar los valores por defecto

// Hyper Upgrade
function hyperUpgradeActivacion (unidades: UnidadCasilla[], adversarios: UnidadCasilla[]){
  unidades.forEach((unidad) => {
    unidad.repararUnidad(30)
  })
}
function hyperUpgradeDesactivacion (unidades: UnidadCasilla[]){
  unidades.forEach((unidad) => {
    unidad.repararUnidad(30)
  })
}

export const ComandanteAndy = new Comandante('Andy', 'andy', 'Niño genio experto en reparaciones.', 'Orange Star',
  {
    // COM Towers le dan más descuento o suben mas el tope de sus reparaciones
    descripcion: 'Las reparaciones son un 25% más baratas.',
    variables: {
      descuentoReparacionesPorc: 25
    }
  }, 60000, [{
    nombre: 'Hyper Repair',
    costoEstrellas: 3,
    efectoActivacion: hyperRepairActivacion
  }, {
    nombre: 'Hyper Upgrade',
    costoEstrellas: 6,
    efectoActivacion: hyperUpgradeActivacion
  }], null)

// Normal, COP, SCOP
// Ataque: 100, 110, 120
// Defensa: 100, 110, 110
// Movilidad: +0, +0, +1
