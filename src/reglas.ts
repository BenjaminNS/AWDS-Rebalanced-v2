import type { Clima } from './clima'
export type tipoPartida = 'Normal'|'Dual Strike';

export class Reglas{
  dineroPorPropiedad: number // Por defecto, 1,000
  maximoDinero: number
  limiteDias: number|null
  limiteCaptura: number|null
  climaDefecto: Clima
  habilidadesComandantes: boolean
  minutoPorTurnos: number|null
  // unidadesBaneadas: TipoUnidades[]
  tipoPartida: tipoPartida
  fogOfWar: boolean

  constructor (dineroPorPropiedad: number, maximoDinero: number, limiteDias: number|null, limiteCaptura: number|null, climaDefecto: Clima, habilidadesComandantes: boolean, minutoPorTurnos: number|null, tipoPartida: tipoPartida, fogOfWar: boolean){
    this.dineroPorPropiedad = dineroPorPropiedad
    this.maximoDinero = maximoDinero
    this.limiteDias = limiteDias
    this.limiteCaptura = limiteCaptura
    this.climaDefecto = climaDefecto
    this.habilidadesComandantes = habilidadesComandantes
    this.minutoPorTurnos = minutoPorTurnos
    this.dineroPorPropiedad = dineroPorPropiedad
    this.fogOfWar = fogOfWar
    this.tipoPartida = tipoPartida
  }
}
