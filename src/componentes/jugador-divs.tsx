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

            {/* <!--<p>Unidades: <span data-text="unidades">?</span></p>
            <p>Dinero: <span data-text="dinero">?</span></p>
            <p>Propiedades: <span data-text="propiedades">?</span></p>
            <p>Ingresos diarios: <span data-text="ingresos-diarios">?</span></p>--> */}

            <section className="letra-equipo" data-text="equipo">{jugador.equipo}</section>

          </div>
        </div>
      ))}
    </div>
  )
}
