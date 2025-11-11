import Konva from 'konva'
import { type Mapa, type coordenada } from './mapa.ts'
import { MAPA_CAPAS } from './mapaKonva'
import { tamanoCasilla } from './mapaKonva'
import { type direccion, generarDireccion } from '../camino.ts'
import caminoInicio from '/img/huds/caminos_tilesheet.png'
const CaminoSprite = new window.Image()
CaminoSprite.src = caminoInicio
const tamanoTile = 100

// Aquí debería cambiar de imagen (o de UV) dependiendo la dirección de la coordenada anterior y de la siguiente

// Si es la primera casilla: Cuadrado
// Si las coordenada adyacentes están a la izquierda y a la derecha: Horizontal
// Si las coordenada adyacentes están arriba y abajo: Vertical

// Si la coordenada anterior horizontal y la otra vertical (o viceversa), se pone con giro (la orientación depende de las direcciones de las casillas)

// Si es la última coordenada, va con flecha (y dependiendo de cual dirección tenga la coordenada anterior
// es la dirección de la flecha )
const coordenadasCaminoImg = {
  'inicio': {
    crop: {
      x: 0, y: 0,
      width: tamanoTile, height: tamanoTile
    },
    rotation: 0
  },
  'recto_horizontal': {
    crop: {
      x: tamanoTile, y: 0,
      width: tamanoTile, height: tamanoTile
    },
    rotation: 0
  },
  'recto_vertical': {
    crop: {
      x: tamanoTile, y: 0,
      width: tamanoTile, height: tamanoTile
    },
    rotation: 90
  },
  'curva_arriba_derecha': {
    crop: {
      x: 0, y: tamanoTile,
      width: tamanoTile, height: tamanoTile
    },
    rotation: 0
  },
  'curva_derecha_abajo': {
    crop: {
      x: 0, y: tamanoTile,
      width: tamanoTile, height: tamanoTile
    },
    rotation: 90
  },
  'curva_abajo_izquierda': {
    crop: {
      x: 0, y: tamanoTile,
      width: tamanoTile, height: tamanoTile
    },
    rotation: 180
  },
  'curva_izquierda_arriba': {
    crop: {
      x: 0, y: tamanoTile,
      width: tamanoTile, height: tamanoTile
    },
    rotation: 270
  },
  'fin': {
    crop: {
      x: tamanoTile, y: tamanoTile,
      width: tamanoTile, height: tamanoTile
    }
  }
}

export function generarCapaCaminos ({ mapa }: {mapa: Mapa}):Konva.Layer{
  const capaCaminos = new Konva.Layer({ name: MAPA_CAPAS.CAMINO })
  for (let y = 0; y < mapa.dimensiones.filas; y++) {
    for (let x = 0; x < mapa.dimensiones.columnas; x++) {
      const spriteTerreno = new Konva.Image({
        x: x * tamanoCasilla + tamanoCasilla / 2,
        y: y * tamanoCasilla + tamanoCasilla / 2,
        width: tamanoCasilla, height: tamanoCasilla,
        image: CaminoSprite,
        strokeWidth: 0,
        offset: { x: (tamanoCasilla / 2), y: (tamanoCasilla / 2) },
        id: `camino_${x}_${y}`
      })

      capaCaminos.add(spriteTerreno)
    }
  }
  return capaCaminos
}

function obtenerCoordenadasImgCamino (direccionInicio: direccion|null, direccionFin: direccion|null) {
  // Curvas
  if ( (direccionInicio === 'abajo' && direccionFin === 'izquierda')
    || (direccionInicio === 'derecha' && direccionFin === 'arriba') ) {
    return coordenadasCaminoImg['curva_izquierda_arriba']
  }
  if ( (direccionInicio === 'arriba' && direccionFin === 'derecha')
    || (direccionInicio === 'izquierda' && direccionFin === 'abajo') ) {
    return coordenadasCaminoImg['curva_derecha_abajo']
  }
  if ( (direccionInicio === 'derecha' && direccionFin === 'abajo')
    || (direccionInicio === 'arriba' && direccionFin === 'izquierda') ) {
    return coordenadasCaminoImg['curva_abajo_izquierda']
  }
  if ( (direccionInicio === 'izquierda' && direccionFin === 'arriba')
    || (direccionInicio === 'abajo' && direccionFin === 'derecha') ) {
    return coordenadasCaminoImg['curva_arriba_derecha']
  }

  // Rectos
  if ( (direccionInicio === 'izquierda' || direccionInicio === 'derecha')
    && (direccionFin === 'derecha' || direccionFin === 'izquierda') ) {
    return coordenadasCaminoImg['recto_horizontal']
  }
  if ( (direccionInicio === 'arriba' || direccionInicio === 'abajo')
    && (direccionFin === 'abajo' || direccionFin === 'arriba') ) {
    return coordenadasCaminoImg['recto_vertical']
  }
  // Flecha
  if (direccionInicio !== null && direccionFin === null){
    if ( direccionInicio === 'derecha' ) return { ...coordenadasCaminoImg['fin'], rotation: 0 }
    if ( direccionInicio === 'abajo' ) return { ...coordenadasCaminoImg['fin'], rotation: 90 }
    if ( direccionInicio === 'izquierda' ) return { ...coordenadasCaminoImg['fin'], rotation: 180 }

    // Por defecto, regresa apuntando hacia arriba
    return { ...coordenadasCaminoImg['fin'], rotation: 270 }
  }

  // Inicio
  return coordenadasCaminoImg['inicio']
}

export function pintarCamino (layerCamino: Konva.Layer, coordsCamino: coordenada[], direcciones: direccion[]){
  ocultarCaminos(layerCamino)
  layerCamino.show()

  for (let i = 0; i < coordsCamino.length; i++) {
    const caminoSprite = layerCamino.findOne(`#camino_${coordsCamino[i].x}_${coordsCamino[i].y}`)
    if (!caminoSprite) continue

    if ( i === 0 ){
      caminoSprite.setAttrs(obtenerCoordenadasImgCamino(null, direcciones[0]))
    } else if ( i < (coordsCamino.length - 1) ){
      caminoSprite.setAttrs(obtenerCoordenadasImgCamino(direcciones[i - 1], direcciones[i]))
    } else {
      caminoSprite.setAttrs(obtenerCoordenadasImgCamino(direcciones[i - 1], null))
    }

    caminoSprite.show()
  }
}
export async function ocultarCaminos (layerCasillas: Konva.Layer){
  layerCasillas.find('Image').forEach(caminoImg => {
    caminoImg.hide()
  })

  // layerCasillas.hide()
}
