import type { Mapa, coordenada, Casilla } from "./mapa/mapa"
import { tamanoCasilla, MAPA_CAPAS } from './mapa/mapaKonva.ts'
import { moverUnidad } from "./orden.ts"
import Konva from "konva"

// Interfaz para interactuar con el mapa
export class CursorMapaJuego {
  private coordSeleccionada: null|coordenada
  private casillaSeleccionada: null|Casilla
  private leftClick = true
  private rightClick = true

  private mapa:Mapa
  private layerUnidad:Konva.Layer
  private layerTerreno:Konva.Layer
  // private layerGUI:Konva.Layer

  constructor(mapa: Mapa){
    this.coordSeleccionada = null
    this.mapa = mapa
    this.layerUnidad = mapa.konvaStage?.getLayers().find((layer) => layer.getName() === MAPA_CAPAS.UNIDADES) as Konva.Layer
    this.layerTerreno = mapa.konvaStage?.getLayers().find((layer) => layer.getName() === MAPA_CAPAS.TERRENO) as Konva.Layer

    this.mapa.agregarEventoClick((coord:coordenada) => {
      if( !this.leftClick ) return
      this.seleccionarCasilla(coord)
    }, tamanoCasilla)
    this.mapa.konvaStage?.on('contextmenu', (ev) => {
      ev.evt.preventDefault()
      if( !this.rightClick ) return
      if( this.rightClick ) this.cancelarUltimaAccion()
    })
    // this.mapa.agregarEventoHover(handleHoverMapa, tamanoCasilla)
    this.casillaSeleccionada = null
  }

  // Quitar parte asíncrona, va donde se ejecute la orden
  private async seleccionarCasilla(coord: coordenada):boolean{
    if( !this.coordSeleccionada ){
      const tempCasilla = this.mapa.obtenerCasilla(coord)
      if( tempCasilla == null ) return false
      
      if( tempCasilla.unidad != null ){
        // this.seleccionarUnidad()
          // pintar casillas destino
          this.coordSeleccionada = coord
          this.casillaSeleccionada = this.mapa.obtenerCasilla(coord)
          console.log('Casilla seleccionada: ', this.casillaSeleccionada)

        return true
      } else if( tempCasilla.getTipo()?.esPropiedad ){
        // this.seleccionarPropiedad()
          // mostrarOpcionesPropiedad
        return true
      } else{
        return false
      }
    } else{
      const spriteUnidad = this.layerUnidad.findOne(`#${this.casillaSeleccionada?.unidad.id}`)
      if( spriteUnidad ){
        // despintar casillas
        this.leftClick = false
        this.rightClick = false
        moverUnidad(this.coordSeleccionada, spriteUnidad, ['derecha', 'arriba', 'arriba', 'derecha'], tamanoCasilla, this.mapa).then(res => {
          console.log("Response: ", res)
          return true
        })
        .catch(() => {
          console.log('Movimiento interrumpido')
          return false
        })
        .finally(() => {
          this.leftClick = true
          this.rightClick = true
          this.deseleccionarCasilla()
        })
      }
    }
  }

  private deseleccionarCasilla(){
    console.log('Casilla deseleccionada')
    // despintar casillas
    // Si se seleccionó una unidad
      this.coordSeleccionada = null
      this.casillaSeleccionada = null
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