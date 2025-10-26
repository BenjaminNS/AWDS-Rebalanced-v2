import type { Casilla, coordenada, Mapa } from "./mapa/mapa";
// import type { Unidad } from "./unidades/unidades";
import Konva from "konva";
import type { Unidad, UnidadCasilla } from "./unidades/unidades";
export type direccion = 'arriba'|'izquierda'|'derecha'|'abajo'
const durationMovement = .3

type nombreAccion = 'esperar'|'atacar'|'combinar'|'capturar'|'abordar' |'soltar' |'construir'|'sumergir'|'subir' |'esconder' |'reaparecer' |'detonar'
type resultadoGenerico = { status: boolean, movimientos: direccion[] }
type ataqueResultado = resultadoGenerico & { danoHecho: number|null, danoRecibido: number|null }
type resultado = resultadoGenerico | ataqueResultado

export class Accion {
  tipo: nombreAccion
  params: Object
  funcionEjecutar: Promise<resultado>

  constructor(tipo:nombreAccion, params: Object, resultado:Promise<resultado>){
    this.tipo = tipo
    this.params = params
    this.funcionEjecutar = resultado
  }
}

export async function moverUnidad(coordOrigen:coordenada, spriteUnidad:Konva.Sprite, direcciones: direccion[], tamanoCasilla:number, mapa:Mapa):Promise<any>{
  // Regresar un arreglo de las casillas avanzadas
  return new Promise(async (resolve, reject) => {
    const coordDestino = { ...coordOrigen }
    const unidadSeleccionada = mapa.obtenerCasilla(coordDestino)?.getUnidad() as UnidadCasilla

    for (const direccion of direcciones) {
      const translateCoord = obtenerDireccion(direccion)
      if (translateCoord.x === 0 && translateCoord.y === 0) {
        reject()
        return
      }

      const casillaOrigen = mapa.obtenerCasilla(coordDestino) as Casilla
      coordDestino.x += translateCoord.x
      coordDestino.y += translateCoord.y
      const casillaDestino = mapa.obtenerCasilla(coordDestino) as Casilla

      if( casillaDestino == null || casillaDestino.getUnidad()?.getTurnos() ){
        // Animación de fallo
        reject()
        return
      } else{
        await new Promise((res) => {
          new Konva.Tween({
            node: spriteUnidad,
            duration: durationMovement,
            x: spriteUnidad.x() + tamanoCasilla * translateCoord.x,
            y: spriteUnidad.y() + tamanoCasilla * translateCoord.y,
            onFinish: () => {
              unidadSeleccionada.gastarGasolinaTerreno(casillaDestino.getTipo())
              casillaDestino.setUnidad(unidadSeleccionada)
              casillaOrigen.setUnidad(null)
              res(true)
            }
          }).play()
        })
      }
    }
    resolve(true)
  })
}

function obtenerDireccion(direccion:direccion){
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

export class OrdenUnidad {
  direcciones: direccion[]
  coordOrigen: coordenada
  accion: Accion

  constructor(coordOrigen:coordenada, direcciones: direccion[], accion: Accion){
    this.direcciones = direcciones
    this.coordOrigen = coordOrigen
    this.accion = accion
  }

  public ejecutarOrden(mapa:Mapa, layerUnidad:Konva.Layer):Promise<resultado>{
    return new Promise(async (resolve, reject) => {
      const casillaSeleccionada = mapa.obtenerCasilla(this.coordOrigen) as Casilla
      this.moverUnidad(mapa, layerUnidad, casillaSeleccionada)
      .then(async (res) => {
        const result = await this.accion.funcionEjecutar()
        if( result.status ){
          resolve(result)
        } else{
          reject(result)
        }
      })
      .catch((res) => {
        reject(res)
      })
    })
  }

  private moverUnidad(mapa:Mapa, layerUnidad:Konva.Layer, casillaSeleccionada:Casilla):Promise<resultadoGenerico>{
    const spriteUnidad = layerUnidad.findOne(`#${casillaSeleccionada.unidad?.id}`) as Konva.Sprite

    return new Promise(async (resolve, reject) => {
    const coordDestino = { ...this.coordOrigen }
    const listaMovimientos:direccion[] = []

    for (const direccion of this.direcciones) {
      const translateCoord = obtenerDireccion(direccion)
      if (translateCoord.x === 0 && translateCoord.y === 0) {
        reject({status: false, movimientos: listaMovimientos})
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
          x: spriteUnidad.x() + mapa.tamanoCasilla * translateCoord.x,
          y: spriteUnidad.y() + mapa.tamanoCasilla * translateCoord.y,
          onFinish: () => {
            listaMovimientos.push(direccion)
            casillaDestino.setUnidad(casillaOrigen.getUnidad())
            casillaOrigen.setUnidad(null)
            res(true)
          }
        }).play()
      })
    }
    resolve({status: true, movimientos: listaMovimientos})
  })
  }
}
