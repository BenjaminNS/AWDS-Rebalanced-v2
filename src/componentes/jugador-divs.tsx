import React from 'react'
import './jugador-div.css'
const baseImgComandante = './img/comandantes/'

// Esto talvez podría obtenerlo de otro archivo
export type jugadorData = {
  id: string,
  nombre: string,
  activo: boolean,
  comandanteImgUrl: string,
  color: string,
  // agregar efecto de cuando se haga clic
  poderes: {nombre: string, costo: number }[],
  cargaActual: number,
  cargaMaxima: number,
  numUnidades: number,
  numPropiedades: number,
  ingresosDiarios: number,
  dineroActual: number,
  estrellas: number,
  equipo: 'A'|'B'|'C'|'D',
}

export function DivJugadores ({ jugadoresData }: { jugadoresData: jugadorData[] }){
  return (
    <div id="seccion-jugadores">
      {jugadoresData.map((jugador) => (
        <div key={jugador.id} className={ !jugador.activo ? 'elemento-jugador pb-2 inactivo' : 'elemento-jugador pb-2' } style={{ backgroundColor: jugador.color }} >
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid black', backgroundColor: 'rgba(0, 0, 0, 0.33)' }}>
            <h3 data-text="nombre-jugador" className='text-lg font-bold italic' style={{ flex: 'auto', padding: '.5rem' }}>{jugador.nombre}</h3>
            <img className="personaje-img" src={baseImgComandante + jugador.comandanteImgUrl} alt={jugador.comandanteImgUrl} />
          </div>

          <div className='px-2 mb-2'>
            <div className="carga-cop mb-2" title={jugador.cargaActual.toString()} style={{ '--porcentajeCarga': ( jugador.cargaActual / jugador.cargaMaxima * 100 ) + '%', width: (jugador.estrellas * 10) + '%' }}>
              {Array.from({ length: Math.max(0, jugador.estrellas - 1) }).map((_, i) => (
                <div key={i} className='separador'></div>
              ))}
            </div>

            <div className='seccion-poderes flex mb-2' style={{ gap: '.25rem' }}>
              {
                jugador.poderes.map((poder, i) => (
                  <button key={i} disabled={jugador.cargaActual < poder.costo} className='rounded-xl cursor-pointer py-1.5 px-3 bg-orange-200 hover:bg-orange-300 font-bold border-b-gray-500' style={{ flexGrow: '1', maxWidth: '50%', borderWidth: '1px' }}>{poder.nombre}</button>
                ))
              }
            </div>
          </div>

          <div className='px-2'>
            <section id={jugador.nombre + '_info'} className='jugador-info grid grid-cols-2' style={{ background: '#BBBBBB88', border: '#44444488 solid 1px' }}>
              <div className='dato flex items-center'>
                <img src="./img/huds/contador_unidades.png" alt="" className='icono-info flex-col'/>
                <p data-text={ 'numero-unidades-' + jugador.nombre } className='flex-1 px-2 text-center'>{jugador.numUnidades}</p>
                <p data-text={ 'valor-unidades-' + jugador.nombre } className='flex-1 px-2 text-center'>{jugador.numUnidades}G</p>
              </div>

              <div className='dato flex items-center'>
                <img src="./img/huds/dinero.png" alt="" className='icono-info flex-col'/>
                <p data-text={ 'dinero-actual-' + jugador.nombre } className='flex-1 px-2 text-center'>{jugador.dineroActual}G</p>
                <p data-text={ 'ingresos-diarios-' + jugador.nombre } className='flex-1 px-2 text-center'>+{jugador.ingresosDiarios}G</p>
              </div>

              <div className='dato flex items-center col-span-2'>
                <img src="./img/huds/propiedad.png" alt="" className='icono-info flex-col'/>
                <p data-text={ 'numero-propiedades-' + jugador.nombre } className='flex-1 px-2 text-center'>{jugador.numUnidades}</p>
                {/* Numero de propiedades desglosado por la cantidad de cada tipo (ciudades, fabricas, aeropuertos, puertos navales, com towers) y total */}
              </div>
            </section>
          </div>
        </div>
      ))}
    </div>
  )
}
