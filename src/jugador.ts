import { ComandanteJugable } from './comandantes/comandante'
export type equipo = 'A'|'B'|'C'|'D';

export class Jugador {
  // Cada jugador debería existir en la base de datos y ser obtenido por medio de su ID
  // Pero en juego no es necesario tener el dato idéntico, solo necesita tener un código único por partida
  #tiempoSegundos?: any
  #nombre: string
  #activo: boolean
  // idJugador: string; //crypto.randomUUID()}
  #equipo: equipo
  #tiempoDisponible?: number|null
  #comandantes: ComandanteJugable[]

  constructor (nombre: string, equipo: equipo, activo: boolean, tiempoDisponible: number|null, comandantes: ComandanteJugable[]){
    this.#nombre = nombre
    this.#equipo = equipo
    this.#activo = activo
    this.#tiempoDisponible = tiempoDisponible
    this.#comandantes = comandantes
  }

  public getNombre (){
    return this.#nombre
  }
  public getEquipo (){
    return this.#equipo
  }
  public getTiempoDisponible (){
    return this.#tiempoDisponible
  }
  public restarTiempoDisponible (tiempo: number){
    if ( this.#tiempoDisponible ){
      // Pensar que hacer si queda por debajo de 0
      this.#tiempoDisponible -= tiempo
    } else {
      this.#tiempoDisponible = tiempo
    }
  }
  public sumarTiempoDisponible (tiempo: number){
    if ( this.#tiempoDisponible ){
      this.#tiempoDisponible += tiempo
    } else {
      this.#tiempoDisponible = tiempo
    }
  }

  public activarCronometro (){
    let segundosConsumidos = 0
    if ( this.#tiempoDisponible != null ){
      this.#tiempoSegundos = setInterval(() => {
        segundosConsumidos++
        if ( this.#tiempoDisponible ){
          if ( this.#tiempoDisponible <= segundosConsumidos ){
            this.#tiempoDisponible -= segundosConsumidos
            clearInterval(this.#tiempoSegundos)
            console.log('El tiempo se acabo. Terminando turno')
            this.terminarTurno()
          }
        } else if ( this.#tiempoDisponible && this.#tiempoDisponible <= segundosConsumidos ){
          clearInterval(this.#tiempoSegundos)
          console.error('Desactivandoo cronómetro de tiempo. Tiempo disponible indefinido')
        }
      }, 1000)
    }
  }
  public getComandantesJugador (){
    return this.#comandantes
  }
  public rendirse (){
    // Tiene que ser una transacción: o se eliminan todas las unidades y pierde todas las propiedades sin problema
    // y se declara el personaje inactivo o se revierte todo
    this.#comandantes.forEach(comandante => comandante.rendirse() )
    this.#activo = false
  }
  public getStatus (){
    return this.#activo
  }

  public terminarTurno (){}
}
