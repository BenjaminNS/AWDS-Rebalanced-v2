import './style.css'
import { MapaSimple, Mapa } from './mapa/mapa.ts'
import { Jugador } from './jugador.ts'
import { Reglas } from './reglas.ts'
import { esClima } from './clima.ts'
import type { Clima } from './clima.ts'
// import { accion } from './accion.ts'
import { generarMapaKonva } from './mapa/mapaKonva.ts'
// Se debería cargar una partida con un id único de partida solicitando a una DB

// Clase PartidaSnapshot: una captura del estatus de una partida. No contiene el canvas de Konva
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

  constructor(Mapa: MapaSimple, Jugadores: Jugador[], Reglas: Reglas, climaActual: Clima, diaActual: number, turnoActual: number, ordenJugadores: number[], fechaEmpezado: Date){
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

  constructor(Mapa: MapaSimple, Jugadores: Jugador[], Reglas: Reglas, climaActual: Clima, diaActual: number, turnoActual: number, ordenJugadores: number[], fechaEmpezado: Date, fechaTerminado?: Date|null){
    super(Mapa, Jugadores, Reglas, climaActual, diaActual, turnoActual, ordenJugadores, fechaEmpezado)
    this.fechaTerminado = fechaTerminado
  }
}

// Clase PartidaJuego: guarda todo, incluyendo jugadas. También contiene otras funciones para 
// saber si un juego se declara terminado, obtener ganadores y perdedores, "reproducir" jugadas
// y generar objetos de PartidaImagen. Incluye los sprites del juego
export class PartidaJuego {
  Mapa: Mapa
  Jugadores: Jugador[]
  Reglas: Reglas
  climaActual: Clima
  diaActual: number
  turnoActual: number
  ordenJugadores: number[] // Lista de id's de jugadores (o sus nombres) ordenados
  fechaEmpezado: Date
  fechaTerminado?: Date|null
  // listaAcciones: accion[]

  constructor( partidaInfo: PartidaSnapshot|PartidaGuardada, fechaTerminado?: Date|null ) {
    this.Mapa = new Mapa(partidaInfo.Mapa.nombre, partidaInfo.Mapa.dimensiones, partidaInfo.Mapa.casillas)
    console.log('Mapa valido: ', this.Mapa.esMapaValido())


    this.Jugadores = partidaInfo.Jugadores
    this.Reglas = partidaInfo.Reglas


    if( !esClima(partidaInfo.climaActual) ){
      console.error('Clima no existente: ', partidaInfo.climaActual)
      this.climaActual = 'Soleado'        
    } else{
      this.climaActual = partidaInfo.climaActual
    }


    if( partidaInfo.diaActual < 0 ){
      console.error('Dia no puede ser menor a 1')
      this.diaActual = 1
    } else{
      this.diaActual = Math.floor(partidaInfo.diaActual)
    }
    const comandantesJugables:Set<number> = this.Mapa.obtenerComandantesJugables()
    console.log('Comandantes jugables: ', comandantesJugables )
    if( partidaInfo.turnoActual < 0 ){
      console.error('Turno no puede ser menor a 0')
      this.turnoActual = 0
    } else if( partidaInfo.turnoActual >= comandantesJugables.size ){
      console.error('Turno no puede ser mayor al número de jugadores')
      this.turnoActual = 0
    }else{
      this.turnoActual = Math.floor(partidaInfo.turnoActual)
    }
    

    this.ordenJugadores = partidaInfo.ordenJugadores
    this.fechaEmpezado = partidaInfo.fechaEmpezado
    if( !fechaTerminado ){
      this.fechaTerminado = fechaTerminado
    } else{
      this.fechaTerminado = null
    }
  }
  obtenerEquipos = ():Set<string> => {
      const setEquipos = new Set()
      this.Jugadores.forEach(jugador => {
          setEquipos.add(jugador.equipo)
      });

      return setEquipos
  }
  obtenerFiltroHSVJugadores = () => {
      const setFiltrosHSV = new Set()
      return setFiltrosHSV
  }

  dibujarMapa = async (contenedor: string) => {
    this.Mapa = await generarMapaKonva({ mapa: this.Mapa, idContenedor: contenedor })
  }
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