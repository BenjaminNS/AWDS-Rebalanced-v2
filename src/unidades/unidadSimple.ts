import { type nombreUnidad } from './unidadInfoBasica'
import { type municiones, type estado } from './unidadInfoBasica'

export interface otrosDatosUnidad {
  puntosCaptura?: number
}

export class UnidadSimple {
  nombreUnidad: nombreUnidad
  id: string
  propietario: number|null
  hp: number
  municiones: municiones|null
  gasActual: number
  estado: estado
  turnos: number
  otrosDatos: otrosDatosUnidad

  constructor (
    { nombreUnidad, id, propietario, hp, municiones, gasActual, estado, turnos, otrosDatos } : 
    { nombreCorto: nombreUnidad, id: string, propietario: number, hp: number, municiones: municiones, gasActual: number, estado: estado, turnos: number, otrosDatos: otrosDatosUnidad}
  ){
    this.nombreUnidad = nombreUnidad
    this.id = id
    this.propietario = propietario
    this.hp = hp
    this.municiones = municiones
    this.gasActual = gasActual
    this.estado = estado
    this.turnos = turnos
    this.otrosDatos = otrosDatos
  }
}
