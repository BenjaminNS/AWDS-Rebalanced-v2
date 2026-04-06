type Recompensa = Partial<{
  dinero?: number,
  ataque?: number, // Torre de comunicación
  defensa?: number, // Torre de comunicación
}>

export class Propiedad{
  #propietario: number
  #recompensas: Recompensa

  constructor ({ propietario, recompensas }: {propietario: number, recompensas: Recompensa}){
    this.#propietario = propietario
    this.#recompensas = recompensas
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
}
