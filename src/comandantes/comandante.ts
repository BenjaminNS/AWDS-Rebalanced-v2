// import PaisesJS from "./paises";
// const { listaPaises } = PaisesJS()
import { type nombrePropiedad, fabricaUnidades, aeropuertoUnidades, puertoNavalUnidades } from '../mapa/terreno'
import { type UnidadCasilla } from '../unidades/unidades'
import { getInfoBasica } from '../unidades/unidadInfoBasica'
import type { estado, nombreUnidad } from '../unidades/unidadInfoBasica'
import type { nombresPaises } from './paises'
import type { unidadCompra } from '../componentes/compraUnidades'

export type nombreComandante = 'Andy'|'Max'|'Sami'|'Nell'|'Hachi'|'Rachel'|'Jake'|'Olaf'|'Grit'|'Colin'|'Sasha'|'Kanbei'|'Sonja'|'Sensei'|'Grimm'|'Eagle'|'Drake'|'Jess'|'Javier'|'Flak'|'Lash'|'Adder'|'Hawke'|'Sturm'|'Jugger'|'Koal'|'Kindle'|'Von Bolt'|'Generico'
type DayToDay = {
  descripcion: string,
  variables: object
  // efectos, reemplazaría las funciones por defecto del personaje
}
type ComandantePoder = {
  nombre: string,
  costoEstrellas: number,
  efectoActivacion: (unidades: string, adversarios: string)=>{}
}
type spritesComandante = {
  normal: any,
  festejando: any,
  perdiendo: any
}
type records = {
  unidadesConstruidas: number,
  unidadesDestruidas: number,
  unidadesPerdidas: number,
  dineroGenerado: number;
  dineroGastado: number
}
// perks (Cambio a futuro): mejora las habilidades de un personaje
// type perks = {}

type statusEffect = 'no-power-charge'|'no-money-generation'
type estadoComandante = 'normal'|string

// Cambiar a variables privadas
export class ComandanteJugable{
  #idInstancia: string // crypto.randomUUID
  #dineroActual: number
  #cargaActual: number
  #comandanteInstancia: Comandante
  // Carga maxima cambiaría su valor cada vez que se usa un poder
  // Originalmente en el juego el aumento de costo es un +20% con cada uso
  #cargaMaxima: number
  #usosPoder: number
  #activo: boolean
  #multiplicadorCosto:number = 1
  #statusEffects: statusEffect[] = []
  // records: records;
  #estado: estadoComandante = 'normal'
  // #unidades: UnidadCasilla[]
  // #propiedades: propiedad[]

  // estadoActual: estadoComandante
  constructor (idInstancia: string, dineroActual: number, cargaActual: number, usosPoder: number, activo: boolean, estado: estadoComandante, comandanteInstancia: Comandante){
    this.#idInstancia = idInstancia
    this.#dineroActual = dineroActual
    this.#cargaActual = cargaActual
    this.#cargaMaxima = 10000
    this.#usosPoder = usosPoder
    this.#activo = activo
    this.#estado = estado
    this.#comandanteInstancia = comandanteInstancia
  }

  rendirse (){
    this.#activo = false
    // destruir todas las unidades
    // perder todas las propiedades
  }

  getpersonaje (){{
    return this.#personaje
  }}
  getidInstancia (){{
    return this.#idInstancia
  }}
  getdineroActual (){{
    return this.#dineroActual
  }}
  gastarDinero (gasto:number){
    if ( this.#dineroActual < gasto ){
      return false
    } else {
      this.#dineroActual -= gasto
      return true
    }
  }
  // Por defecto, el límite es 99999G
  sumarDinero (dineroExtra:number, limiteDinero: number = 999999){
    //
    this.#dineroActual = Math.min((this.#dineroActual + dineroExtra), limiteDinero)
  }
  getcargaActual (){{
    return this.#cargaActual
  }}
  sumarCarga (puntosCarga:number){
    this.#cargaActual = Math.min((this.#cargaActual + puntosCarga), this.#cargaMaxima)
  }
  // restarCarga (puntosCarga:number){
  //   this.#cargaActual = Math.min((this.#cargaActual + puntosCarga), this.#cargaMaxima)
  // }
  getCargaMaxima (){
    return this.#cargaMaxima
  }
  getusosPoder (){{
    return this.#usosPoder
  }}
  getactivo (){{
    return this.#activo
  }}
  getmultiplicadorCosto (){{
    return this.#multiplicadorCosto
  }}
  getStatusEffects () {
    return this.#statusEffects
  }
  agregarStatusEffects (statusEffects: statusEffect[]){
    this.#statusEffects.push.apply(statusEffects)
  }
  // removerStatusEffects (statusEffects: statusEffect[]){
  //   this.#statusEffects.remove(statusEffects)
  // }
  getEstado () {
    return this.#estado
  }
  #setEstado (estado:estadoComandante){
    this.#estado = estado
  }
  activarPoder (){
    this.#setEstado('cop')
  }
  desactivarPoder (){
    this.#setEstado('normal')
  }
  // Se supone que lo que ocupo es el dato original más el tipo de unidad
  // pero puede haber escenarios donde quiera ver la gas, municiones, casilla, etc.
  // para determinar los resultados (especialmente importante en los resultados de ataque y defensa)
  // Ocupo saber como generar la versión libre del objeto
  public getMovilidadUnidad (movilidadBase: number, nombreUnidad: nombreUnidad){
    // Aquí cada personaje tendría su propia implementación
    // Aplicando cualquier operación aritmética, que pueda depender del
    // tipo, estado actual de la unidad u otros parámetros
    // O también el estado actual del personaje (con o sin poderes, efectos de clima, perks, etc.)

    // Por defecto, los personajes regresan el valor tal cual sin modificaciones

    return movilidadBase
    // Temporal, esto se implementa dentro de la versión de cada personaje
    // switch (nombreUnidad){
    // case 'tanqueMediano':
    //   return movilidadBase + 2
    // case 'cohetes':
    //   return Math.max(movilidadBase - 1, 1)
    // default:
    //   return movilidadBase
    // }
  }

  public getUnidadesCompraDatos (propiedad: nombrePropiedad):unidadCompra[]{
    const unidadesCompraDatos:unidadCompra[] = []

    let propiedadUnidades
    switch (propiedad){
    case 'fabrica':
      propiedadUnidades = fabricaUnidades
      break
    case 'aeropuerto':
      propiedadUnidades = aeropuertoUnidades
      break
    case 'puertoNaval':
      propiedadUnidades = puertoNavalUnidades
      break
    }

    propiedadUnidades.forEach((unidadNombre) => {
      const tempInfoBasica = getInfoBasica(unidadNombre)
      if ( tempInfoBasica !== null ){
        unidadesCompraDatos.push({
          costo: tempInfoBasica.costo * this.#multiplicadorCosto,
          habilitado: this.#dineroActual >= tempInfoBasica.costo ? true : false,
          nombre: tempInfoBasica.nombreLargo,
          spriteUrl: tempInfoBasica.nombreCorto + '.png',
          clickHandler: () => {
            if (this.gastarDinero(tempInfoBasica.costo * this.#multiplicadorCosto)){
              console.log(`Compraste ${tempInfoBasica.nombreLargo}. Tienes ${this.#dineroActual}G`)
            } else {
              console.log('Error en la compra. No tienes fondos suficientes')
            }
          }
        })
      }
    })

    return unidadesCompraDatos
  }
}

export class Comandante{
  #nombre: string
  #nombreCorto: string
  #descripcion: string
  #pais: nombresPaises
  #cancion: AudioData|null
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
  #poderes: ComandantePoder[]|null

  // Funciones de daño, ataque, defensa, costo, movimiento, rango, etc.
  constructor (nombre: string, nombreCorto: string, descripcion: string, pais: nombresPaises, d2d: DayToDay, limiteCarga: number|null, poderes: ComandantePoder[]|null, cancion: AudioData|null){
    this.#nombre = nombre
    this.#nombreCorto = nombreCorto
    this.#descripcion = descripcion
    this.#pais = pais
    this.#d2d = d2d
    this.#limiteCarga = limiteCarga
    this.#poderes = poderes
    this.#cancion = cancion
  }

  getNombre (){
    return this.#nombre
  }
  getNombreCorto (){
    return this.#nombreCorto
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
  getPowers (){
    return this.#poderes
  }
}
