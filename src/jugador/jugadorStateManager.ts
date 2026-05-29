import type Konva from 'konva';
import type { Jugador } from '../jugador';
import { Casilla, type coordenada } from '../mapa/casilla';
import type { KonvaMapa } from '../mapa/KonvaMapa';
import type { nombreTerreno } from '../terreno/terrenov2';
import type { estado, municionBase } from '../unidades/unidadBase';
import { jugadorState } from './jugadorState'

export type paramsJugadorState = {
  tamanoCasilla: number,
  getJugadorActual: ()=>Jugador
  getCasilla: (mousePosition: {x: number, y: number}, tamanoCasilla: number)=>Casilla|null
  getTurnoActual: ()=>number
  konvaMapa: KonvaMapa
  // actualizarInfoCasilla: (coordHover: coordenada, casillaHover: Casilla)=>void
  setInfoCasilla: (
    { estrellas, gasActual, gasMaxima, hp, municionesPrincipales, municionesSecundarias, status, terreno } :
    { 
      estrellas: number|null|undefined,
      gasActual: number|null|undefined,
      gasMaxima: number|null|undefined,
      hp: number|null|undefined,
      municionesPrincipales: municionBase|null|undefined,
      municionesSecundarias: municionBase|null|undefined,
      status: estado|null|undefined,
      terreno: nombreTerreno
    }
  ) => void
  cursorImg: Konva.Image
}

export class jugadorStateManager {
  #jugadorState: jugadorState
  readonly #params: paramsJugadorState

  constructor ({ jugadorState, params }: {jugadorState: jugadorState, params: paramsJugadorState}){
    this.#jugadorState = jugadorState
    this.#params = params
  }

  getParams (){
    return this.#params
  }

  setJugadorState (jugadorState: jugadorState){
    // Solo permitir que se pueda cambiar de esperando otro jugador y viendo tablero
    this.#jugadorState = jugadorState
  }
  getJugadorState (){
    return this.#jugadorState
  }

  leftClickHandler (){
    const returnState = this.#jugadorState.leftClickHandler()
    if ( returnState instanceof jugadorState ){
      this.setJugadorState(returnState)
    }
  }
  rightClickHandler (){
    const returnState = this.#jugadorState.rightClickHandler()
    if ( returnState instanceof jugadorState ){
      this.setJugadorState(returnState)
    }
  }
  hoverMouseHandler (){
    const returnState = this.#jugadorState.hoverMouseHandler()
    if ( returnState instanceof jugadorState ){
      this.setJugadorState(returnState)
    }
  }
}
