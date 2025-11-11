import type Konva from 'konva'
import { pintarCamino } from './mapa/konvaCamino'
import { type coordenada } from './mapa/mapa'
import { Layer } from 'konva/lib/Layer'
export type cordCosto = coordenada & { costo:number, movDisponible:number }
export type direccion = 'arriba'|'izquierda'|'derecha'|'abajo'

// Lista de casillas adyacentes no repetidas
export class Camino{
  private coordenadasDisponibles:cordCosto[] = []
  private coordenadasCamino:cordCosto[] = []
  private maxCosto:number = 0
  private layerCamino:Konva.Layer
  constructor (){}

  public setMaxCosto (maxCosto:number){
    this.maxCosto = maxCosto
  }
  public getMaxCosto (){
    return this.maxCosto
  }
  public setCoordenadasDisponibles (coordenadasCamino:cordCosto[]){
    this.coordenadasDisponibles = coordenadasCamino
  }
  public getCoordenadasDisponibles (){
    return this.coordenadasDisponibles
  }

  public agregarCoordenada (coordenada:coordenada){
    // No se puede añadir un camino fuera de las coordenadas
    // Por ende, no se agrega la coordenada a la lista
    const coord = this.coordenadasDisponibles.find(coord => (coord.x === coordenada.x && coord.y === coordenada.y))

    if ( coord == null || this.getIndexCoordenadaDisponible(coord) === -1 ){
      // console.log('Coordenada no existe en la lista de coordenadasCamino disponibles: ', coordenada)
      return false
    }

    const indexCamino = this.getIndexCamino(coord)

    if ( indexCamino != -1 && (indexCamino + 1) === this.coordenadasCamino.length ){
      return false
    }
    if ( indexCamino != -1 ){
      this.coordenadasCamino.splice( ( indexCamino + 1 ), 1 )
      pintarCamino(this.layerCamino, this.coordenadasCamino, this.getDirecciones())
      return true
    }

    // Si es la primera coordenada, no requiere más validación
    // Vendría siendo la coordenada de inicio
    if ( this.coordenadasCamino.length === 0 ){
      this.coordenadasCamino.push(coord)
      pintarCamino(this.layerCamino, this.coordenadasCamino, this.getDirecciones())
      return true
    }

    // casilla adyacente
    const delta = Math.abs(this.coordenadasCamino[(this.coordenadasCamino.length - 1)].x - coord.x) + Math.abs(this.coordenadasCamino[(this.coordenadasCamino.length - 1)].y - coord.y)
    if ( delta === 1 ){
      if ( this.maxCosto >= (this.getCostoCamino() + coord.costo) ){
        this.coordenadasCamino.push(coord)
      } else {

        // console.log('Costo más elevado al disponible', (this.getCostoCamino() + coord.costo))
        this.recalcularCamino(coord)
      }
      pintarCamino(this.layerCamino, this.coordenadasCamino, this.getDirecciones())
      return true
    } else {
      // console.log('Distancia entre las últimas casillas es más de 1: ', delta )
      this.recalcularCamino(coord)
      pintarCamino(this.layerCamino, this.coordenadasCamino, this.getDirecciones())
    }

    return true
  }
  private getIndexCoordenadaDisponible (coord:coordenada){
    for ( let i = 0; i < this.coordenadasDisponibles.length; i++ ){
      if ( this.coordenadasDisponibles[i].x === coord.x && this.coordenadasDisponibles[i].y === coord.y ){
        return i
      }
    }

    return -1
  }
  private getIndexCamino (coord:coordenada){
    for ( let i = 0; i < this.coordenadasCamino.length; i++ ){
      // A veces esta validacion me está dando error, viene vacío no se por que
      if ( this.coordenadasCamino[i].x === coord.x && this.coordenadasCamino[i].y === coord.y ){
        return i
      }
    }

    return -1
  }

  private getCostoCamino (){
    let costo = 0
    for (let i = 0; i < this.coordenadasCamino.length; i++) {
      costo += this.coordenadasCamino[i].costo
    }

    return costo
  }
  private recalcularCamino (coord:cordCosto){
    // if( this.getIndexCamino({ x: coord.x, y: coord.y - 1 } === -1 ){
    // return false
    // }
    const caminoCoord = [coord]

    for (let i = 0; i < this.maxCosto; i++) {
      const posiblesCaminos = []

      // Agrega la casilla adyacente si existe y si tiene un costo menor a la primer casilla
      // (Porque se agregan al revés)

      // Talvez me está faltando contar el costo de la casilla anterior en la comparación

      // top
      let index = this.getIndexCoordenadaDisponible({ x: coord.x, y: coord.y - 1 })
      if ( index != -1 && ( this.coordenadasDisponibles[index].movDisponible - ( caminoCoord[0].movDisponible + caminoCoord[0].costo ) ) >= 0 ){
        posiblesCaminos.push(this.coordenadasDisponibles[index])
      }
      // left
      index = this.getIndexCoordenadaDisponible({ x: coord.x - 1, y: coord.y })
      if ( index != -1 && ( this.coordenadasDisponibles[index].movDisponible - ( caminoCoord[0].movDisponible + caminoCoord[0].costo ) ) >= 0 ){
        posiblesCaminos.push(this.coordenadasDisponibles[index])
      }
      // right
      index = this.getIndexCoordenadaDisponible({ x: coord.x + 1, y: coord.y })
      if ( index != -1 && ( this.coordenadasDisponibles[index].movDisponible - ( caminoCoord[0].movDisponible + caminoCoord[0].costo ) ) >= 0 ){
        posiblesCaminos.push(this.coordenadasDisponibles[index])
      }
      // bottom
      index = this.getIndexCoordenadaDisponible({ x: coord.x, y: coord.y + 1 })
      if ( index != -1 && ( this.coordenadasDisponibles[index].movDisponible - ( caminoCoord[0].movDisponible + caminoCoord[0].costo ) ) >= 0 ){
        posiblesCaminos.push(this.coordenadasDisponibles[index])
      }

      if ( posiblesCaminos.length <= 0 ){
        return false
      }

      const opcionAleatoria = posiblesCaminos[Math.round( (posiblesCaminos.length - 1 ) * Math.random() )]
      // se pone de adelante para atrás
      caminoCoord.unshift(opcionAleatoria)

      if ( opcionAleatoria.movDisponible <= 0 ){
        // Verificar si lo está haciendo bien aquí
        this.coordenadasCamino = caminoCoord
        return true
      }
    }

    this.coordenadasCamino = caminoCoord
    return true
  }
  public getCamino (){
    return this.coordenadasCamino
  }
  public limpiarCoordenadasCamino (){
    this.coordenadasCamino = []
  }
  public getDirecciones (){
    const direcciones:(direccion|'ninguno')[] = []

    for (let i = 1; i < this.coordenadasCamino.length; i++) {
      const vectorCoord = {
        x: ( this.coordenadasCamino[i].x - this.coordenadasCamino[i - 1].x ),
        y: ( this.coordenadasCamino[i].y - this.coordenadasCamino[i - 1].y )
      }
      direcciones.push( generarDireccion( vectorCoord ) )
    }

    // console.log('Direcciones: ', direcciones)
    return direcciones
  }

  public setLayerCamino (layer:Konva.Layer){
    // Solo debería poderse asignar una vez
    this.layerCamino = layer
  }
}

export function generarDireccion (coord:coordenada):direccion|'ninguno'{
  if (coord.x === 0 && coord.y === -1) return 'arriba'
  if (coord.x === -1 && coord.y === 0) return 'izquierda'
  if (coord.x === 1 && coord.y === 0) return 'derecha'
  if (coord.x === 0 && coord.y === 1) return 'abajo'
  return 'ninguno'
}
export function generarCoordenadaVector (direccion:direccion):coordenada{
  switch (direccion){
  case 'arriba':
    return { x: 0, y: - 1 }
  case 'izquierda':
    return { x: - 1, y: 0 }
  case 'derecha':
    return { x: 1, y: 0 }
  case 'abajo':
    return { x: 0, y: 1 }
  default:
    return { x:0, y: 0 }
  }
}
