import { type nombreTerreno, fabricaUnidades, aeropuertoUnidades, puertoNavalUnidades } from '../mapa/terreno'
import { UnidadCasilla } from '../unidades/unidades'
import type { nombresPaises } from './paises'
import { getInfoBasica } from '../unidades/unidadInfoBasica'
// import type { nombrePropiedad } from '../mapa/terreno'
import type { Casilla, coordenada } from '../mapa/mapa'
import type { Jugador } from '../jugador'
import type { nombreUnidad } from '../unidades/unidadInfoBasica'
import type { unidadCompra } from '../componentes/compraUnidades'

export interface DayToDay {
  descripcion: string
  [key: string]: string|number
  // efectos, reemplazaría las funciones por defecto del personaje
}

export interface ComandantePoder {
  nombre: string,
  descripcion: string,
  costoEstrellas: number,
  // efectoActivacion: (unidades: UnidadCasilla[], adversarios: UnidadCasilla[])=>void
  // coordenada(s), partidaSetters, eventos (movimiento, ataque, destruir unidad, comprar unidades, etc.)
  efectoActivacion: ({ unidadesPropias, unidadesAdversarios, coordenadas }: Partial<
    {unidadesPropias: UnidadCasilla[], unidadesAdversarios: UnidadCasilla[], coordenadas: coordenada}>)=>boolean
  // Debería ser una promesa, por si quiero hacerlo animado
  efectoDesactivacion: (unidades: UnidadCasilla[], adversarios: UnidadCasilla[])=>boolean
  [key: string]: number|string|(()=>boolean)
}
type estadoComandante = 'normal'|string
type statusEffect = 'no-power-charge'|'no-money-generation'

// LIMITES Y ESTANDARES
export const maximoAtaque = 99999
export const minimaDefensa = 1

export const metaPuntosCaptura = 20
export const maxDineroEstandar = 99999
export const maxDineroPorPropiedad = 5000

export const costoEstrella = 9000
export const multiplicadorCargaUnidadPropia = .5
export const multiplicadorCargaUnidadEnemiga = 1
export const penalizacionUsosPoder = .2
export const penalizacionCargaSobrante = .2

export const maxMovilidad = 12
export const maxRango = 12

export const maxPuntosReparaciones = 20

export abstract class ComandanteBase{
  // IDENTIFICADORES
  #ID: string
  #jugador: {id: string, ref: Jugador}

  // STATUS ACTUAL
  #estado: estadoComandante = 'normal'
  #activo: boolean
  #dineroActual: number
  #cargaActual: number
  #usosPoder: number
  #statusEffects: statusEffect[] = []
  // records: records;

  // BASE DE COMANDANTE
  #nombre: string
  #nombreCorto: string
  #descripcion: string
  #pais: nombresPaises
  #cancion: AudioData|null
  // canciones: {normal: AudioData, cop: AudioData, scop: AudioData};
  // spritesComandante: spritesComandante; //Talvez sean coordenadas como los terrenos
  #d2d: DayToDay
  // tipoCarga: 'Advance Wars 2'|'Days of Ruin'
  #estrellasMaximas: number|null
  #poderes: Record<string, ComandantePoder>|null

  constructor (nombre: string, nombreCorto: string, descripcion: string, pais: nombresPaises, d2d: DayToDay, estrellas: number|null, poderes: Record<string, ComandantePoder>|null, cancion: AudioData|null, statusActual: { dineroActual:number, cargaActual:number, comandanteInstancia:number, usosPoder:number, activo:boolean, statusEffects:statusEffect[] }, jugador: {ref: Jugador, id: string}){
    this.#ID = crypto.randomUUID()
    this.#jugador = jugador

    // BASE COMANDANTE
    this.#nombre = nombre
    this.#nombreCorto = nombreCorto
    this.#descripcion = descripcion
    this.#pais = pais
    this.#d2d = d2d
    // FUTURO: ¿Qué pasa si las estrellas tiene decimales?
    this.#estrellasMaximas = estrellas
    this.#poderes = poderes
    this.#cancion = cancion

    // STATUS ACTUAL
    this.#dineroActual = statusActual.dineroActual
    this.#cargaActual = statusActual.cargaActual
    this.#usosPoder = statusActual.usosPoder
    this.#activo = statusActual.activo
    this.#statusEffects = statusActual.statusEffects
  }

  // GETTERS BASE COMANDANTE
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
  // SETTERS
  setEstado (estado: estadoComandante){
    this.#estado = estado
  }

  // GET IDENTIFICADORES
  getID (){
    return this.#ID
  }
  getJugadorID (){
    return this.#jugador.id
  }
  getJugadorRef (){
    return this.#jugador.ref
  }

  // GET STATUS ACTUAL
  getEstado (){
    return this.#estado
  }
  getActivo (){
    return this.#activo
  }
  getStatusEffects (){
    return this.#statusEffects
  }

  // TODO: tomar en cuenta como afectarían los climas estos resultados
  // FUNCIONES DE SUERTE (POSITIVA y NEGATIVA), DAÑO DE TROPA, DAÑO MINIMO, DAÑO MAXIMO, RANGO DE DAÑO, ESTRELLAS DE DEFENSA, MOVER Y ATACAR, COSTOS DE DESPLIEGUE, OPCIONES DE COMPRA, COSTO DE REPARACION, VELOCIDAD DE REPARACION, COSTO DE REPARACION, TIPO DE MOVILIDAD, LIBRO DE MOVILIDAD, RANGO MINIMO, RANGO MAXIMO, VISION, GASOLINA, MUNICIONES, ACCIONES DISPONIBLES
  // Resultados unidad base: DAÑO MINIMO, DAÑO MAXIMO, RANGO DE DAÑO, COSTO DE UNIDAD, TIPO DE MOVILIDAD, LIBRO DE MOVILIDAD, RANGO MINIMO, RANGO MAXIMO, VISION, GASOLINA, MUNICIONES, ACCIONES DISPONIBLES

  // SECCION ATAQUE
  public getSuerteNegativa (casillas: {atacante: Casilla, defensiva: Casilla}){
    return 0
  }
  // Formula de daño
  public getDanoTotal (casillas: {atacante: Casilla, defensiva: Casilla}, jugador: {defensivo: ComandanteBase}, contraataque: boolean):number|undefined{
    const unidadAtacante = casillas.atacante.getUnidad()
    const unidadDefensiva = casillas.defensiva.getUnidad()

    if ( unidadAtacante == null || unidadDefensiva == null ) return

    const ataque = Math.min(this.getAtaque(casillas.atacante, casillas.defensiva), maximoAtaque)
    const defensa = Math.max(jugador.defensivo.getDefensa(casillas.atacante, casillas.defensiva), minimaDefensa)

    const danoMatchup = this.getUnitMatchup({ unidadAtacante, unidadDefensiva })
    if (danoMatchup == null) return
    const suerteNegativa = this.getSuerteNegativa(casillas)

    const multHp = unidadAtacante.getHpMultiplier()
    // Usar formula propia de comandante para el daño de suerte
    const danoSuerte = Math.random() * (danoMatchup.suertePositiva + suerteNegativa) - suerteNegativa
    let estrellasTerreno = casillas.defensiva.getTerrenoObjeto()?.estrellasDefensa
    estrellasTerreno = estrellasTerreno == null ? 0 : estrellasTerreno

    const danoTotal = (danoMatchup.base + danoSuerte) * (ataque / defensa) * multHp * (10 - (estrellasTerreno * multHp))

    if ( contraataque ){
      return danoTotal * this.getMultiplicadorContraataque(casillas)
    }

    return danoTotal
  }
  public getAtaque (casillaAtacante: Casilla, casillaDefensiva: Casilla):number{
    return 100
  }
  public getDefensa (casillaAtacante: Casilla, casillaDefensiva: Casilla):number{
    return 100
  }
  public getUnitMatchup ({ unidadAtacante, unidadDefensiva }: {unidadAtacante: UnidadCasilla, unidadDefensiva: UnidadCasilla}){
    return unidadAtacante.getUnitMatchup(unidadDefensiva.getNombreCorto())
  }
  public getMultiplicadorContraataque (casillas: {atacante: Casilla, defensiva: Casilla}){
    return 1
  }
  // SECCION MOVILIDAD
  public getMovilidadUnidad (unidad: UnidadCasilla):number{
    return unidad.getMovilidad()
  }
  // SECCION PODERES
  getCargaActual (){
    return this.#cargaActual
  }
  getLimiteCargaActual (){
    if ( this.#estrellasMaximas ){
      const penalizacionUsosPoderMult = ( 1 + (this.#usosPoder * penalizacionUsosPoder) )
      return this.#estrellasMaximas * costoEstrella * penalizacionUsosPoderMult
    }

    return null
  }
  getPorcentajeCarga (){
    if ( this.#cargaActual <= 0)
      return 0

    const cargaLimiteCargaActual = this.getLimiteCargaActual()
    if (cargaLimiteCargaActual == null)
      return 0

    return this.#cargaActual / cargaLimiteCargaActual
  }
  getEstrellasComandante (){
    return this.#estrellasMaximas
  }
  getUsosPoder (){
    return this.#usosPoder
  }
  getListaPoderes (){
    return this.#poderes
  }
  getPoder (nombrePoder: string){
    if ( this.#poderes )
      return this.#poderes[nombrePoder]

    return null
  }

  // SECCION INGRESOS Y COMPRAS
  getDineroActual (){
    return this.#dineroActual
  }
  public getIngresos (listaPropiedades: nombreTerreno[], dineroPorPropiedad: number):number{
    let ingresosDiarios = 0
    listaPropiedades.forEach(propiedad => {
      if ( propiedad === 'ciudad' || propiedad === 'cuartelGeneral' || propiedad === 'fabrica' || propiedad === 'aeropuerto' || propiedad === 'puertoNaval' ){
        ingresosDiarios += dineroPorPropiedad
      }
    })

    return ingresosDiarios
  }
  public getMultiplicadorCosto (nombreUnidad: nombreUnidad, propiedad: Casilla):number{
    return 1
  }
  public getListaUnidadesCompraDatos (propiedad: Casilla, comprarUnidad: (unidad: nombreUnidad)=>void):unidadCompra[]{
    const unidadesCompraDatos:unidadCompra[] = []

    let propiedadUnidades
    switch (propiedad.getTipo()){
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

    propiedadUnidades?.forEach((unidadNombre) => {
      const tempInfoBasica = getInfoBasica(unidadNombre)
      if ( tempInfoBasica !== null ){
        const costoTotal = tempInfoBasica.costo * this.getMultiplicadorCosto(tempInfoBasica.nombreCorto, propiedad)
        unidadesCompraDatos.push({
          costo: costoTotal,
          habilitado: this.#dineroActual >= tempInfoBasica.costo ? true : false,
          nombre: tempInfoBasica.nombreLargo,
          nombreCorto: tempInfoBasica.nombreCorto,
          spriteUrl: tempInfoBasica.nombreCorto + '.png',
          clickHandler: () => {
            if (this.gastarDinero(costoTotal)){
              comprarUnidad(unidadNombre)
            } else {
              // TODO: Animación de shake en seccion de dinero
              console.log('No tienes fondos suficientes')
            }
          }
        })
      }
    })

    return unidadesCompraDatos
  }
  getLimiteDinero (numeroPropiedades: number, ingresosPorPropiedad: number){
    return numeroPropiedades * maxDineroPorPropiedad * ingresosPorPropiedad
  }
  // TODO: Debería tener una función para transacciones
  // Para que sean las 2 cosas al mismo tiempo (ej: comprar unidad y gastar dinero)
  gastarDinero (gasto:number){
    if ( this.#dineroActual < gasto ){
      return false
    } else {
      this.#dineroActual -= gasto
      return true
    }
  }
  sumarDinero (dineroExtra:number, limiteDinero: number = maxDineroEstandar){
    // sfx.play('dinero')
    this.#dineroActual = Math.min((this.#dineroActual + dineroExtra), limiteDinero)
  }


  // SECCION CAPTURA DE PROPIEDADES
  public getPuntosCaptura (casillaCaptura: Casilla){
    const unidad = casillaCaptura.getUnidad()

    if ( unidad == null )
      return 0

    return unidad.getHpMultiplier()
  }
  public getMetaPuntosCaptura (casillaCaptura: Casilla){
    return metaPuntosCaptura
  }

}
