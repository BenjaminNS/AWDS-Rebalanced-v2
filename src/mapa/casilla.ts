import Konva from 'konva'
import { UnidadCasilla, type UnidadSimple } from '../unidades/unidades'
import { getTerrenoClase } from '../terreno/terrenosClases'
import { type Terreno, type nombreTerreno } from '../terreno/terrenov2'
import { Propiedad } from '../terreno/propiedad'
import type { casillasAdyacentes, spriteTerreno } from '../terreno/spriteTerrenos'

export type coordenada = {
  x: number,
  y: number
}

export class Casilla {
  // clima?: Clima
  #unidad: UnidadCasilla|null
  sprite: Konva.Image|null // ¿Debería ser spriteTerreno o Konva.Image?
  #coordenada: coordenada
  #terreno: Terreno

  constructor (tipo: nombreTerreno, propietario: number|null, unidad: UnidadCasilla|null, coordenada: coordenada){
    this.#terreno = getTerrenoClase(tipo, propietario)

    // ¿Debería validar?
    this.#coordenada = coordenada
    this.#unidad = unidad
    this.sprite = null
  }

  getCoordenada (){
    return this.#coordenada
  }

  // TERRENO
  public getTerreno (){
    return this.#terreno
  }
  public setTerreno = (nombreTerreno: nombreTerreno, propietario: number) => {
    this.#terreno = getTerrenoClase(nombreTerreno, propietario)
  }
  public getNombreCorto (){
    return this.#terreno.nombreCorto
  }
  public getNombreLargo (){
    return this.#terreno.nombreLargo
  }
  public getDescripcion (){
    return this.#terreno.descripcion
  }
  public getEstrellasDefensa (){
    return this.#terreno.estrellasDefensa
  }
  public getPuedeOcultarEnFOW (){
    return this.#terreno.puedeOcultarEnFOW
  }
  public getSpriteCalculado (casillasAdyacentes: casillasAdyacentes): spriteTerreno{
    return this.#terreno.getSprite({ casillasAdyacentes })
  }
  public getOpcionesTerreno (){
    return this.#terreno.getOpcionesTerreno()
  }
  // PROPIEDAD
  public getPropietario (){
    if ( this.#terreno instanceof Propiedad ){
      return this.#terreno.getPropietario()
    }

    return null
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
    const claseEscogida = getTerrenoClase(tipo)
    this.tipo = claseEscogida.nombreCorto
    this.propietario = propietario
    this.unidad = unidad
  }
}
