import Konva from 'konva'
import { type Mapa, type coordenada } from './mapa.ts'
import { MAPA_CAPAS } from './mapaKonva'
import { tamanoCasilla } from './mapaKonva' 
import caminoInicio from '/img/huds/caminoiniciov1.png'
const CaminoSprite = new window.Image()
CaminoSprite.src = caminoInicio

const CoordenadasImg = {
  'FlechaFinal': { x: 30, y: 30 }
}

export function generarCapaCaminos({mapa}: {mapa: Mapa}):Konva.Layer{
  const capaCaminos = new Konva.Layer({name: MAPA_CAPAS.CAMINO})
  for (let y = 0; y < mapa.dimensiones.filas; y++) {
    for (let x = 0; x < mapa.dimensiones.columnas; x++) {
      const spriteTerreno = new Konva.Image({
          x: x * tamanoCasilla,
          y: y * tamanoCasilla,
          width: tamanoCasilla, height: tamanoCasilla,
          image: CaminoSprite,
          strokeWidth: 0,
          name: `camino_${x}_${y}`,
          // Parece que name no funciona
          id: `camino_${x}_${y}`,
        })

      capaCaminos.add(spriteTerreno)
    }
  }
  return capaCaminos
}


export function pintarCamino(layerCamino: Konva.Layer, coordsCamino: coordenada[]){
  ocultarCaminos(layerCamino)
  layerCamino.show()


  for(const coordCasilla of coordsCamino){
    layerCamino.findOne(`#camino_${coordCasilla.x}_${coordCasilla.y}`)?.show()
    // Aquí debería cambiar de imagen (o de UV) dependiendo la dirección de la coordenada anterior y de la siguiente

    // Si es la primera casilla: Cuadrado
    // Si las coordenada adyacentes están a la izquierda y a la derecha: Horizontal
    // Si las coordenada adyacentes están arriba y abajo: Vertical

    // Si la coordenada anterior horizontal y la otra vertical (o viceversa), se pone con giro (la orientación depende de las direcciones de las casillas)

    // Si es la última coordenada, va con flecha (y dependiendo de cual dirección tenga la coordenada anterior
    // es la dirección de la flecha )
  }
}
export async function ocultarCaminos(layerCasillas: Konva.Layer){
  layerCasillas.find('Image').forEach(caminoImg => {
    caminoImg.hide()
  });
  
  // layerCasillas.hide()
}