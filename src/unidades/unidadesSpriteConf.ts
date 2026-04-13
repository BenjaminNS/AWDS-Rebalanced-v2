import spritesheet from '/img/unidades/Units-Spritesheet.png'
export const UnitSpritesheet = new window.Image()
UnitSpritesheet.src = spritesheet
export const tamanoSprite = 16

type spriteAnimations = {
  'idle': number[],
  'derecha': number[],
  'abajo': number[]
}

export type spriteUnidad = {
  image: ImageData,
  animations: spriteAnimations
  animation: 'idle'|'no-turno'|'derecha'|'izquierda'|'arriba'|'abajo',
  frameRate: 3,
  frameIndex: 0
}
// export const spriteInfanteria = new Konva.Sprite({
//   image: UnitSpritesheet,
//   animations: {
//     'idle': [
//       (3 * tamanoSprite), (0 * tamanoSprite), tamanoSprite, tamanoSprite
//     ]
//   },
//   animation: 'idle', frameRate: 3, frameIndex: 0
// })
// [xInicial, yInicial, ancho, alto]
