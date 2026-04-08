import { Terreno } from '.././terrenov2'
import { type spriteTerreno, type casillasAdyacentes, tamanoCasilla } from '.././spriteTerrenos'

export class Montana extends Terreno{
  constructor (){
    super({ nombreLargo: 'Montaña', nombreCorto: 'montana', estrellasDefensa: 4, descripcion: 'Terreno que ofrece una excelente defensa pero de muy difícil acceso. Solo puede ser navegada por Soldados y unidades aéreas. Ofrece una unidad extra de visión a Soldados a Pie.' })
  }

  override puedeOcultarEnFOW (): boolean {
    return false
  }
  override getSprite (params: { casillasAdyacentes: casillasAdyacentes }): spriteTerreno {
    const { top } = params.casillasAdyacentes
    // Montaña alta
    if ( top === 'ciudad' || top === 'cuartelGeneral' || top === 'fabrica' ||
    top === 'aeropuerto' || top === 'puertoNaval' || top === 'silo' ) {
      return {
        width: 16, height: 16, offsetY: 0,
        crop: {
          x: 7 * tamanoCasilla, y: 1 * tamanoCasilla,
          width: 16, height: 16
        }
      }
    } else {
    // Montaña chaparra
      return {
        width: 16, height: 21, offsetY: 0,
        crop: {
          x: 5 * tamanoCasilla, y: 1 * tamanoCasilla - 5,
          width: 16, height: 21
        }
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
