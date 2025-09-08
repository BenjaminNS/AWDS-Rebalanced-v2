export type Clima  =  'soleado'|'nevado'|'lluvioso'|'tormeta de arena';
type tipoPartida  =  'Normal'|'Dual Strike';

export class Reglas{
  dineroPorPropiedad: number;
  limiteDias: number|null;
  limiteCaptura: number|null;
  climaDefecto: Clima;
  habilidadesComandantes: boolean;
  minutoPorTurnos: number|null;
  // unidadesBaneadas: TipoUnidades[]
  tipoPartida: tipoPartida;

  constructor(dineroPorPropiedad: number, limiteDias: number|null, limiteCaptura: number|null, climaDefecto: Clima, habilidadesComandantes: boolean, minutoPorTurnos: number|null, tipoPartida: tipoPartida){
    this.dineroPorPropiedad = dineroPorPropiedad
    this.limiteDias = limiteDias
    this.limiteCaptura = limiteCaptura
    this.climaDefecto = climaDefecto
    this.habilidadesComandantes = habilidadesComandantes
    this.minutoPorTurnos = minutoPorTurnos
    this.tipoPartida = tipoPartida
  }
}