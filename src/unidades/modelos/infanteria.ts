import { UnidadCasilla, type datosActuales } from '../unidadCasilla'
import { spriteInfanteria } from '../spriteUnidades'
import { infanteria_MU } from '../matchups'
import { type ComandanteBase } from '../../comandantes/ComandanteBase'
import type { Casilla } from '../../mapa/casilla'
import { tamanoSprite, UnitSpritesheet, type spriteUnidad } from '../unidadesSpriteConf'
import Konva from 'konva'

export class Infanteria extends UnidadCasilla {
  #puntosCapturaActual: number|null|undefined

  constructor (refComandante: ComandanteBase, casilla: Casilla, datosActuales: datosActuales, params?: { capturaActual?: number|null }){
    super({ nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, maxMuniciones: { 'principal': { actual: 6, maxima: 6 } }, contraataque: 1, atacarYMoverse: true, matchups: infanteria_MU, sprite: spriteInfanteria
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

  override generarSpriteInfo (): spriteUnidad {
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
