import { type spriteTerreno, tamanoCasilla } from '.././spriteTerrenos'
import { Propiedad } from '.././propiedad'

export class Aeropuerto extends Propiedad{
  constructor ({ propietario }: {propietario: number|null|undefined}){
    super(
      {
        opcionesCompra: [], propietario: propietario,
        recompensas: { dinero: 1000 }
      },
      { nombreLargo: 'Aeropuerto', nombreCorto: 'aeropuerto', estrellasDefensa: 3, descripcion: 'Puedes comprar y reparar unidades aéreas aquí.' })
  }

  override puedeOcultarEnFOW (): boolean {
    // Puede ser que oculte si es tu propiedad, como en days of ruin
    return false
  }
  override getSprite (): spriteTerreno {
    return {
      width: 16, height: 18, offsetY: 0,
      crop: {
        x: 4 * tamanoCasilla, y: 11 * tamanoCasilla - 2,
        width: 16, height: 18
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
