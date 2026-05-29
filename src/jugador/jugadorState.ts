import type { Casilla } from '../mapa/casilla'
import type { paramsJugadorState } from './jugadorStateManager'

// Estados posibles
// Viendo el tablero
// Esperando a otros jugadores
// En menú de compra
// Seleccionando unidad (propia)

export abstract class jugadorState {
  #leftClickHandler: (mousePosition: {x: number, y: number}, params: paramsJugadorState)=>void|jugadorState
  #rightClickReleaseHandler: (mousePosition: {x: number, y: number}, params: paramsJugadorState)=>void|jugadorState
  #rightClickHandler: (mousePosition: {x: number, y: number}, params: paramsJugadorState)=>void|jugadorState
  #hoverMouseHandler: (mousePosition: {x: number, y: number}, params: paramsJugadorState)=>void|jugadorState
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

  leftClickHandler (){
    return this.#leftClickHandler ({x: 0, y: 0}, this.#params)
  }
  rightClickHandler (){
    return this.#rightClickHandler ({x: 0, y: 0}, this.#params)
  }
  rightClickReleaseHandler (){
    return this.#rightClickReleaseHandler ({x: 0, y: 0}, this.#params)
  }
  hoverMouseHandler (){
    return this.#hoverMouseHandler ({x: 0, y: 0}, this.#params)
  }
}
