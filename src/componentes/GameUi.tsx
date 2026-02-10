import React, { useState, useEffect, useRef, type SetStateAction } from 'react'

import { DivJugadores, type jugadorData } from './JugadorDiv.tsx'
import { CompraUnidadesMenu } from './compraUnidades.tsx'
import { InfoCasilla } from './info_casilla.tsx'
import { PartidaJuego } from './../partida.ts'
import { CursorMapaJuego } from './../cursorMapa.ts'
import type { Jugador } from './../jugador.ts'
import { PartidaSnapshotMock } from '../mocks/PartidaSnapshotMock.ts'

export function GameUI (){
  const partidaJuego:React.RefObject<PartidaJuego> = useRef(null)
  const [infoCasilla, setInfoCasilla] = useState({
    estrellas: 0, gasActual: 10, gasMaxima: 20, hp: 100,
    munPrincipal: 2, munSecundaria: null, status: '', terreno: ''
  })

  const [jugadoresData, setJugadoresData]:SetStateAction<jugadorData> = useState([])
  const [casillaHover, setCasillaHover] = useState()
  // Pudiera ser la lista de casillas en vez de solo una
  const [casillaSeleccionada, setCasillaSeleccionada] = useState()
  const [jugadorActual, setJugadorActual] = useState(0)
  const [diaActual, setDiaActual] = useState(0)
  // const [unidadSeleccionada, setUnidadSeleccionada] = useState(info)
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(false)
  const [unidadesCompra, setUnidadesCompra] = useState([])
  const [turnoActual, setTurnoActual] = useState(0)

  const terminarTurnoBtnClickHandler = React.useCallback(() => {
    partidaJuego.current.siguienteJugador()
    setTurnoActual(partidaJuego.current.getTurnoActual())
    setJugadorActual(partidaJuego.current.getTurnoActual())
    setDiaActual(partidaJuego.current.getDiaActual())
  }, [])

  useEffect(() => {
    // Debería usar try/catch
    partidaJuego.current = new PartidaJuego(PartidaSnapshotMock, null)
    const jugadoresDataTemp:jugadorData[] = []
    partidaJuego.current.getListaJugadores().forEach((jugador, i) => {
      jugadoresDataTemp.push(
        jugador.getJugadorData(partidaJuego.current.getMapa().getListaUnidadesDe1Comandante(i), partidaJuego.current.getMapa().getListaPropiedades(i)))
    })
    setJugadoresData(jugadoresDataTemp)
    setDiaActual(partidaJuego.current.getDiaActual())
    setTurnoActual(partidaJuego.current.getTurnoActual())

    new CursorMapaJuego(partidaJuego.current.getMapa(), partidaJuego.current.getKonvaMapa(), {
      setInfoCasilla: setInfoCasilla, setCasillaHover: setCasillaHover,
      setCasillaSeleccionada: setCasillaSeleccionada, setJugadorActual: setJugadorActual,
      setPropiedadSeleccionada: setPropiedadSeleccionada, setUnidadesCompra: setUnidadesCompra
    }, {
      getJugadorActual: ():Jugador => {
        return partidaJuego.current.getJugadorActual()
      }, getTurnoActual: () => {
        return partidaJuego.current.getTurnoActual()
      }
    })
    // })
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
          <button id="siguiente-turno" onClick={terminarTurnoBtnClickHandler} className='bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer px-3 py-2 mb-3 rounded-md' style={{ width: '100%', transitionDuration: '.3s' }}>
            Terminar turno
          </button>
          <DivJugadores jugadoresData={jugadoresData} turnoActual={turnoActual} />
        </div>
      </div>
    </>
  )
}
