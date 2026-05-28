import type { Casilla } from '../mapa/casilla'
import { jugadorState } from './jugadorState'
import { type paramsJugadorState } from './jugadorStateManager'
import { menuComprasState } from './menuComprasState'

const leftClickHandler = (mousePosition: {x: number, y: number}, params: paramsJugadorState) => {
  console.log(`leftClickHandler viendo tablero: ${mousePosition}`)
  return

  const casillaSeleccionada = params.getCasilla(mousePosition, params.tamanoCasilla) as Casilla

  if ( casillaSeleccionada == null )
    return

  const unidadCasilla = casillaSeleccionada.getUnidad()
  if ( casillaSeleccionada.getUnidad() != null ){
    //
  } else if ( casillaSeleccionada.getPropietario() === params.jugadorActual() ){
    // return new menuComprasState(params)
  }
}
const rightClickHandler = (mousePosition: {x: number, y: number}, params: paramsJugadorState) => {
  // const coord = this.#konvaMapa.calcularCoordenada(this.#konvaMapa.getTamanoCasilla())
  // if ( coord == null )
  //   return

  // const casilla = this.mapa.getCasilla(coord)
  // if ( casilla == null )
  //   return

  // const unidad = casilla.getUnidad()
  // if ( unidad != null ){
  //   mostrarCasillasAtaque(unidad, coord)
  // }
}
const rightClickReleaseHandler = (mousePosition: {x: number, y: number}, params: paramsJugadorState) => {}
const hoverMouseHandler = (mousePosition: {x: number, y: number}, params: paramsJugadorState) => {}

export class viendoTableroState extends jugadorState{
  #leftClick = true
  #hoverFlag = true
  #rightClick = true

  constructor (params: paramsJugadorState){
    super({ leftClickHandler, rightClickHandler, rightClickReleaseHandler, hoverMouseHandler, params })
  }
}
