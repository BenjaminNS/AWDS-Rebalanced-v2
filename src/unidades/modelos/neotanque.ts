import { UnidadCasilla, type datosActuales } from '../unidadCasilla'
import { spriteNeotanque } from '../spriteUnidades'
import { neotanque_MU } from '../matchups'
import { type ComandanteBase } from '../../comandantes/ComandanteBase'
import type { Casilla } from '../../mapa/casilla'
import { tamanoSprite, UnitSpritesheet } from '../unidadesSpriteConf'
import Konva from 'konva'

export class Neotanque extends UnidadCasilla {

  constructor (refComandante: ComandanteBase, casilla: Casilla, datosActuales: datosActuales){
    super({ nombreLargo: 'Neotanque', nombreCorto: 'neotanque', descripcion: 'Tanque ágil y poderoso contra todos los vehiculos terrestres.', categorias: ['Vehiculo', 'Terrestre', 'Directo'], costo: 20000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 99, consumoDiario: () => 0, maxMuniciones: { 'principal': { actual: 9, maxima: 9 }, 'secundaria': { actual: 9, maxima: 9 } }, contraataque: 1, atacarYMoverse: true, matchups: neotanque_MU, sprite: spriteNeotanque }, datosActuales, casilla )

  }

  override getConsumoDiario (): number {
    return 0
  }

  override generarSpriteInfo (): Konva.Sprite {
    return new Konva.Sprite({
      image: UnitSpritesheet,
      animations: {
        'idle': [
          (3 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite
        ]
      },
      animation: 'idle', frameRate: 3, frameIndex: 0
    })
  }
}
