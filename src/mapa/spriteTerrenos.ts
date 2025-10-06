export const tamanoCasilla=16

export type spriteTerreno = {
  width: number, height: number, offsetY: number
  crop: {
    x: number, y: number,
    width: number, height: number
  }
  // animations: {} //Para HQ's y fábricas
}
export type casillasAdyacentes = {
  top: string,
  left: string,
  right: string,
  bottom: string
}
export type obtenerSprite = (casillasAdyacentes: casillasAdyacentes) => spriteTerreno;

export const planicieSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: (6 * tamanoCasilla), y: (1 * tamanoCasilla),
      width: 16, height: 16
    }
  }
}
export const bosqueSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: (13 * tamanoCasilla), y: (2 * tamanoCasilla),
      width: 16, height: 16
    }
  }
}
export const montanaSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      const {top} = casillasAdyacentes
      // Montaña alta
      if( top === 'ciudad' || top === 'cuartelGeneral' || top === 'fabrica' || top === 'aeropuerto' || top === 'puertoNaval' 
        || top === 'silo' ){
        return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (7 * tamanoCasilla), y: (1 * tamanoCasilla),
            width: 16, height: 16
          }
        }
      } else{
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
export const cuartelGeneralSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
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
export const ciudadSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  // Similar al HQ, pero no requiere una versión exclusiva por armada
  return {
    width: 16, height: 20, offsetY: 0,
    crop: {
      x: (0 * tamanoCasilla), y: (11 * tamanoCasilla - 4),
      width: 16, height: 20
    }
  }
}
export const fabricaSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  // Similar al HQ, pero no requiere una versión exclusiva por armada
  return {
    width: 16, height: 16, offsetY: 0,
    crop: {
      x: (2 * tamanoCasilla), y: (11 * tamanoCasilla ),
      width: 16, height: 16
    }
  }
}
export const aeropuertoSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  // Similar al HQ, pero no requiere una versión exclusiva por armada
  return {
    width: 16, height: 18, offsetY: 0,
    crop: {
      x: (4 * tamanoCasilla), y: (11 * tamanoCasilla - 2),
      width: 16, height: 18
    }
  }
}
export const puertoNavalSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  // Similar al HQ, pero no requiere una versión exclusiva por armada
  return {
    width: 16, height: 21, offsetY: 0,
    crop: {
      x: (6 * tamanoCasilla), y: (11 * tamanoCasilla - 5),
      width: 16, height: 21
    }
  }
}
export const siloSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  const desfase = 8
  return {
    width: 16, height: ( 16 + desfase ), offsetY: 0,
    crop: {
      x: (2 * tamanoCasilla), y: (1 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    }
  }
}
export const caminoSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
    width: 16, height: ( 16 + desfase ), offsetY: 0,
    crop: {
      x: (13 * tamanoCasilla), y: (5 * tamanoCasilla - desfase),
      width: 16, height: ( 16 + desfase )
    }
  }
}
export const puenteSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: (7 * tamanoCasilla), y: (5 * tamanoCasilla),
        width: 16, height: 16
      }
    }
}
export const tuberiaSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: (9 * tamanoCasilla), y: (7 * tamanoCasilla),
        width: 16, height: 16
      }
    }
}
export const marSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: (7 * tamanoCasilla), y: (5 * tamanoCasilla),
        width: 16, height: 16
      }
    }
}
export const arrecifeSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: (6 * tamanoCasilla), y: (5 * tamanoCasilla),
        width: 16, height: 16
      }
    }
}
export const rioSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: (6 * tamanoCasilla), y: (5 * tamanoCasilla),
        width: 16, height: 16
      }
    }
}
export const costaSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: (3 * tamanoCasilla), y: (7 * tamanoCasilla),
        width: 16, height: 16
      }
    }
}
export const invalidoSpriteFn:obtenerSprite = (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
  return {
      width: 16, height: 16, offsetY: 0,
      crop: {
        x: (15 * tamanoCasilla), y: (11 * tamanoCasilla),
        width: 16, height: 16
      }
    }
}