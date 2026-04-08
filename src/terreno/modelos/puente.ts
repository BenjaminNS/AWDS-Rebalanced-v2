import { Terreno, type nombreTerreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Puente extends Terreno{
  constructor (){
    super({ nombreLargo: 'Puente', nombreCorto: 'puente', estrellasDefensa: 0, descripcion: 'Conecta islas para permitir el acceso a unidades terrestres. Las unidades navales pueden atravesarlo, pero con algo de dificultad. No ofrece bonus defensivos' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (params: { casillasAdyacentes: casillasAdyacentes }): spriteTerreno {
    const { left, right } = params.casillasAdyacentes
    const desfase = 0

    const base = { width: 16, height: 16 + desfase, offsetY: 0 }
    const stComparar: nombreTerreno = 'puente'

    // Horizontal
    if (left === stComparar || right === stComparar) {
      return {
        ...base,
        crop: {
          x: 2 * tamanoCasilla, y: 4 * tamanoCasilla + 1,
          width: 16, height: 16
        }
      }
    }

    // Default Vertical
    return {
      ...base,
      crop: {
        x: 3 * tamanoCasilla, y: 4 * tamanoCasilla,
        width: 16, height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
