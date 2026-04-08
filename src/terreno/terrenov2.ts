import { type spriteTerreno, type casillasAdyacentes } from './spriteTerrenos'
// import { Propiedad } from './propiedad'

export type nombreTerreno = 'planicie'|'bosque'|'montana'|'cuartelGeneral'|'ciudad'|'fabrica'|'aeropuerto'|'puertoNaval'|'silo'|'camino'|'puente'|'tuberia'|'mar'|'arrecife'|'rio'|'costa'|'invalido'|'inexistente'
export type nombrePropiedad = 'fabrica'|'aeropuerto'|'puertoNaval'

export abstract class Terreno {
  #nombreLargo: string
  #nombreCorto: nombreTerreno
  #estrellasDefensa: number
  #descripcion: string

  constructor ({ nombreLargo, nombreCorto, estrellasDefensa, descripcion } : {nombreLargo: string, nombreCorto: nombreTerreno, estrellasDefensa: number, descripcion: string}){
    this.#nombreLargo = nombreLargo
    this.#nombreCorto = nombreCorto
    this.#estrellasDefensa = estrellasDefensa
    this.#descripcion = descripcion
  }
  get nombreLargo () {
    return this.#nombreLargo
  }
  get nombreCorto () {
    return this.#nombreCorto
  }
  get estrellasDefensa () {
    return this.#estrellasDefensa
  }
  get descripcion () {
    return this.#descripcion
  }

  abstract puedeOcultarEnFOW(): boolean
  abstract getSprite (params?: { casillasAdyacentes: casillasAdyacentes }): spriteTerreno
  abstract getOpcionesTerreno(): string[] // accion: {nombre: string, efecto: function}
}
