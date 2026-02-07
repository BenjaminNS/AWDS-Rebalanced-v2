import { useRef, useCallback, useState, useEffect } from 'react'
import { PartidaJuego } from '../partida'
import { PartidaSnapshotMock } from '../mocks/PartidaSnapshotMock'
import { CursorMapaJuego } from '../cursorMapa'
import type { Jugador } from '../jugador'

export function usePartidaJuego () {
  // fetch(partidaLiga).then(response => response.json()).then(async(mapa) => { })
  // if( Math.random() >.5 ){
  //     await cargarMapa(PartidaSnapshotMock['Mapa'])
  //     cargarJugadores({jugadores: PartidaSnapshotMock['Jugadores']})
  //     if( partidaJuego.obtenerEquipos().size < 1 ){
  //         console.error('El número de equipos no puede ser menor a 2.')
  //     }
  //     cargarEstadoPartida(PartidaSnapshotMock['climaActual'], PartidaSnapshotMock['diaActual'], PartidaSnapshotMock['turnoActual'])
  // } else{
  //     partidaJuego["Mapa"] = await generarMapaAleatorio({dimensiones: {filas: 18, columnas: 23}, idContenedor: 'mapa-konva'})
  // }

  const partidaRef = useRef<PartidaJuego | null>(null)
  const cursorMapaJuego = useRef<CursorMapaJuego | null>(null)
  const [diaActual, setDiaActual] = useState(0)
  const [turnoActual, setTurnoActual] = useState(0)
  // const [climaActual, setClimaActual] = useState('')

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
  const [jugadorActual, setJugadorActual] = useState(partidaRef.current?.getJugadorActual())
  // const [unidadSeleccionada, setUnidadSeleccionada] = useState(info)
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(false)
  const [unidadesCompra, setUnidadesCompra] = useState([])

  // Inicializar la partida una sola vez
  useEffect(() => {
    const nuevaPartida = new PartidaJuego(PartidaSnapshotMock)
    partidaRef.current = nuevaPartida

    // Sincronizar estado inicial
    setDiaActual(nuevaPartida.getDiaActual())
    setTurnoActual(nuevaPartida.getTurnoActual())
    // setClimaActual(nuevaPartida.getClima())
  }, [])

  // Métodos que actualizar React cuando cambian datos
  const dibujarMapa = useCallback(async (contenedor: string) => {
    if (!partidaRef.current) return
    await partidaRef.current.dibujarMapa(contenedor)
    new CursorMapaJuego(partidaRef.current.getMapa(), {
      setInfoCasilla: setInfoCasilla,
      setCasillaHover: setCasillaHover,
      setCasillaSeleccionada: setCasillaSeleccionada,
      setJugadorActual: setJugadorActual,
      setPropiedadSeleccionada: setPropiedadSeleccionada,
      setUnidadesCompra: setUnidadesCompra
    }, {
      getJugadorActual: ():Jugador => {
        return partidaRef.current?.getJugadorActual()
      }
    })
  }, [])

  const getJugadorActual = useCallback(() => {
    return partidaRef.current?.getJugadorActual()
  }, [turnoActual]) // Re-calcula si cambió el turno

  return {
    // Datos que disparan re-renders
    diaActual,
    turnoActual,
    // climaActual,

    // Métodos que actualizan estado
    // siguienteJugador,
    // cambiarClima,
    dibujarMapa,

    // Acceso a la instancia completa si necesitas más
    getJugadorActual
  }
}

export const partidaReducer = (state:PartidaJuego, action:{type: string, payload: object}) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType){
  case 'SIGUIENTE_JUGADOR':
    return state
  }

  return state
}
