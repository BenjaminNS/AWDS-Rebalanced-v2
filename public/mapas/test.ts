import { Mapa, Casilla } from "../../src/mapa/mapa"
import { UnidadCasilla } from '../../src/unidades/unidades'

const spriteInfanteria = new UnidadCasilla('infanteria', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteMecha = new UnidadCasilla('mecha', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteRecon = new UnidadCasilla('recon', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteTanqueLigero = new UnidadCasilla('tanqueLigero', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteTanqueMediano = new UnidadCasilla('tanqueMediano', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteNeotanque = new UnidadCasilla('neotanque', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteApc = new UnidadCasilla('apc', 0, 100, {principal: 5}, 40, null, 'normal')
const spriteArtilleria = new UnidadCasilla('artilleria', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteCohetes = new UnidadCasilla('cohetes', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteTanqueAntiaereo = new UnidadCasilla('tanqueAntiaereo', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteMisiles = new UnidadCasilla('misiles', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteBCopter = new UnidadCasilla('bCopter', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteTCopter = new UnidadCasilla('tCopter', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteFighter = new UnidadCasilla('fighter', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteBomber = new UnidadCasilla('bomber', 0, 100, {principal: 5}, 40, null, 'normal')
const spriteLander = new UnidadCasilla('lander', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteCruiser = new UnidadCasilla('cruiser', 1, 100, {principal: 5}, 40, null, 'normal')
const spriteSubmarino = new UnidadCasilla('submarino', 7, 100, {principal: 5}, 40, null, 'normal')
const spriteBattleship = new UnidadCasilla('battleship', 3, 100, {principal: 5}, 40, null, 'normal')

export const mapaPrueba = new Mapa(
  'Mapa Prueba',
  {columnas: 5, filas: 5},
  [
    new Casilla('planicie', null, spriteInfanteria), new Casilla('planicie', null, spriteMecha), new Casilla('bosque', null, spriteRecon), new Casilla('fabrica', 0, null), new Casilla('mar', null, spriteTanqueLigero),
    new Casilla('planicie', null, spriteTanqueMediano), new Casilla('planicie', null, spriteNeotanque), new Casilla('bosque', null, spriteApc), new Casilla('fabrica', 1, null), new Casilla('mar', null, spriteArtilleria),
    new Casilla('planicie', null, spriteCohetes), new Casilla('planicie', null, spriteTanqueAntiaereo), new Casilla('bosque', null, spriteMisiles), new Casilla('ciudad', 2, null), new Casilla('mar', null, spriteBCopter),
    new Casilla('planicie', null, spriteTCopter), new Casilla('planicie', null, spriteFighter), new Casilla('bosque', null, spriteBomber), new Casilla('fabrica', 2, null), new Casilla('mar', null, spriteLander),
    new Casilla('planicie', null, spriteCruiser), new Casilla('planicie', null, spriteSubmarino), new Casilla('bosque', null, spriteBattleship), new Casilla('ciudad', null, null), new Casilla('mar', null, null),
  ]
)
