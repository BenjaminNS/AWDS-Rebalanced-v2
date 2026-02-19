import { ComandanteBase, type ComandantePoder, type DayToDay } from './ComandanteBase'

type SamiD2D = DayToDay & {
  soldierAttack: number
  captureLimitDiscount: number
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
  doubleTime:DoubleTimeCOP
  victoryMarch:VictoryMarchCOP
  samiD2D: SamiD2D

  constructor (){
    // D2D
    const d2dSoldierAttack = 20
    const d2dCaptureLimitDiscount = 6
    const d2dTransportMovementBonus = 1
    const d2dDirectVehicleAttackPenalty = 10

    const samiD2D:SamiD2D = {
      descripcion: `Sus soldados necesitan ${d2dCaptureLimitDiscount} puntos menos para capturar propiedades, tienen ${d2dSoldierAttack}% más de ataque y sus vehículos de transporte tienen +${d2dTransportMovementBonus} de movilidad, pero todos sus vehículos directos tienen -${d2dDirectVehicleAttackPenalty}% de ataque`,
      soldierAttack: d2dSoldierAttack,
      captureLimitDiscount: d2dCaptureLimitDiscount,
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
      costoEstrellas: 7,
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

    super('Sami', 'sami', 'Especialista en infanterías y vehículos de transporte.', 'Orange Star', samiD2D, 70000, 7, [doubleTime, victoryMarch], null)

    this.samiD2D = samiD2D
    this.doubleTime = doubleTime
    this.victoryMarch = victoryMarch
    Object.seal(this)
  }
}

Object.freeze(Sami_Comandante)
