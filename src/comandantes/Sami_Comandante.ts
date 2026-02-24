import type { Casilla } from '../mapa/mapa'
import { ComandanteBase, type ComandantePoder, type DayToDay, metaPuntosCaptura, type statusEffect } from './ComandanteBase'
import type { UnidadCasilla } from '../unidades/unidades'
import type { Jugador } from '../jugador'

type SamiD2D = DayToDay & {
  soldierAttack: number
  captureGoalDiscount: number
  transportMovementBonus: number
  directVehicleAttackPenalty: number
}
type DoubleTimeCOP = ComandantePoder & {
  soldierMovementBonus: number
  soldierAttackBonus: number
  soldierCaptureBonus: number
  standardAttackDefenseBonus: number
}
type VictoryMarchCOP = ComandantePoder & {
  soldierMovementBonus: number
  soldierAttackBonus: number
  soldierCaptureBonus: number
  standardAttackDefenseBonus: number
}

// Sami 2 poderes
export class Sami_Comandante extends ComandanteBase {
  #doubleTime:DoubleTimeCOP
  #victoryMarch:VictoryMarchCOP
  #samiD2D: SamiD2D

  constructor (statusActual:{ dineroActual:number, cargaActual:number, usosPoder:number, activo:boolean, statusEffects:statusEffect[] }, jugador: {ref: Jugador, id: string}){
    // D2D
    const d2dSoldierAttack = 20
    const d2dCaptureGoalDiscount = 6
    const d2dTransportMovementBonus = 1
    const d2dDirectVehicleAttackPenalty = 10

    const samiD2D:SamiD2D = {
      descripcion: `Sus soldados necesitan ${d2dCaptureGoalDiscount} puntos menos para capturar propiedades, tienen ${d2dSoldierAttack}% más de ataque y sus vehículos de transporte tienen +${d2dTransportMovementBonus} de movilidad, pero todos sus vehículos directos tienen -${d2dDirectVehicleAttackPenalty}% de ataque`,
      soldierAttack: d2dSoldierAttack,
      captureGoalDiscount: d2dCaptureGoalDiscount,
      transportMovementBonus: d2dTransportMovementBonus,
      directVehicleAttackPenalty: d2dDirectVehicleAttackPenalty
    }

    // DOUBLE TIME
    const doubleTimeName = 'Double Time'
    const doubleTimeSoldierMovementBonus = 1
    const doubleTimeSoldierAttackBonus = 30
    const doubleTimeSoldierCaptureBonus = 4
    const doubleTimeStandardAttackDefenseBonus = 10
    const doubleTime:DoubleTimeCOP = {
      nombre: doubleTimeName,
      descripcion: `Todos sus soldados reciben +${doubleTimeSoldierMovementBonus} de movilidad, ${doubleTimeSoldierAttackBonus}% más de ataque y +${doubleTimeSoldierCaptureBonus} de captura. Bonus estándar de ${doubleTimeStandardAttackDefenseBonus}% de ataque y defensa`,
      costoEstrellas: 3,
      efectoActivacion: () => {
        this.setEstado(doubleTimeName)
        return true
      },
      efectoDesactivacion: () => {
        this.setEstado('normal')
        return true
      },
      soldierMovementBonus: doubleTimeSoldierMovementBonus,
      soldierAttackBonus: doubleTimeSoldierAttackBonus,
      soldierCaptureBonus: doubleTimeSoldierCaptureBonus,
      standardAttackDefenseBonus: doubleTimeStandardAttackDefenseBonus
    }

    // VICTORY MARCH
    const victoryMarchName = 'Victory March'
    const victoryMarchSoldierMovementBonus = 2
    const victoryMarchSoldierAttackBonus = 50
    const victoryMarchSoldierCaptureBonus = 8
    const victoryMarchStandardAttackDefenseBonus = 10
    const victoryMarch:VictoryMarchCOP = {
      nombre: victoryMarchName,
      descripcion: `Todos sus soldados reciben +${victoryMarchSoldierMovementBonus} de movilidad, ${victoryMarchSoldierAttackBonus}% más de ataque y +${victoryMarchSoldierCaptureBonus} de captura. Bonus estándar de ${victoryMarchStandardAttackDefenseBonus}% de ataque y defensa`,
      costoEstrellas: 6,
      efectoActivacion: () => {
        this.setEstado(victoryMarchName)
        return true

      },
      efectoDesactivacion: () => {
        this.setEstado('normal')
        return true
      },
      soldierMovementBonus: victoryMarchSoldierMovementBonus,
      soldierAttackBonus: victoryMarchSoldierAttackBonus,
      soldierCaptureBonus: victoryMarchSoldierCaptureBonus,
      standardAttackDefenseBonus: victoryMarchStandardAttackDefenseBonus
    }

    super('Sami', 'sami', 'Especialista en infanterías y vehículos de transporte.', 'Orange Star', samiD2D, 6,{
      doubleTime, victoryMarch
    }, null, statusActual, jugador)

    this.#samiD2D = samiD2D
    this.#doubleTime = doubleTime
    this.#victoryMarch = victoryMarch
    Object.seal(this)
  }

  override getAtaque (casillaAtacante: Casilla): number {
    const unidadAtacante = casillaAtacante.getUnidad()
    if ( unidadAtacante == null ) {
      console.log('Unidad atacante no encontrada. Valor default')
      return 100
    }

    const categorias = unidadAtacante.getCategorias()
    switch (this.getEstado()){
    case 'Double Time':
    {
      if ( categorias.includes('Soldado') ){
        return 100 + this.#samiD2D.soldierAttack + this.#doubleTime.soldierAttackBonus
      }
      if ( categorias.includes('Vehiculo') && categorias.includes('Directo') ){
        return 100 - this.#samiD2D.directVehicleAttackPenalty + this.#doubleTime.standardAttackDefenseBonus
      }
      // default
      return 100 + this.#doubleTime.standardAttackDefenseBonus
    }
    case 'Victory March':
    {
      if ( categorias.includes('Soldado') ){
        return 100 + this.#samiD2D.soldierAttack + this.#victoryMarch.soldierAttackBonus
      }
      if ( categorias.includes('Vehiculo') && categorias.includes('Directo') ){
        return 100 - this.#samiD2D.directVehicleAttackPenalty + this.#victoryMarch.standardAttackDefenseBonus
      }
      // default
      return 100 + this.#victoryMarch.standardAttackDefenseBonus
    }
    case 'normal':
    default:
    {
      if ( categorias.includes('Soldado') ){
        return 100 + this.#samiD2D.soldierAttack
      }
      if ( categorias.includes('Vehiculo') && categorias.includes('Directo') ){
        return 100 - this.#samiD2D.directVehicleAttackPenalty
      }
      // default
      return 100
    }
    }
  }

  override getDefensa (): number {
    switch (this.getEstado()){
    case 'Double Time':
      return 100 + this.#doubleTime.standardAttackDefenseBonus
    case 'Victory March':
      return 100 + this.#victoryMarch.standardAttackDefenseBonus
    case 'normal':
    default:
      return 100
    }
  }
  override getMovilidadUnidad (unidad: UnidadCasilla): number {
    switch (this.getEstado()){
    case 'Double Time':
      if ( unidad.getCategorias().includes('Soldado') ){
        return unidad.getMovilidad() + this.#doubleTime.soldierMovementBonus
      }
      if ( unidad.getCategorias().includes('Transporte') ){
        return unidad.getMovilidad() + this.#samiD2D.transportMovementBonus
      }
      return unidad.getMovilidad()
    case 'Victory March':
      if ( unidad.getCategorias().includes('Soldado') ){
        return unidad.getMovilidad() + this.#victoryMarch.soldierMovementBonus
      }
      if ( unidad.getCategorias().includes('Transporte') ){
        return unidad.getMovilidad() + this.#samiD2D.transportMovementBonus
      }
      return unidad.getMovilidad()
    case 'normal':
    default:
      if ( unidad.getCategorias().includes('Transporte') ){
        return unidad.getMovilidad() + this.#samiD2D.transportMovementBonus
      }
      return unidad.getMovilidad()
    }
  }
  override getMaxMovilidad (unidad: UnidadCasilla):number{
    return Math.min(this.getMovilidadUnidad(unidad), unidad.getGasActual())
  }
  override getPuntosCaptura (casillaCaptura: Casilla){
    const unidad = casillaCaptura.getUnidad()

    if ( unidad == null ){
      // FIX: talvez debería regresar error o falso
      return 0
    }

    switch (this.getEstado()){
    case 'Double Time':
      return unidad.getHpMultiplier() + this.#doubleTime.soldierCaptureBonus
    case 'Victory March':
      return unidad.getHpMultiplier() + this.#victoryMarch.soldierCaptureBonus
    case 'normal':
    default:
      return unidad.getHpMultiplier()
    }
  }
  override getMetaPuntosCaptura (): number {
    return metaPuntosCaptura - this.#samiD2D.captureGoalDiscount
  }
}

Object.freeze(Sami_Comandante)
