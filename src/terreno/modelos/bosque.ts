import { Terreno, type nombreTerreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'
import { Propiedad } from '.././propiedad'

export class Bosque extends Terreno{
  constructor (){
    super({ nombreLargo: 'Bosque', nombreCorto: 'bosque', estrellasDefensa: 2, descripcion: 'Terreno difícil de atravesar pero que otorga buena defensa y permite ocultar unidades terrestres' })
  }

  override puedeOcultarEnFOW (): boolean {
    return true
  }
  override getSprite (): spriteTerreno {
    return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: 13 * tamanoCasilla, y: 2 * tamanoCasilla,
        width: 16, height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
