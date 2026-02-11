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

export function CompraUnidadesMenu ({ listaUnidades, propiedadSeleccionada, actualizarInfo, setPropiedadSeleccionada }:{
  listaUnidades:unidadCompra[], propiedadSeleccionada: boolean,
  setPropiedadSeleccionada: (value:null) => void,
  actualizarInfo: ()=>void
}){
  return (
    <div className={propiedadSeleccionada ? 'absolute left-0 top-0' : 'hidden' } style={{ background: '#33333355', width: '100%', height: '100%' }}>
      <div className='menu-compra-unidades grid grid-cols-2 grid-rows-8 bg-amber-50 rounded-sm absolute p-2 gap-1 shadow-2xl shadow-gray-500 scroll-auto cursor-pointer'>
        <h1 className='col-span-2 text-center font-bold'>Compra unidades</h1>
        <p className='text-red-600 text-xl font-extrabold bg-neutral-300 px-2 py-0 rounded-lg absolute right-1.5 top-1.5' onClick={() => {
          console.log('Cerrando menú. No se compro unidad')
          setPropiedadSeleccionada(null)
        }}>X</p>
        { propiedadSeleccionada && listaUnidades.map(UnidadCompra => {
          return (
            <div className={'opcion-compra bg-amber-200 hover:bg-amber-400 flex p-2 gap-.5 cursor-pointer rounded-sm'
              + ( UnidadCompra.habilitado ? '' : ' deshabilitado' )} onClick={() => {
              if (UnidadCompra.habilitado){
                UnidadCompra.clickHandler()
                actualizarInfo()
                setPropiedadSeleccionada(null)
              } else {
                console.log('Botón inhabilitado')
              }
            }} key={UnidadCompra.nombre}>
              <img src={'./img/unidades/' + UnidadCompra.spriteUrl} alt={UnidadCompra.nombre} className='icon'/>
              <div className='nombre flex flex-col justify-center'>{UnidadCompra.nombre}</div>
              <div className='costo flex flex-col justify-center font-bold text-right'>{UnidadCompra.costo.toString()}</div>
            </div>
          )}
        )}
      </div>
    </div>
  )
}
