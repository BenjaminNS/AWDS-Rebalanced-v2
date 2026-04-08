import { Terreno, type nombreTerreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Tuberia extends Terreno{
  constructor (){
    super({ nombreLargo: 'Tubería', nombreCorto: 'tuberia', estrellasDefensa: 0, descripcion: 'Bloquea el paso a todas las unidades, imposible de destruir.' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (params: { casillasAdyacentes: casillasAdyacentes }): spriteTerreno {
    const { top, left, right, bottom } = params.casillasAdyacentes
    const desfase = 0

    const base = { width: 16, height: 16 + desfase, offsetY: 0 }
    const stComparar: nombreTerreno = 'tuberia'

    // Esq. superior izquierda
    if (top !== stComparar && left !== stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 8 * tamanoCasilla,
          y: 7 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Esq. superior derecha
    if (top !== stComparar && left === stComparar && right !== stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 10 * tamanoCasilla,
          y: 7 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Esq. inferior izquierda
    if (top === stComparar && left !== stComparar && right === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 8 * tamanoCasilla,
          y: 9 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Esq. inferior izquierda
    if (top === stComparar && left === stComparar && right !== stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 10 * tamanoCasilla,
          y: 9 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Inicio Superior
    if (top !== stComparar && left !== stComparar && right !== stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 7 * tamanoCasilla,
          y: 7 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Inicio Inferior
    if (top === stComparar && left !== stComparar && right !== stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 7 * tamanoCasilla,
          y: 9 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Inicio Izquierda
    if (left !== stComparar && right === stComparar) {
      return {
        ...base,
        crop: {
          x: 8 * tamanoCasilla,
          y: 10 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Inicio Derecha
    if (left === stComparar && right !== stComparar) {
      return {
        ...base,
        crop: {
          x: 10 * tamanoCasilla,
          y: 10 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Vertical
    if (top === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 8 * tamanoCasilla,
          y: 8 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }
    // Horizontal
    if (left === stComparar && right === stComparar) {
      return {
        ...base,
        crop: {
          x: 9 * tamanoCasilla,
          y: 7 * tamanoCasilla,
          width: 16,
          height: 16
        }
      }
    }

    // Por defecto, horizontal
    // Duda: ¿Se podría poner una versión de una tubería sin dirección?
    return {
      ...base,
      crop: {
        x: 9 * tamanoCasilla,
        y: 7 * tamanoCasilla,
        width: 16,
        height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
