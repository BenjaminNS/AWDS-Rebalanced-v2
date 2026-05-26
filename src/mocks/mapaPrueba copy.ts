import type { Casilla } from '../mapa/casilla'
import { Mapa } from '../mapa/mapaJuego'
import { fabricarUnidad } from '../unidades/fabricaUnidades';
import type { Infanteria } from '../unidades/modelos/infanteria';
// import { UnidadCasilla } from '../unidades/unidadCasilla'

/*export type datosActuales = {
  hp: number,
  municiones: municiones
  gasActual: number
  estado: estado
  turnos: number
  propietario: number
  casilla: Casilla
  comandante: ComandanteBase
} */
const infanteria1 = fabricarUnidad('infanteria', { hp: 100, municiones: {principal: {actual: 6, maxima: 6}}, gasActual: 30, estado: 'normal', propietario: 0, turnos: 1 }, {} ) as Infanteria
debugger
const infanteria2 = fabricarUnidad('infanteria', { hp: 100, municiones: {principal: {actual: 6, maxima: 6}}, gasActual: 30, estado: 'normal', propietario: 0, turnos: 1 }, {} ) as Infanteria

// const spriteInfanteria2 = new UnidadCasilla('infanteria', 1, 100, {principal: 5}, 40, 'normal', null )
// const spriteInfanteria1 = new UnidadCasilla('infanteria', 0, 100, {principal: 5}, 40, 'normal', null )

export const mapaPrueba = new Mapa(
  'Mapa Prueba',
  {columnas: 5, filas: 5},
  [
    { tipo: 'planicie', propietario: null}, { tipo: 'planicie', propietario: null}, { tipo: 'bosque', propietario: null}, { tipo: 'fabrica', propietario: 0}, { tipo: 'mar', propietario: null},
    { tipo: 'planicie', propietario: null}, { tipo: 'planicie', propietario: null}, { tipo: 'bosque', propietario: null}, { tipo: 'fabrica', propietario: 1}, { tipo: 'mar', propietario: null},
    { tipo: 'planicie', propietario: null}, { tipo: 'planicie', propietario: null}, { tipo: 'bosque', propietario: null}, { tipo: 'ciudad', propietario: 2}, { tipo: 'mar', propietario: null},
    { tipo: 'planicie', propietario: null}, { tipo: 'planicie', propietario: null}, { tipo: 'bosque', propietario: null}, { tipo: 'fabrica', propietario: 2}, { tipo: 'mar', propietario: null},
    { tipo: 'planicie', propietario: null}, { tipo: 'planicie', propietario: null}, { tipo: 'bosque', propietario: null}, { tipo: 'ciudad', propietario: null}, { tipo: 'mar', propietario: null},
  ]
)

mapaPrueba.generarUnidadCasilla(infanteria1, {x: 0, y: 0})
mapaPrueba.generarUnidadCasilla(infanteria2, {x: 1, y: 1})
