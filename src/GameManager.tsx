import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Header, ElementosHeader } from './componentes/header.tsx'
import { PartidaSnapshotMock } from './mocks/PartidaSnapshotMock.ts'
import { PartidaJuego } from './partida.ts'
import type { jugadorData } from './componentes/jugador-divs.tsx'

import { GameUI, type PartidaState } from './componentes/GameUi.tsx'

window.addEventListener('load', async () => {
  // await PrecargarTodosComandantes()

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

  const Partida = new PartidaJuego(PartidaSnapshotMock, null)

  await Partida.dibujarMapa('mapa-konva')
  const listaJugadores = Partida.getListaJugadores()

  const jugadoresData:jugadorData[] = []
  listaJugadores.forEach((jugador, i) => {
    jugadoresData.push(
      jugador.getJugadorData(Partida.getMapa().getListaUnidadesDe1Comandante(i), Partida.getMapa().getListaPropiedades(i)))
  })

  const partidaData:PartidaState = {
    diaActual: Partida.getDiaActual(),
    jugadorActual: Partida.getTurnoActual(),
    reglas: Partida.getReglas()
  }

  createRoot(document.getElementById('app') as HTMLElement).render(
    <>
      <Header elementosHeader={ElementosHeader}/>
      <GameUI jugadoresData={jugadoresData} partidaData={partidaData} partidaSnapshot={PartidaSnapshotMock}/>
    </>
  )

  // Object.freeze(Partida)
})
