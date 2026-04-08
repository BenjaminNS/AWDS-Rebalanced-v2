import { type spriteTerreno, tamanoCasilla } from '.././spriteTerrenos'
import { Propiedad } from '.././propiedad'

export class Ciudad extends Propiedad{
  constructor ({ propietario }: {propietario: number|null|undefined}){
    super(
      {
        opcionesCompra: [], propietario: propietario,
        recompensas: { dinero: 1000 }
      },
      { nombreLargo: 'Ciudad', nombreCorto: 'ciudad', estrellasDefensa: 3, descripcion: 'Propiedad que puede reparar unidades terrestres 2 de HP y puede ser capturada por Soldados' })
  }

  override puedeOcultarEnFOW (): boolean {
    // Puede ser que oculte si es tu propiedad, como en days of ruin
    return false
  }
  override getSprite (): spriteTerreno {
    return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: 6 * tamanoCasilla, y: 1 * tamanoCasilla,
        width: 16, height: 16
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
