import { Mapa, Casilla } from "../mapa/mapa"
import { UnidadCasilla } from '../unidades/unidades'

const spriteInfanteria1 = new UnidadCasilla('infanteria', 0, 100, {principal: 5}, 40, null, 'normal')
const spriteInfanteria2 = new UnidadCasilla('infanteria', 1, 100, {principal: 5}, 40, null, 'normal')

export const mapaPrueba = new Mapa(
  'Mapa Prueba',
  {columnas: 5, filas: 5},
  [
    new Casilla('planicie', null, spriteInfanteria1), new Casilla('planicie', null, null), new Casilla('bosque', null, null), new Casilla('fabrica', 0, null), new Casilla('mar', null, null),
    new Casilla('planicie', null, null), new Casilla('planicie', null, null), new Casilla('bosque', null, null), new Casilla('fabrica', 1, null), new Casilla('mar', null, null),
    new Casilla('planicie', null, null), new Casilla('planicie', null, null), new Casilla('bosque', null, null), new Casilla('ciudad', 2, null), new Casilla('mar', null, null),
    new Casilla('planicie', null, null), new Casilla('planicie', null, null), new Casilla('bosque', null, null), new Casilla('fabrica', 2, null), new Casilla('mar', null, null),
    new Casilla('planicie', null, null), new Casilla('planicie', null, null), new Casilla('bosque', null, null), new Casilla('ciudad', null, null), new Casilla('mar', null, spriteInfanteria2),
  ]
)
