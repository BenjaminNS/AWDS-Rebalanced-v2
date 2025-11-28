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

export function CompraUnidadesMenu ({ listaUnidades, menuHabilitado = true }:{listaUnidades:unidadCompra[], menuHabilitado: boolean}){
  return menuHabilitado && (
    <div className={'absolute left-0 top-0' + menuHabilitado ? 'hidden' : '' } style={{ background: '#33333355', width: '100%', height: '100%' }}>
      <div className='menu-compra-unidades grid grid-cols-2 grid-rows-8 bg-amber-50 rounded-sm absolute p-2 gap-1 shadow-2xl shadow-gray-500 scroll-auto'>
        <h1 className='col-span-2 text-center font-bold'>Compra unidades</h1>
        {listaUnidades.map(UnidadCompra => {
          return UnidadCompra.habilitado && (
            <div className='opcion-compra bg-amber-200 hover:bg-amber-400 flex p-2 gap-.5 cursor-pointer rounded-sm' onClick={UnidadCompra.clickHandler} key={UnidadCompra.nombre}>
              <img src='./img/unidades/explosion.gif' alt={UnidadCompra.nombre} className='icon'/>
              <div className='nombre flex flex-col justify-center'>{UnidadCompra.nombre}</div>
              <div className='costo flex flex-col justify-center font-bold text-right'>{UnidadCompra.costo}</div>
            </div>
          )})}
      </div>
    </div>
  )
}
