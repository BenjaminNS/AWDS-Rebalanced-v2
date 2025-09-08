import { ListaTerrenos } from './terreno'
import type { nombreTerreno } from './terreno'
import Konva from 'konva'
import { UnidadCasilla } from '../unidades/unidades'

export type dimension = {
  filas: number,
  columnas: number
}
export type coordenada = {
  x: number,
  y: number
}

// export type CasillaSimple = {
//   tipo: nombreTerreno,
//   propietario: number|null,
//   unidad: UnidadCasilla|null
// }
// type KonvaSprite = Konva.Sprite|null
// export type Casilla = CasillaSimple & KonvaSprite
// export type MapaObjeto = {
//   nombre: String,
//   dimensiones: dimension,
//   casillas: Casilla[]
//   konvaStage: Konva.Stage|null;
//   obtenerCasilla: Function;
// }

export class Casilla{
  tipo: nombreTerreno;
  propietario: number|null;
  sprite: Konva.Sprite|null; //¿Debería ser spriteTerreno?
  unidad: UnidadCasilla|null;

  constructor(tipo: nombreTerreno, propietario: number|null, unidad: UnidadCasilla|null){
    if(ListaTerrenos[tipo] == undefined){
      console.error('Tipo de casilla no encontrada: ', tipo)
      this.tipo = 'invalido';
      // si es invalido, nadie puede ser dueño de esa casilla
      this.propietario = null
    } else{
      this.tipo=tipo;

      if( ListaTerrenos[tipo].esPropiedad ){
        this.propietario=propietario;
      } else if ( !ListaTerrenos[tipo].esPropiedad && propietario != null ) {
        console.error(`No se puede ser dueño de las casillas tipo "${tipo}"`)
        this.propietario=null;
      } else{
        this.propietario=null;
      }
    }
    
    // ¿Debería validar?
    this.unidad = unidad;
    this.sprite = null;
  }
}

export class CasillaSimple{
  tipo: nombreTerreno;
  propietario: number|null;
  unidad: UnidadCasilla|null;

  constructor(tipo: nombreTerreno, propietario: number|null, unidad: UnidadCasilla|null){
    if(ListaTerrenos[tipo] == undefined){
      console.error('Tipo de casilla no encontrada: ', tipo)
      this.tipo='invalido';
    } else{
      this.tipo=tipo;
    }
    this.propietario = propietario;
    this.unidad = unidad;
  }
}

export class Mapa{
  nombre: string;
  dimensiones: dimension
  casillas: Casilla[];
  // numeroJugadores: number; //Tentativo, así podemos cuidar que no haya más jugadores de los esperados
  konvaStage: Konva.Stage|null;
  obtenerCasilla = (coord: coordenada):(nombreTerreno|'inexistente') => {
    // Fuera del mapa
    if( coord.x < 0 || coord.y < 0 || (coord.y * this.dimensiones.columnas + coord.x) >= this.casillas.length ){
      return 'inexistente'
    } else{
      return this.casillas[( ( coord.y * this.dimensiones.columnas ) + coord.x )].tipo
    }
  }

  obtenerComandantesJugables = ():Set<number|null> =>{
    const setComandanteJugables = new Set()
    for (let i = 0; i < this.casillas.length; i++) {
      if( typeof this.casillas[i].propietario === 'number' ){
        setComandanteJugables.add(this.casillas[i].propietario)
      }
      if( this.casillas[i].unidad != null && typeof this.casillas[i].unidad?.propietario === 'number' ){
        setComandanteJugables.add(this.casillas[i].unidad?.propietario)

      }
    }

    return setComandanteJugables;
  }

  esMapaValido = ():boolean => {
    const setComandanteJugables = this.obtenerComandantesJugables()

    if( setComandanteJugables.size == 0 ){
      console.error('No existen jugadores para este mapa')
      return false
    }

    // Que no falten jugadores (no haya brincos de un jugador a otro)
    let jugadoresFaltantes:number[] = []
    for (let i = 0; i < setComandanteJugables.size; i++) {
      if( !setComandanteJugables.has(i) ) {
        jugadoresFaltantes.push(i)
        setComandanteJugables.delete(i)
      }
    }
    if( jugadoresFaltantes.length > 0  ){
      console.error('Hay jugadores faltantes en este mapa', jugadoresFaltantes)
    }


    // Que al menos cada comandante jugable tenga una unidad o al menos algún tipo de fábrica
    for (let i = 0; i < this.casillas.length; i++) {
      // Que al menos cada comandante jugable tenga un tipo de fábrica
      if( typeof this.casillas[i].propietario === 'number' 
        && 
        ( this.casillas[i].tipo === 'fabrica' || this.casillas[i].tipo === 'aeropuerto' || this.casillas[i].tipo === 'puertoNaval' )
      ){
        setComandanteJugables.delete(this.casillas[i].propietario)
      }

      // O al menos una unidad
      if( this.casillas[i].unidad != null && typeof this.casillas[i].unidad.propietario === 'number' ){
        setComandanteJugables.delete(this.casillas[i].unidad.propietario)
      }
    }
    if( setComandanteJugables.size > 0 ){
      console.error('Hay jugadores invalidos en este mapa', setComandanteJugables)
    }


    if( jugadoresFaltantes.length > 0 || setComandanteJugables.size > 0 ){
      return false
    }
    return true
  }

  constructor(nombre: string, dimensiones: dimension, casillas: Casilla[]){
    this.nombre=nombre;
    this.dimensiones = dimensiones
    if(dimensiones.columnas <= 0){
      console.error('columnas menor a 1: ', dimensiones.columnas)
      this.dimensiones.columnas=1;
    }
    if(dimensiones.filas <= 0){
      console.error('filas menor a 1: ', dimensiones.filas)
      this.dimensiones.filas=1;
    }

    // Área de casillas no corresponde con la cantidad de casillas
    if( casillas.length < ( dimensiones.columnas * dimensiones.filas ) ){
      console.error('El número de casillas es menor que el área definido')
      console.error(`${dimensiones.columnas} x ${dimensiones.filas} = ${dimensiones.columnas * dimensiones.filas}`)
      console.error(`Total de casillas: ${casillas.length}`)
    } else if( casillas.length > ( dimensiones.columnas * dimensiones.filas ) ){
      console.error('El número de casillas es mayor que el área definido')
      console.error(`${dimensiones.columnas} x ${dimensiones.filas} = ${dimensiones.columnas * dimensiones.filas}`)
      console.error(`Total de casillas: ${casillas.length}`)
    }

    this.casillas = casillas
    this.konvaStage = null
  }
}

export class MapaSimple{
  nombre: String;
  dimensiones: dimension
  casillas: Casilla[];

  constructor(nombre: string, dimensiones: dimension, casillas: Casilla[]){
    this.nombre=nombre;
    this.dimensiones = dimensiones
    if(dimensiones.columnas <= 0){
      console.error('columnas menor a 1: ', dimensiones.columnas)
      this.dimensiones.columnas=1;
    }
    if(dimensiones.filas <= 0){
      console.error('filas menor a 1: ', dimensiones.filas)
      this.dimensiones.filas=1;
    }

    // Área de casillas no corresponde con la cantidad de casillas
    if( casillas.length < ( dimensiones.columnas * dimensiones.filas ) ){
      console.error('El número de casillas es menor que el área definido')
      console.error(`${dimensiones.columnas} x ${dimensiones.filas} = ${dimensiones.columnas * dimensiones.filas}`)
      console.error(`Total de casillas: ${casillas.length}`)
    } else if( casillas.length > ( dimensiones.columnas * dimensiones.filas ) ){
      console.error('El número de casillas es mayor que el área definido')
      console.error(`${dimensiones.columnas} x ${dimensiones.filas} = ${dimensiones.columnas * dimensiones.filas}`)
      console.error(`Total de casillas: ${casillas.length}`)
    }

    this.casillas=casillas;
  }
}
