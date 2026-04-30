import { UnidadCasilla, type datosActuales } from '../unidadCasilla'
import { spriteMecha } from '../spriteUnidades'
import { mecha_MU } from '../matchups'
import { type ComandanteBase } from '../../comandantes/ComandanteBase'
import type { Casilla } from '../../mapa/casilla'
import { tamanoSprite, UnitSpritesheet } from '../unidadesSpriteConf'
import Konva from 'konva'

export class Mecha extends UnidadCasilla {
  #puntosCapturaActual: number|null|undefined

  constructor (refComandante: ComandanteBase, casilla: Casilla, datosActuales: datosActuales, params?: { capturaActual?: number|null }){
    super({ nombreLargo: 'Mecha', nombreCorto: 'mecha', descripcion: 'Soldado que puede atacar vehiculos y capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 3000, rango: { minimo: 1, extra: 0 }, movilidad: 2, tipoMovimiento: 'mecha', vision: 2, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': { actual: 4, maxima: 4 }, 'secundaria': { actual: 6, maxima: 6 } }, contraataque: 1, atacarYMoverse: true, matchups: mecha_MU, sprite: spriteMecha
    }, datosActuales, casilla )

    this.#puntosCapturaActual = params?.capturaActual
  }

  getPuntosCaptura (){
    return this.#puntosCapturaActual
  }
  sumarPuntosCaptura (puntosCapturaExtra: number){
    // TO-DO: Validar que sea número entero positivo
    if ( this.#puntosCapturaActual ){
      this.#puntosCapturaActual += puntosCapturaExtra
    } else {
      this.#puntosCapturaActual = puntosCapturaExtra
    }
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
