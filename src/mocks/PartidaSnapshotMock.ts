import { PartidaSnapshot } from '../partida'
// import mapaPrueba from './mapas/test.json'
// import { mapaPrueba } from "./mapaPrueba";
// import { mapaPrueba } from "./mapaPrueba copy";
import mapaFastBrawl from './mapa_fast-brawl_513014.json'
import { usuario1, usuario2 } from './jugadoresMocks'
import { Reglas } from '../reglas'
import { Mapa } from '../mapa/mapa'

const mapaFastBrawlTyped = mapaFastBrawl as Mapa
const reglas = new Reglas(1000, 99999, null, null, 'Soleado', true, null, 'Normal', false)
const listaJugadores = [usuario1, usuario2]
const mapaCompleto = Mapa.generarMapaCompleto(mapaFastBrawlTyped, listaJugadores)
export const PartidaSnapshotMock = new PartidaSnapshot( mapaCompleto, listaJugadores, reglas, 'Soleado', 1, 0, [0,1], new Date(2025, 1, 1))
