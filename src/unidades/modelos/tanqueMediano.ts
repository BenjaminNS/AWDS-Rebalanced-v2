import { UnidadCasilla, type datosActuales } from '../unidadCasilla'
import { spriteTanqueMediano } from '../spriteUnidades'
import { tanqueMediano_MU } from '../matchups'
import { type ComandanteBase } from '../../comandantes/ComandanteBase'
import type { Casilla } from '../../mapa/casilla'
import { tamanoSprite, UnitSpritesheet } from '../unidadesSpriteConf'
import Konva from 'konva'

export class TanqueMediano extends UnidadCasilla {

  constructor (refComandante: ComandanteBase, casilla: Casilla, datosActuales: datosActuales){
    super({ nombreLargo: 'Tanque Mediano', nombreCorto: 'tanqueMediano', descripcion: 'Tanque pesado muy efectivo contra todos los vehiculos terrestres.', categorias: ['Vehiculo', 'Terrestre', 'Directo'], costo: 15000, rango: { minimo: 1, extra: 0 }, movilidad: 5, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': { actual: 6, maxima: 6 }, 'secundaria': { actual: 6, maxima: 6 } }, contraataque: 1, atacarYMoverse: true, matchups: tanqueMediano_MU, sprite: spriteTanqueMediano
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
