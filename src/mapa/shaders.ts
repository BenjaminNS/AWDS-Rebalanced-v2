import type Konva from 'konva'

export function obtenerColorTerreno ({ numComandanteJugable }: {numComandanteJugable: number}){
  // En caso de que es a nombre de nadie, no debería entrar a esta función
  switch (numComandanteJugable){
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
export function aplicarTinteUnidad ({ unidadSprite, hsv } : {unidadSprite: Konva.Sprite, hsv: {h: number|null, s: number|null, v: number|null}}): void{
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

// function unidadSinTurno
