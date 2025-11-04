import { Mapa, type coordenada, type Casilla } from "./mapa/mapa"
import { tamanoCasilla, MAPA_CAPAS, mostrarCasillas, ocultarCasillas } from './mapa/mapaKonva.ts'
import { Accion, moverUnidad, OrdenUnidad, type direccion, generarDireccion } from "./orden.ts"
import Konva from "konva"
import type { UnidadCasilla } from "./unidades/unidades.ts"
import { getInfoCasillaVariables, actualizarInfo } from "./componentes/info_casilla.ts"

type coordVector = {x: 0, y:-1}|{x: -1, y:0}|{x: 1, y:0}|{x: 0, y:1}

// Cursor
import CursorSprite from './../public/img/huds/cursor_mapa.png'
const CursorKonva = new window.Image()
CursorKonva.src = CursorSprite

const { estrellaOutput, hpOutput, gasOutput, munPrincipalOutput, munSecundariaOutput, statusOutput } = getInfoCasillaVariables(document.querySelector('#casilla-info'))

// Interfaz para interactuar con el mapa
export class CursorMapaJuego {
  private coordSeleccionada: null|coordenada
  private casillaSeleccionada: null|Casilla
  private leftClick = true
  private rightClick = true

  private mapa:Mapa
  private layerUnidad:Konva.Layer
  private layerTerreno:Konva.Layer
  private layerCasillas:Konva.Layer
  private layerCursor:Konva.Layer

  private casillasMovimiento

  private cursorImg:Konva.Image
  // private layerGUI:Konva.Layer

  // private ordenActual = new OrdenUnidad({x: 0, y: 0}, [], new Accion('abordar', {}, new Promise(( res, rej ) => {
  //   if( 1 === 1 ){
  //     res({status: true, movimientos: ['abajo', 'derecha']})
  //   } else{
  //     // Hasta donde llego
  //     rej({status: false, movimientos: ['abajo']})
  //   }
  // })))
  private camino:coordVector[] = []

  constructor(mapa: Mapa){
    this.coordSeleccionada = null
    this.mapa = mapa
    this.layerUnidad = mapa.konvaStage?.getLayers().find((layer) => layer.getName() === MAPA_CAPAS.UNIDADES) as Konva.Layer
    this.layerTerreno = mapa.konvaStage?.getLayers().find((layer) => layer.getName() === MAPA_CAPAS.TERRENO) as Konva.Layer
    this.layerCasillas = mapa.konvaStage?.getLayers().find((layer) => layer.getName() === MAPA_CAPAS.CASILLAS) as Konva.Layer
    ocultarCasillas(this.layerCasillas)

    this.layerCursor = new Konva.Layer({ name: 'cursor' })
    this.cursorImg = new Konva.Image({
      name: `cursor_mapa`,
      x: 0, y: 0,
      width: tamanoCasilla * 1.33, height: tamanoCasilla * 1.33,
      image: CursorKonva,
    })
    this.cursorImg.listening(false)
    this.layerCursor.add(this.cursorImg)
    this.mapa.konvaStage?.add(this.layerCursor)

    // leftClickHandler
    this.mapa.agregarEventoClick((coord:coordenada) => {
      if( !this.leftClick ) return
      this.seleccionarCasilla(coord)
    }, tamanoCasilla)
    // rightClickHandler
    this.mapa.konvaStage?.on('contextmenu', (ev) => {
      ev.evt.preventDefault()
      if( !this.rightClick ) return
      if( this.rightClick ) this.cancelarUltimaAccion()
    })
    // hoverMouse/MouseMove
    this.mapa.konvaStage?.on('mousemove', (ev) => {
      // if se tiene abierto un menú (los botones tienen el evento de mouseover) return

      const pos = this.mapa.konvaStage?.getPointerPosition()
      if (!pos) return
      const coordHover = {x: Math.floor(pos.x / tamanoCasilla), y: Math.floor(pos.y / tamanoCasilla)}
      const casillaHover = this.mapa.obtenerCasilla(coordHover)
      if( casillaHover == null ) return
      
      
      // if hay unidad seleccionada en proceso de escoger camino y casillaHover es nueva en la ruta
      if( this.casillaSeleccionada?.getUnidad() != null && this.coordSeleccionada != null ){
        if( this.camino.length === 0 ){
          const coordVector = { x: ( this.coordSeleccionada.x - coordHover.x), y: ( this.coordSeleccionada.y - coordHover.y ) }
          // Math.abs( this.coordSeleccionada.x - coordHover.x) + Math.abs(this.coordSeleccionada.y - coordHover.y )
          const direccion = generarDireccion(coordVector)
          if( direccion != "ninguno" ) { 
            this.camino.push(direccion) 
          }
          // else { la coordenada generada no es posible }
        } else {
          this.camino[0]
          const coordVector = { x: ( this.camino[0] - coordHover.x), y: ( this.coordSeleccionada.y - coordHover.y ) }
          const direccion = generarDireccion(coordVector)
          if( direccion != "ninguno" ) { 
            this.camino.push(direccion) 
          }
          // else { la coordenada generada no es posible }
        }
        // añadir casilla de hover a la ruta
        // if costo total de movimiento es mayor al disponible (movilidad o gasolina)
          // recalcular camino
        // pintar camino
      } else{
        // Acomoda la imagen del cursor
        this.cursorImg.x(coordHover.x * tamanoCasilla)
        this.cursorImg.y(coordHover.y * tamanoCasilla)
  
        actualizarInfo({
          gasolina: casillaHover.getUnidad()?.gasActual,
          estrellas: casillaHover.getTerrenoObjeto()?.estrellasDefensa,
          hp: casillaHover.getUnidad()?.hp,
          municionesPrincipales: casillaHover.getUnidad()?.municiones?.principal,
          municionesSecundarias: casillaHover.getUnidad()?.municiones?.secundaria,
          status: casillaHover.getUnidad()?.estado
        },
          { estrellaOutput, hpOutput, gasOutput, munPrincipalOutput, munSecundariaOutput, statusOutput }
        )
        
      }

        
    
    })
    // this.mapa.agregarEventoHover(handleHoverMapa, tamanoCasilla)
    this.casillaSeleccionada = null

    this.ordenActual 
  }

  // Quitar parte asíncrona, va donde se ejecute la orden
  private async seleccionarCasilla(coord: coordenada):boolean{
    if( !this.coordSeleccionada ){
      const tempCasilla = this.mapa.obtenerCasilla(coord)
      if( tempCasilla == null ) return false
      
      if( tempCasilla.getUnidad() != null && tempCasilla.getUnidad()?.getTurnos() ){
        // this.seleccionarUnidad()
          this.casillaSeleccionada = this.mapa.obtenerCasilla(coord)
          this.coordSeleccionada = coord
          const coordSeleccionadas = this.mapa.obtenerCoordenadasMovimiento(this.mapa, this.coordSeleccionada, this.casillaSeleccionada?.getUnidad())
          mostrarCasillas(this.layerCasillas, coordSeleccionadas)
        return true
      } 
      // else if( tempCasilla.getTerrenoObjeto()?.esPropiedad && tempCasilla.getUnidad() == null ){
      //   // Si es tu propiedad y no tiene unidad encima
      //   console.log('Escogiste tu propiedad')
      //   // this.seleccionarPropiedad()
      //     // mostrarOpcionesPropiedad
      //   return true
      // } 
      else{
        return false
      }
    } else{
      const unidadSeleccionada = this.casillaSeleccionada?.getUnidad() as UnidadCasilla
      const spriteUnidad = this.layerUnidad.findOne(`#${unidadSeleccionada?.id}`) as Konva.Sprite
      if( spriteUnidad ){
        ocultarCasillas(this.layerCasillas)
        this.leftClick = false
        this.rightClick = false

        const movimientos:direccion[] = ['derecha', 'arriba', 'arriba', 'derecha']
        moverUnidad(this.coordSeleccionada, spriteUnidad, movimientos, tamanoCasilla, this.mapa).then(res => {
          console.log("Response: ", res)
          return true
        })
        .catch(() => {
          console.log('Movimiento interrumpido')
          // TO-DO: Agregar hud de click
          return false
        })
        .finally(() => {
          this.leftClick = true
          this.rightClick = true
          unidadSeleccionada.gastarTurno()
          this.deseleccionarCasilla()
        })
      }
    }
  }

  private deseleccionarCasilla(){
    console.log('Casilla deseleccionada')
    // Si se seleccionó una unidad
      this.coordSeleccionada = null
      this.casillaSeleccionada = null
      ocultarCasillas(this.layerCasillas)
      // Si se seleccionó una propiedad
      // ocultarMenuOpciones()
  }

  private cancelarUltimaAccion(){
    // preguntar si la última acción fue seleccionar una casilla
    // o escoger una opción de menú
    this.deseleccionarCasilla()
  }

  public limpiarCoordSeleccionada(){
    this.coordSeleccionada = null
  }
  public getCasillaSeleccionada(){
      return this.coordSeleccionada
  }

}

export class Camino{
  private coordOrigen:coordenada|null = null
  private coordenadas:coordenada[] = []
  constructor(){}

  public setCoordOrigen(coord:coordenada){
    this.coordOrigen = coord
  }
  public agregarCoordenada(coord:coordenada){
    // if no existe y es adyacente a la ultima casilla añadida
    if( this.coordOrigen != null ){
      if( this.coordenadas[(this.coordenadas.length)].x != coord.x && this.coordenadas[(this.coordenadas.length)].y != coord.y ){
        this.coordenadas.push(coord)
      }
      return true
    } else{
      return false
    }
  }

  private recalcularCamino(){

  }

  public limpiarCoordenadas(){
    this.coordenadas = []
  }
}