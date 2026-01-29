import React, { useState, useEffect } from 'react'

import { DivJugadores, type jugadorData } from './jugador-divs.tsx'
import { CompraUnidadesMenu, type unidadCompra } from './compraUnidades.tsx'
import { InfoCasilla, type InfoCasillaT } from './info_casilla.tsx'
import { PartidaJuego, PartidaSnapshot } from './../partida.ts'
import { CursorMapaJuego } from './../cursorMapa.ts'
import type { Jugador } from './../jugador.ts'
import type { Reglas } from '../reglas.ts'

export type PartidaState = {
  jugadorActual: number
  diaActual: number
  reglas: Reglas
}

export function GameUI ({ jugadoresData, partidaData, partidaSnapshot }: {jugadoresData:jugadorData[], partidaData:PartidaState, partidaSnapshot: PartidaSnapshot}){

  const [infoCasilla, setInfoCasilla] = useState({
    estrellas: 0,
    gasActual: 10,
    gasMaxima: 20,
    hp: 40,
    munPrincipal: 2,
    munSecundaria: null,
    status: '',
    terreno: 'dsadsa'
  })
  const [casillaHover, setCasillaHover] = useState()
  // Pudiera ser la lista de casillas en vez de solo una
  const [casillaSeleccionada, setCasillaSeleccionada] = useState()
  const [jugadorActual, setJugadorActual] = useState(partidaData.jugadorActual)
  const [diaActual, setDiaActual] = useState(partidaData.diaActual)
  // const [unidadSeleccionada, setUnidadSeleccionada] = useState(info)
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(false)
  const [unidadesCompra, setUnidadesCompra] = useState([])

  useEffect(() => {
    const Partida = new PartidaJuego(partidaSnapshot, null)
    // Object.freeze(Partida)
    Partida.dibujarMapa('mapa-konva').then(() => {
      const cursorJuego = new CursorMapaJuego(Partida.getMapa(), {
        setInfoCasilla: setInfoCasilla,
        setCasillaHover: setCasillaHover,
        setCasillaSeleccionada: setCasillaSeleccionada,
        setJugadorActual: setJugadorActual,
        setPropiedadSeleccionada: setPropiedadSeleccionada,
        setUnidadesCompra: setUnidadesCompra
      }, {
        getJugadorActual: ():Jugador => {
          return Partida.getJugadorActual()
        }
      })
    })
  }, [])

  function siguienteJugador (jugadorActual:number, jugadores:Jugador[]){
    for (let i = 0; i < jugadores.length; i++) {
      jugadorActual++
      if ( jugadorActual >= jugadores.length ){
        jugadorActual = 0
        setDiaActual(diaActual + 1)
      }

      if ( jugadores[jugadorActual].getStatus() ){
        setJugadorActual(jugadorActual)
        return
      }
    }

    console.log('No hay más jugadores disponibles. Juego terminado.')
  }

  return (
    <>
      <div className='grid md:grid-cols-2 grid-cols-1' style={{ gap: '.5rem' }}>
        <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
          <div id="mapa-konva"></div>
          {React.useMemo(() => (
            <CompraUnidadesMenu listaUnidades={unidadesCompra} propiedadSeleccionada={propiedadSeleccionada} setPropiedadSeleccionada={setPropiedadSeleccionada} />
          ), [unidadesCompra, propiedadSeleccionada])}
          {/* <div id="menu-acciones"></div> */}
        </div>
        <div>
          <h1 className='text-center font-bold text-xl'>Dia {diaActual}</h1>
          <InfoCasilla info={infoCasilla} />
          <button onClick={() => {
            siguienteJugador(jugadorActual, partidaSnapshot.Jugadores)
          }
          } className='bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer px-3 py-2 mb-3 rounded-md' style={{ width: '100%', transitionDuration: '.3s' }}>Terminar turno</button>
          <DivJugadores jugadoresData={jugadoresData} turnoActual={jugadorActual} />
        </div>
      </div>
    </>
  )
}
