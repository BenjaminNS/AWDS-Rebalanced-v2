import { type spriteTerreno, tamanoCasilla } from '.././spriteTerrenos'
import { Propiedad } from '.././propiedad'

export class Fabrica extends Propiedad{
  constructor ({ propietario }: {propietario: number|null|undefined}){
    super(
      {
        opcionesCompra: [], propietario: propietario,
        recompensas: { dinero: 1000 }
      },
      { nombreLargo: 'Fabrica', nombreCorto: 'fabrica', estrellasDefensa: 3, descripcion: 'Puedes comprar y reparar unidades terrestres aquí.' })
  }

  override puedeOcultarEnFOW (): boolean {
    // Puede ser que oculte si es tu propiedad, como en days of ruin
    return false
  }
  override getSprite (): spriteTerreno {
    return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: 2 * tamanoCasilla, y: 11 * tamanoCasilla,
        width: 16, height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
