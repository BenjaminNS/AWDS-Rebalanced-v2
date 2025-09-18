import Konva from 'konva'
import terrainTilesheets from '/img/terrenos/terrains_tilesheets.png'
const TerrainTilesheets = new window.Image()
TerrainTilesheets.src=terrainTilesheets
import { ListaTerrenos } from './terreno.ts'
import { sleep } from '../common.js'

import { Casilla, Mapa } from './mapa.ts'
// import { Unidad } from '../unidades/unidades.ts'
import { listaPaises } from "../comandantes/paises.ts"
import { arregloTerrenosNombres } from './terreno.ts'
import type { coordenada, dimension, CasillaSimple } from './mapa.ts'
import type { nombreTerreno } from './terreno.ts'

export const tamanoCasilla = 32
const standardSpriteSize = 16
const fondoMapa = '#D5EF00' //'black'
const duracionConstruccion = 3000
const maxDelayCasilla = 10

const obtenerColor = ({numComandanteJugable}: {numComandanteJugable: number})=>{
  // validar que se manden números enteros positivos

  switch(numComandanteJugable){
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

const COLORES_INTERACCION={
  MOVIMIENTO: '#345bc788',
  ATAQUE: '#c7343488',
}

export const MAPA_CAPAS={
  FONDO: 'fondo',
  TERRENO: 'terreno',
  CASILLAS: 'casillas',
  UNIDADES: 'unidades'
}

// Generación de mapas
export async function generarMapaKonva ({mapa, idContenedor} : {mapa: Mapa, idContenedor: string}):Promise<Mapa>{
  const mapaJuego = new Mapa(mapa.nombre, mapa.dimensiones, mapa.casillas)
  generarCapasMapa({idContenedor: idContenedor, mapa: mapaJuego})

  // ¿Debería regresar una promesa?
  return mapaJuego
}
export async function generarMapaAleatorio({dimensiones, idContenedor}: {dimensiones: dimension, idContenedor: string}){
  const listaCasillas = generarCasillasAleatorias({dimensiones: dimensiones})
  const mapaJuego = new Mapa('Mapa aleatorio', dimensiones, listaCasillas)
  generarCapasMapa({idContenedor: idContenedor, mapa: mapaJuego})

  // ¿Debería regresar una promesa?
  return mapaJuego
}

export async function generarMapaRelleno({dimensiones, idContenedor, tipoCasilla}: {dimensiones: dimension, idContenedor: string, tipoCasilla: nombreTerreno}){
  const listaCasillas = []
  // Verificar que sea un tipo de casilla existente, si no es, cambiarlo a planicie por defecto
  // if( ListaTerrenos[tipoCasilla] )
  for (let z = 0; z < (dimensiones.columnas * dimensiones.filas); z++) {
    listaCasillas.push(new Casilla(tipoCasilla, null, null))
  }

  const mapaJuego = new Mapa('Mapa generado', dimensiones, listaCasillas)
  generarCapasMapa({idContenedor: idContenedor, mapa: mapaJuego})

  // ¿Debería regresar una promesa?
  return mapaJuego
}

// Subfunciones
function generarCasillasAleatorias({dimensiones}: {dimensiones: dimension}){
  const listaCasillas = []
  for (let z = 0; z < (dimensiones.columnas * dimensiones.filas); z++) {
    const tipoCasilla = arregloTerrenosNombres[Math.floor( (arregloTerrenosNombres.length - 1) * Math.random() )]
    // TO-DO: Generar casillas de propiedades con propietario
    listaCasillas.push(new Casilla(tipoCasilla, null, null))
  }

  return listaCasillas
}

function generarStage({idContenedor, dimensiones}: {idContenedor: string, dimensiones: dimension}){
  const konvaStage = new Konva.Stage({
    container: idContenedor,
    width: dimensiones.columnas * tamanoCasilla,
    height: dimensiones.filas * tamanoCasilla,
  })
  return konvaStage
}

function generarCapaFondo({dimensiones}: {dimensiones: dimension}):Konva.Layer{
  const capaFondo = new Konva.Layer({name: MAPA_CAPAS.FONDO})
  // Talvez convendría más poner de fondo las planices, en vez de un color sólido de fondo
  // Se tendría que adaptar también al clima y al Fog of War
  capaFondo.add(new Konva.Rect({
    width: dimensiones.columnas * tamanoCasilla,
    height: dimensiones.filas * tamanoCasilla,
    fill: fondoMapa,
  }))

  return capaFondo;
}
function generarCapaCasillas({mapa}: {mapa: Mapa}):Konva.Layer{
  const capaCasillas = new Konva.Layer({name: MAPA_CAPAS.CASILLAS})
  for (let y = 0; y < mapa.dimensiones.filas; y++) {
    for (let x = 0; x < mapa.dimensiones.columnas; x++) {
      const cuadroCasilla = new Konva.Rect({
        x: x * tamanoCasilla,
        y: y * tamanoCasilla,
        width: tamanoCasilla,
        height: tamanoCasilla,
        fill: COLORES_INTERACCION.ATAQUE,
        // stroke: 'black',
        // strokeWidth: (tamanoCasilla * .01)
      })

      capaCasillas.add(cuadroCasilla)
    }
  }
  return capaCasillas
}
function generarCapaTerreno({mapa}: {mapa: Mapa}):Konva.Layer{
  const capaTerreno = new Konva.Layer({name: MAPA_CAPAS.TERRENO})
  capaTerreno.getContext()._context.imageSmoothingEnabled = false
  return capaTerreno
}
async function generarListaTilesTerreno({capaTerreno, mapa}: { capaTerreno: Konva.Layer, mapa: Mapa }){
  const filas = mapa.dimensiones.filas
  const columnas = mapa.dimensiones.columnas
  const delayCalculado = Math.ceil( duracionConstruccion / (filas * columnas) )
  const tiempoCasilla = delayCalculado > maxDelayCasilla ? maxDelayCasilla : delayCalculado

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const tileCasilla = generarSpriteTerreno(
        mapa.casillas[( ( y * columnas ) + x )],
        {x: x, y: y},
        mapa
      )

      mapa.casillas[( ( y * columnas ) + x )].sprite = tileCasilla
      capaTerreno.add(tileCasilla)
      await sleep(tiempoCasilla)
    }
  }
}
function generarCapaUnidades({mapa}: {mapa: Mapa}){
  const capaUnidades = new Konva.Layer({name: MAPA_CAPAS.UNIDADES})
  capaUnidades.getContext()._context.imageSmoothingEnabled = false

  const filas = mapa.dimensiones.filas
  const columnas = mapa.dimensiones.columnas

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      if( mapa.casillas[( ( y * columnas ) + x )].unidad != null ){
        const spriteUnidad = generarSpriteUnidad(
          mapa.casillas[( ( y * columnas ) + x )],
          {x: x, y: y}
        )
        capaUnidades.add(spriteUnidad)
      }
    }
  }

  // capaUnidades.batchDraw();
  return capaUnidades
}


async function generarCapasMapa({mapa, idContenedor} : {mapa: Mapa, idContenedor: string}){
  generarShaderPropiedad()
  mapa.konvaStage = generarStage({
    idContenedor: idContenedor, 
    dimensiones: mapa.dimensiones
  })
  mapa.konvaStage.add(generarCapaFondo({dimensiones: mapa.dimensiones}))
  // TODO: De preferencia, que generar los terrenos fuera en una sola instrucción
  // aunque ya no se animen los terrenos
  const capaTerreno = generarCapaTerreno({mapa: mapa})
  mapa.konvaStage.add(capaTerreno)
  generarListaTilesTerreno({capaTerreno: capaTerreno, mapa: mapa})
  // const capaCasillas = generarCapaCasillas({mapa: mapa})
  // mapa.konvaStage.add(capaCasillas)
  const capaUnidades = generarCapaUnidades({mapa: mapa})
  mapa.konvaStage.add(capaUnidades)

  mapa.konvaStage.getLayers().forEach(l => {
    l.getContext()._context.imageSmoothingEnabled = false;
  });
}

function generarSpriteUnidad(casilla: CasillaSimple, coordenada: coordenada):Konva.Sprite|null{
  if(casilla.unidad == null){
    console.error('Esta casilla no tiene una unidad', casilla)
    return null
  }

  const unitSprite = casilla.unidad.obtenerTipo().sprite.clone()
  
  const { x, y } = coordenada
  unitSprite.setAttrs({
    x: (x * tamanoCasilla),
    y: y * tamanoCasilla,
  })
  
  const escala = tamanoCasilla / 16
  if(casilla.unidad.propietario % 2 === 0){
    unitSprite.scale({x: escala, y: escala})
  } else{
    unitSprite.offsetX( tamanoCasilla / 2 )
    unitSprite.scale({x: (escala * -1), y: escala})
  }
  
  // Filtro sprite unidad
  if( listaPaises[casilla.unidad.propietario] != null ){
    unitSprite.width(tamanoCasilla);
    unitSprite.height(tamanoCasilla);
    unitSprite.cache({
      pixelRatio: 1,
      imageSmoothingEnabled: false
    })
    unitSprite.filters([Konva.Filters.HSV])
    aplicarTinteUnidad({unidadSprite: unitSprite, hsv: listaPaises[casilla.unidad.propietario].hsv})
  } else{
    console.error('No existe este pais', casilla.unidad.propietario)
  }

  return unitSprite
}
export function generarSpriteTerreno(casilla: CasillaSimple, coordenada: coordenada, mapa: Mapa){
  const terreno = ListaTerrenos[casilla.tipo]
  const {x,y} = coordenada
  const casillasAdyacentes = {
    top: mapa.obtenerCasilla({x: (x), y:(y-1)}).tipo,
    left: mapa.obtenerCasilla({x: (x-1), y:(y)}).tipo,
    right: mapa.obtenerCasilla({x: (x+2), y:(y)}).tipo,
    bottom: mapa.obtenerCasilla({x: (x), y:(y+1)}).tipo
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
    name: 'casilla_' + coordenada.x + '-' + coordenada.y,
  })
  
  const propietario = casilla.propietario
  if( ( casilla.tipo === 'ciudad' || casilla.tipo === 'fabrica' || casilla.tipo === 'aeropuerto' || 
    casilla.tipo === 'puertoNaval' ) && propietario != null ){
      // console.log(spriteTerreno.colorKey)
      spriteTerreno.cache({
        pixelRatio: 1,
        imageSmoothingEnabled: false
      });
      spriteTerreno.filters([Konva.Filters.Tint]);
      
      spriteTerreno.tintColor = obtenerColor({numComandanteJugable: propietario});
  }
  
  return spriteTerreno
}

// Shaders y tintes de unidad por Comandante Jugable
function generarShaderPropiedad () {
  // Al parecer, cada propiedad requiere un shader ligeramente diferente
  // Este casi funciona para ciudades, pero parece que necesito indicarle otros colores
  // Tiene que variar el "tinte" de color de cada propiedad basado en el dueño
  // Pero no sé como se cambia la variable del color
  // Konva.Filters.Tint = function (imageData) {
  //   const data = imageData.data
  //   const n = this

  //   const rojoHighlight = {
  //     r: 248,
  //     g: 208,
  //     b: 136,
  //   }
  //   const rojoMidtones = {
  //     r: 208,
  //     g: 64,
  //     b: 56,
  //   }
  //   const rojoShadow = {
  //     r: 248,
  //     g: 160,
  //     b: 88,
  //   }

  //   const highlights = {
  //     r: 240,
  //     g: 232,
  //     b: 208,
  //   }
  //   const midtones = {
  //     r: 192,
  //     g: 184,
  //     b: 192,
  //   }
  //   const shadows = {
  //     r: 152,
  //     g: 136,
  //     b: 200,
  //   }

  //   for (let i = 0; i < data.length; i += 4) {
  //     // #F0E8D0, 240, 232, 208
  //     // #C0B8C0 192, 184, 192
  //     // #9888C8 152, 136, 200

  //     if( data[i] == highlights['r'] && data[i+1] == highlights['g'] && data[i+2] == highlights['b'] ){ //HIGHLIGHTS
  //       data[i]   = rojoHighlight.r
  //       data[i+1] = rojoHighlight.g
  //       data[i+2] = rojoHighlight.b
  //     } else if( data[i] == midtones['r'] && data[i+1] == midtones['g'] && data[i+2] == midtones['b'] ){ //MIDTONES
  //       data[i]   = rojoMidtones.r
  //       data[i+1] = rojoMidtones.g
  //       data[i+2] = rojoMidtones.b
  //     } else if( data[i] == shadows['r'] && data[i+1] == shadows['g'] && data[i+2] == shadows['b'] ){ //SHADOWS
  //       data[i]   = rojoShadow.r
  //       data[i+1] = rojoShadow.g
  //       data[i+2] = rojoShadow.b
  //     }
  //   }
  // };

  // Konva.Filters.Tint = function (imageData:ImageData) {
  //   const data = imageData.data
  //   const n = this

  //   const rojoHighlight = {
  //     r: 248,
  //     g: 208,
  //     b: 136,
  //   }
  //   const rojoMidtones = {
  //     r: 208,
  //     g: 64,
  //     b: 56,
  //   }
  //   const rojoShadow = {
  //     r: 248,
  //     g: 160,
  //     b: 88,
  //   }

  //   const highlights = {
  //     r: 240,
  //     g: 232,
  //     b: 208,
  //   }
  //   const midtones = {
  //     r: 192,
  //     g: 184,
  //     b: 192,
  //   }
  //   const shadows = {
  //     r: 152,
  //     g: 136,
  //     b: 200,
  //   }

  //   for (let i = 0; i < data.length; i += 4) {
  //     // #F0E8D0, 240, 232, 208
  //     // #C0B8C0 192, 184, 192
  //     // #9888C8 152, 136, 200

  //     if( data[i] == highlights['r'] && data[i+1] == highlights['g'] && data[i+2] == highlights['b'] ){ //HIGHLIGHTS
  //       data[i]   = rojoHighlight.r
  //       data[i+1] = rojoHighlight.g
  //       data[i+2] = rojoHighlight.b
  //     } else if( data[i] == midtones['r'] && data[i+1] == midtones['g'] && data[i+2] == midtones['b'] ){ //MIDTONES
  //       data[i]   = rojoMidtones.r
  //       data[i+1] = rojoMidtones.g
  //       data[i+2] = rojoMidtones.b
  //     } else if( data[i] == shadows['r'] && data[i+1] == shadows['g'] && data[i+2] == shadows['b'] ){ //SHADOWS
  //       data[i]   = rojoShadow.r
  //       data[i+1] = rojoShadow.g
  //       data[i+2] = rojoShadow.b
  //     }
  //   }
  // };
  Konva.Filters.Tint = function (imageData:ImageData) {
    const data = imageData.data;
    const n = this; // el nodo Konva.Image al que está ligado este filtro

    // Si no existe color en el nodo, default blanco
    const tint = n.tintColor || { r: 255, g: 255, b: 255 };

    for (let i = 0; i < data.length; i += 4) {
      // Suponiendo sprite en escala de grises → canal rojo = gris
      const gray = data[i]; 

      data[i]   = (gray / 255) * tint.r; // R
      data[i+1] = (gray / 255) * tint.g; // G
      data[i+2] = (gray / 255) * tint.b; // B
      // data[i+3] = alpha se queda igual
    }
  };
};
function aplicarTinteUnidad({unidadSprite, hsv} : {unidadSprite: Konva.Sprite, hsv: {h: number|null, s: number|null, v: number|null}}): void{
  if( hsv.h != null ){
    unidadSprite.hue( hsv.h )
  }
  if( hsv.s != null ){
    unidadSprite.saturation( hsv.s )
  }
  if( hsv.v != null ){
    unidadSprite.value( hsv.v )
  }
}