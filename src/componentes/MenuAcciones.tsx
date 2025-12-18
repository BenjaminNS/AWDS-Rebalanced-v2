import React from 'react'
// import { useState } from 'react'
import './MenuAcciones.css'

export type opcionAccion = {
  texto: string,
  clickHandler: () => void
}

export function MenuAcciones (opciones:opcionAccion[]){
  // const { opciones, setOpciones } = useState([])
  return (
    <>
      <div id='menu-acciones'>
        {opciones.map((opcion) => (
          <button className='opcion-accion' onClick={opcion.clickHandler}>{opcion.texto}</button>
        ))}
      </div>
    </>
  )
}
