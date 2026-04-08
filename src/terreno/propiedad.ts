import type { nombreUnidad } from '../unidades/unidadInfoBasica'
import { type nombreTerreno, Terreno } from './terrenov2'

type Recompensa = Partial<{
  dinero?: number,
  ataque?: number, // Torre de comunicación
  defensa?: number, // Torre de comunicación
}>

export abstract class Propiedad extends Terreno{
  #propietario: number
  #recompensas: Recompensa
  #opcionesCompra: nombreUnidad[] // opcionesReparacion

  constructor (propiedad: {propietario: number, recompensas: Recompensa, opcionesCompra: nombreUnidad[]}, terreno: {descripcion: string, estrellasDefensa: number, nombreCorto: nombreTerreno, nombreLargo: string }){
    super({ descripcion: terreno.descripcion, estrellasDefensa: terreno.estrellasDefensa, nombreCorto: terreno.nombreCorto, nombreLargo: terreno.nombreLargo })
    this.#propietario = propiedad.propietario

    this.#recompensas = propiedad.recompensas
    this.#opcionesCompra = propiedad.opcionesCompra
  }
  setPropietario (propietario: number){
    this.#propietario = propietario
  }
  getPropietario (){
    return this.#propietario
  }
  getRecompensas (){
    return this.#recompensas
  }

  getOpcionesCompra (){
    return this.#opcionesCompra
  }
}
