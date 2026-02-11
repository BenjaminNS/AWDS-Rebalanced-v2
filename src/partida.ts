import './style.css'
import { Mapa, MapaSimple, type coordenada } from './mapa/mapa.ts'
import { Jugador } from './jugador.ts'
import { Reglas } from './reglas.ts'
import { esClima } from './clima.ts'
import type { Clima } from './clima.ts'
// import { accion } from './accion.ts'
import { KonvaMapa } from './mapa/KonvaMapa.ts'
import type { UnidadCasilla } from './unidades/unidades.ts'
// Se debería cargar una partida con un id único de partida solicitando a una DB

// Clase PartidaSnapshot: una captura del estatus de una partida.
export class PartidaSnapshot {
  Mapa: MapaSimple
  // Aquí pudieran guardarse los id's de los jugadores en vez de todo el objeto
  // y ya en la partidaJuego se carga el dato del jugador
  Jugadores: Jugador[]
  Reglas: Reglas
  climaActual: Clima
  diaActual: number
  turnoActual: number
  ordenJugadores: number[] // Lista de id's de jugadores (o sus nombres) ordenados. Técnicamente se pueden sacar del orden del arreglo
  fechaEmpezado: Date

  constructor (Mapa: MapaSimple, Jugadores: Jugador[], Reglas: Reglas, climaActual: Clima, diaActual: number, turnoActual: number, ordenJugadores: number[], fechaEmpezado: Date){
    this.Mapa = Mapa
    this.Jugadores = Jugadores
    this.Reglas = Reglas
    this.diaActual = diaActual
    this.climaActual = climaActual
    this.turnoActual = turnoActual
    this.ordenJugadores = ordenJugadores
    this.fechaEmpezado = fechaEmpezado
  }
}

// Clase PartidaGuardada: una captura del estatus de una partida y todas las jugadas hechas. No contiene el canvas de Konva
// Este debe guardar el mapa en el estatus inicial
export class PartidaGuardada extends PartidaSnapshot{
  fechaTerminado?: Date|null
  // listaAcciones: accion[]

  constructor (Mapa: MapaSimple, Jugadores: Jugador[], Reglas: Reglas, climaActual: Clima, diaActual: number, turnoActual: number, ordenJugadores: number[], fechaEmpezado: Date, fechaTerminado?: Date|null){
    super(Mapa, Jugadores, Reglas, climaActual, diaActual, turnoActual, ordenJugadores, fechaEmpezado)
    this.fechaTerminado = fechaTerminado
  }
}

// Clase PartidaJuego: guarda todo, incluyendo jugadas. También contiene otras funciones para
// saber si un juego se declara terminado, obtener ganadores y perdedores, "reproducir" jugadas
// y generar objetos de PartidaImagen. Incluye los sprites del juego
export class PartidaJuego {
  #mapa: Mapa
  #konvaMapa: KonvaMapa
  #jugadores: Jugador[]
  #reglas: Reglas
  #climaActual: Clima
  #diaActual: number
  #turnoActual: number
  #ordenJugadores: number[] // Lista de id's de jugadores (o sus nombres) ordenados
  #fechaEmpezado: Date
  #fechaTerminado?: Date|null
  // listaAcciones: accion[]

  constructor ( partidaInfo: PartidaSnapshot|PartidaGuardada, fechaTerminado?: Date|null ) {
    this.#mapa = new Mapa(partidaInfo.Mapa.nombre, partidaInfo.Mapa.dimensiones, partidaInfo.Mapa.casillas)
    console.log('Mapa valido: ', this.#mapa.esMapaValido())
    this.#konvaMapa = new KonvaMapa(32, this.#mapa, 'mapa-konva')

    this.#jugadores = partidaInfo.Jugadores
    this.#reglas = partidaInfo.Reglas

    this.#climaActual = this.setClima(partidaInfo.climaActual)
    this.#diaActual = this.setDiaActual(partidaInfo.diaActual)

    const comandantesJugables:Set<number|null> = this.#mapa.obtenerComandantesJugables()
    console.log('Comandantes jugables: ', comandantesJugables )
    this.#turnoActual = this.setTurnoActual(partidaInfo.turnoActual, comandantesJugables.size)

    this.#ordenJugadores = partidaInfo.ordenJugadores
    this.#fechaEmpezado = partidaInfo.fechaEmpezado
    if ( !fechaTerminado ){
      this.#fechaTerminado = fechaTerminado
    } else {
      this.#fechaTerminado = null
    }
  }
  public getMapa () {
    return this.#mapa
  }
  public getKonvaMapa (){
    return this.#konvaMapa
  }
  public getReglas = () => {
    return this.#reglas
  }
  public setClima = (clima: Clima) => {
    if ( !esClima(clima) ){
      console.error('Clima no existente: ', clima)
      if ( this.#climaActual == undefined ){
        this.#climaActual = 'Soleado'
      }
    } else {
      this.#climaActual = clima
    }

    return this.#climaActual
  }
  public getClima = () => {
    return this.#climaActual
  }
  private setDiaActual = (dia: number) => {
    if ( dia < 1 ){
      console.error('Dia no puede ser menor a 1')
      this.#diaActual = 1
    } else {
      this.#diaActual = Math.floor(dia)
    }

    return this.#diaActual
  }
  public siguienteDia = () => {
    if ( this.#reglas.limiteDias && this.#reglas.limiteDias < (this.#diaActual + 1) ){
      this.#diaActual++
    } else {
      this.#declararJuegoTerminado()
    }

    return this.#diaActual
  }
  public getDiaActual = () => {
    return this.#diaActual
  }
  // private diaAnterior = () => { return this.diaActual-- }
  public getOrdenJugadores = () => {
    return this.#ordenJugadores
  }
  public getFechaIniciado = () => {
    return this.#fechaEmpezado
  }
  public getFechaTerminado = () => {
    return this.#fechaTerminado
  }

  private setTurnoActual = (turnoActual:number, numComandanteJugables:number) => {
    if ( turnoActual < 0 ){
      // console.error('Turno no puede ser menor a 0')
      this.#turnoActual = 0
    } else if ( turnoActual >= numComandanteJugables ){
      // console.error('Turno no puede ser mayor al número de jugadores')
      // Da la vuelta
      this.#turnoActual = 0
    } else {
      this.#turnoActual = Math.floor(turnoActual)
    }

    return this.#turnoActual
  }
  public getListaJugadores (){
    return this.#jugadores
  }
  public getJugadorActual (){
    return this.#jugadores[this.#turnoActual]
  }
  // Talvez lo cambie a "terminarTurno"
  public siguienteJugador = () => {
    // habilitar el turno a todas las unidades del turno actual antes de pasar al siguiente jugador
    for (let i = 0; i < this.#jugadores.length; i++) {
      this.#turnoActual++
      if ( this.#turnoActual >= this.#jugadores.length ){
        this.#turnoActual = 0
        this.setDiaActual(this.#diaActual + 1)
      }
      if ( this.#jugadores[this.#turnoActual].getStatus() ){
        return
      }
    }

    console.log('No hay más jugadores disponibles. Juego terminado.')
    this.#declararJuegoTerminado()
    // return this.setTurnoActual((this.#turnoActual + 1), this.#mapa.obtenerComandantesJugables().size)
  }
  public getTurnoActual = () => {
    return this.#turnoActual
  }

  public generarUnidadMapaPartida (unidad:UnidadCasilla, coordenada: coordenada){
    this.#mapa.generarUnidadCasilla(unidad, coordenada)
    this.#konvaMapa.generarSpriteUnidad(unidad, coordenada)
  }

  public obtenerEquipos = ():Set<string> => {
    const setEquipos:Set<string> = new Set()
    this.#jugadores.forEach(jugador => {
      setEquipos.add(jugador.getEquipo())
    })

    return setEquipos
  }
  public obtenerFiltroHSVJugadores = () => {
    const setFiltrosHSV = new Set()
    return setFiltrosHSV
  }

  #declararJuegoTerminado (){
    this.#fechaTerminado = new Date(Date.now())
    this.declararGanadores()
    this.declararPerdedores()
    // actualizarInterfaces(ganadores, perdedores, dia, etc...)
    // deshabilitarInteraccciones
  }
  private declararGanadores (){}
  private declararPerdedores (){}

  // guardarPartidaJSON = async (liga: string) => {
  //   console.log('Guardar JSON de partida')
  //   // const fs = require('fs')
  //   // fs.writeFile(liga, JSON.stringify(this), (err, result) => {
  //   //   if( err ) console.error('error', err)
  //   // })
  // }
  // FUNCIONES PARA HACER DESPUÉS
  // esJuegoTerminado: Function
  // obtenerStatusJugadores: Function
  // obtenerStatusComandantesJugables: Function
  // obtenerGanadores: Function
  // obtenerPerdedores: Function
}

// Funciones de cargado y guardado
// export function cargarPartida({IDPartida}: {IDPartida: number}){
//   // BD: SELECT FROM Partida WHERE IDPartida
//   // JS: fetch(`partida:_${IDPartida}`).then(response => response.json()).then(res => res)
// }
// export function guardarPartida({IDPartida}: {IDPartida: number}){
//   // BD: SELECT FROM Partida WHERE IDPartida
//   // JS: fetch(`partida:_${IDPartida}`).then(response => response.json()).then(res => res)
// }
