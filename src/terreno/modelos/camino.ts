import { Terreno, type nombreTerreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Camino extends Terreno{
  constructor (){
    super({ nombreLargo: 'Camino', nombreCorto: 'camino', estrellasDefensa: 0, descripcion: 'Camino pavimentado de fácil acceso pero que no ofrece defensas' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (params: { casillasAdyacentes: casillasAdyacentes }): spriteTerreno {
    const { top, left, right, bottom } = params.casillasAdyacentes
    const desfase = 0

    const base = { width: 16, height: 16 + desfase, offsetY: 0 }
    const stComparar: nombreTerreno = 'camino'

    // Horizontal
    if (
      (left === stComparar || right === stComparar) &&
        top !== stComparar &&
        bottom !== stComparar
    ) {
      return {
        ...base,
        crop: {
          x: 11 * tamanoCasilla, y: 5 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }

    // T Superior
    if (top !== stComparar && left === stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 13 * tamanoCasilla, y: 6 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }
    // T Izquierda
    if (top === stComparar && left !== stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 14 * tamanoCasilla, y: 5 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }
    // T Derecha
    if (top === stComparar && left === stComparar && right !== stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 12 * tamanoCasilla, y: 5 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }
    // T Inferior
    if (top === stComparar && left === stComparar && right === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 13 * tamanoCasilla, y: 4 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }
    // Esq. superior izquierda
    if (top !== stComparar && left !== stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 12 * tamanoCasilla, y: 4 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }
    // Esq. superior derecha
    if (top !== stComparar && left === stComparar && right !== stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 14 * tamanoCasilla, y: 4 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }
    // Esq. inferior izquierda
    if (top === stComparar && left !== stComparar && right === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 12 * tamanoCasilla, y: 6 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }
    // Esq. inferior izquierda
    if (top === stComparar && left === stComparar && right !== stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 14 * tamanoCasilla, y: 6 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }

    // Completo
    if (top === stComparar && left === stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 13 * tamanoCasilla, y: 5 * tamanoCasilla - desfase,
          width: 16, height: 16 + desfase
        }
      }
    }

    // Default Vertical default
    return {
      ...base,
      crop: {
        x: 13 * tamanoCasilla, y: 3 * tamanoCasilla - desfase,
        width: 16, height: 16 + desfase
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
