
import React from 'react'
import './compraUnidades.css'
export type unidadCompra = {
  spriteUrl: string
  nombre: string,
  costo: number,
  // Talvez cambiar el nombre a visible
  habilitado: boolean,
  clickHandler: ()=>void
}

export function CompraUnidadesMenu ({ listaUnidades }:{listaUnidades:unidadCompra[]}){
  return (
    <div className='menu-compra-unidades'>
      {listaUnidades.map(UnidadCompra => {
        return UnidadCompra.habilitado && (
          <div className='opcion-compra' onClick={UnidadCompra.clickHandler} key={UnidadCompra.nombre}>
            {/* <img src={UnidadCompra.spriteUrl} alt="" className='icon'/> */}
            <div className='nombre'>{UnidadCompra.nombre}</div>
            <div className='costo'>{UnidadCompra.costo}</div>
          </div>
        )})}
    </div>
  )
}
