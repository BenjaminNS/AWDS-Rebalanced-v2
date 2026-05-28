import type { Jugador } from '../jugador';
import { Casilla } from '../mapa/casilla';
import { jugadorState } from './jugadorState'

export type paramsJugadorState = {
  tamanoCasilla: number,
  getJugadorActual: ()=>Jugador
  getCasilla: (mousePosition: {x: number, y: number}, tamanoCasilla: number)=>Casilla|null
  getTurnoActual: ()=>number
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
