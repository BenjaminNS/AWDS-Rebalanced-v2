import { type spriteTerreno, tamanoCasilla } from '.././spriteTerrenos'
import { Propiedad } from '.././propiedad'

export class CuartelGeneral extends Propiedad{
  constructor ({ propietario }: {propietario: number|null|undefined}){
    super(
      {
        opcionesCompra: [], propietario: propietario,
        recompensas: { dinero: 1000 }
      },
      { nombreLargo: 'Ciudad', nombreCorto: 'ciudad', estrellasDefensa: 4, descripcion: 'Base de operaciones. Si es capturada, pierdes automáticamente el juego y todas tus propiedades pasan al personaje que te quitó esta propiedad.Excelentes defensas.' })

    if ( propietario == null ){
      console.error('No se puede tener un Cuartel General sin dueño')
    }
  }

  override puedeOcultarEnFOW (): boolean {
    // Puede ser que oculte si es tu propiedad, como en days of ruin
    return false
  }
  override getSprite (): spriteTerreno {
    // Sabiendo que esta es propiedad, requiere 2 cosas
    // Saber de que personaje es la propiedad
    // Para determinar cual HQ le corresponde
    // Y también el color del personaje propietario (que varía dependiendo el orden y la armada a la que pertenece)
    return {
      width: 16, height: 32, offsetY: 19,
      crop: {
        x: 0 * tamanoCasilla, y: 3 * tamanoCasilla - 16,
        width: 16, height: 32
      }
    }
  }
  override getOpcionesTerreno (): string[] {
    return []
  }
}
