import { Terreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Silo extends Terreno{
  constructor (){
    super({ nombreLargo: 'Silo', nombreCorto: 'silo', estrellasDefensa: 3, descripcion: 'Contiene un misil que puede ser dirigido por un soldado, haciendo 3 de daño en un área de 3x3' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (): spriteTerreno {
    const desfase = 8
    return {
      width: 16, height: 16 + desfase, offsetY: 0,
      crop: {
        x: 2 * tamanoCasilla, y: 1 * tamanoCasilla - desfase,
        width: 16, height: 16 + desfase
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
