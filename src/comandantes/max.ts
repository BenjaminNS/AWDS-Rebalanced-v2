import { Comandante } from './comandante'
import type { UnidadCasilla } from '../unidades/unidades'

// Max Force
function maxForceActivacion (unidades: UnidadCasilla[], adversarios: UnidadCasilla[]){
  // unidades.forEach((unidad) => {
  //   unidad.repararUnidad(30)
  // })
}
function maxForceDesactivacion (unidades: UnidadCasilla[]){
  // unidades.forEach((unidad) => {
  //   unidad.repararUnidad(30)
  // })
}

// Max Blast
function maxBlastActivacion (unidades: UnidadCasilla[], adversarios: UnidadCasilla[]){
  // unidades.forEach((unidad) => {
  //   unidad.repararUnidad(30)
  // })
}
function maxBlastDesactivacion (unidades: UnidadCasilla[]){
  // unidades.forEach((unidad) => {
  //   unidad.repararUnidad(30)
  // })
}

export const ComandanteMax = new Comandante('Max', 'max', 'Especialista en combate directo.', 'Orange Star',
  {
    descripcion: 'Vehículos de combate directo hacen 20% más de daño. Vehículos a distancia tienen -1 de rango. -10% de defensa recibiendo daño de vehículos indirectos.',
    variables: {
      bonusAtaqueVehiculoDirectoPorc: 20,
      penRangoVehiculoIndirecto: 1,
      penDefensaContraVehiculoIndirectoPorc: 10
    }
  }, 60000, 9, [{
    nombre: 'Max Force',
    costoEstrellas: 3,
    efectoActivacion: maxForceActivacion
  }, {
    nombre: 'Max Blast',
    costoEstrellas: 6,
    efectoActivacion: maxBlastActivacion
  }], null)
