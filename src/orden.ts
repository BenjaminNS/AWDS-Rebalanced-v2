import { type Casilla, type coordenada, Mapa } from './mapa/mapa'
// import type { Unidad } from "./unidades/unidades";
import Konva from 'konva'
import type { Unidad, UnidadCasilla } from './unidades/unidades'
import { generarCoordenadaVector } from './camino'
import { type direccion } from './camino'
const durationMovement = .25

type nombreAccion = 'esperar'|'atacar'|'combinar'|'capturar'|'abordar' |'soltar' |'construir'|'sumergir'|'subir' |'esconder'|'reaparecer' |'detonar'|'seleccionar unidad'|'seleccionar propiedad'|'unidad movida'
type resultadoGenerico = { status: boolean, movimientos: direccion[] }
type ataqueResultado = resultadoGenerico & { danoHecho: number|null, danoRecibido: number|null }
type resultado = resultadoGenerico | ataqueResultado

export class Accion {
  tipo: nombreAccion
  params: object
  funcionEjecutar: Promise<resultado>

  constructor (tipo:nombreAccion, params: object, resultado:Promise<resultado>){
    this.tipo = tipo
    this.params = params
    this.funcionEjecutar = resultado
  }

  // static getSiguientesAcciones(mapa:Mapa, coordDestino:coordenada, ultimaAccion:nombreAccion){
  //   switch(ultimaAccion){
  //     case 'unidad movida':{
  //         const unidad = mapa.getCasilla(coordDestino)?.getUnidad()
  //         const opcionesMenu = obtenerOpcionesMenu(unidad, coordDestino, ultimaAccion)
  //         mostrarMenu(opcionesMenu)
  //         return opcionesMenu
  //       }
  //     case 'seleccionar unidad':{
  //         const unidad = mapa.getCasilla(coordDestino)?.getUnidad()
  //         const coordSeleccionadas = mapa.obtenerCoordenadasMovimiento(mapa, coordDestino, unidad)
  //         mostrarCasillas(this.layerCasillas, coordSeleccionadas)
  //       }
  //       return 'escoger camino'
  //     default:
  //       return null
  //   }
  // }
}

export class Orden {
  private coordOrigen: coordenada
  private idComandanteJugable: number
  private acciones: Accion[]
  private accionActual = 0

  constructor (coordOrigen:coordenada, idComandanteJugable: number, acciones: Accion[]){
    this.coordOrigen = coordOrigen
    this.idComandanteJugable = idComandanteJugable
    this.acciones = acciones
  }

  public getCoordOrigen (){
    return this.coordOrigen
  }
  public setCoordOrigen (coordOrigen: coordenada){
    this.coordOrigen = coordOrigen
  }
  public getIdComandanteJugable (){
    return this.idComandanteJugable
  }
  public setIdComandanteJugable (idComandanteJugable:number){
    this.idComandanteJugable = idComandanteJugable
  }
  public getAcciones (){
    return this.acciones
  }
  public agregarAccion (accion:Accion){
    this.acciones.push(accion)
  }
  public borrarUltimaAccion (){
    this.acciones.pop()
  }
  public limpiarAcciones (){
    this.acciones = []
    this.accionActual = 0
  }

  public ejecutarAcciones (){

  }
}

export class OrdenUnidad {
  direcciones: direccion[]
  coordOrigen: coordenada
  accion: Accion

  constructor (coordOrigen:coordenada, direcciones: direccion[], accion: Accion){
    this.direcciones = direcciones
    this.coordOrigen = coordOrigen
    this.accion = accion
  }

  public ejecutarOrden (mapa:Mapa, layerUnidad:Konva.Layer):Promise<resultado>{
    return new Promise(async (resolve, reject) => {
      const casillaSeleccionada = mapa.getCasilla(this.coordOrigen) as Casilla
      this.moverUnidad(mapa, layerUnidad, casillaSeleccionada)
        .then(async (res) => {
          const result = await this.accion.funcionEjecutar()
          if ( result.status ){
            resolve(result)
          } else {
            reject(result)
          }
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  private moverUnidad (mapa:Mapa, layerUnidad:Konva.Layer, casillaSeleccionada:Casilla):Promise<resultadoGenerico>{
    const spriteUnidad = layerUnidad.findOne(`#${casillaSeleccionada.getUnidad()?.id}`) as Konva.Sprite

    return new Promise(async (resolve, reject) => {
      const coordDestino = { ...this.coordOrigen }
      const listaMovimientos:direccion[] = []

      for (const direccion of this.direcciones) {
        const translateCoord = generarCoordenadaVector(direccion)
        if (translateCoord.x === 0 && translateCoord.y === 0) {
          reject({ status: false, movimientos: listaMovimientos })
          return
        }

        const casillaOrigen = mapa.getCasilla(coordDestino) as Casilla
        coordDestino.x += translateCoord.x
        coordDestino.y += translateCoord.y
        const casillaDestino = mapa.getCasilla(coordDestino) as Casilla

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
      resolve({ status: true, movimientos: listaMovimientos })
    })
  }
}

export async function moverUnidad (coordOrigen:coordenada, spriteUnidad:Konva.Sprite, direcciones: (direccion|'ninguno')[], tamanoCasilla:number, mapa:Mapa):Promise<boolean>{
  // Regresar un arreglo de las casillas avanzadas
  return new Promise(async (resolve, reject) => {
    const coordDestino = { ...coordOrigen }
    const casillaOrigen = mapa.getCasilla(coordDestino) as Casilla
    let casillaFinal = mapa.getCasilla(coordDestino) as Casilla
    let casillaDestino = mapa.getCasilla(coordDestino) as Casilla
    const unidadSeleccionada = mapa.getCasilla(coordDestino)?.getUnidad() as UnidadCasilla

    for (const direccion of direcciones) {
      const translateCoord = generarCoordenadaVector(direccion)
      if (translateCoord.x === 0 && translateCoord.y === 0) {
        reject()
        return
      }

      coordDestino.x += translateCoord.x
      coordDestino.y += translateCoord.y
      casillaDestino = mapa.getCasilla(coordDestino) as Casilla

      if ( casillaDestino == null || casillaDestino.getUnidad()?.getTurnos() ){
        casillaOrigen.setUnidad(null)
        casillaFinal.setUnidad(unidadSeleccionada)
        reject()
        return
      } else {
        await new Promise((res) => {
          new Konva.Tween({
            node: spriteUnidad,
            duration: durationMovement,
            x: spriteUnidad.x() + tamanoCasilla * translateCoord.x,
            y: spriteUnidad.y() + tamanoCasilla * translateCoord.y,
            onFinish: () => {
              unidadSeleccionada.gastarGasolinaTerreno(casillaDestino.getTipo())
              casillaFinal = mapa.getCasilla(coordDestino) as Casilla
              res(true)
            }
          }).play()
        })
      }
    }

    casillaOrigen.setUnidad(null)
    casillaFinal.setUnidad(unidadSeleccionada)
    resolve(true)
  })
}
