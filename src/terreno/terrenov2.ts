export type nombreTerreno = 'planicie'|'bosque'|'montana'|'cuartelGeneral'|'ciudad'|'fabrica'|'aeropuerto'|'puertoNaval'|'silo'|'camino'|'puente'|'tuberia'|'mar'|'arrecife'|'rio'|'costa'|'invalido'
export type nombrePropiedad = 'fabrica'|'aeropuerto'|'puertoNaval'

export type spriteTerreno = {
  width: number, height: number, offsetY: number
  crop: {
    x: number, y: number,
    width: number, height: number
  }
  // animations: {} //Para HQ's y fábricas
}
export type casillasAdyacentes = {
  top: nombreTerreno,
  left: nombreTerreno,
  right: nombreTerreno,
  bottom: nombreTerreno
}

export const tamanoCasilla = 16

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
