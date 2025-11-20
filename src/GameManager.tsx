import { createRoot } from 'react-dom/client'
import './style.css'
import { DivJugadores } from './componentes/jugador-divs.tsx'
// import Konva from 'konva'
// Esta función solo debería usarlo en el creador de mapas.html
// import { tamanoCasilla, MAPA_CAPAS } from './mapa/mapaKonva.ts'
// import { ListaTerrenos } from './mapa/terreno.ts'
// import { generarDivJugadores } from './componentes/jugador-div.ts'
import { PartidaSnapshotMock } from './mocks/PartidaSnapshotMock.ts'
import { PartidaJuego } from './partida.ts'
// import { type coordenada } from './mapa/mapa.ts'
// import type { UnidadCasilla } from './unidades/unidades.ts'
import { CursorMapaJuego } from './cursorMapa.ts'

const jugadodsadsaresData = [
  {
    nombre: 'Juan Sabor',
    id: 'pjhfdsoifjidsoifoamis',
    activo: true,
    comandanteImgUrl: 'andy.png',
    cargaActual: 0,
    cargaMaxima: 10000,
    numUnidades: 1,
    numPropiedades: 1,
    ingresosDiarios: 1000,
    dineroActual: 1000,
    equipo: 'A',
    podereres: ['Hyper Repair', 'Hyper Upgrade']
  },
  {
    nombre: 'Starman',
    id: 'ijlxnczqyu8721bdkdlafp',
    activo: true,
    comandanteImgUrl: 'max.png',
    cargaActual: 0,
    cargaMaxima: 10000,
    numUnidades: 1,
    numPropiedades: 1,
    ingresosDiarios: 1000,
    dineroActual: 1000,
    equipo: 'A',
    podereres: ['Max Force', 'Max Blast']
  }
]

createRoot(document.getElementById('seccion-jugadores') as HTMLElement).render(
  <DivJugadores jugadoresData={jugadodsadsaresData}></DivJugadores>
)
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
  Object.freeze(Partida)
  try {
    // ¿Es necesario guardar la variable?
    const cursorJuego = new CursorMapaJuego(Partida.getMapa())
  } catch (err){
    console.error(err)
  }
  // console.log('Partida Data', Partida)
})
