import Konva from 'konva'
import { type ComandanteBase } from '../comandantes/ComandanteBase'
import { UnidadBase, type UnidadBaseTipo } from './unidadBase'
import { type municiones, type estado } from './unidadInfoBasica'
import { type Casilla } from '../mapa/casilla'
import { unidadTurnoShader } from '../mapa/shaders'
import { type spriteUnidad } from './unidadesSpriteConf'
// import { type SpriteConfig } from 'konva/lib/shapes/Sprite'
// import type { GroupConfig } from 'konva/lib/Group'
// import type { TextConfig } from 'konva/lib/shapes/Text'

const maxHp = 100

export type datosActuales = {
  hp: number,
  municiones: municiones
  gasActual: number
  estado: estado
  turnos: number
  propietario: number
  casilla: Casilla
  comandante: ComandanteBase
}

export abstract class UnidadCasilla extends UnidadBase {
  #hp!: number
  #municiones!: municiones
  #gasActual!: number
  #estado!: estado
  #turnos!: number
  #propietario!: number
  #comandante!: ComandanteBase
  #casilla!: Casilla // Referencia de casilla
  #unitKonvaGroup: Konva.Group|null = null
  // ¿Usar WeakMap o fábrica?
  // https://chatgpt.com/c/691b4330-b6c4-8328-a30a-28514b56e7fa

  constructor (
    baseUnidad: UnidadBaseTipo,
    datosActuales: datosActuales
    // sprite|Konva.Group
  ){
    super(baseUnidad)
    this.#setHP(datosActuales.hp)
    // Cambiar segundo parámetro
    this.#setMuniciones(datosActuales.municiones, datosActuales.municiones)
    this.#setGasolina(datosActuales.gasActual)
    this.setEstado(datosActuales.estado)
    this.#setTurnos(datosActuales.turnos)
    this.#setPropietario(datosActuales.propietario, datosActuales.comandante)
    this.setCasilla(datosActuales.casilla)
  }

  // SECCION HP
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

  // SECCION MUNICIONES
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

  // SECCION GASOLINA
  #setGasolina (gasActual:number|undefined){
    const gasMaxima = this.getMaxGasolina()

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
  getGasActual () {
    return this.#gasActual
  }
  public gastarGasolinaTerreno (tipoTerreno:nombreTerreno){
    const gasConsumida = LibroMovilidad[this.#tipoMovimiento][tipoTerreno]
    if ( gasConsumida ){
      this.#gasActual -= gasConsumida
    } else {
      console.error('La unidad no puede avanzar por ese terreno')
    }
  }
  getGasString () {
    return `${this.#gasActual}/${this.getMaxGasolina}`
  }

  // SECCION ESTADO
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

  // SECCION TURNOS
  public getTurnos (){
    return this.#turnos
  }
  #setTurnos (turnos: number|null){
    if (turnos != null){
      this.#turnos = Math.max(turnos, 0)
    } else {
      this.#turnos = 1
    }
  }
  public restarTurno (turnos:number){
    this.#turnos = (this.#turnos - turnos) < 0 ? 0 : (this.#turnos - turnos)
    this.#aplicarShaderTurno()
  }
  public recuperarTurno (){
    this.#turnos++
    this.#aplicarShaderTurno()
  }
  public gastarTurno (): void {
    this.restarTurno(1)
    if ( this.getTurnos() <= 0 ){
      // Aplicar filtro de "apagado", para dar a entender que la unidad ya no se puede escoger
      // this.sprite?.filters([Konva.Filters.Contrast(img)])
    }
  }

  // SECCION PROPIETARIO
  public getPropietario (){
    return this.#propietario
  }
  #setPropietario (propietario: number, comandante: ComandanteBase){
    this.#propietario = propietario
    this.#comandante = comandante
  }

  // SECCION COMANDANTE
  getComandante (){
    return this.#comandante
  }

  // SECCION CASILLA
  getCasilla = () => this.#casilla
  public setCasilla (casilla: Casilla){
    this.#casilla = casilla
  }

  // SECCION SPRITE/KONVA
  abstract generarSpriteInfo () : spriteUnidad
  #aplicarShaderTurno (){
    const spriteUnidad = this.#unitKonvaGroup?.findOne('.sprite-unidad') as Konva.Sprite
    if ( spriteUnidad != null ){
      unidadTurnoShader({ unidadSprite: spriteUnidad, turnos: this.#turnos })
    }
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
  // efecto: congelado, paralizado
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

  // SECCION ACCIONES (STATE MANAGER)
  // TODO: Hacer verificacion de que acciones puede retornar
  // Dependiendo el contexto. Hacerlo abstract
  getAccionesDisponibles (contexto: {
    konvaMapa: any,
    bloquearInteracciones: () => void,
    desbloquearInteracciones: () => void,
    moverUnidad: Function,
    ultimaCasillaSeleccionada: any,
    camino: any,
    mapa: any,
    unidadSeleccionada: any,
    ordenUnidad: any,
    deseleccionarCasilla: () => void
  }) {
    // Por ahora solo acción Esperar
    return [{
      nombre: 'Esperar',
      clickHandler: () => {
        console.log('Esperar...')
        contexto.konvaMapa.ocultarCasillasCuadros(contexto.konvaMapa.getCapaCasillas())
        contexto.bloquearInteracciones()

        contexto.moverUnidad(
          contexto.ultimaCasillaSeleccionada,
          contexto.camino.getDirecciones(),
          contexto.konvaMapa.getTamanoCasilla(),
          contexto.mapa
        )
          .then(() => true)
          .catch(() => {
            console.log('Movimiento interrumpido')
            // TO-DO: Agregar hud de click
            return false
          })
          .finally(() => {
            console.log('Camino: ', contexto.camino.getCamino())
            contexto.desbloquearInteracciones()
            contexto.unidadSeleccionada.gastarTurno()
            contexto.camino.limpiarCoordenadasCamino()
            // contexto.ordenUnidad.limpiarOrden()
            contexto.unidadSeleccionada = null
            contexto.deseleccionarCasilla()
          })
      }
    }]
  }

  // MISCELANEO
  public getMaxMovimiento (){
    return Math.min(this.getMovilidad(), this.#gasActual)
  }
  getEquipo (){
    return this.#comandante.getEquipo()
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
}
