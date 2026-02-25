import Konva from 'konva'
// import { type SpriteConfig } from 'konva/lib/shapes/Sprite'
// import type { GroupConfig } from 'konva/lib/Group'
// import type { TextConfig } from 'konva/lib/shapes/Text'
import { ListaTerrenos, Terreno, type nombreTerreno } from '../mapa/terreno'
import type { ComandanteBase } from '../comandantes/ComandanteBase'
import type { nombreUnidad, categoriaUnidad, estado, municiones } from './unidadInfoBasica'
import { Matchups } from './matchups'
import { LibroMovilidad, type tipoMovimiento } from './tipoMovilidad'
import { getInfoBasica } from './unidadInfoBasica'
import { unidadTurnoShader } from '../mapa/shaders'
import type { Casilla } from '../mapa/mapa'

export const UnidadesNombres = ['infanteria','mecha','recon','tanqueLigero','tanqueMediano','neotanque','megatanque','apc','artilleria','cohetes','tanqueAntiaereo','misiles','piperunner','bCopter','tCopter','fighter','bomber','stealthFighter','blackBomb','lander','cruiser','submarino','battleship','carrier','blackBoat','motocicletas','lanchas','sniper']

const maxHp = 100

export class UnidadCasilla {
  #nombreLargo: string
  #nombreCorto: nombreUnidad
  #descripcion: string
  #categorias: categoriaUnidad[]
  #costo: number // Gold
  #rango: {minimo: number, extra: number}|null
  #movilidad: number
  #tipoMovimiento: tipoMovimiento
  #vision: number
  #maxGasolina!: number
  #consumoDiario: (estado:estado)=> number
  #atacarYMoverse: boolean
  #contraataque: number|null
  // #habilidadesEspeciales: habilidades[]
  #matchups: Matchups
  id: string // O debería ser el código del comandante jugable
  #propietario!: number|null
  #refComandante!: ComandanteBase // ¿Cambiar nombre a solo comandante?
  #hp!: number
  #municiones!: municiones|null
  #gasActual!: number
  #estado!: estado // status
  #turnos!: number
  // TO-FIX: #sprite tendrá que funcionar o ser declarado distinto
  #sprite?: Konva.Sprite|null // ¿Lo dejo?
  // TO-DO: Cambiar al nuevo tipo de objeto de sprite (creado en KonvaMapa)
  #unitKonvaGroup: Konva.Group|null = null
  // ¿Usar WeakMap o fábrica?
  // https://chatgpt.com/c/691b4330-b6c4-8328-a30a-28514b56e7fa
  #casilla: Casilla // Referencia de casilla

  constructor (
    nombreUnidad: nombreUnidad,
    { propietario, hp, municionesActuales, gasActual, estado, turnos }:
    { propietario: number, hp: number,
      municionesActuales: { principal: { actual: number|null }, secundaria?: {actual: number|null} }|null,
      gasActual?: number, estado: estado|null, turnos: number },
    refComandante: ComandanteBase,
    casilla: Casilla
  ){
    const infoBasica = getInfoBasica(nombreUnidad)
    if (infoBasica === null) throw new Error('Tipo de unidad invalida')
    // this.#habilidadesEspeciales = infoBasica.habilidadesEspeciales
    this.#matchups = infoBasica.matchups
    this.#nombreLargo = infoBasica.nombreLargo
    this.#nombreCorto = infoBasica.nombreCorto
    this.#descripcion = infoBasica.descripcion
    this.#categorias = infoBasica.categorias
    this.#costo = infoBasica.costo
    this.#rango = infoBasica.rango
    this.#movilidad = infoBasica.movilidad
    this.#tipoMovimiento = infoBasica.tipoMovimiento
    this.#vision = infoBasica.vision
    this.#consumoDiario = infoBasica.consumoDiario
    this.#contraataque = infoBasica.contraataque
    this.#atacarYMoverse = infoBasica.atacarYMoverse
    this.#sprite = infoBasica.sprite

    this.id = crypto.randomUUID()
    this.#casilla = casilla

    this.#setPropietario(propietario, refComandante)
    this.#setHP(hp)

    this.#setGasolina(gasActual, infoBasica.maxGasolina)
    this.#setMuniciones(municionesActuales, infoBasica.maxMuniciones)
    this.setEstado(estado)
    this.#setTurnos(turnos)
  }

  getCasilla = () => this.#casilla
  public setCasilla (casilla: Casilla){
    this.#casilla = casilla
  }

  public getPropietario (){
    return this.#propietario
  }

  #setPropietario (propietario: number, refComandante: ComandanteBase){
    this.#propietario = propietario
    this.#refComandante = refComandante
  }
  #setHP (hp: number){
    if ( hp < 1 ){
      console.error('El HP no puede ser menor a 1')
      this.#hp = 1
    } else if ( hp > maxHp ){
      console.error(`El HP no puede ser mayor a ${maxHp}`)
      this.#hp = maxHp
    } else {
      this.#hp = hp
    }
  }
  #setGasolina (gasActual:number|undefined, gasMaxima:number){
    this.#maxGasolina = gasMaxima
    // Por defecto, si no pones el dato, asigna el valor mas alto por defecto
    if (gasActual === undefined){
      this.#gasActual = gasMaxima
      return
    }

    this.#gasActual = gasActual
    if ( gasActual < 0 ){
      console.error('La gas actual actual no puede ser menor a 0')
      this.#gasActual = 0

    } else if ( gasActual > gasMaxima ){
      console.error(`La gas actual actual no puede ser mayor a gasMaxima: ${gasMaxima}`)
      this.#gasActual = gasMaxima
    } else {
      this.#gasActual = gasActual
    }
  }
  #setMuniciones (municionesActuales: { principal: {actual: number|null}, secundaria?: {actual: number|null} }|null, municionesBase: municiones|null){
    const munTemp = Object.assign({}, municionesBase)

    if ( munTemp != null ){
      if ( municionesActuales != null){
        if ( typeof municionesActuales.principal.actual === 'number' ){
          munTemp.principal.actual = Math.min(munTemp.principal.maxima, Math.max( municionesActuales.principal.actual, 0))
        }
        if ( munTemp?.secundaria != null ){
          if ( municionesActuales.secundaria != null && typeof municionesActuales.secundaria.actual === 'number' ){
            munTemp.secundaria.actual = Math.min(munTemp.secundaria.maxima, Math.max( municionesActuales.secundaria.actual, 0))
          }
        }
      }
    }

    this.#municiones = munTemp
  }
  #setTurnos (turnos: number|null){
    if (turnos != null){
      this.#turnos = Math.max(turnos, 0)
    } else {
      this.#turnos = 1
    }
  }

  public getHp (){
    return this.#hp
  }
  public getHpMultiplier (){
    return Math.ceil(this.#hp / 10)
  }
  public getMaxHP (){
    return maxHp
  }
  // costoReparacion: number, maxHp: number
  public repararUnidad (hp:number){
    this.#hp = Math.min((this.#hp + hp), maxHp)
    this.actualizarTextoHP()
    return this.#hp
  }
  public danarUnidad (dano:number){
    this.#hp -= dano
    this.actualizarTextoHP()
    return this.#hp // Si regresa 0 o menos, destruye la unidad
  }
  public restarTurno (turnos:number){
    this.#turnos = (this.#turnos - turnos) < 0 ? 0 : (this.#turnos - turnos)
    this.#aplicarShaderTurno()
  }
  public recuperarTurno (){
    this.#turnos++
    this.#aplicarShaderTurno()
  }
  #aplicarShaderTurno (){
    const spriteUnidad = this.#unitKonvaGroup?.findOne('.sprite-unidad') as Konva.Sprite
    if ( spriteUnidad != null ){
      unidadTurnoShader({ unidadSprite: spriteUnidad, turnos: this.#turnos })
    }
  }

  public getTurnos (){
    return this.#turnos
  }

  public getMaxMovimiento (){
    return Math.min(this.#movilidad, this.#gasActual)
  }

  setUnitKonvaGroup (unitKonvaGroupConf: Konva.Group){
    // if( this.unitKonvaGroup instanceof Konva.Group){
    //   console.log('Ya existe el grupo')
    //   return
    // }

    this.#unitKonvaGroup = unitKonvaGroupConf
  }
  getUnitKonvaGroup (){
    return this.#unitKonvaGroup
  }
  actualizarTextoHP (){
    if ( this.#unitKonvaGroup != null && !this.#unitKonvaGroup.hpTexto ){
      this.#unitKonvaGroup.hpTexto = new Konva.Text({
        name: 'textoHp',
        text: String(this.hp),
        fontSize: 14,
        fill: 'white',
        x: 0, y: 24
      })
    } else {
      this.#unitKonvaGroup?.hpTexto.setAttr('text', String(this.#hp))
    }
  }

  public gastarTurno (): void {
    this.restarTurno(1)
    if ( this.getTurnos() <= 0 ){
      // Aplicar filtro de "apagado", para dar a entender que la unidad ya no se puede escoger
      // this.sprite?.filters([Konva.Filters.Contrast(img)])
    }
  }

  public gastarGasolinaTerreno (tipoTerreno:nombreTerreno){
    // Esto debería cambiar a una función que regrese el valor
    // O directamente que cada unidad tenga su propia lista de costos de movimiento
    const costosMovimientos:Terreno|null = ListaTerrenos[tipoTerreno]?.costosMovimientos
    if ( costosMovimientos ){
      const gasConsumida = costosMovimientos[this.#tipoMovimiento]
      if ( gasConsumida ){
        this.#gasActual -= gasConsumida
      }
    }
  }

  getMunicionesActuales (){
    return this.#municiones
  }
  getMunicionPrincipal (){
    if (this.#municiones?.principal){
      return this.#municiones.principal
    } else {
      return null
    }
  }
  getMunicionPrincipalString () {
    if (this.#municiones?.principal){
      return `${this.#municiones.principal.actual}/${this.#municiones.principal.maxima}`
    } else {
      return ''
    }
  }
  getMunicionSecundaria (){
    if (this.#municiones?.secundaria){
      return this.#municiones.secundaria
    } else {
      return null
    }
  }
  getMunicionSecundariaString () {
    if (this.#municiones?.secundaria){
      return `${this.#municiones.secundaria.actual}/${this.#municiones.secundaria.maxima}`
    } else {
      return ''
    }
  }
  getGasActual () {
    return this.#gasActual
  }
  getGasString () {
    return `${this.#gasActual}/${this.getMaxGasolina}`
  }

  // TODO: Aceptar parametros de gasolina y de municiones
  reponerUnidad (){
    this.#gasActual = this.#maxGasolina
    if ( this.#municiones != null ){
      if ( this.#municiones.principal != null ){
        this.#municiones.principal.actual = this.#municiones.principal.maxima
      }
      if ( this.#municiones.secundaria != null ){
        this.#municiones.secundaria.actual = this.#municiones.secundaria.maxima
      }
    }
  }

  setEstado (estado: estado|null) {
    // O que no es un posible estado
    if (estado == null ){
      this.#estado = 'normal'
    } else {
      this.#estado = estado
    }
  }
  getEstado () {
    return this.#estado
  }
  getMovilidad (): number {
    return this.#movilidad
  }
  getLibroMovilidad (){
    return LibroMovilidad[this.#tipoMovimiento]
  }
  getLibroMovilidadTerreno (tipo: nombreTerreno){
    return LibroMovilidad[this.#tipoMovimiento][tipo]
  }

  getNombreLargo (){
    return this.#nombreLargo
  }
  getNombreCorto (){
    return this.#nombreCorto
  }
  getDescripcion (){
    return this.#descripcion
  }
  getCategorias (){
    return this.#categorias
  }
  getCosto (){
    return this.#costo
  }
  getRango (){
    return this.#rango
  }
  getRangoMinimo (){
    return this.#rango?.minimo ? this.#rango?.minimo : null
  }
  getRangoExtra (){
    return this.#rango?.extra ? this.#rango?.extra : null
  }
  getRangoMaximo (){
    return this.#rango ? (this.#rango.minimo + this.#rango.extra) : null
  }
  getTipoMovimiento (){
    return this.#tipoMovimiento
  }
  getVision (){
    return this.#vision
  }
  getMaxGasolina (){
    return this.#maxGasolina
  }
  getConsumoDiario ( estado: estado ){
    return this.#consumoDiario( estado )
  }
  getAtacarYMoverse (){
    return this.#atacarYMoverse
  }
  getUnitMatchupList (){
    return this.#matchups
  }
  getUnitMatchup (unidadDefensivaNombre: nombreUnidad, tipo: 'principal'|'secundaria'){
    if ( this.#matchups[tipo] == null )
      return null

    return this.#matchups[tipo][unidadDefensivaNombre]
  }
  getContraataque (){
    return this.#contraataque
  }

  getAccionesDisponibles (){
    // Hacer verificacion de que acciones puede retornar
    // Dependiendo el contexto
    return 'Esperar'
  }

  getSprite (){
    return this.#sprite
  }
  // efecto: congelado, paralizado,
  // actualizarIndicadores(faltaGas: boolean, faltaMuniciones: boolean){
  //   if( faltaGas && faltaMuniciones ){
  //     this.unitKonvaGroup?.indicadores = 'Animación falta gas y municiones'
  //     return
  //   }
  //   if( faltaGas ){
  //     this.unitKonvaGroup?.indicadores = 'Animación falta gas'
  //     return
  //   }
  //   if( faltaMuniciones ){
  //     this.unitKonvaGroup?.indicadores = 'Animación falta municiones'
  //     return
  //   }
  // }

  // Mover funcion a Mapa

  getRefComandante (){
    return this.#refComandante
  }
}

export type UnidadSimple = {
  nombreUnidad: nombreUnidad,
  id: string, // O debería ser el código del comandante jugable
  propietario: number|null,
  refComandante: ComandanteBase|null, // ¿Cambiar nombre a solo comandante?
  hp: number,
  municiones: municiones|null,
  gasActual: number,
  estado: estado, // status
  turnos: number
}

// export class UnidadSimple {
//   nombreCorto: nombreUnidad
//   id: string // O debería ser el código del comandante jugable
//   propietario: number|null
//   refComandante: ComandanteBase|null // ¿Cambiar nombre a solo comandante?
//   hp: number
//   municiones: municiones|null
//   gasActual: number
//   estado: estado // status
//   turnos: number

//   constructor (){

//   }
// }
