import { Terreno, type nombreTerreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Mar extends Terreno{
  constructor (){
    super({ nombreLargo: 'Mar', nombreCorto: 'mar', estrellasDefensa: 0, descripcion: 'Terreno marítimo donde pueden cruzar unidades navales y aéreas' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (params: { casillasAdyacentes: casillasAdyacentes }): spriteTerreno {
    const { top, left, right, bottom } = params.casillasAdyacentes
    const desfase = 0

    const base = { width: 16, height: 16 + desfase, offsetY: 0 }
    const stComparar: nombreTerreno = 'mar'

    // Completo
    // if( top === stComparar && left === stComparar && right === stComparar && bottom === stComparar ){
    //   return { ...base, crop: {
    //       x: (7 * tamanoCasilla), y: (5 * tamanoCasilla), //       width: 16, height: 16 //     }
    //   }
    // }
    // Completo
    if (
      (top === stComparar || top === 'inexistente') &&
      (left === stComparar || left === 'inexistente') &&
      (right === stComparar || right === 'inexistente') &&
      (bottom === stComparar || bottom === 'inexistente')
    ) {
      return {
        ...base,
        crop: {
          x: 7 * tamanoCasilla, y: 5 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Pozo (sin mares adyacentes)
    if (top !== stComparar && left !== stComparar && right !== stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 9 * tamanoCasilla, y: 3 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Esquina superior izquierda
    if (top !== stComparar && left !== stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 8 * tamanoCasilla, y: 2 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Esquina superior derecha
    if (top !== stComparar && left === stComparar && right !== stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 10 * tamanoCasilla, y: 2 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Esquina inferior izquierda
    if (top === stComparar && left !== stComparar && right === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 8 * tamanoCasilla, y: 4 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Esquina inferior derecha
    if (top === stComparar && left === stComparar && right !== stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 10 * tamanoCasilla, y: 4 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }

    // T Superior
    if (top === stComparar && left === stComparar && right === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 9 * tamanoCasilla, y: 2 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // T Izquierda
    if (top === stComparar && left === stComparar && right !== stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 10 * tamanoCasilla, y: 3 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // T Derecha
    if (top === stComparar && left !== stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 12 * tamanoCasilla, y: 3 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // T Inferior
    if (top !== stComparar && left === stComparar && right === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 9 * tamanoCasilla, y: 4 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }

    // Orilla Superior
    if (top !== stComparar && left !== stComparar && right !== stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 9 * tamanoCasilla, y: 1 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Orilla Izquierda
    if (top !== stComparar && left !== stComparar && right === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 6 * tamanoCasilla, y: 3 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Orilla Derecha
    if (top !== stComparar && left === stComparar && right !== stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 12 * tamanoCasilla, y: 3 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Orilla Inferior
    if (top === stComparar && left !== stComparar && right !== stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 9 * tamanoCasilla, y: 6 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }

    // Horizontal
    if (
      (left === stComparar || right === stComparar) &&
        top !== stComparar &&
        bottom !== stComparar
    ) {
      return {
        ...base,
        crop: {
          x: 7 * tamanoCasilla, y: 3 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Vertical
    if (
      left !== stComparar &&
        right !== stComparar &&
        (top === stComparar || bottom === stComparar)
    ) {
      return {
        ...base,
        crop: {
          x: 9 * tamanoCasilla, y: 5 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }

    // Vertical
    // Default Completo
    return {
      ...base,
      crop: {
        x: 7 * tamanoCasilla, y: 5 * tamanoCasilla,
        width: 16, height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
