import './style.css'
import { generarMapaKonva, generarMapaAleatorio } from './mapa/mapaKonva.ts'
// import mapaPrueba from './mapas/test.json'
import { mapaPrueba} from './../public/mapas/test.ts'
// import { listaPaises } from "./comandantes/paises.ts";
// import type { MapaObjeto } from './mapa.ts'
// import { jugador } from 'jugador.js'
// 'comandante.js'
// Se debería cargar una partida con un id único de partida solicitando a una DB
const PartidaData = {
    "Mapa": {},
    "Jugadores": [],
    "Reglas": {},
    "diaActual": 0,
    "climaActual": "soleado",
    "turnoActual": 0,
    "ordenJugadores": [], // Lista de id's de jugadores (o sus nombres) ordenados
    // type accion = {idUnidad: idUnidad, direcciones: Direcciones[], accion: Accion, resultados: {danoHecho, dañoRecibido, capturar}}
    // movimientos: jugadasJugador[accion[]] //Revisar
}

// function obtenerEquipos(jugadores):Set<string>{
//     const setEquipos = new Set()
//     jugadores.array.forEach(jugador => {
//         setEquipos.add(jugador.equipo)
//     });

//     return setEquipos
// }

// function obtenerFiltroHSVJugador(){
//     listaPaises[0].hsv
// }

async function iniciarJuego({mapaLiga}:{mapaLiga:string}){
    // cargarPartida(){
    // cargarMapa()
    // cargarJugadores()
    // cargarReglas()
    // cargarEstadoPartida()
    // }
    // if( Math.random() >.5 ){
        // import {mapsaPrueba} from './mapas/test.ts'
        
        // Esto debería obtenerse con el método GET (o POST) y solicitando a una DB
        fetch(mapaLiga)
        .then(response => response.json())
        .then(async(mapa) => {
            // PartidaData["Mapa"] = await generarMapaKonva({ mapa: mapa, idContenedor: 'mapa-konva' })
            PartidaData["Mapa"] = await generarMapaKonva({ mapa: mapaPrueba, idContenedor: 'mapa-konva' })
            // console.log(PartidaData)
            console.log('Comandantes jugables: ', PartidaData["Mapa"].obtenerComandantesJugables())
            console.log('Mapa valido: ', PartidaData["Mapa"].esMapaValido())
            
            Object.freeze(PartidaData)
        })

        // PartidaData["Mapa"] = await generarMapaKonva({ mapa: mapaPrueba, idContenedor: 'mapa-konva' })
    // } else{
        // PartidaData["Mapa"] = await generarMapaAleatorio({dimensiones: {filas: 10, columnas: 15}, idContenedor: 'container'})
    // }
}

window.addEventListener('load', ()=>{
    iniciarJuego({mapaLiga: './mapas/test.json'})
})
