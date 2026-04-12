import { type nombreTerreno } from '../terreno/terrenov2'
import { type Matchups } from './matchups'
import { LibroMovilidad, type tipoMovimiento, tipoMovimientoAereo, tipoMovimientoNaval, tipoMovimientoTerrestre } from './tipoMovilidad'

export type nombreUnidad = 'apc'|'artilleria'|'bCopter'|'battleship'|'blackBoat'|'blackBomb'|'bomber'|'carrier'|'cohetes'|'cruiser'|'fighter'|'infanteria'|'lanchas'|'lander'|'mecha'|'megatanque'|'misiles'|'motocicletas'|'neotanque'|'pipeRunner'|'recon'|'sniper'|'stealthFighter'|'submarino'|'tanqueAntiaereo'|'tanqueLigero'|'tanqueMediano'|'tCopter'

type municionBase = {actual: number, maxima: number}
export interface municiones {
  principal: municionBase,
  secundaria?: municionBase
}

export type categoriaUnidad = 'Directo'|'Indirecto'|'Transporte'|'Terrestre'|'Aereo'|'Naval'|'Antiaereo'
export type estado = 'normal'|'oculto'

export type UnidadBaseTipo = {
  nombreLargo: string
  nombreCorto: nombreUnidad
  descripcion: string
  categorias: categoriaUnidad[]
  costoOro: number
  rango: {minimo: number, extra: number}|null
  movilidad: number
  tipoMovimiento: tipoMovimiento
  vision: number
  maxGasolina: number
  atacarYMoverse: boolean
  contraataque: number|null
  municiones: municiones
  matchups: Matchups
}

export abstract class UnidadBase {
  #nombreLargo: string
  #nombreCorto: nombreUnidad
  #descripcion: string
  #costoOro: number // Gold
  #rango: {minimo: number, extra: number}|null
  #movilidad: number
  #tipoMovimiento: tipoMovimiento
  #vision: number
  #maxGasolina: number
  #atacarYMoverse: boolean
  #contraataque: number|null
  #matchups: Matchups

  constructor (
    baseUnidad: UnidadBaseTipo
  ){
    this.#nombreLargo = baseUnidad.nombreLargo
    this.#nombreCorto = baseUnidad.nombreCorto
    this.#descripcion = baseUnidad.descripcion
    this.#costoOro = baseUnidad.costoOro
    this.#rango = baseUnidad.rango
    this.#movilidad = baseUnidad.movilidad
    this.#tipoMovimiento = baseUnidad.tipoMovimiento
    this.#vision = baseUnidad.vision
    this.#maxGasolina = baseUnidad.maxGasolina
    this.#contraataque = baseUnidad.contraataque
    this.#atacarYMoverse = baseUnidad.atacarYMoverse
    this.#matchups = baseUnidad.matchups
  }

  getMovilidad (): number {
    return this.#movilidad
  }
  getLibroMovilidad (){
    return LibroMovilidad[this.#tipoMovimiento]
  }
  getLibroMovilidadTerreno (tipo: nombreTerreno){
    return LibroMovilidad[this.#tipoMovimiento][tipo]
  }

  getNombreLargo (){
    return this.#nombreLargo
  }
  getNombreCorto (){
    return this.#nombreCorto
  }
  getDescripcion (){
    return this.#descripcion
  }

  getCategorias ():categoriaUnidad[]{
    const categoriasLista:categoriaUnidad[] = []

    if ( tipoMovimientoTerrestre.findIndex(tipo => tipo === this.#tipoMovimiento) !== -1 ){
      categoriasLista.push('Terrestre')
    }
    if ( tipoMovimientoAereo.findIndex(tipo => tipo === this.#tipoMovimiento) !== -1 ){
      categoriasLista.push('Aereo')
    }
    if ( tipoMovimientoNaval.findIndex(tipo => tipo === this.#tipoMovimiento) !== -1 ){
      categoriasLista.push('Naval')
    }

    const rangoMinimo = this.getRangoMinimo()
    const rangoMaximo = this.getRangoMaximo()
    if ( rangoMinimo === 1 ){
      categoriasLista.push('Directo')
    }
    if ( rangoMaximo !== null && rangoMaximo > 1 ){
      categoriasLista.push('Indirecto')
    }

    return categoriasLista
  }
  getCostoOro (){
    return this.#costoOro
  }
  getRango (){
    return this.#rango
  }
  getRangoMinimo (){
    return this.#rango?.minimo ? this.#rango?.minimo : null
  }
  getRangoExtra (){
    return this.#rango?.extra ? this.#rango?.extra : null
  }
  getRangoMaximo (){
    return this.#rango ? (this.#rango.minimo + this.#rango.extra) : null
  }
  getTipoMovimiento (){
    return this.#tipoMovimiento
  }
  getVision (){
    return this.#vision
  }
  getMaxGasolina (){
    return this.#maxGasolina
  }
  abstract getConsumoDiario ( estado: estado ):number
  getAtacarYMoverse (){
    return this.#atacarYMoverse
  }
  getUnitMatchupList (){
    return this.#matchups
  }
  getUnitMatchup (unidadDefensivaNombre: nombreUnidad, tipo: 'principal'|'secundaria'){
    if ( this.#matchups[tipo] == null )
      return null

    return this.#matchups[tipo][unidadDefensivaNombre]
  }
  getContraataque (){
    return this.#contraataque
  }
}
