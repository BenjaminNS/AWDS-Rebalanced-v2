import { type spriteTerreno, tamanoCasilla } from '.././spriteTerrenos'
import { Propiedad } from '.././propiedad'

export class PuertoNaval extends Propiedad{
  constructor ({ propietario }: {propietario: number|null|undefined}){
    super(
      {
        opcionesCompra: [], propietario: propietario,
        recompensas: { dinero: 1000 }
      },
      { nombreLargo: 'Puerto naval', nombreCorto: 'puertoNaval', estrellasDefensa: 3, descripcion: 'Puedes comprar y reparar unidades navales aquí.' })
  }

  override puedeOcultarEnFOW (): boolean {
    // Puede ser que oculte si es tu propiedad, como en days of ruin
    return false
  }
  override getSprite (): spriteTerreno {
    return {
      width: 16, height: 21, offsetY: 0,
      crop: {
        x: 6 * tamanoCasilla, y: 11 * tamanoCasilla - 5,
        width: 16, height: 21
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
