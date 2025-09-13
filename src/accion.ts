// TODO: *Falta definir si el dato de la lista de acciones va a venir en Partida o en Jugador
export type tipoAccion = 'Seleccionar unidad'|'Activar poder'|'Terminar turno'|'Rendirse'
export type direccion = 'Arriba'|'Izquierda'|'Derecha'|'Abajo'
export type comando = 'Esperar'|'Atacar'|'Retornar'|'Combinar'|'Abordar'|'Desplegar'|'Sumergir'|'Emerger'|'Ocultar'|'Aparecer'|'Detonar'
export type resultadoCombate = { idUnidadAtacada: number, danoHecho: number, danoRecibido: number|null }
export const tipoAcciones = { 
  'Seleccionar unidad': true, 
  'Activar poder': true, 
  'Terminar turno': true, 
  'Rendirse': true
}
export type UnidadAcciones = {
  idUnidad: number,
  direcciones: direccion[]
  interrumpido: number|null,
  comando: comando,
  resultadosCombate: resultadoCombate|null
}

export class accion {
  jugadorId: number
  tipo: tipoAccion
  timeStamp: Date
  otrosDatos: UnidadAcciones|null

  constructor(jugadorId: number, tipo: tipoAccion, timeStamp: Date, otrosDatos: UnidadAcciones|null){
    this.jugadorId = jugadorId
    this.tipo = tipo
    this.timeStamp = timeStamp
    this.otrosDatos = otrosDatos
  }
}