import { Terreno, type nombreTerreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Rio extends Terreno{
  constructor (){
    super({ nombreLargo: 'Rio', nombreCorto: 'rio', estrellasDefensa: 0, descripcion: 'Puede ser atravesado por soldados y unidades navales. No ofrece defensa' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (params: { casillasAdyacentes: casillasAdyacentes }): spriteTerreno {
    const { top, left, right, bottom } = params.casillasAdyacentes
    const desfase = 0

    const base = { width: 16, height: 16 + desfase, offsetY: 0 }
    const stComparar: nombreTerreno = 'rio'

    // Falta Esquina superior izquierda y derecha
    // Esquina inferior izquierda
    if (left !== stComparar && right === stComparar && top === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 12 * tamanoCasilla, y: 10 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Esquina inferior derecha
    if (left === stComparar && right !== stComparar && top === stComparar && bottom !== stComparar) {
      return {
        ...base,
        crop: {
          x: 14 * tamanoCasilla, y: 10 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Completo
    if (left === stComparar && right === stComparar && top === stComparar && bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 12 * tamanoCasilla, y: 8 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Horizontal
    if (left === stComparar || right === stComparar) {
      return {
        ...base,
        crop: {
          x: 11 * tamanoCasilla, y: 8 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }
    // Vertical
    if (top === stComparar || bottom === stComparar) {
      return {
        ...base,
        crop: {
          x: 12 * tamanoCasilla, y: 7 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    }

    // Default Completo
    return {
      ...base,
      crop: {
        x: 12 * tamanoCasilla, y: 8 * tamanoCasilla,
        width: 16, height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
