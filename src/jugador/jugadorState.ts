import type { Casilla } from '../mapa/casilla'
import type { paramsJugadorState } from './jugadorStateManager'

// Estados posibles
// Viendo el tablero
// Esperando a otros jugadores
// En menú de compra
// Seleccionando unidad (propia)

export abstract class jugadorState {
  #leftClickHandler: (casilla?: Casilla)=>void|jugadorState
  #rightClickReleaseHandler: (casilla?: Casilla)=>void|jugadorState
  #rightClickHandler: (casilla?: Casilla)=>void|jugadorState
  #hoverMouseHandler: (casilla?: Casilla)=>void|jugadorState
  #params: paramsJugadorState

  constructor ({ leftClickHandler, rightClickHandler, hoverMouseHandler, rightClickReleaseHandler, params }: {leftClickHandler:()=>void, rightClickHandler:()=>void, hoverMouseHandler:()=>void, rightClickReleaseHandler:()=>void, params: paramsJugadorState }){
    this.#leftClickHandler = leftClickHandler
    this.#rightClickHandler = rightClickHandler
    this.#rightClickReleaseHandler = rightClickReleaseHandler
    this.#hoverMouseHandler = hoverMouseHandler
    this.#params = params
  }

  getParams (){
    return this.#params
  }

  getLeftClickHandler (){
    return this.#leftClickHandler
  }
  getRightClickHandler (){
    return this.#rightClickHandler
  }
  getRightClickReleaseHandler (){
    return this.#rightClickReleaseHandler
  }
  getHoverMouseHandler (){
    return this.#hoverMouseHandler
  }
}
