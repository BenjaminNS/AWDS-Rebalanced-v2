export type Clima = 'soleado'|'nevado'|'lluvioso'|'tormeta de arena';

function reglasJS(){
  class Reglas{
    dineroPorPropiedad: number;
    limiteDias: number|null;
    limiteCaptura: number|null;
    climaDefecto: Clima;
    habilidadesComandantes: boolean;
    minutoPorTurnos: number|null;
    // unidadesBaneadas: TipoUnidades[]

    constructor(dineroPorPropiedad: number, limiteDias: number|null, limiteCaptura: number|null, climaDefecto: Clima, habilidadesComandantes: boolean, minutoPorTurnos: number|null){
      this.dineroPorPropiedad=dineroPorPropiedad
      this.limiteDias=limiteDias
      this.limiteCaptura=limiteCaptura
      this.climaDefecto=climaDefecto
      this.habilidadesComandantes=habilidadesComandantes
      this.minutoPorTurnos=minutoPorTurnos
    }
  }

  return {Reglas}
}

export default {reglasJS}