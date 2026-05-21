import { jugadorState } from './jugadorState'

const leftClickHandler = () => {}
const rightClickHandler = () => {}
const hoverMouseHandler = () => {
  // Este pudiera tener el evento de hover normal
}

export class esperandoState extends jugadorState{
  constructor (){
    super({ leftClickHandler, rightClickHandler, hoverMouseHandler })
  }
}
