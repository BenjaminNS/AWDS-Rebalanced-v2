import type { Casilla } from '../mapa/casilla'
import { jugadorState } from './jugadorState'
import { type paramsJugadorState } from './jugadorStateManager'
import { menuComprasState } from './menuComprasState'

const leftClickHandler = (mousePosition: {x: number, y: number}, tamanoCasilla: number, jugadorActual: number, params: paramsJugadorState) => {
  const casillaSeleccionada = getCasilla(mousePosition, tamanoCasilla) as Casilla

  if ( casillaSeleccionada == null )
    return

  const unidadCasilla = casillaSeleccionada.getUnidad()
  if ( casillaSeleccionada.getUnidad() != null ){
    //
  } else if ( casillaSeleccionada.getPropietario() === jugadorActual ){
    //
    return new menuComprasState(params)
  }
}
const rightClickHandler = () => {}
const hoverMouseHandler = () => {}

export class viendoTableroState extends jugadorState{
  #leftClick = true
  #hoverFlag = true
  #rightClick = true

  constructor (params: paramsJugadorState){
    super({ leftClickHandler, rightClickHandler, hoverMouseHandler, params })
  }

}
