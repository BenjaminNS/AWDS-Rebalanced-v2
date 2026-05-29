import type { Casilla } from '../mapa/casilla'
import { jugadorState } from './jugadorState'
import { type paramsJugadorState } from './jugadorStateManager'
import { menuComprasState } from './menuComprasState'

const canLeftClick = true
const canHoverFlag = true
const canRightClick = true

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
const hoverMouseHandler = (mousePosition: {x: number, y: number}, params: paramsJugadorState) => {
  const pos = params.konvaMapa.getKonvaStage()?.getPointerPosition()
  console.log(`hoverMouseHandler viendo tablero: ${pos}`)
  if (!pos) return

  // return

  if ( !canHoverFlag )
    return

  // if se tiene abierto un menú (los botones tienen el evento de mouseover) return
  // const pos = params.konvaMapa.getKonvaStage()?.getPointerPosition()
  // if (!pos) return
  // debugger
  
  // TO-DO: obtener la casilla (no funciona porque mapaJuego no tiene definido konvaStage)
  const casillaHover = params.getCasilla(pos, params.tamanoCasilla)
  // const coordHover = { x: Math.floor(pos.x / params.konvaMapa.getTamanoCasilla()), y: Math.floor(pos.y / params.konvaMapa.getTamanoCasilla()) }
  // const casillaHover = params.getCasilla(pos, params.tamanoCasilla) as Casilla
  if ( casillaHover == null ) return

  // params.cursorImg.x(coordHover.x * params.konvaMapa.getTamanoCasilla())
  // params.cursorImg.y(coordHover.y * params.konvaMapa.getTamanoCasilla())

  params.setInfoCasilla({
    estrellas: casillaHover.getEstrellasDefensa(),
    gasActual: casillaHover.getUnidad()?.getGasActual(),
    gasMaxima: casillaHover.getUnidad()?.getMaxGasolina(),
    hp: casillaHover.getUnidad()?.getHp(),
    municionesPrincipales: casillaHover.getUnidad()?.getMunicionPrincipal(),
    municionesSecundarias: casillaHover.getUnidad()?.getMunicionSecundaria(),
    status: casillaHover.getUnidad()?.getEstado(),
    terreno: casillaHover.getNombreCorto()
  })
  // params.actualizarInfoCasilla(coordHover, casillaHover)
}

export class viendoTableroState extends jugadorState{
  constructor (params: paramsJugadorState){
    super({ leftClickHandler, rightClickHandler, rightClickReleaseHandler, hoverMouseHandler, params })
  }
}
