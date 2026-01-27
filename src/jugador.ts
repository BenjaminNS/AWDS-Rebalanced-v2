import { ComandanteJugable } from './comandantes/comandante'
export type equipo = 'A'|'B'|'C'|'D'
import type { jugadorData } from './componentes/jugador-divs'

export class Jugador {
  // Cada jugador debería existir en la base de datos y ser obtenido por medio de su ID
  // Pero en juego no es necesario tener el dato idéntico, solo necesita tener un código único por partida
  #tiempoSegundos?: any
  #nombre: string
  #activo: boolean
  #equipo: equipo
  #tiempoDisponible?: number|null
  #comandantes: ComandanteJugable[]
  #id: string // crypto.randomUUID
  #color: string

  constructor (nombre: string, equipo: equipo, activo: boolean, tiempoDisponible: number|null, comandantes: ComandanteJugable[], color: string){
    this.#nombre = nombre
    this.#equipo = equipo
    this.#activo = activo
    this.#tiempoDisponible = tiempoDisponible
    this.#comandantes = comandantes
    this.#id = crypto.randomUUID()
    this.#color = color
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
  public getJugadorData ():jugadorData{
    return {
      nombre: this.#nombre,
      id: this.#id,
      activo: this.#activo,
      // Este dato debería ser de un arreglo
      comandanteImgUrl: `${this.#comandantes[0].getNombreCorto()}.png`,
      cargaActual: this.#comandantes[0].getcargaActual(),
      cargaMaxima: this.#comandantes[0].getCargaMaxima(),
      // Calcular numero de unidades, ciudades, ingresos diarios y dinero actual
      numUnidades: Math.floor(Math.random() * 30),
      unidadesValor: Math.floor(Math.random() * 150000),
      numPropiedades: Math.floor(Math.random() * 30),
      ingresosDiarios: Math.floor(Math.random() * 30) * 1000,
      dineroActual: Math.floor(Math.random() * 50000),
      equipo: this.#equipo,
      poderes: [{ costo: 30000, nombre: 'Hyper Repair' },{ costo: 30000, nombre: 'Hyper Repair' },{ costo: 30000, nombre: 'Hyper Repair' }],
      // Falta meter el dato de las estrellas al comandante
      estrellas: 6,
      // Falta meter el dato del color al jugador y/o al comandante
      color: this.#color
    }
  }
}
