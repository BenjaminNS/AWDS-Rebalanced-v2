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
  private recalcularCamino (coordFinal:cordCosto){
    const caminoCoord = [coordFinal]
    let index
    for (let i = 0; i < this.maxCosto; i++) {
      const posiblesCaminos = []
      let maxMovilidad = 0

      // top, left, right, bottom
      index = this.getIndexCoordenadaDisponible({ x: caminoCoord[0].x, y: caminoCoord[0].y - 1 })
      if ( index != -1 && ( this.coordenadasDisponibles[index].movDisponible >= caminoCoord[0].movDisponible ) ){
        maxMovilidad = Math.max(this.coordenadasDisponibles[index].movDisponible, maxMovilidad)
        posiblesCaminos.push(this.coordenadasDisponibles[index])
      }
      index = this.getIndexCoordenadaDisponible({ x: caminoCoord[0].x - 1, y: caminoCoord[0].y })
      if ( index != -1 && ( this.coordenadasDisponibles[index].movDisponible >= caminoCoord[0].movDisponible ) ){
        maxMovilidad = Math.max(this.coordenadasDisponibles[index].movDisponible, maxMovilidad)
        posiblesCaminos.push(this.coordenadasDisponibles[index])
      }
      index = this.getIndexCoordenadaDisponible({ x: caminoCoord[0].x + 1, y: caminoCoord[0].y })
      if ( index != -1 && ( this.coordenadasDisponibles[index].movDisponible >= caminoCoord[0].movDisponible ) ){
        maxMovilidad = Math.max(this.coordenadasDisponibles[index].movDisponible, maxMovilidad)
        posiblesCaminos.push(this.coordenadasDisponibles[index])
      }
      index = this.getIndexCoordenadaDisponible({ x: caminoCoord[0].x, y: caminoCoord[0].y + 1 })
      if ( index != -1 && ( this.coordenadasDisponibles[index].movDisponible >= caminoCoord[0].movDisponible ) ){
        maxMovilidad = Math.max(this.coordenadasDisponibles[index].movDisponible, maxMovilidad)
        posiblesCaminos.push(this.coordenadasDisponibles[index])
      }

      if ( posiblesCaminos.length <= 0 ){
        return false
      }

      const caminosCortos = posiblesCaminos.filter((coord) => coord.movDisponible >= maxMovilidad )
      const opcionAleatoria = caminosCortos[Math.round( (caminosCortos.length - 1 ) * Math.random() )]
      caminoCoord.unshift(opcionAleatoria)

      if ( opcionAleatoria.movDisponible >= this.maxCosto ){
        this.coordenadasCamino = caminoCoord
        return true
      }
    }

    // Si llega a este punto, recorrió todo pero no puedo cerrar el camino
    return false
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
