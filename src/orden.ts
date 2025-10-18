import type { Casilla, coordenada, Mapa } from "./mapa/mapa";
// import type { Unidad } from "./unidades/unidades";
import Konva from "konva";
// import { sleep } from './common.js'
export type direccion = 'arriba'|'izquierda'|'derecha'|'abajo'
const durationMovement = .3

export async function moverUnidad(coordOrigen:coordenada, spriteUnidad:Konva.Sprite, direcciones: direccion[], tamanoCasilla:number, mapa:Mapa):Promise<any>{
  // Regresar un arreglo de las casillas avanzadas
  return new Promise(async (resolve, reject) => {
    const coordDestino = { ...coordOrigen }
    for (const direccion of direcciones) {
      const translateCoord = moverDireccion(direccion)
      if (translateCoord.x === 0 && translateCoord.y === 0) {
        reject()
        return
      }

      const casillaOrigen = mapa.obtenerCasilla(coordDestino) as Casilla
      coordDestino.x += translateCoord.x
      coordDestino.y += translateCoord.y
      const casillaDestino = mapa.obtenerCasilla(coordDestino) as Casilla

      await new Promise((res) => {
        new Konva.Tween({
          node: spriteUnidad,
          duration: durationMovement,
          x: spriteUnidad.x() + tamanoCasilla * translateCoord.x,
          y: spriteUnidad.y() + tamanoCasilla * translateCoord.y,
          onFinish: () => {
            casillaDestino.unidad = casillaOrigen.unidad
            casillaOrigen.unidad = null
            res(true)
          }
        }).play()
      })
      console.log('Siguiente paso')
    }
    resolve(true)
  })
}

function moverDireccion(direccion:direccion){
  switch(direccion){
    case "arriba":
      return {x: 0, y: - 1}
    case "izquierda":
      return {x: - 1, y: 0}
    case "derecha":
      return {x: 1, y: 0}
    case "abajo":
      return {x: 0, y: 1}
    default:
      return {x:0, y: 0}
  }
}