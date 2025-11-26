import type { nombreTerreno } from './terreno'
export const tamanoCasilla = 16

export type spriteTerreno = {
  width: number, height: number, offsetY: number
  crop: {
    x: number, y: number,
    width: number, height: number
  }
  // animations: {} //Para HQ's y fábricas
}
export type casillasAdyacentes = {
  top: nombreTerreno,
  left: nombreTerreno,
  right: nombreTerreno,
  bottom: nombreTerreno
}
export type obtenerSpriteFn = (casillasAdyacentes: casillasAdyacentes) => spriteTerreno;

export const planicieSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: (6 * tamanoCasilla), y: (1 * tamanoCasilla),
      width: 16, height: 16
    }
  }
}
export const bosqueSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: (13 * tamanoCasilla), y: (2 * tamanoCasilla),
      width: 16, height: 16
    }
  }
}
export const montanaSpriteFn:obtenerSpriteFn = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  const { top } = casillasAdyacentes
  // Montaña alta
  if ( top === 'ciudad' || top === 'cuartelGeneral' || top === 'fabrica' || top === 'aeropuerto' || top === 'puertoNaval'
    || top === 'silo' ){
    return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: (7 * tamanoCasilla), y: (1 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  } else {
    // Montaña chaparra
    return {
      width: 16, height: 21,
      offsetY: 0,
      crop: {
        x: (5 * tamanoCasilla), y: (1 * tamanoCasilla - 5),
        width: 16, height: 21
      }
    }
  }
}
export const cuartelGeneralSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  // Sabiendo que esta es propiedad, requiere 2 cosas
  // Saber de que personaje es la propiedad
  // Para determinar cual HQ le corresponde
  // Y también el color del personaje propietario (que varía dependiendo el orden y la armada a la que pertenece)
  return {
    width: 16, height: 32, offsetY: 19,
    crop: {
      x: (0 * tamanoCasilla), y: (3 * tamanoCasilla - 16),
      width: 16, height: 32
    }
  }
}
export const ciudadSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  // Similar al HQ, pero no requiere una versión exclusiva por armada
  return {
    width: 16, height: 20, offsetY: 0,
    crop: {
      x: (0 * tamanoCasilla), y: (11 * tamanoCasilla - 4),
      width: 16, height: 20
    }
  }
}
export const fabricaSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  // Similar al HQ, pero no requiere una versión exclusiva por armada
  return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: (2 * tamanoCasilla), y: (11 * tamanoCasilla ),
      width: 16, height: 16
    }
  }
}
export const aeropuertoSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  // Similar al HQ, pero no requiere una versión exclusiva por armada
  return {
    width: 16, height: 18, offsetY: 0,
    crop: {
      x: (4 * tamanoCasilla), y: (11 * tamanoCasilla - 2),
      width: 16, height: 18
    }
  }
}
export const puertoNavalSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  // Similar al HQ, pero no requiere una versión exclusiva por armada
  return {
    width: 16, height: 21, offsetY: 0,
    crop: {
      x: (6 * tamanoCasilla), y: (11 * tamanoCasilla - 5),
      width: 16, height: 21
    }
  }
}
export const siloSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  const desfase = 8
  return {
    width: 16, height: ( 16 + desfase ), offsetY: 0,
    crop: {
      x: (2 * tamanoCasilla), y: (1 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    }
  }
}
export const caminoSpriteFn:obtenerSpriteFn = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  const { top, left, right, bottom } = casillasAdyacentes
  const desfase = 0

  const base = { width: 16, height: ( 16 + desfase ), offsetY: 0 }
  const stComparar:nombreTerreno = 'camino'

  // Horizontal
  if ( (left === stComparar || right === stComparar) && top !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (11 * tamanoCasilla), y: (5 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }

  // T Superior
  if ( top !== stComparar && left === stComparar && right === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (13 * tamanoCasilla), y: (6 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }
  // T Izquierda
  if ( top === stComparar && left !== stComparar && right === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (14 * tamanoCasilla), y: (5 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }
  // T Derecha
  if ( top === stComparar && left === stComparar && right !== stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (12 * tamanoCasilla), y: (5 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }
  // T Inferior
  if ( top === stComparar && left === stComparar && right === stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (13 * tamanoCasilla), y: (4 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }
  // Esq. superior izquierda
  if ( top !== stComparar && left !== stComparar && right === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (12 * tamanoCasilla), y: (4 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }
  // Esq. superior derecha
  if ( top !== stComparar && left === stComparar && right !== stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (14 * tamanoCasilla), y: (4 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }
  // Esq. inferior izquierda
  if ( top === stComparar && left !== stComparar && right === stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (12 * tamanoCasilla), y: (6 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }
  // Esq. inferior izquierda
  if ( top === stComparar && left === stComparar && right !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (14 * tamanoCasilla), y: (6 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    } }
  }

  // Completo
  if ( top === stComparar && left === stComparar && right === stComparar && bottom === stComparar ){
    return {
      ...base,
      crop: {
        x: (13 * tamanoCasilla), y: (5 * tamanoCasilla - desfase),
        width: 16, height: ( 16 + desfase )
      }
    }
  }

  // Default Vertical default
  return { ...base, crop: {
    x: (13 * tamanoCasilla), y: (3 * tamanoCasilla - desfase),
    width: 16, height: ( 16 + desfase )
  } }
}
export const puenteSpriteFn:obtenerSpriteFn = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  const { left, right } = casillasAdyacentes
  const desfase = 0

  const base = { width: 16, height: ( 16 + desfase ), offsetY: 0 }
  const stComparar:nombreTerreno = 'puente'

  // Horizontal
  if ( left === stComparar || right === stComparar ){
    return { ...base, crop: {
      x: (2 * tamanoCasilla), y: (4 * tamanoCasilla) + 1,
      width: 16, height: 16
    }
    }
  }

  // Default Vertical
  return { ...base, crop: {
    x: (3 * tamanoCasilla), y: (4 * tamanoCasilla),
    width: 16, height: 16
  }
  }
}
export const tuberiaSpriteFn:obtenerSpriteFn = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  const { top, left, right, bottom } = casillasAdyacentes
  const desfase = 0

  const base = { width: 16, height: ( 16 + desfase ), offsetY: 0 }
  const stComparar:nombreTerreno = 'tuberia'

  // Esq. superior izquierda
  if ( top !== stComparar && left !== stComparar && right === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (8 * tamanoCasilla), y: (7 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Esq. superior derecha
  if ( top !== stComparar && left === stComparar && right !== stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (10 * tamanoCasilla), y: (7 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Esq. inferior izquierda
  if ( top === stComparar && left !== stComparar && right === stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (8 * tamanoCasilla), y: (9 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Esq. inferior izquierda
  if ( top === stComparar && left === stComparar && right !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (10 * tamanoCasilla), y: (9 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Inicio Superior
  if ( top !== stComparar && left !== stComparar && right !== stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (7 * tamanoCasilla), y: (7 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Inicio Inferior
  if ( top === stComparar && left !== stComparar && right !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (7 * tamanoCasilla), y: (9 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Inicio Izquierda
  if ( left !== stComparar && right === stComparar ){
    return { ...base, crop: {
      x: (8 * tamanoCasilla), y: (10 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Inicio Derecha
  if ( left === stComparar && right !== stComparar ){
    return { ...base, crop: {
      x: (10 * tamanoCasilla), y: (10 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Vertical
  if ( top === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (8 * tamanoCasilla), y: (8 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Horizontal
  if ( left === stComparar && right === stComparar ){
    return { ...base, crop: {
      x: (9 * tamanoCasilla), y: (7 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }

  // Por defecto, horizontal
  // Duda: ¿Se podría poner una versión de una tubería sin dirección?
  return { ...base, crop: {
    x: (9 * tamanoCasilla), y: (7 * tamanoCasilla),
    width: 16, height: 16
  }
  }
}
export const marSpriteFn:obtenerSpriteFn = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  const { top, left, right, bottom } = casillasAdyacentes
  const desfase = 0

  const base = { width: 16, height: ( 16 + desfase ), offsetY: 0 }
  const stComparar:nombreTerreno = 'mar'

  // Completo
  // if( top === stComparar && left === stComparar && right === stComparar && bottom === stComparar ){
  //   return { ...base, crop: {
  //       x: (7 * tamanoCasilla), y: (5 * tamanoCasilla),
  //       width: 16, height: 16
  //     }
  //   }
  // }
  // Completo
  if ( (top === stComparar || top === 'inexistente') && (left === stComparar || left === 'inexistente') && (right === stComparar || right === 'inexistente') && (bottom === stComparar || bottom === 'inexistente') ){
    return { ...base, crop: {
      x: (7 * tamanoCasilla), y: (5 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Pozo (sin mares adyacentes)
  if ( top !== stComparar && left !== stComparar && right !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (9 * tamanoCasilla), y: (3 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Esquina superior izquierda
  if ( top !== stComparar && left !== stComparar && right === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (8 * tamanoCasilla), y: (2 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Esquina superior derecha
  if ( top !== stComparar && left === stComparar && right !== stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (10 * tamanoCasilla), y: (2 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Esquina inferior izquierda
  if ( top === stComparar && left !== stComparar && right === stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (8 * tamanoCasilla), y: (4 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Esquina inferior derecha
  if ( top === stComparar && left === stComparar && right !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (10 * tamanoCasilla), y: (4 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }

  // T Superior
  if ( top === stComparar && left === stComparar && right === stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (9 * tamanoCasilla), y: (2 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // T Izquierda
  if ( top === stComparar && left === stComparar && right !== stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (10 * tamanoCasilla), y: (3 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // T Derecha
  if ( top === stComparar && left !== stComparar && right === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (12 * tamanoCasilla), y: (3 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // T Inferior
  if ( top !== stComparar && left === stComparar && right === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (9 * tamanoCasilla), y: (4 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }

  // Orilla Superior
  if ( top !== stComparar && left !== stComparar && right !== stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (9 * tamanoCasilla), y: (1 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Orilla Izquierda
  if ( top !== stComparar && left !== stComparar && right === stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (6 * tamanoCasilla), y: (3 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Orilla Derecha
  if ( top !== stComparar && left === stComparar && right !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (12 * tamanoCasilla), y: (3 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Orilla Inferior
  if ( top === stComparar && left !== stComparar && right !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (9 * tamanoCasilla), y: (6 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }

  // Horizontal
  if ( (left === stComparar || right === stComparar) && top !== stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (7 * tamanoCasilla), y: (3 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Vertical
  if ( left !== stComparar && right !== stComparar && (top === stComparar || bottom === stComparar) ){
    return { ...base, crop: {
      x: (9 * tamanoCasilla), y: (5 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }

  // Vertical
  // Default Completo
  return { ...base, crop: {
    x: (7 * tamanoCasilla), y: (5 * tamanoCasilla),
    width: 16, height: 16
  }
  }
}
export const arrecifeSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: (6 * tamanoCasilla), y: (5 * tamanoCasilla),
      width: 16, height: 16
    }
  }
}
export const rioSpriteFn:obtenerSpriteFn = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  const { top, left, right, bottom } = casillasAdyacentes
  const desfase = 0

  const base = { width: 16, height: ( 16 + desfase ), offsetY: 0 }
  const stComparar:nombreTerreno = 'rio'

  // Falta Esquina superior izquierda y derecha
  // Esquina inferior izquierda
  if ( left !== stComparar && right === stComparar && top === stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (12 * tamanoCasilla), y: (10 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Esquina inferior derecha
  if ( left === stComparar && right !== stComparar && top === stComparar && bottom !== stComparar ){
    return { ...base, crop: {
      x: (14 * tamanoCasilla), y: (10 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Completo
  if ( left === stComparar && right === stComparar && top === stComparar && bottom === stComparar ){
    return { ...base, crop: {
      x: (12 * tamanoCasilla), y: (8 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Horizontal
  if ( left === stComparar || right === stComparar ){
    return { ...base, crop: {
      x: (11 * tamanoCasilla), y: (8 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }
  // Vertical
  if ( top === stComparar || bottom === stComparar ){
    return { ...base, crop: {
      x: (12 * tamanoCasilla), y: (7 * tamanoCasilla),
      width: 16, height: 16
    }
    }
  }

  // Default Completo
  return { ...base, crop: {
    x: (12 * tamanoCasilla), y: (8 * tamanoCasilla),
    width: 16, height: 16
  }
  }
}
export const costaSpriteFn:obtenerSpriteFn = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  const { top, left, right, bottom } = casillasAdyacentes
  const desfase = 0

  const base = { width: 16, height: ( 16 + desfase ), offsetY: 0 }
  const stComparar:nombreTerreno = 'costa'

  // Esq. superior izquierda
  if ( top !== stComparar && left !== stComparar && right === stComparar && bottom === stComparar ){
    return {
      ...base, crop: {
        x: (2 * tamanoCasilla), y: (7 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  }
  // Esq. superior derecha
  if ( top !== stComparar && left === stComparar && right !== stComparar && bottom === stComparar ){
    return {
      ...base, crop: {
        x: (4 * tamanoCasilla), y: (7 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  }
  // Esq. inferior izquierda
  if ( top === stComparar && left !== stComparar && right === stComparar && bottom !== stComparar ){
    return {
      ...base, crop: {
        x: (2 * tamanoCasilla), y: (9 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  }
  // Esq. inferior izquierda
  if ( top === stComparar && left === stComparar && right !== stComparar && bottom !== stComparar ){
    return {
      ...base, crop: {
        x: (4 * tamanoCasilla), y: (9 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  }
  // Izquierda
  if ( (top === stComparar || bottom === stComparar) && left !== stComparar ){
    return {
      ...base, crop: {
        x: (2 * tamanoCasilla), y: (8 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  }
  // Derecha
  if ( (top === stComparar || bottom === stComparar) && right !== stComparar ){
    return {
      ...base, crop: {
        x: (4 * tamanoCasilla), y: (8 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  }
  // Superior
  if ( top !== stComparar ){
    return {
      ...base, crop: {
        x: (3 * tamanoCasilla), y: (7 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  }
  // Inferior
  if ( bottom !== stComparar ){
    return {
      ...base, crop: {
        x: (3 * tamanoCasilla), y: (9 * tamanoCasilla),
        width: 16, height: 16
      }
    }
  }

  // Por defecto, central
  return {
    ...base, crop: {
      x: (3 * tamanoCasilla), y: (8 * tamanoCasilla),
      width: 16, height: 16
    }
  }
}
export const invalidoSpriteFn:obtenerSpriteFn = ():spriteTerreno => {
  return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: (15 * tamanoCasilla), y: (11 * tamanoCasilla),
      width: 16, height: 16
    }
  }
}
