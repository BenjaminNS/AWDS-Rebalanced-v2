import React, { useState, useEffect, useRef, useMemo } from 'react'

import { DivJugadores, type jugadorData } from './jugador-divs.tsx'
import { CompraUnidadesMenu } from './compraUnidades.tsx'
import { InfoCasilla } from './info_casilla.tsx'
import { PartidaJuego } from './../partida.ts'
import { CursorMapaJuego } from './../cursorMapa.ts'
import type { Jugador } from './../jugador.ts'
import { PartidaSnapshotMock } from '../mocks/PartidaSnapshotMock.ts'

export function GameUI (){
  const partidaJuego = React.useMemo(() => {
    return new PartidaJuego(PartidaSnapshotMock, null)
  }, [])
  const [infoCasilla, setInfoCasilla] = useState({
    estrellas: 0, gasActual: 10,
    gasMaxima: 20, hp: 40,
    munPrincipal: 2, munSecundaria: null,
    status: '', terreno: 'dsadsa'
  })

  const jugadoresDataTemp:jugadorData[] = []
  partidaJuego.getListaJugadores().forEach((jugador, i) => {
    jugadoresDataTemp.push(
      jugador.getJugadorData(partidaJuego.getMapa().getListaUnidadesDe1Comandante(i), partidaJuego.getMapa().getListaPropiedades(i)))
  })
  const [jugadoresData, setJugadoresData] = useState(jugadoresDataTemp)
  const [casillaHover, setCasillaHover] = useState()
  // Pudiera ser la lista de casillas en vez de solo una
  const [casillaSeleccionada, setCasillaSeleccionada] = useState()
  const [jugadorActual, setJugadorActual] = useState(partidaJuego.getTurnoActual())
  const [diaActual, setDiaActual] = useState(partidaJuego.getDiaActual())
  // const [unidadSeleccionada, setUnidadSeleccionada] = useState(info)
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(false)
  const [unidadesCompra, setUnidadesCompra] = useState([])

  useEffect(() => {
    setJugadoresData(jugadoresData)
    // Object.freeze(Partida)
    partidaJuego.dibujarMapa('mapa-konva').then(() => {
      new CursorMapaJuego(partidaJuego.getMapa(), {
        setInfoCasilla: setInfoCasilla,
        setCasillaHover: setCasillaHover,
        setCasillaSeleccionada: setCasillaSeleccionada,
        setJugadorActual: setJugadorActual,
        setPropiedadSeleccionada: setPropiedadSeleccionada,
        setUnidadesCompra: setUnidadesCompra
      }, {
        getJugadorActual: ():Jugador => {
          return partidaJuego.getJugadorActual()
        },
        getTurnoActual: () => {
          return partidaJuego.getTurnoActual()
        }
      })
    })
  }, [])

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
          <button id="siguiente-turno" onClick={() => {
            partidaJuego.siguienteJugador()
            setJugadorActual(partidaJuego.getTurnoActual())
            setDiaActual(partidaJuego.getDiaActual())
          }
          } className='bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer px-3 py-2 mb-3 rounded-md' style={{ width: '100%', transitionDuration: '.3s' }}>Terminar turno</button>
          <DivJugadores jugadoresData={jugadoresData} turnoActual={partidaJuego.getTurnoActual()} />
        </div>
      </div>
    </>
  )
}
