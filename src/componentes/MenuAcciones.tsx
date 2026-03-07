import React from 'react'
// import { useState } from 'react'
import './MenuAcciones.css'

export type opcionAccion = {
  nombre: string,
  clickHandler: () => void
}

export function MenuAcciones ({ opciones, setOpciones } : {opciones:opcionAccion[]|null, setOpciones: Function}){

  const rightClickHandler = (ev:Event) => {
    ev.preventDefault()
    setOpciones([])
  }

  if ( opciones == null || opciones.length === 0 )
    return

  return (
    <div id='contenedor-menu-acciones' onContextMenu={rightClickHandler}>
      <div id='menu-acciones'>
        {opciones.map((opcion) => (
          <button key={opcion.nombre} className='opcion-accion bg-gray-300 hover:bg-gray-400 px-2 py-1 font-medium' onClick={() => {
            setOpciones([])
            opcion.clickHandler()
          }}>{opcion.nombre}</button>
        ))}
      </div>
    </div>
  )
}
