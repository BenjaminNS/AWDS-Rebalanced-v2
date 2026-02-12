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

  public generarIngresosComandantes (mapa: Mapa, numeroJugador: number){
    this.#comandantes.forEach(comandante => {
      const listaPropiedades:nombreTerreno[] = mapa.getListaPropiedades(numeroJugador)
      comandante.generarIngresos(listaPropiedades)
    })
  }

  public terminarTurno (){}
  public getJugadorData (listaUnidades:UnidadCasilla[], listaPropiedades:nombreTerreno[]):jugadorData{
    let valorTotalUnidades = 0
    listaUnidades.forEach(unidad => {
      // Multiplicar por el valor del comandante
      valorTotalUnidades += unidad.getCosto()
    })

    let ingresosDiarios = 0
    listaPropiedades.forEach(propiedad => {
      if ( propiedad === 'ciudad' || propiedad === 'cuartelGeneral' || propiedad === 'fabrica' || propiedad === 'aeropuerto' || propiedad === 'puertoNaval' ){
        ingresosDiarios += 1000
      }
    })

    return {
      nombre: this.#nombre,
      id: this.#id,
      activo: this.#activo,
      // Este dato debería ser de un arreglo si pienso hacer que un
      // solo jugador controle a más de 1 comandante
      comandanteImgUrl: `${this.#comandantes[0].getNombreCorto()}`,
      cargaActual: this.#comandantes[0].getcargaActual(),
      cargaMaxima: this.#comandantes[0].getCargaMaxima(),
      numUnidades: listaUnidades.length,
      unidadesValor: valorTotalUnidades,
      numPropiedades: listaPropiedades.length,
      ingresosDiarios: ingresosDiarios,
      dineroActual: this.#comandantes[0].getDineroActual(),
      equipo: this.#equipo,
      poderes: this.#comandantes[0].getPoderesData(),
      // Falta meter el dato de las estrellas al comandante
      estrellas: this.#comandantes[0].getMaximoEstrellas(),
      // Falta meter el dato del color al jugador y/o al comandante
      color: this.#color
    }
  }
}
