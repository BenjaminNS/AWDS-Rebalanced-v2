import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { DivJugadores, type jugadorData } from './componentes/jugador-divs.tsx'
import { CompraUnidadesMenu, type unidadCompra } from './componentes/compraUnidades.tsx'
import { InfoCasilla, type InfoCasillaT } from './componentes/info_casilla.tsx'
import { Header, ElementosHeader } from './componentes/header.tsx'
// Esta función solo debería usarlo en el creador de mapas.html
// import { tamanoCasilla, MAPA_CAPAS } from './mapa/mapaKonva.ts'
// import { ListaTerrenos } from './mapa/terreno.ts'
// import { generarDivJugadores } from './componentes/jugador-div.ts'
import { PartidaSnapshotMock } from './mocks/PartidaSnapshotMock.ts'
import { PartidaJuego } from './partida.ts'
// import { type coordenada } from './mapa/mapa.ts'
// import type { UnidadCasilla } from './unidades/unidades.ts'
import { CursorMapaJuego } from './cursorMapa.ts'
import type { Jugador } from './jugador.ts'

/*
a. Seleccionar accion (activar poder o rendirse)

b. Seleccionar unidad
    1 Escoger casilla destino
    2 Escoger accion
    3 (Opcional) Seleccionar casilla(s) afectadas, ej: ataque

c. Seleccionar propiedad
    1 Mostrar opciones de propiedad (ej: comprar)
    2 (Opcional) Seleccionar casilla(s) destino, ej: comprar
*/

function GameUI ({ jugadoresData, info }: {jugadoresData:jugadorData[], info: InfoCasillaT}){
  // useState de variables tipo partida, jugadores, unidades, etc.
  const [infoCasilla, setInfoCasilla] = useState(info)
  const [casillaHover, setCasillaHover] = useState()
  // Pudiera ser la lista de casillas en vez de solo una
  const [casillaSeleccionada, setCasillaSeleccionada] = useState()
  const [jugadorActual, setJugadorActual] = useState(0)
  // const [unidadSeleccionada, setUnidadSeleccionada] = useState(info)
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(false)
  const [unidadesCompra, setUnidadesCompra] = useState([])

  useEffect(() => {
    const Partida = new PartidaJuego(PartidaSnapshotMock, null)
    // Object.freeze(Partida)
    Partida.dibujarMapa('mapa-konva').then(() => {
      // Pasarle los setState's a CursorMapaJuego
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
        <div>
          {/* <h2 style="text-align: center; margin-bottom: .5rem; color: black;">DÍA: <span data-text="dia-actual">1</span></h2> */}

          <InfoCasilla info={infoCasilla} />
          {React.useMemo(() => (
            <DivJugadores jugadoresData={jugadoresData} />
          ), [])}
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
  // iniciarJuego({mapaLiga: './mapas/test.json'})
  const Partida = new PartidaJuego(PartidaSnapshotMock, null)

  await Partida.dibujarMapa('mapa-konva')
  // generarDivJugadores({ contenedor: document.querySelector('.seccion-jugadores'), listaJugadores: Partida['Jugadores'] })
  const jugadoresData:jugadorData[] = [
    {
      nombre: 'Juan Sabor',
      id: 'pjhfdsoifjidsoifoamis',
      activo: true,
      comandanteImgUrl: 'andy.png',
      cargaActual: 15000,
      cargaMaxima: 60000,
      numUnidades: 5,
      numPropiedades: 20,
      ingresosDiarios: 1000,
      dineroActual: 76400,
      equipo: 'A',
      // poderes: [{ costo: 30000, nombre: 'Hyper Repair' }, { costo: 60000, nombre: 'Hyper Upgrade' }],
      poderes: [{ costo: 30000, nombre: 'Hyper Repair' },{ costo: 30000, nombre: 'Hyper Repair' },{ costo: 30000, nombre: 'Hyper Repair' }],
      estrellas: 6,
      color: '#b64f54'
    },
    {
      nombre: 'Starman',
      id: 'ijlxnczqyu8721bdkdlafp',
      activo: true,
      comandanteImgUrl: 'max.png',
      cargaActual: 30000,
      cargaMaxima: 70000,
      numUnidades: 10,
      numPropiedades: 15,
      ingresosDiarios: 3500,
      dineroActual: 20143,
      equipo: 'B',
      color: '#4f85b6',
      estrellas: 7,
      poderes: [{ costo: 30000, nombre: 'Max Force' }, { costo: 60000, nombre: 'Max Blast' }]
    }
  ]
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

  // createRoot(document.getElementById('seccion-jugadores') as HTMLElement).render(
  //   <DivJugadores jugadoresData={jugadoresData} />
  // )
  // createRoot(document.getElementById('menu-compras') as HTMLElement).render(
  //   <CompraUnidadesMenu />
  // )
  // Object.freeze(Partida)
  // try {
  //   // ¿Es necesario guardar la variable?
  //   const cursorJuego = new CursorMapaJuego(Partida.getMapa())
  // } catch (err){
  //   console.error(err)
  // }
  // console.log('Partida Data', Partida)
})
