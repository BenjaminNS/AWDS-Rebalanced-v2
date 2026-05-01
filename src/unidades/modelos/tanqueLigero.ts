import { UnidadCasilla, type datosActuales } from '../unidadCasilla'
import { spriteTanqueLigero } from '../spriteUnidades'
import { tanqueLigero_MU } from '../matchups'
import { type ComandanteBase } from '../../comandantes/ComandanteBase'
import type { Casilla } from '../../mapa/casilla'
import { tamanoSprite, UnitSpritesheet } from '../unidadesSpriteConf'
import Konva from 'konva'

export class Infanteria extends UnidadCasilla {

  constructor (refComandante: ComandanteBase, casilla: Casilla, datosActuales: datosActuales){
    super({ nombreLargo: 'Tanque Ligero', nombreCorto: 'tanqueLigero', descripcion: 'Tanque ágil eficaz contra otros vehiculos terrestres iguales o más pequeños y contra soldados.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 7000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 70, consumoDiario: () => 0, maxMuniciones: { 'principal': { actual: 6, maxima: 6 } }, contraataque: 1, atacarYMoverse: true, matchups: tanqueLigero_MU, sprite: spriteTanqueLigero
    }, datosActuales, casilla )

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
