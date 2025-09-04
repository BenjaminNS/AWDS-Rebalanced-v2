import { MapaJS } from "../../src/mapa"
const {Casilla, Mapa} = MapaJS()


export const mapaPrueba = new Mapa(
  'Mapa Prueba',
  {columnas: 5, filas: 5},
  [
    new Casilla('planicie', null), new Casilla('planicie', null), new Casilla('bosque', null), new Casilla('fabrica', 0), new Casilla('mar', null),
    new Casilla('planicie', null), new Casilla('planicie', null), new Casilla('bosque', null), new Casilla('fabrica', 1), new Casilla('mar', null),
    new Casilla('planicie', null), new Casilla('planicie', null), new Casilla('bosque', null), new Casilla('ciudad', 2), new Casilla('mar', null),
    new Casilla('planicie', null), new Casilla('planicie', null), new Casilla('bosque', null), new Casilla('fabrica', 2), new Casilla('mar', null),
    new Casilla('planicie', null), new Casilla('planicie', null), new Casilla('bosque', null), new Casilla('ciudad', null), new Casilla('mar', null),
  ]
)
