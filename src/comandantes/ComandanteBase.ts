import { type nombreTerreno } from '../mapa/terreno'
import { fabricaUnidades, aeropuertoUnidades, puertoNavalUnidades } from '../mapa/terrenosCompra'
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
export type statusEffect = 'no-power-charge'|'no-money-generation'

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
  #jugadorRef: jugador

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
  #estrellasMaximas: number
  #poderes: Record<string, ComandantePoder>

  constructor (nombre: string, nombreCorto: string, descripcion: string, pais: nombresPaises, d2d: DayToDay, estrellas: number, poderes: Record<string, ComandantePoder>, cancion: AudioData|null, statusActual: { dineroActual:number, cargaActual:number, usosPoder:number, activo:boolean, statusEffects:statusEffect[] }){
    this.#ID = crypto.randomUUID()

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
  setJugadorRef (jugador:Jugador){
    if ( this.#jugadorRef == null ){
      this.#jugadorRef = jugador
    } else {
      console.error('Se intento modificar la referencia de ', this,' a este jugador: ', jugador)
    }
  }
  getJugadorRef (){
    return this.#jugadorRef
  }
  getJugadorID (){
    return this.#jugadorRef?.getId()
  }
  getEquipo (){
    this.#jugadorRef.getEquipo()
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

  // SECCION FORMULA DAÑO
  getDanoTotal (casillas: {atacante: Casilla, defensiva: Casilla}, jugador: {defensivo: ComandanteBase}, contraataque: boolean):number|undefined{
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
  /* getDanoMinimo, getDanoMaximo, getRangoDano, getPrediccion */

  // SECCION ATAQUE
  public getAtaque (casillaAtacante: Casilla, casillaDefensiva: Casilla):number{
    return 100
  }
  public getUnitMatchup ({ unidadAtacante, unidadDefensiva }: {unidadAtacante: UnidadCasilla, unidadDefensiva: UnidadCasilla}){
    return unidadAtacante.getUnitMatchup(unidadDefensiva.getNombreCorto())
  }
  public getSuertePositiva (casillas: {atacante: Casilla, defensiva: Casilla}){
    const unidadAtacante = casillas.atacante.getUnidad()
    const unidadDefensiva = casillas.atacante.getUnidad()

    if ( unidadAtacante == null || unidadDefensiva == null ){
      return 0
    }

    return unidadAtacante.getUnitMatchup(unidadDefensiva.getNombreCorto())?.suertePositiva
  }
  public getSuerteNegativa (casillas: {atacante: Casilla, defensiva: Casilla}){
    return 0
  }

  // SECCION DEFENSA
  public getDefensa (casillaAtacante: Casilla, casillaDefensiva: Casilla):number{
    return 100
  }
  public getEstrellasDefensa (casillaDefensiva: Casilla){
    return casillaDefensiva.getTerrenoObjeto()?.estrellasDefensa
  }

  // SECCION MOVILIDAD
  public getMovilidadUnidad (unidad: UnidadCasilla):number{
    return unidad.getMovilidad()
  }
  public getMaxMovilidad (unidad: UnidadCasilla):number{
    return unidad.getMaxMovimiento()
  }
  public getTipoMovilidadUnidad (unidad: UnidadCasilla){
    return unidad.getTipoMovimiento()
  }
  // public getLibroMovilidadUnidad (unidad: UnidadCasilla){
  // FIX: Mover los datos del movimiento del terreno a que la tenga la misma unidad
  //   return unidad.getTipoMovimiento
  // }

  // SECCION RANGO Y MISC
  public getRangoMinimo (unidad: UnidadCasilla){
    return unidad.getRangoMinimo()
  }
  public getRangoMaximo (unidad: UnidadCasilla){
    return unidad.getRangoMaximo()
  }
  public getPuedeAtacarYMoverse (unidad: UnidadCasilla){
    return unidad.getAtacarYMoverse()
  }

  // SECCION CONTRAATAQUE Y PRIORIDAD
  public getPuedeContraatacar (){
    // TODO: Revisa si hay municiones, esta dentro del rango y si contraataque es mayor a 0
    return true
  }
  public getMultiplicadorContraataque (casillas: {atacante: Casilla, defensiva: Casilla}){
    return 1
  }
  public getPrioridadAtaque (esContraataque: boolean){
    if (esContraataque) return 0
    return 1
  }

  // SECCION VISION
  public getVision (unidad: UnidadCasilla){
    return unidad.getVision()
  }
  // public getOculto(unidad: UnidadCasilla, hayFOW: boolean)

  // Agregar campo de cuanta gas y municiones repone (en caso de querer menos)
  public reponerUnidad (unidad: UnidadCasilla){
    unidad.reponerUnidad()
  }
  // SECCION GAS
  getGasActual (unidad: UnidadCasilla){
    return unidad.getGasActual()
  }
  public getConsumoGasDiarioNormal (unidad: UnidadCasilla){
    return unidad.getConsumoDiario('normal')
  }
  public getConsumoGasDiarioActual (unidad: UnidadCasilla){
    return unidad.getConsumoDiario(unidad.getEstado())
  }
  // OJO: Aquí hay disonancia entre lo que la unidad va a tener por defecto
  // y lo que el comandante diga (talvez ocupe modificar el constructor de unidad)
  public getMaxGasolina (unidad: UnidadCasilla){
    return unidad.getMaxGasolina()
  }
  /* public gastarGasolinas(unidad: UnidadCasilla){} */

  // SECCION MUNICIONES
  getMunicionesActuales (unidad: UnidadCasilla){
    return unidad.getMunicionesActuales()
  }
  public getMunicionesMaximas (unidad: UnidadCasilla){
    return unidad.getMunicionesMaximas()
  }
  // public gastarMuniciones (unidad: UnidadCasilla, municionesGastadas: {tipo: string, cantidad: number}[]){
  //   unidad.gastarMuniciones(municionesGastadas)
  // }

  // SECCION PODERES
  getCargaActual (){
    return this.#cargaActual
  }
  getLimiteCargaActual (){
    if ( this.#estrellasMaximas ){
      const penalizacionUsosPoderMult = ( 1 + (this.#usosPoder * penalizacionUsosPoder) )
      return this.#estrellasMaximas * costoEstrella * penalizacionUsosPoderMult
    }

    return 0
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
  public getPoderesData (){
    const poderesData:{nombre: string, costo: number, estrellas: number, efectoActivacion: (unidades: UnidadCasilla[], adversarios: UnidadCasilla[])=>void }[] = []

    // console.log('KAREN HOLA :D', Object.keys(this.#poderes))
    Object.keys(this.#poderes)?.forEach(poder => {
      poderesData.push({ nombre: this.#poderes[poder].nombre, costo: (this.#poderes[poder].costoEstrellas * 10000), estrellas: this.#poderes[poder].costoEstrellas, efectoActivacion: this.#poderes[poder].efectoActivacion })
    })
    return poderesData
  }

  // SECCION INGRESOS Y COMPRAS
  getDineroActual (){
    return this.#dineroActual
  }
  public generarIngresos (listaPropiedades: nombreTerreno[], dineroPorPropiedad: number){
    this.sumarDinero(this.getIngresos(listaPropiedades, dineroPorPropiedad))
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

  // SECCION HP
  public getMaxReparacionUnidades (unidad: UnidadCasilla){
    return maxPuntosReparaciones
  }
  repararUnidad (unidad: UnidadCasilla){
    return unidad.repararUnidad(this.getMaxReparacionUnidades(unidad))
  }
  public getMultiplicadorCostoReparaciones (unidad: UnidadCasilla){
    return 1
  }
  public getMaxHP (unidad: UnidadCasilla){
    return unidad.getMaxHP()
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

  // SECCION ACCIONES
  public getAccionesUnidad (unidadSeleccionada: UnidadCasilla){
    return unidadSeleccionada.getAccionesDisponibles()
  }
}

// DEBERÍA VERIFICAR QUE LAS FUNCIONES DE UNIDADES QUE MANDE A LLAMAR
// SEAN DEL JUGADOR/COMANDANTE ACTUAL

// FUNCIONES TRIGGER: EMPEZANDO O TERMINANDO TURNO, TENIENDO UN COMBATE, DESTRUYENDO  O PERDIENDO UNIDADES
// CASILLAS AVANZADAS, VECES REPARANDO, TRANSPORTANDO O SOLTANDO UNIDADES, COMPRANDO O REPARANDO UNIDADES
