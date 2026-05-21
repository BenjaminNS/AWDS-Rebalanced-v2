import { jugadorState } from './jugadorState'

export type paramsJugadorState = object

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
    const returnState = this.#jugadorState.getLeftClickHandler()
    if ( returnState instanceof jugadorState ){
      this.setJugadorState(returnState)
    }
  }
  rightClickHandler (){
    const returnState = this.#jugadorState.getRightClickHandler()
    if ( returnState instanceof jugadorState ){
      this.setJugadorState(returnState)
    }
  }
  hoverMouseHandler (){
    const returnState = this.#jugadorState.getHoverMouseHandler()
    if ( returnState instanceof jugadorState ){
      this.setJugadorState(returnState)
    }
  }
}
