import type { Casilla } from '../mapa/casilla'
import type { paramsJugadorState } from './jugadorStateManager'

// Estados posibles
// Viendo el tablero
// Esperando a otros jugadores
// En menú de compra
// Seleccionando unidad (propia)

export class jugadorState {
  #leftClickHandler: (casilla?: Casilla)=>void|jugadorState
  #rightClickHandler: (casilla?: Casilla)=>void|jugadorState
  #hoverMouseHandler: (casilla?: Casilla)=>void|jugadorState
  #params: paramsJugadorState

  constructor ({ leftClickHandler, rightClickHandler, hoverMouseHandler, params }: {leftClickHandler:()=>void, rightClickHandler:()=>void, hoverMouseHandler:()=>void, params: paramsJugadorState }){
    this.#leftClickHandler = leftClickHandler
    this.#rightClickHandler = rightClickHandler
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
  getHoverMouseHandler (){
    return this.#hoverMouseHandler
  }
}
