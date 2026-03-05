import { ListaTerrenos } from './terreno'
import type { nombreTerreno, Terreno } from './terreno'
import Konva from 'konva'
import { UnidadCasilla, type UnidadSimple } from '../unidades/unidades'

export type coordenada = {
  x: number,
  y: number
}

export class Casilla {
  #tipo: nombreTerreno
  #propietario: number|null
  #unidad: UnidadCasilla|null
  sprite: Konva.Image|null // ¿Debería ser spriteTerreno o Konva.Image?
  #coordenada: coordenada

  constructor (tipo: nombreTerreno, propietario: number|null, unidad: UnidadCasilla|null, coordenada: coordenada){
    if (ListaTerrenos[tipo] == undefined){
      console.error('Tipo de casilla no encontrada: ', tipo)
      this.#tipo = 'invalido'
      this.#propietario = null
    } else {
      this.#tipo = tipo

      if ( ListaTerrenos[tipo].propiedad != null ){
        this.#propietario = propietario
      } else if ( !ListaTerrenos[tipo].propiedad && propietario != null ) {
        console.error(`No se puede ser dueño de las casillas tipo "${tipo}"`)
        this.#propietario = null
      } else {
        this.#propietario = null
      }
    }

    // ¿Debería validar?
    this.#coordenada = coordenada
    this.#unidad = unidad
    this.sprite = null
  }

  getCoordenada (){
    return this.#coordenada
  }

  // Quitar esta función y hacer composición
  public getTerrenoObjeto = ():Terreno|null => {
    return ListaTerrenos[this.#tipo]
  }
  public getTipo = () => {
    return this.#tipo
  }
  public setTipo = (nombreTerreno:nombreTerreno) => {
    this.#tipo = nombreTerreno
  }
  public getPropietario = () => this.#propietario
  public setPropietario (propietario:number|null){
    this.#propietario = propietario
  }
  public getUnidad = () => this.#unidad
  public setUnidad (unidad:UnidadCasilla|null){
    unidad?.setCasilla(this)
    this.#unidad = unidad
  }
  public getSprite (){
    return
  }
  public setSprite (sprite:Konva.Image){
    this.sprite = sprite
  }
}

export class CasillaSimple{
  tipo: nombreTerreno
  propietario: number|null
  // clima?: Clima
  unidad?: UnidadSimple|null

  constructor (tipo: nombreTerreno, propietario: number|null, unidad: UnidadSimple|null){
    if (ListaTerrenos[tipo] == undefined){
      console.error('Tipo de casilla no encontrada: ', tipo)
      this.tipo = 'invalido'
    } else {
      this.tipo = tipo
    }
    this.propietario = propietario
    this.unidad = unidad
  }
}
