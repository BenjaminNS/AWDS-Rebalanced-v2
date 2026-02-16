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

  // #estrellas: number
  #limiteCarga: number|null
  #estrellasMaximas: number|null
  #poderes: ComandantePoder[]|null

  // Funciones de daño, ataque, defensa, costo, movimiento, rango, etc.
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
}
