import { UnidadCasilla, type datosActuales } from '../unidadCasilla'
import { spriteRecon } from '../spriteUnidades'
import { recon_MU } from '../matchups'
import { type ComandanteBase } from '../../comandantes/ComandanteBase'
import type { Casilla } from '../../mapa/casilla'
import { tamanoSprite, UnitSpritesheet } from '../unidadesSpriteConf'
import Konva from 'konva'

export class Recon extends UnidadCasilla {

  constructor (refComandante: ComandanteBase, casilla: Casilla, datosActuales: datosActuales){
    super({ nombreLargo: 'Recon', nombreCorto: 'recon', descripcion: 'Vehículo pequeño con alta visión, eficiente contra soldados.', categorias: ['Vehiculo', 'Terrestre', 'Directo'],
      costo: 4000, rango: { minimo: 1, extra: 0 }, movilidad: 8, tipoMovimiento: 'ruedas', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': { actual: 8, maxima: 8 } }, contraataque: 1, atacarYMoverse: true, matchups: recon_MU, sprite: spriteRecon
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
