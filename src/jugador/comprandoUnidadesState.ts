import { jugadorState } from './jugadorState'
import { viendoTableroState } from './viendoTablero'

// Menú de compras también necesita recibir los parámetros
// return new viendoTableroState
const leftClickHandler = () => {}
const rightClickHandler = () => {
  // cerrar menu de compras
  return new viendoTableroState
}
const hoverMouseHandler = () => {}

export class comprandoUnidadesState extends jugadorState{
  constructor (){
    super({ leftClickHandler, rightClickHandler, hoverMouseHandler })
  }
}
