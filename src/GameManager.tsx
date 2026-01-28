import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { DivJugadores, type jugadorData } from './componentes/jugador-divs.tsx'
import { CompraUnidadesMenu, type unidadCompra } from './componentes/compraUnidades.tsx'
import { InfoCasilla, type InfoCasillaT } from './componentes/info_casilla.tsx'
import { Header, ElementosHeader } from './componentes/header.tsx'
// Esta función solo debería usarlo en el creador de mapas.html
// import { tamanoCasilla, MAPA_CAPAS } from './mapa/mapaKonva.ts'
import { PartidaSnapshotMock } from './mocks/PartidaSnapshotMock.ts'
import { PartidaJuego } from './partida.ts'
import { CursorMapaJuego } from './cursorMapa.ts'
// import { PrecargarTodosComandantes } from './comandantes/registroComandantes.ts'
import type { Jugador } from './jugador.ts'

function GameUI ({ jugadoresData, info }: {jugadoresData:jugadorData[], info: InfoCasillaT}){
  // useState de variables tipo partida, jugadores, unidades, etc.
  const [infoCasilla, setInfoCasilla] = useState(info)
  const [casillaHover, setCasillaHover] = useState()
  // Pudiera ser la lista de casillas en vez de solo una
  const [casillaSeleccionada, setCasillaSeleccionada] = useState()
  const [jugadorActual, setJugadorActual] = useState(PartidaSnapshotMock.turnoActual)
  const [diaActual, setDiaActual] = useState(PartidaSnapshotMock.diaActual)
  // const [unidadSeleccionada, setUnidadSeleccionada] = useState(info)
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(false)
  const [unidadesCompra, setUnidadesCompra] = useState([])

  useEffect(() => {
    const Partida = new PartidaJuego(PartidaSnapshotMock, null)
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
      {/* Header debería ir en otra capa aparte */}
      {React.useMemo(() => (
        <Header elementosHeader={ElementosHeader}/>
      ), [])}
      <div className='grid md:grid-cols-2 grid-cols-1' style={{ gap: '.5rem' }}>
        <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
          <div id="mapa-konva"></div>
          {React.useMemo(() => (
            <CompraUnidadesMenu listaUnidades={unidadesCompra} propiedadSeleccionada={propiedadSeleccionada} setPropiedadSeleccionada={setPropiedadSeleccionada} />
          ), [unidadesCompra, propiedadSeleccionada])}
          {/* <div id="menu-acciones"></div> */}
        </div>
        {/* Talvez esta sección debería estar con altura maxima de 100vh y sticky (tentativamente solo en escritorio) */}
        <div>
          <h1 className='text-center font-bold text-xl'>Dia {diaActual}</h1>
          <InfoCasilla info={infoCasilla} />
          <button onClick={() => {
            siguienteJugador(jugadorActual, PartidaSnapshotMock.Jugadores)
          }
          } className='bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer px-3 py-2 mb-3 rounded-md' style={{ width: '100%', transitionDuration: '.3s' }}>Terminar turno</button>
          <DivJugadores jugadoresData={jugadoresData} turnoActual={jugadorActual} />
        </div>
      </div>
    </>
  )
}

async function iniciarJuego (partidaLiga:string){
  // Esto debería obtenerse con el método GET (o POST) y solicitando a una DB
  // fetch(partidaLiga).then(response => response.json()).then(async(mapa) => { })
  // if( Math.random() >.5 ){
  //     await cargarMapa(PartidaSnapshotMock['Mapa'])
  //     cargarJugadores({jugadores: PartidaSnapshotMock['Jugadores']})
  //     if( partidaJuego.obtenerEquipos().size < 1 ){
  //         console.error('El número de equipos es menos de 2. No puede haber perdedores ni ganadores')
  //     }
  //     cargarEstadoPartida(PartidaSnapshotMock['climaActual'], PartidaSnapshotMock['diaActual'], PartidaSnapshotMock['turnoActual'])
  // } else{
  //     partidaJuego["Mapa"] = await generarMapaAleatorio({dimensiones: {filas: 18, columnas: 23}, idContenedor: 'mapa-konva'})
  // }

  // Object.freeze(partidaJuego)
  // console.log('Partida Data', partidaJuego)
}

window.addEventListener('load', async () => {
  // await PrecargarTodosComandantes()

  // iniciarJuego({mapaLiga: './mapas/test.json'})
  const Partida = new PartidaJuego(PartidaSnapshotMock, null)

  await Partida.dibujarMapa('mapa-konva')
  const listaJugadores = Partida.getListaJugadores()

  const jugadoresData:jugadorData[] = []
  listaJugadores.forEach(jugador => {
    jugadoresData.push(jugador.getJugadorData())
  })
  const infoCasilla:InfoCasillaT = {
    estrellas: 0,
    gasActual: 10,
    gasMaxima: 20,
    hp: 40,
    munPrincipal: 2,
    munSecundaria: null,
    status: '',
    terreno: 'dsadsa'
  }

  createRoot(document.getElementById('app') as HTMLElement).render(
    <GameUI jugadoresData={jugadoresData} info={infoCasilla}/>
  )

  // Object.freeze(Partida)
})
