import Konva from 'konva'
import spritesheet from '/img/unidades/Units-Spritesheet.png'
const UnitSpritesheet = new window.Image()
UnitSpritesheet.src = spritesheet
const tamanoSprite = 16

type spriteAnimations = {
  'idle': number[],
  'derecha': number[],
  'abajo': number[]
}

type spriteUnidad = {
  image: ImageData,
  animations: spriteAnimations
  animation: 'idle'|'derecha'|'izquierda'|'arriba'|'abajo',
  frameRate: 3,
  frameIndex: 0
}
// [xInicial, yInicial, ancho, alto]

export const spriteInfanteria = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (3 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteMecha = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (2 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
// export const spriteMotocicletas = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
// export const spriteSniper = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
export const spriteRecon = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (1 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteTanqueLigero = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (3 * tamanoSprite), (1 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteTanqueMediano = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (2 * tamanoSprite), (1 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteNeotanque = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (0 * tamanoSprite), (1 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
// export const spriteMegatanque = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
export const spriteApc = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteArtilleria = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (2 * tamanoSprite), (2 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteCohetes = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (1 * tamanoSprite), (2 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteTanqueAntiaereo = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (1 * tamanoSprite), (1 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteMisiles = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (0 * tamanoSprite), (2 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
// export const spritePiperunner = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
export const spriteBCopter = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (1 * tamanoSprite), (3 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteTCopter = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (0 * tamanoSprite), (3 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteFighter = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (3 * tamanoSprite), (3 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteBomber = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (2 * tamanoSprite), (3 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
// export const spriteStealthFighter = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
// export const spriteBlackBomb = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
export const spriteLander = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (0 * tamanoSprite), (4 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
// export const spriteBlackBoat = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
export const spriteCruiser = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (2 * tamanoSprite), (4 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteSubmarino = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (1 * tamanoSprite), (4 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
export const spriteBattleship = new Konva.Sprite({
  image: UnitSpritesheet,
  animations: {
    'idle': [
      (3 * tamanoSprite), (4 * tamanoSprite), tamanoSprite, tamanoSprite
    ]
  },
  animation: 'idle', frameRate: 3, frameIndex: 0
})
// export const spriteCarrier = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
// export const spriteLanchas = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (0 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite,
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
