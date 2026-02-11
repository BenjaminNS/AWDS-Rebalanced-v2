import { Mapa, type coordenada, type Casilla } from './mapa/mapa'
// import { Accion, moverUnidad, OrdenUnidad } from './orden.ts'
import { moverUnidad } from './orden.ts'
import Konva from 'konva'
import { UnidadCasilla } from './unidades/unidades.ts'
import { Camino } from './camino.ts'
import type { KonvaMapa } from './mapa/KonvaMapa.ts'
import accionInvalidaSFX from '/audio/sfx/accion_invalida.wav'
const accionInvalidaSFX_player = new window.Audio()
accionInvalidaSFX_player.src = accionInvalidaSFX

// Cursor
import CursorSprite from '/img/huds/cursor_mapa.png'
import type { Jugador } from './jugador.ts'
const CursorKonva = new window.Image()
CursorKonva.src = CursorSprite

type fnSetters = {
  setInfoCasilla: Function,
  setCasillaHover: Function,
  setCasillaSeleccionada: Function,
  setJugadorActual: Function,
  setPropiedadSeleccionada: Function,
  setUnidadesCompra: Function
}
type fnGetter = {
  getJugadorActual: ()=>Jugador,
  getTurnoActual: ()=>number
}

// Interfaz para interactuar con el mapa
export class CursorMapaJuego {
  private coordSeleccionada: null|coordenada
  private casillaSeleccionada: null|Casilla
  #leftClick = true
  #rightClick = true
  private camino = new Camino()

  private mapa:Mapa
  #konvaMapa:KonvaMapa
  private layerCursor:Konva.Layer

  #fnReactSetters: fnSetters
  #fnGetters: fnGetter
  private cursorImg:Konva.Image
  // #reactSetters:Function[]
  // private layerGUI:Konva.Layer

  // private ordenActual = new OrdenUnidad({x: 0, y: 0}, [], new Accion('abordar', {}, new Promise(( res, rej ) => {
  //   if( 1 === 1 ){
  //     res({status: true, movimientos: ['abajo', 'derecha']})
  //   } else{
  //     // Hasta donde llego
  //     rej({status: false, movimientos: ['abajo']})
  //   }
  // })))

  constructor (mapa: Mapa, konvaMapa: KonvaMapa, fnSetters: fnSetters, fnGetters: fnGetter){

    this.#fnReactSetters = fnSetters
    this.#fnGetters = fnGetters
    this.#konvaMapa = konvaMapa

    this.coordSeleccionada = null
    this.mapa = mapa
    this.#konvaMapa.ocultarCasillasCuadros(this.#konvaMapa.getCapaCasillas())

    this.camino.setLayerCamino(this.#konvaMapa.getCapaCamino())

    this.layerCursor = new Konva.Layer({ name: 'cursor' })
    this.cursorImg = new Konva.Image({
      name: 'cursor_mapa',
      x: 0, y: 0,
      width: this.#konvaMapa.getTamanoCasilla() * 1.33, height: this.#konvaMapa.getTamanoCasilla() * 1.33,
      image: CursorKonva
    })
    this.cursorImg.listening(false)
    this.layerCursor.add(this.cursorImg)
    this.#konvaMapa.getKonvaStage().add(this.layerCursor)

    // leftClickHandler
    this.#konvaMapa.agregarEventoClick((coord:coordenada) => {
      if ( !this.#leftClick ) return
      this.seleccionarCasilla(coord)
    }, this.#konvaMapa.getTamanoCasilla())
    // rightClickHandler
    this.#konvaMapa.getKonvaStage()?.on('contextmenu', (ev) => {
      ev.evt.preventDefault()
      if ( !this.#rightClick ) return
      if ( this.#rightClick ) this.cancelarUltimaAccion()
    })
    // hoverMouse/MouseMove
    this.#konvaMapa.getKonvaStage()?.on('mousemove', () => {
      // if se tiene abierto un menú (los botones tienen el evento de mouseover) return
      const pos = this.#konvaMapa.getKonvaStage()?.getPointerPosition()
      if (!pos) return
      const coordHover = { x: Math.floor(pos.x / this.#konvaMapa.getTamanoCasilla()), y: Math.floor(pos.y / this.#konvaMapa.getTamanoCasilla()) }
      const casillaHover = this.mapa.getCasilla(coordHover)
      if ( casillaHover == null ) return

      // if hay unidad seleccionada en proceso de escoger camino y casillaHover es nueva en la ruta
      if ( this.casillaSeleccionada?.getUnidad() != null && this.coordSeleccionada != null ){
        this.camino.agregarCoordenada(coordHover)
      } else {
        // Solo debería acomodar la imagen del cursor cuando no hay algún menú abierto en el canva
        this.cursorImg.x(coordHover.x * this.#konvaMapa.getTamanoCasilla())
        this.cursorImg.y(coordHover.y * this.#konvaMapa.getTamanoCasilla())

        this.#fnReactSetters.setInfoCasilla({
          estrellas: casillaHover.getTerrenoObjeto()?.estrellasDefensa,
          gasActual: casillaHover.getUnidad()?.getGasActual(),
          gasMaxima: casillaHover.getUnidad()?.getMaxGasolina(),
          hp: casillaHover.getUnidad()?.getHp(),
          municionesPrincipales: casillaHover.getUnidad()?.getMunicionPrincipal(),
          municionesSecundarias: casillaHover.getUnidad()?.getMunicionSecundaria(),
          status: casillaHover.getUnidad()?.getEstado(),
          terreno: casillaHover.getTipo()
        })
      }

    })
    // this.mapa.agregarEventoHover(handleHoverMapa, tamanoCasilla)
    this.casillaSeleccionada = null
  }

  // Quitar parte asíncrona, va donde se ejecute la orden
  private async seleccionarCasilla (coord: coordenada):boolean{
    if ( !this.coordSeleccionada ){
      const tempCasilla = this.mapa.getCasilla(coord)
      if ( tempCasilla == null ) return false

      if ( tempCasilla.getUnidad() != null && tempCasilla.getUnidad()?.getTurnos() ){
        this.coordSeleccionada = coord
        this.casillaSeleccionada = this.mapa.getCasilla(coord) as Casilla
        this.camino.setCoordenadasDisponibles(this.mapa.obtenerCoordenadasMovimiento(this.mapa, coord, this.casillaSeleccionada?.getUnidad()))
        this.camino.setMaxCosto(this.casillaSeleccionada.getUnidad()?.getMaxMovimiento() ?? 0)
        this.camino.agregarCoordenada(coord) // Se supone que es la primera coordenada

        this.#konvaMapa.mostrarCasillasCuadros(this.camino.getCoordenadasDisponibles())
        return true

      // Si es tu propiedad y no tiene unidad encima
      } else if ( tempCasilla.getTerrenoObjeto()?.propiedad != null && tempCasilla.getUnidad() == null
      && this.#fnGetters.getTurnoActual() === tempCasilla.getPropietario() ){
        const unidadesCompraDatos = this.#fnGetters.getJugadorActual().getComandantesJugador()[0].getUnidadesCompraDatos(tempCasilla.getTipo(), this.mapa.generarUnidadCasilla(new UnidadCasilla('infanteria', { propietario: this.#fnGetters.getTurnoActual(), estado: 'normal', gasActual: 40, municiones: { principal: 6 }, hp: 100, turnos: 0 }, null)))
        if ( unidadesCompraDatos.length > 0 ){
          console.log('Escogiste tu propiedad')
          this.#fnReactSetters.setPropiedadSeleccionada(true)
          this.#fnReactSetters.setUnidadesCompra(unidadesCompraDatos)
          return true
        } else {
          return false
        }
      }
      else {
        return false
      }
    } else {
      const unidadSeleccionada = this.casillaSeleccionada?.getUnidad() as UnidadCasilla
      if ( unidadSeleccionada.getPropietario() !== this.#fnGetters.getTurnoActual() ){
        accionInvalidaSFX_player.play()
        return false
      }
      const spriteUnidad = this.#konvaMapa.getCapaUnidad().findOne(`#${unidadSeleccionada?.id}`) as Konva.Sprite

      if ( spriteUnidad ){
        this.#konvaMapa.ocultarCasillasCuadros(this.#konvaMapa.getCapaCasillas())

        this.#leftClick = false
        this.#rightClick = false

        moverUnidad(this.coordSeleccionada, spriteUnidad, this.camino.getDirecciones(), this.#konvaMapa.getTamanoCasilla(), this.mapa).then(res => {
          console.log('Response: ', res)
          return true
        })
          .catch(() => {
            console.log('Movimiento interrumpido')
            // TO-DO: Agregar hud de click
            return false
          })
          .finally(() => {
            console.log('Camino: ', this.camino.getCamino())
            this.#leftClick = true
            this.#rightClick = true
            unidadSeleccionada.gastarTurno()
            this.camino.limpiarCoordenadasCamino()
            this.deseleccionarCasilla()
          })
      }
    }

    return true
  }

  private deseleccionarCasilla (){
    // Si se seleccionó una propiedad
    // ocultarMenuOpciones()
    // Si se seleccionó una unidad
    this.coordSeleccionada = null
    this.casillaSeleccionada = null
    this.#konvaMapa.ocultarCasillasCuadros(this.#konvaMapa.getCapaCasillas())
    this.#konvaMapa.ocultarCasillasCuadros(this.#konvaMapa.getCapaCamino())
  }

  private cancelarUltimaAccion (){
    // preguntar si la última acción fue seleccionar una casilla
    // o escoger una opción de menú
    this.deseleccionarCasilla()
  }

  public limpiarCoordSeleccionada (){
    this.coordSeleccionada = null
  }
  public getCasillaSeleccionada (){
    return this.coordSeleccionada
  }

}
