import { UnidadCasilla, type datosActuales, type contextoAcciones, type Accion } from '../unidadCasilla'
import { spriteApc } from '../spriteUnidades'
import { apc_MU } from '../matchups'
import { type ComandanteBase } from '../../comandantes/ComandanteBase'
import type { Casilla } from '../../mapa/casilla'
import { tamanoSprite, UnitSpritesheet } from '../unidadesSpriteConf'
import Konva from 'konva'

export class APC extends UnidadCasilla {
  unidadTransportada: UnidadCasilla

  constructor (refComandante: ComandanteBase, casilla: Casilla, datosActuales: datosActuales, params?: { unidadTransportada?: UnidadCasilla }){
    super({ nombreLargo: 'APC', nombreCorto: 'apc', descripcion: 'Vehículo de transporte terrestre capaz de mover soldados y reponer municiones y gasolina a todas las unidades.', categorias: ['Vehiculo', 'Terrestre', 'Transporte'],
      costo: 4000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 1, maxGasolina: 99, consumoDiario: () => 0, maxMuniciones: null, contraataque: null, atacarYMoverse: true, matchups: apc_MU, sprite: spriteApc
    }, datosActuales, casilla )

  }

  override getConsumoDiario (): number {
    return 0
  }

  override generarSpriteInfo (): Konva.Sprite {
    return new Konva.Sprite({
      image: UnitSpritesheet,
      animations: {
        'idle': [
          (3 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite
        ]
      },
      animation: 'idle', frameRate: 3, frameIndex: 0
    })
  }

  override getAccionesDisponibles (contexto: contextoAcciones){
    const acciones : Accion[] = super.getAccionesDisponibles(contexto)

    if ( contexto.ultimaCasillaSeleccionada.getUnidad()?.getId() !== this.getId() ){
      return acciones
    }

    // Debería filtrarse también solo si le falta gasolina o municiones
    const unidadesAdyacentes = contexto.mapa.getUnidadesEnArea(contexto.ultimaCasillaSeleccionada.getCoordenada(), 1)
    const unidadesCercanasAliadas = unidadesAdyacentes.filter((unidadCercana) => {
      return (unidadCercana.getPropietario() === contexto.jugadorActual && unidadCercana.getId() !== this.getId())
    })

    if ( unidadesCercanasAliadas.length > 0 ){
      const reponerAccion = {
        nombre: 'Reponer',
        clickHandler: () => {
          console.log('Reponer municiones y gasolina')
          contexto.konvaMapa.ocultarCasillasCuadros(contexto.konvaMapa.getCapaCasillas())
          contexto.bloquearInteracciones()

          contexto.moverUnidad(
            contexto.ultimaCasillaSeleccionada,
            contexto.camino.getDirecciones(),
            contexto.konvaMapa.getTamanoCasilla(),
            contexto.mapa
          )
            .then(() => {
              unidadesCercanasAliadas.forEach((unidad) => {
                unidad.reponerUnidad()
              })
              return true
            })
            .catch(() => {
              console.log('Acción interrumpida')
              return false
            })
            .finally(() => {
              console.log('Camino: ', contexto.camino.getCamino())
              contexto.desbloquearInteracciones()
              contexto.unidadSeleccionada.gastarTurno()
              contexto.camino.limpiarCoordenadasCamino()
              contexto.deseleccionarCasilla()
            })
        }
      }

      // Talvez aquí convenga poner esto antes que la opción de esperar
      acciones.push(reponerAccion)
    }

    return acciones
  }
}
