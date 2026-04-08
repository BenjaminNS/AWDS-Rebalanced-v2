import { Terreno, type nombreTerreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Arrecife extends Terreno{
  constructor (){
    super({ nombreLargo: 'Arrecife', nombreCorto: 'arrecife', estrellasDefensa: 2, descripcion: 'Terreno marítimo que puede ocultar unidades navales y que ofrece algunas capacidades defensivas, aunque algo difícil de navegar.' })
  }

  override puedeOcultarEnFOW (): boolean {
    return true
  }
  override getSprite (): spriteTerreno {
    return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: 6 * tamanoCasilla, y: 5 * tamanoCasilla,
      width: 16, height: 16
    }
  }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
