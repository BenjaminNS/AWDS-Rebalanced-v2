import Konva from 'konva'
import terrainTilesheets from '/img/terrenos/terrains_tilesheets.png'
const TerrainTilesheets = new window.Image()
TerrainTilesheets.src = terrainTilesheets
import caminoInicio from '/img/huds/caminos_tilesheet.png'
const CaminoSprite = new window.Image()
CaminoSprite.src = caminoInicio
import { listaPaises } from '../comandantes/paises.ts'
import type { coordenada, Casilla, Mapa } from './mapa.ts'
import type { TextConfig } from 'konva/lib/shapes/Text'
import { obtenerColorTerreno, aplicarTinteUnidad } from './shaders.ts'

export const COLORES_INTERACCION = {
  MOVIMIENTO: '#345bc788',
  ATAQUE: '#c7343488'
}
export const MAPA_CAPAS = {
  TERRENO: 'terreno',
  CASILLAS: 'casillas',
  CAMINO: 'camino',
  UNIDADES: 'unidades'
}
type CAPAS_KONVA = {
  layerTerreno:Konva.Layer|null,
  layerCamino:Konva.Layer|null,
  layerUnidad:Konva.Layer|null,
  layerCasillas:Konva.Layer|null
}

export class KonvaMapa{
  #tamanoCasilla:number
  #standardSpriteSize = 16
  #konvaStage:Konva.Stage
  #colorFondoMapa = '#D5EF00'
  #capas:CAPAS_KONVA = {
    layerCamino:null,
    layerCasillas:null,
    layerTerreno:null,
    layerUnidad:null
  }

  // Escoger el modo de generación de mapa (datos, aleatorio, relleno)
  constructor (tamanoCasilla: number, mapa: Mapa, idContenedor: string){
    this.#tamanoCasilla = tamanoCasilla
    const { filas, columnas } = mapa.dimensiones

    this.#konvaStage = new Konva.Stage({
      container: idContenedor,
      width: columnas * tamanoCasilla,
      height: filas * tamanoCasilla
    })

    this.#crearCapaTerreno(filas, columnas, mapa)
    this.#crearCapaCasillas(filas, columnas)
    this.#crearCapaCaminos(filas, columnas)
    this.#crearCapaUnidades(filas, columnas, mapa)

    this.#konvaStage.getLayers().forEach(l => {
      l.getContext()._context.imageSmoothingEnabled = false
    })
  }

  // CAPAS
  #crearCapaTerreno (filas: number, columnas: number, mapa: Mapa){
    this.#capas.layerTerreno = new Konva.Layer({ name: MAPA_CAPAS.TERRENO })
    this.#capas.layerTerreno.getContext()._context.imageSmoothingEnabled = false

    this.#capas.layerTerreno.add(new Konva.Rect({
      width: columnas * this.#tamanoCasilla,
      height: filas * this.#tamanoCasilla,
      fill: this.#colorFondoMapa
    }))
    this.#konvaStage.add(this.#capas.layerTerreno)

    for (let y = 0; y < filas; y++) {
      for (let x = 0; x < columnas; x++) {
        const tileCasilla = this.generarSpriteTerreno(
          mapa.casillas[( ( y * columnas ) + x )],
          { x: x, y: y },
          mapa
        )

        mapa.casillas[( ( y * columnas ) + x )].sprite = tileCasilla
        this.#capas.layerTerreno.add(tileCasilla)
      }
    }
  }
  #crearCapaCasillas (filas: number, columnas: number){
    this.#capas.layerCasillas = new Konva.Layer({ name: MAPA_CAPAS.CASILLAS })
    for (let y = 0; y < filas; y++) {
      for (let x = 0; x < columnas; x++) {
        const cuadroCasilla = new Konva.Rect({
          x: x * this.#tamanoCasilla,
          y: y * this.#tamanoCasilla,
          width: this.#tamanoCasilla,
          height: this.#tamanoCasilla,
          fill: COLORES_INTERACCION.MOVIMIENTO,
          stroke: '#00000033',
          // strokeWidth: (tamanoCasilla * .01)
          name: `cuadro_${x}_${y}`,
          id: `cuadro_${x}_${y}`
        })

        this.#capas.layerCasillas.add(cuadroCasilla)
      }
    }

    this.#konvaStage.add(this.#capas.layerCasillas)
    this.#capas.layerCasillas.hide()
  }
  #crearCapaCaminos (filas: number, columnas: number){
    this.#capas.layerCasillas = new Konva.Layer({ name: MAPA_CAPAS.CAMINO })
    for (let y = 0; y < filas; y++) {
      for (let x = 0; x < columnas; x++) {
        const spriteTerreno = new Konva.Image({
          x: x * this.#tamanoCasilla + this.#tamanoCasilla / 2,
          y: y * this.#tamanoCasilla + this.#tamanoCasilla / 2,
          width: this.#tamanoCasilla, height: this.#tamanoCasilla,
          image: CaminoSprite,
          strokeWidth: 0,
          offset: { x: (this.#tamanoCasilla / 2), y: (this.#tamanoCasilla / 2) },
          id: `camino_${x}_${y}`
        })

        this.#capas.layerCamino.add(spriteTerreno)
      }
    }

    this.#konvaStage.add(this.#capas.layerCamino)
    this.#capas.layerCamino.hide()
  }
  #crearCapaUnidades (filas: number, columnas: number, mapa: Mapa){
    this.#capas.layerUnidad = new Konva.Layer({ name: MAPA_CAPAS.UNIDADES })

    for (let y = 0; y < filas; y++) {
      for (let x = 0; x < columnas; x++) {
        if ( mapa.casillas[( ( y * columnas ) + x )].getUnidad() != null ){
          const spriteUnidad = generarSpriteUnidad(
            mapa.casillas[( ( y * columnas ) + x )],
            { x: x, y: y }
          )
          this.#capas.layerUnidad.add(spriteUnidad)
        }
      }
    }

    this.#konvaStage.add(this.#capas.layerUnidad)
  }

  // GENERAR SPRITES TERRENO/UNIDADES
  generarSpriteUnidad (casilla: Casilla, coordenada: coordenada):Konva.Group|null{
    if (casilla.getUnidad() == null){
      console.error('Esta casilla no tiene una unidad', casilla)
      return null
    }

    const { x, y } = coordenada
    const unitKonvaGroup = new Konva.Group({
      x: (x * this.#tamanoCasilla),
      y: y * this.#tamanoCasilla,
      name: casilla.getUnidad()?.id,
      id: casilla.getUnidad()?.id
    })

    const unitSprite = casilla.getUnidad()?.getSprite().clone()
    unitSprite.setAttrs({
      x: 0, y: 0,
      name: 'sprite-unidad'
    })
    const escala = this.#tamanoCasilla / 16
    if (casilla.getUnidad()?.getPropietario() % 2 === 0){
      unitSprite.scale({ x: escala, y: escala })
    } else {
      unitSprite.offsetX( this.#tamanoCasilla / 2 )
      unitSprite.scale({ x: (escala * -1), y: escala })
    }
    // Filtro sprite unidad
    if ( listaPaises[casilla.getUnidad()?.getPropietario()] != null ){
      unitSprite.width(this.#tamanoCasilla)
      unitSprite.height(this.#tamanoCasilla)
      unitSprite.cache({
        pixelRatio: 1,
        imageSmoothingEnabled: false
      })
      unitSprite.filters([Konva.Filters.HSV])
      aplicarTinteUnidad({ unidadSprite: unitSprite, hsv: listaPaises[casilla.getUnidad()?.getPropietario()].hsv })
    } else {
      console.error('No existe este pais', casilla.getUnidad()?.getPropietario())
    }
    unitKonvaGroup.add(unitSprite)

    const hpActual = Math.ceil( casilla.getUnidad().hp / 10 )
    const hpTextConfBase:TextConfig = {
      name: 'hp-texto',
      fontSize: Math.ceil(this.#tamanoCasilla / 2),
      fontFamily: 'monospace', fill: 'white',
      fontStyle: 'bold',
      // stroke: 'white', strokeWidth: 2,
      x: Math.ceil(this.#tamanoCasilla * .67 ), y: 0
    }

    if ( hpActual < 9 ){
      const hpText = new Konva.Text({
        text: hpActual.toString(),
        ...hpTextConfBase
      })
      unitKonvaGroup.add(hpText)
    } else {
      const hpText = new Konva.Text({
        text: '',
        ...hpTextConfBase
      })
      unitKonvaGroup.add(hpText)
    }

    casilla.getUnidad()?.setUnitKonvaGroup(unitKonvaGroup)
    return unitKonvaGroup
  // return unitSprite
  }
  generarSpriteTerreno (casilla: Casilla, coordenada: coordenada, mapa: Mapa){
    const terreno = casilla.getTerrenoObjeto()
    const { x,y } = coordenada
    const casillasAdyacentes = {
      top: mapa.getCasilla({ x: (x), y:(y - 1) })?.getTipo(),
      left: mapa.getCasilla({ x: (x - 1), y:(y) })?.getTipo(),
      right: mapa.getCasilla({ x: (x + 1), y:(y) })?.getTipo(),
      bottom: mapa.getCasilla({ x: (x), y:(y + 1) })?.getTipo()
    }
    // Objeto terreno
    const objTerreno = terreno.obtenerSprite(casillasAdyacentes)
    const spriteTerreno = new Konva.Image({
      x: x * this.#tamanoCasilla,
      y: ( y * this.#tamanoCasilla - ( (objTerreno.height - this.#standardSpriteSize ) * (this.#tamanoCasilla / objTerreno.height) )),
      width: this.#tamanoCasilla,
      height: this.#tamanoCasilla * (objTerreno.height / this.#standardSpriteSize ),
      offsetY: objTerreno.offsetY + 1,
      image: TerrainTilesheets,
      crop: objTerreno.crop,
      strokeWidth: 0,
      name: `casilla_${coordenada.x}_${coordenada.y}`
    })

    const propietario = casilla.getPropietario()

    if ( ( casilla.getTipo() === 'ciudad' || casilla.getTipo() === 'fabrica' || casilla.getTipo() === 'aeropuerto' ||
    casilla.getTipo() === 'puertoNaval' ) && propietario != null ){
      spriteTerreno.cache({
        pixelRatio: 1,
        imageSmoothingEnabled: false
      })
      spriteTerreno.filters([Konva.Filters.Tint])
      spriteTerreno.tintColor = obtenerColorTerreno({ numComandanteJugable: propietario })
    }

    return spriteTerreno
  }

  // CUADROS DE CASILLA
  mostrarCasillasCuadros (layerCasillas: Konva.Layer, coordCasillas: coordenada[]){
    layerCasillas.show()

    for (const coordCasilla of coordCasillas){
      layerCasillas.findOne(`#cuadro_${coordCasilla.x}_${coordCasilla.y}`)?.show()
    // animar cada cuadro creciendo (de 0 a 100% al final)
    }
  }
  ocultarCasillasCuadros (layerCasillas: Konva.Layer){
    layerCasillas.find('Rect').forEach(rect => {
      rect.hide()
    // animar cuadros decreciendo
    })

    layerCasillas.hide()
  }
}
