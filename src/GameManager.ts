import './style.css'
// Esta función solo debería usarlo en el creador de mapas.html
// import { generarMapaAleatorio } from './mapa/mapaKonva.ts'
import { generarDivJugadores } from './componentes/jugador-div.ts'
import { PartidaSnapshotMock } from './mocks/PartidaSnapshotMock.ts'
import { PartidaJuego } from './partida.ts'

async function iniciarJuego(partidaLiga:string){
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

// const seleccionarCasilla(jugador, casilla){
//   // UNIDAD
//   const unidad = casilla.unidad
//   if( unidad ){
//     unidad.clickUnidad(jugador)
//     return
//   }

//   // PROPIEDAD
//   if( ListaTerrenos[casilla.tipo].propietario === jugador.id ){
//     console.log('Abrir opciones de compra')
//   }
// }

window.addEventListener('load', async ()=>{
    // iniciarJuego({mapaLiga: './mapas/test.json'})
    const Partida = new PartidaJuego(PartidaSnapshotMock, null)
    await Partida.dibujarMapa('mapa-konva')
    generarDivJugadores({contenedor: document.querySelector('.seccion-jugadores'), listaJugadores: Partida['Jugadores']})
    Object.freeze(Partida)
    console.log('Partida Data', Partida)
})
