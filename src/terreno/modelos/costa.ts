import { Terreno, type nombreTerreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Costa extends Terreno{
  constructor (){
    super({ nombreLargo: 'Costa', nombreCorto: 'costa', estrellasDefensa: 0, descripcion: 'Puede ser navegador por cualquier unidad. Conecta mar con tierra. No ofrece defensa' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (params: { casillasAdyacentes: casillasAdyacentes }): spriteTerreno {
    const { top, left, right, bottom } = params.casillasAdyacentes
    const desfase = 0

    const base = { width: 16, height: 16 + desfase, offsetY: 0 }
    const stComparar: nombreTerreno = 'costa'

    // Esq. superior izquierda
    if (top !== stComparar && left !== stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 2 * tamanoCasilla, y: 7 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Esq. superior derecha
    if (top !== stComparar && left === stComparar && right !== stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 4 * tamanoCasilla, y: 7 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Esq. inferior izquierda
    if (top === stComparar && left !== stComparar && right === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 2 * tamanoCasilla, y: 9 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Esq. inferior izquierda
    if (top === stComparar && left === stComparar && right !== stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 4 * tamanoCasilla, y: 9 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Izquierda
    if ((top === stComparar || bottom === stComparar) && left !== stComparar) {
      return {
        ...base,
        crop: {
          x: 2 * tamanoCasilla, y: 8 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Derecha
    if ((top === stComparar || bottom === stComparar) && right !== stComparar) {
      return {
        ...base,
        crop: {
          x: 4 * tamanoCasilla, y: 8 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Superior
    if (top !== stComparar) {
      return {
        ...base,
        crop: {
          x: 3 * tamanoCasilla, y: 7 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Inferior
    if (bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 3 * tamanoCasilla, y: 9 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }

    // Por defecto, central
    return {
      ...base,
      crop: {
        x: 3 * tamanoCasilla, y: 8 * tamanoCasilla,
        width: 16, height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
