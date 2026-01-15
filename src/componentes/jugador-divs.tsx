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
      {jugadoresData.map((jugador, i) => (
        <div key={i} className={ !jugador.activo ? 'elemento-jugador inactivo' : 'elemento-jugador' } >
          <div className="top" style={{ display: 'flex', alignItems: 'center' }}>
            <h3 data-text="nombre-jugador" style={{ flex: 'auto', padding: '.5rem' }}>{jugador.nombre}</h3>
            <img className="personaje-img" src={baseImgComandante + jugador.comandanteImgUrl} alt="Comandante" />
          </div>

          <div style={{ padding: '.5rem' }}>
            <div className="carga-cop" title="35000"></div>

            {/* <!--<p>Unidades: <span data-text="unidades">?</span></p>
            <p>Dinero: <span data-text="dinero">?</span></p>
            <p>Propiedades: <span data-text="propiedades">?</span></p>
            <p>Ingresos diarios: <span data-text="ingresos-diarios">?</span></p>--> */}

            <section className="letra-equipo" data-text="equipo">{jugador.equipo}</section>

            {/* <button>Poder</button>
            <button>Super Poder</button> */}
          </div>
        </div>
      ))}
    </div>
  )
}
