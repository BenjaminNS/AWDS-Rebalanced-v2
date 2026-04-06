import type { nombreUnidad } from '../unidades/unidadInfoBasica'

type Recompensa = Partial<{
  dinero?: number,
  ataque?: number, // Torre de comunicación
  defensa?: number, // Torre de comunicación
}>

export class Propiedad{
  #propietario: number
  #recompensas: Recompensa
  #opcionesCompra: nombreUnidad[]

  constructor ({ propietario, recompensas, opcionesCompra }: {propietario: number, recompensas: Recompensa, opcionesCompra: nombreUnidad[]}){
    this.#propietario = propietario
    this.#recompensas = recompensas
    this.#opcionesCompra = opcionesCompra
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
