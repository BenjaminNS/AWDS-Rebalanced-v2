import { ComandanteBase, type ComandantePoder, type DayToDay } from './ComandanteBase'

// Sami 2 poderes
export class Sami_Comandante extends ComandanteBase {
  victoryMarch:ComandantePoder
  doubleTime:ComandantePoder

  constructor (){
    // D2D
    const d2dSoldierAttack = 20
    const d2dCaptureLimitDiscount = 6
    const d2dTransportMovementBonus = 1
    const d2dDirectVehicleAttackPenalty = 10

    const d2d:DayToDay = {
      descripcion: `Sus soldados necesitan ${d2dCaptureLimitDiscount} puntos menos para capturar propiedades, tienen ${d2dSoldierAttack}% más de ataque y sus vehículos de transporte tienen +${d2dTransportMovementBonus} de movilidad, pero todos sus vehículos directos tienen -${d2dDirectVehicleAttackPenalty}% de ataque`,
      d2dSoldierAttack,
      d2dCaptureLimitDiscount,
      d2dTransportMovementBonus,
      d2dDirectVehicleAttackPenalty
    }

    // DOUBLE TIME
    const doubleTimeName = 'Double Time'
    const doubleTimeSoldierMovementBonus = 1
    const doubleTimeSoldierAttackBonus = 30
    const doubleTimeSoldierCaptureBonus = 4
    const doubleTimeStandardAttackDefenseBonus = 10
    const doubleTime:ComandantePoder = {
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
    const victoryMarch:ComandantePoder = {
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

    super('Sami', 'sami', 'Especialista en infanterías y vehículos de transporte.', 'Orange Star', d2d, 70000, 7, [doubleTime, victoryMarch], null)

    this.victoryMarch = victoryMarch
    this.doubleTime = doubleTime
    Object.seal(this)
  }
}

Object.freeze(Sami_Comandante)
