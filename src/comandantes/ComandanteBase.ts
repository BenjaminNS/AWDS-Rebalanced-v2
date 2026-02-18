import { type UnidadCasilla } from '../unidades/unidades'
import type { nombresPaises } from './paises'

type DayToDay = {
  descripcion: string,
  variables: object
  // efectos, reemplazaría las funciones por defecto del personaje
}
type ComandantePoder = {
  nombre: string,
  costoEstrellas: number,
  efectoActivacion: (unidades: UnidadCasilla[], adversarios: UnidadCasilla[])=>void
}
type estadoComandante = 'normal'|string

const maximoAtaque = 99999
const minimaDefensa = 1

export class ComandanteBase{
  #nombre: string
  #nombreCorto: string
  #descripcion: string
  #pais: nombresPaises
  #cancion: AudioData|null
  #estado: estadoComandante = 'normal'
  // canciones: {normal: AudioData, cop: AudioData, scop: AudioData};
  // spritesComandante: spritesComandante; //Talvez sean coordenadas como los terrenos

  #d2d: DayToDay
  // Definiría como se cargan y como se activan los poderes de los comandantes
  // Advance Wars 2: carga aumenta basado en el valor de las unidades por el daño hecho (60%) y recibido (90%)
  // y puede ser activado sin unidad con zona de comandante
  // Days of Ruin: Los poderes cargan solamente por daño hecho a unidades enemigas
  // Si pierdes tu unidad con zona de comandante, pierdes toda tu carga
  // Debes gastar el turno de tu unidad con CO para activar el poder (no puede atacar el mismo turno)
  // tipoCarga: 'Advance Wars 2'|'Days of Ruin'

  #limiteCarga: number|null
  #estrellasMaximas: number|null
  #poderes: ComandantePoder[]|null

  constructor (nombre: string, nombreCorto: string, descripcion: string, pais: nombresPaises, d2d: DayToDay, limiteCarga: number|null, estrellasMaximas: number|null, poderes: ComandantePoder[]|null, cancion: AudioData|null){
    this.#nombre = nombre
    this.#nombreCorto = nombreCorto
    this.#descripcion = descripcion
    this.#pais = pais
    this.#d2d = d2d
    this.#limiteCarga = limiteCarga
    this.#estrellasMaximas = estrellasMaximas
    this.#poderes = poderes
    this.#cancion = cancion
  }
  // GETTERS
  getNombre (){
    return this.#nombre
  }
  getNombreCorto (){
    return this.#nombreCorto
  }
  getEstado (){
    return this.#estado
  }
  getDescripcion (){
    return this.#descripcion
  }
  getPais (){
    return this.#pais
  }
  getCancion (){
    return this.#cancion
  }
  getDayToDay (){
    return this.#d2d
  }
  getLimiteCarga (){
    return this.#limiteCarga
  }
  getEstrellasMaximas (){
    return this.#estrellasMaximas
  }
  getPowers (){
    return this.#poderes
  }
  // SETTERS
  setEstado (estado: estadoComandante){
    this.#estado = estado
  }


  getSuerteNegativa (casillas: {atacante: Casilla, defensiva: Casilla}){
    return 0
  }
  getDanoTotal (casillas: {atacante: Casilla, defensiva: Casilla}, jugador: {defensivo: ComandanteBase}, contraataque: boolean):number|undefined{
    const unidadAtacante = casillas.atacante.getUnidad()
    const unidadDefensiva = casillas.defensiva.getUnidad()

    if ( unidadAtacante == null || unidadDefensiva == null ) return

    const ataque = Math.min(this.getAtaque(casillas.atacante, casillas.defensiva), maximoAtaque)
    const defensa = Math.max(jugador.defensivo.getDefensa(casillas.atacante, casillas.defensiva), minimaDefensa)

    const danoMatchup:{base: number, suertePositiva: number, suerteNegativa: number}|null = this.getUnitMatchup(unidadAtacante.getNombreCorto(), unidadDefensiva.getNombreCorto())
    if (danoMatchup == null) return

    const multHp = Math.ceil(unidadAtacante.getHp() / 100)
    const danoSuerte = Math.random() * (danoMatchup.suertePositiva + danoMatchup.suerteNegativa) - danoMatchup.suerteNegativa
    let estrellasTerreno = casillas.defensiva.getTerrenoObjeto()?.estrellasDefensa
    estrellasTerreno = estrellasTerreno == null ? 0 : estrellasTerreno

    const danoTotal = (danoMatchup.base + danoSuerte) * (ataque / defensa) * multHp * (10 - (estrellasTerreno * multHp))

    if ( contraataque ){
      return danoTotal * this.getMultiplicadorContraataque()
    }

    return danoTotal
  }

  getAtaque (casillaAtacante: Casilla, casillaDefensiva: Casilla):number{
    return 100
  }

  getDefensa (casillaAtacante: Casilla, casillaDefensiva: Casilla):number{
    return 100

  }
}
