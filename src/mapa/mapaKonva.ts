import Konva from 'konva'
import terrainTilesheets from '/img/terrenos/terrains_tilesheets.png'
const TerrainTilesheets = new window.Image()
TerrainTilesheets.src = terrainTilesheets
import { sleep } from '../common.js'
import { listaPaises } from '../comandantes/paises.ts'
import { arregloTerrenosNombres, type nombreTerreno } from './terreno.ts'
import { type coordenada, type dimension, Casilla, Mapa } from './mapa.ts'
import type { TextConfig } from 'konva/lib/shapes/Text'
import { generarCapaCaminos } from './konvaCamino.ts'

export const tamanoCasilla = 32
const standardSpriteSize = 16
const fondoMapa = '#D5EF00' // 'black'
const duracionConstruccion = 500
const maxDelayCasilla = 10

export const obtenerColor = ({ numComandanteJugable }: {numComandanteJugable: number}) => {
  // validar que se manden números enteros positivos

  switch (numComandanteJugable){
  // En caso de que es a nombre de nadie, no debería entrar a esta función
  case 0:
    // return 'red' //#D04038 254, 1, 51
    return { r: 250, g: 0, b: 50 }
  case 1:
    // return 'blue'
    return { r: 0, g: 0, b: 200 }
  case 2:
    // return 'green'
    return { r: 0, g: 200, b: 0 }
  case 3:
    // return 'yellow'255, 197, 81
    return { r: 255, g: 200, b: 100 }
  case 4:
    // return 'black'
    return { r: 50, g: 50, b: 50 }
  default:
    console.log('No se aceptan valores mayor a 5 jugadores')
    return { r: 255, g: 255, b: 255 }
  }
}

const COLORES_INTERACCION = {
  MOVIMIENTO: '#345bc788',
  ATAQUE: '#c7343488'
}

export const MAPA_CAPAS = {
  FONDO: 'fondo',
  TERRENO: 'terreno',
  CASILLAS: 'casillas',
  CAMINO: 'camino',
  UNIDADES: 'unidades'
  // GUI: 'gui',
}

// Generación de mapas
export async function generarMapaKonva ({ mapa, idContenedor } : {mapa: Mapa, idContenedor: string}):Promise<Mapa>{
  const mapaJuego = new Mapa(mapa.nombre, mapa.dimensiones, mapa.casillas)
  generarCapasMapa({ idContenedor: idContenedor, mapa: mapaJuego })

  // ¿Debería regresar una promesa?
  return mapaJuego
}
export async function generarMapaAleatorio ({ dimensiones, idContenedor }: {dimensiones: dimension, idContenedor: string}){
  const listaCasillas = generarCasillasAleatorias({ dimensiones: dimensiones })
  const mapaJuego = new Mapa('Mapa aleatorio', dimensiones, listaCasillas)
  generarCapasMapa({ idContenedor: idContenedor, mapa: mapaJuego })

  // ¿Debería regresar una promesa?
  return mapaJuego
}

export async function generarMapaRelleno ({ dimensiones, idContenedor, tipoCasilla }: {dimensiones: dimension, idContenedor: string, tipoCasilla: nombreTerreno}){
  const listaCasillas = []
  // Verificar que sea un tipo de casilla existente, si no es, cambiarlo a planicie por defecto
  // if( ListaTerrenos[tipoCasilla] )
  for (let z = 0; z < (dimensiones.columnas * dimensiones.filas); z++) {
    listaCasillas.push(new Casilla(tipoCasilla, null, null))
  }

  const mapaJuego = new Mapa('Mapa generado', dimensiones, listaCasillas)
  generarCapasMapa({ idContenedor: idContenedor, mapa: mapaJuego })

  // ¿Debería regresar una promesa?
  return mapaJuego
}

// Subfunciones
function generarCasillasAleatorias ({ dimensiones }: {dimensiones: dimension}){
  const listaCasillas = []
  for (let z = 0; z < (dimensiones.columnas * dimensiones.filas); z++) {
    const tipoCasilla = arregloTerrenosNombres[Math.floor( (arregloTerrenosNombres.length - 1) * Math.random() )]
    // TO-DO: Generar casillas de propiedades con propietario
    listaCasillas.push(new Casilla(tipoCasilla, null, null))
  }

  return listaCasillas
}

function generarStage ({ idContenedor, dimensiones }: {idContenedor: string, dimensiones: dimension}){
  const konvaStage = new Konva.Stage({
    container: idContenedor,
    width: dimensiones.columnas * tamanoCasilla,
    height: dimensiones.filas * tamanoCasilla
  })
  return konvaStage
}

function generarCapaFondo ({ dimensiones }: {dimensiones: dimension}):Konva.Layer{
  const capaFondo = new Konva.Layer({ name: MAPA_CAPAS.FONDO })
  // Talvez convendría más poner de fondo las planices, en vez de un color sólido de fondo
  // Se tendría que adaptar también al clima y al Fog of War
  capaFondo.add(new Konva.Rect({
    width: dimensiones.columnas * tamanoCasilla,
    height: dimensiones.filas * tamanoCasilla,
    fill: fondoMapa
  }))

  return capaFondo
}
function generarCapaCasillas ({ mapa }: {mapa: Mapa}):Konva.Layer{
  const capaCasillas = new Konva.Layer({ name: MAPA_CAPAS.CASILLAS })
  for (let y = 0; y < mapa.dimensiones.filas; y++) {
    for (let x = 0; x < mapa.dimensiones.columnas; x++) {
      const cuadroCasilla = new Konva.Rect({
        x: x * tamanoCasilla,
        y: y * tamanoCasilla,
        width: tamanoCasilla,
        height: tamanoCasilla,
        fill: COLORES_INTERACCION.MOVIMIENTO,
        stroke: '#00000033',
        // strokeWidth: (tamanoCasilla * .01)
        name: `cuadro_${x}_${y}`,
        id: `cuadro_${x}_${y}`
      })

      capaCasillas.add(cuadroCasilla)
    }
  }
  return capaCasillas
}
function generarCapaTerreno ({ mapa }: {mapa: Mapa}):Konva.Layer{
  const capaTerreno = new Konva.Layer({ name: MAPA_CAPAS.TERRENO })
  capaTerreno.getContext()._context.imageSmoothingEnabled = false
  return capaTerreno
}
async function generarListaTilesTerreno ({ capaTerreno, mapa }: { capaTerreno: Konva.Layer, mapa: Mapa }){
  const filas = mapa.dimensiones.filas
  const columnas = mapa.dimensiones.columnas
  const delayCalculado = Math.ceil( duracionConstruccion / (filas * columnas) )
  const tiempoCasilla = delayCalculado > maxDelayCasilla ? maxDelayCasilla : delayCalculado

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const tileCasilla = generarSpriteTerreno(
        mapa.casillas[( ( y * columnas ) + x )],
        { x: x, y: y },
        mapa
      )

      mapa.casillas[( ( y * columnas ) + x )].sprite = tileCasilla
      capaTerreno.add(tileCasilla)
      await sleep(tiempoCasilla)
    }
  }
}
function generarCapaUnidades ({ mapa }: {mapa: Mapa}){
  const capaUnidades = new Konva.Layer({ name: MAPA_CAPAS.UNIDADES })
  capaUnidades.getContext()._context.imageSmoothingEnabled = false

  const filas = mapa.dimensiones.filas
  const columnas = mapa.dimensiones.columnas

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      if ( mapa.casillas[( ( y * columnas ) + x )].getUnidad() != null ){
        const spriteUnidad = generarSpriteUnidad(
          mapa.casillas[( ( y * columnas ) + x )],
          { x: x, y: y }
        )
        capaUnidades.add(spriteUnidad)
      }
    }
  }

  // capaUnidades.batchDraw();
  return capaUnidades
}

async function generarCapasMapa ({ mapa, idContenedor } : {mapa: Mapa, idContenedor: string}){
  generarShaderPropiedad()
  mapa.konvaStage = generarStage({
    idContenedor: idContenedor,
    dimensiones: mapa.dimensiones
  })
  mapa.konvaStage.add(generarCapaFondo({ dimensiones: mapa.dimensiones }))
  // TODO: De preferencia, que generar los terrenos fuera en una sola instrucción
  // aunque ya no se animen los terrenos
  const capaTerreno = generarCapaTerreno({ mapa: mapa })
  mapa.konvaStage.add(capaTerreno)
  generarListaTilesTerreno({ capaTerreno: capaTerreno, mapa: mapa })
  const capaCasillas = generarCapaCasillas({ mapa: mapa })
  mapa.konvaStage.add(capaCasillas)
  capaCasillas.hide()
  const capaCamino = generarCapaCaminos({ mapa: mapa })
  mapa.konvaStage.add(capaCamino)
  capaCamino.hide()
  const capaUnidades = generarCapaUnidades({ mapa: mapa })
  mapa.konvaStage.add(capaUnidades)

  mapa.konvaStage.getLayers().forEach(l => {
    l.getContext()._context.imageSmoothingEnabled = false
  })
}

export function generarSpriteUnidad (casilla: Casilla, coordenada: coordenada):Konva.Group|null{
  if (casilla.getUnidad() == null){
    console.error('Esta casilla no tiene una unidad', casilla)
    return null
  }

  const { x, y } = coordenada
  const unitKonvaGroup = new Konva.Group({
    x: (x * tamanoCasilla),
    y: y * tamanoCasilla,
    name: casilla.getUnidad()?.id,
    id: casilla.getUnidad()?.id
  })

  const unitSprite = casilla.getUnidad()?.getSprite().clone()
  unitSprite.setAttrs({
    x: 0, y: 0,
    name: 'sprite-unidad'
  })
  const escala = tamanoCasilla / 16
  if (casilla.getUnidad()?.getPropietario() % 2 === 0){
    unitSprite.scale({ x: escala, y: escala })
  } else {
    unitSprite.offsetX( tamanoCasilla / 2 )
    unitSprite.scale({ x: (escala * -1), y: escala })
  }
  // Filtro sprite unidad
  if ( listaPaises[casilla.getUnidad()?.getPropietario()] != null ){
    unitSprite.width(tamanoCasilla)
    unitSprite.height(tamanoCasilla)
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
    fontSize: Math.ceil(tamanoCasilla / 2),
    fontFamily: 'monospace', fill: 'white',
    fontStyle: 'bold',
    // stroke: 'white', strokeWidth: 2,
    x: Math.ceil(tamanoCasilla * .67 ), y: 0
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
export function generarSpriteTerreno (casilla: Casilla, coordenada: coordenada, mapa: Mapa){
  const terreno = casilla.getTerrenoObjeto()
  const { x,y } = coordenada
  const casillasAdyacentes = {
    top: mapa.obtenerCasilla({ x: (x), y:(y - 1) })?.getTipo(),
    left: mapa.obtenerCasilla({ x: (x - 1), y:(y) })?.getTipo(),
    right: mapa.obtenerCasilla({ x: (x + 1), y:(y) })?.getTipo(),
    bottom: mapa.obtenerCasilla({ x: (x), y:(y + 1) })?.getTipo()
  }
  // Objeto terreno
  const objTerreno = terreno.obtenerSprite(casillasAdyacentes)
  const spriteTerreno = new Konva.Image({
    x: x * tamanoCasilla,
    y: ( y * tamanoCasilla - ( (objTerreno.height - standardSpriteSize ) * (tamanoCasilla / objTerreno.height) )),
    width: tamanoCasilla,
    height: tamanoCasilla * (objTerreno.height / standardSpriteSize ),
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
    spriteTerreno.tintColor = obtenerColor({ numComandanteJugable: propietario })
  }

  return spriteTerreno
}

export async function mostrarCasillas (layerCasillas: Konva.Layer, coordCasillas: coordenada[]){
  layerCasillas.show()

  for (const coordCasilla of coordCasillas){
    layerCasillas.findOne(`#cuadro_${coordCasilla.x}_${coordCasilla.y}`)?.show()
    // animar cada cuadro creciendo (de 0 a 100% al final)
  }

}
export async function ocultarCasillas (layerCasillas: Konva.Layer){
  layerCasillas.find('Rect').forEach(rect => {
    rect.hide()
    // animar cuadros decreciendo
  })

  layerCasillas.hide()
}

// Esto talvez lo pueda mover a otro archivo
// Shaders y tintes de unidad por Comandante Jugable
export function generarShaderPropiedad () {
  // Al parecer, cada propiedad requiere un shader ligeramente diferente
  // Este casi funciona para ciudades, pero parece que necesito indicarle otros colores
  // Tiene que variar el "tinte" de color de cada propiedad basado en el dueño
  // Pero no sé como se cambia la variable del color

  Konva.Filters.Tint = function (imageData:ImageData) {
    const data = imageData.data
    const n = this

    const tint = n.tintColor

    if ( tint == null ){
      return
    }

    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i]

      data[i] = (gray / 255) * tint.r // R
      data[i + 1] = (gray / 255) * tint.g // G
      data[i + 2] = (gray / 255) * tint.b // B
    }
  }
}
function aplicarTinteUnidad ({ unidadSprite, hsv } : {unidadSprite: Konva.Sprite, hsv: {h: number|null, s: number|null, v: number|null}}): void{
  if ( hsv.h != null ){
    unidadSprite.hue( hsv.h )
  }
  if ( hsv.s != null ){
    unidadSprite.saturation( hsv.s )
  }
  if ( hsv.v != null ){
    unidadSprite.value( hsv.v )
  }
}
