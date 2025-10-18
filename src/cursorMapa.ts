import type { Mapa, coordenada, Casilla } from "./mapa/mapa"
import { tamanoCasilla, MAPA_CAPAS } from './mapa/mapaKonva.ts'
import { moverUnidad } from "./orden.ts"
import Konva from "konva"

// Interfaz para interactuar con el mapa
export class CursorMapaJuego {
  private coordSeleccionada: null|coordenada
  private casillaSeleccionada: null|Casilla
  private clickHabilitado = false

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
      this.setCasillaSeleccionada(coord)
    }, tamanoCasilla)
    // this.mapa.agregarEventoHover(handleHoverMapa, tamanoCasilla)
    // this.mapa.agregarEventoClickDerecho(handleClickDerechoMapa, tamanoCasilla)
    this.casillaSeleccionada = null
  }

  private async setCasillaSeleccionada(coord: coordenada):boolean{
    // if( !this.clickHabilitado ) return false

    if( !this.coordSeleccionada ){
      this.coordSeleccionada = coord
      this.casillaSeleccionada = this.mapa.obtenerCasilla(coord)
      console.log('Casilla seleccionada: ', this.casillaSeleccionada)
      return true
    } else{
      const spriteUnidad = this.layerUnidad.findOne(`#${this.casillaSeleccionada?.unidad.id}`)
      if( spriteUnidad ){
        moverUnidad(this.coordSeleccionada, spriteUnidad, ['arriba', 'arriba', 'derecha', 'derecha'], tamanoCasilla, this.mapa)
        .then(res => {
          console.log("Response: ", res)
          return true
        })
        .catch(() => {
          console.log('Movimiento interrumpido')
          return false
        })
        .finally(() => {
          this.coordSeleccionada = null
          this.casillaSeleccionada = null
          console.log('Casilla deseleccionada: ')

        })
      }
    }
  }

  public limpiarCoordSeleccionada(){
    this.coordSeleccionada = null
  }
  public getCasillaSeleccionada(){
      return this.coordSeleccionada
  }

}

function handleClickMapa(coordenada:coordenada, clickHabilitado:boolean){
  if( !clickHabilitado ) return

  const casillaSeleccionada = Partida.getMapa().obtenerCasilla(coordenada)
  if( !casillaSeleccionada ){
    return
  }

  // if( unidadSeleccionada ){
  //   controlesHabilitados = false
  //   const spriteUnidad = layerUnidad.findOne(`#${unidadSeleccionada.id}`) as Konva.Node
  //   new Konva.Tween({
  //   node: spriteUnidad,
  //   duration: .3,
  //   x: tamanoCasilla, y: tamanoCasilla,
  //   // easing: Konva.Easings.BounceEaseOut,
  //   onFinish: ()=>{
  //       controlesHabilitados = true
  //       unidadSeleccionada = null
  //   }
  //   }).play()
  //   // spriteUnidad.setAttrs({x: tamanoCasilla, y: tamanoCasilla})
  //   // spriteUnidad.cache({
  //   //     pixelRatio: 1,
  //   //     imageSmoothingEnabled: false
  //   // })
  //   // Partida.getMapa().konvaStage?
  // } else{
  //   if( casillaSeleccionada.unidad != null ) {
  //     unidadSeleccionada = casillaSeleccionada.unidad
  //     console.log( 'Unidad seleccionada: ', unidadSeleccionada )
  //   }
  // }
}