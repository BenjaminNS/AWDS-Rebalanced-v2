import { Terreno } from '.././terrenov2'
import { type spriteTerreno, tamanoCasilla } from '.././spriteTerrenos'

export class Invalido extends Terreno{
  constructor (){
    super({ nombreLargo: 'Planicie', nombreCorto: 'planicie', estrellasDefensa: 1, descripcion: 'Terreno de fácil navegación pero poca protección' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (): spriteTerreno {
    return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: 15 * tamanoCasilla, y: 11 * tamanoCasilla,
        width: 16, height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
