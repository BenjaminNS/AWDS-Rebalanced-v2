import { ListaTerrenos } from './terreno'
import type { nombreTerreno } from './terreno'
import Konva from 'konva'
import { UnidadCasilla, UnidadSimple } from '../unidades/unidades'

export type dimension = {
  filas: number,
  columnas: number
}
export type coordenada = {
  x: number,
  y: number
}

export class CasillaSimple{
  tipo: nombreTerreno;
  propietario: number|null;
  // clima?: Clima
  unidad?: UnidadSimple|null;

  constructor(tipo: nombreTerreno, propietario: number|null, unidad: UnidadSimple|null){
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
export class Casilla{
  tipo: nombreTerreno;
  propietario: number|null;
  sprite: Konva.Image|null; //¿Debería ser spriteTerreno o Konva.Image?
  unidad: UnidadCasilla|null;

  constructor(tipo: nombreTerreno, propietario: number|null, unidad: UnidadCasilla|null){
    if(ListaTerrenos[tipo] == undefined){
      console.error('Tipo de casilla no encontrada: ', tipo)
      this.tipo = 'invalido';
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

  public getTipo = () => {
    return ListaTerrenos[this.tipo]
  }
}



export class Mapa{
  nombre: string;
  dimensiones: dimension
  casillas: Casilla[];
  konvaStage: Konva.Stage|null;
  // modo: 'estricto'|'permisivo'
  // estricto: No permite poner unidades en casillas inválidas
  // permisivo: Permite poner unidades en casillas inválidas
  // ejemplo: submarino en planicies o cualquier unidad en tuberías
  obtenerCasilla = (coord: coordenada):(Casilla|null) => {
    // Fuera del mapa
    if( coord.x < 0 || coord.y < 0 || (coord.y * this.dimensiones.columnas + coord.x) >= this.casillas.length ){
      return null
    } else{
      return this.casillas[( ( coord.y * this.dimensiones.columnas ) + coord.x )]
    }
  }

  // Talvez debería mover esta función a partida
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
    } else if( setComandanteJugables.size < 2 ){
      console.error('Deben haber al menos 2 jugador para que un mapa sea jugable')
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

  public agregarEventoClick(fnClick: (coordenada: coordenada) => any, tamanoCasilla: number){
    // Que sea remplazar el evento, no agregar más
    if( this.konvaStage && tamanoCasilla > 0){
      this.konvaStage?.on('click', () => {
        const pos = this.konvaStage?.getPointerPosition()
        if (!pos) return
        const casillaX = Math.floor(pos.x / tamanoCasilla)
        const casillaY = Math.floor(pos.y / tamanoCasilla)

        fnClick({x: casillaX, y: casillaY})
      })
    }
  }
  public quitarEventoClick(){
    this.konvaStage?.off('click')
  }

  static generarMapaSimple(mapa:Mapa):MapaSimple{
    let _casillasSimples:CasillaSimple[] = [];
    mapa.casillas.forEach(casilla => {
      const _unidadSimple:UnidadSimple|null = casilla.unidad ?
      new UnidadSimple(casilla.unidad.nombreUnidad, casilla.unidad.propietario, casilla.unidad.hp, 
        casilla.unidad.municiones, casilla.unidad.gasActual, casilla.unidad.estado) : null
      // Simplificar: No mandar datos si son nulos para no mandar contenido de más (se reduce el peso casi la mitad cuando no mandas datos nulos)
      
      _casillasSimples.push({ 
        propietario: casilla.propietario, 
        tipo: casilla.tipo, 
        unidad: _unidadSimple
      })
    })

    const _mapaSimple = new MapaSimple(mapa.nombre, mapa.dimensiones, _casillasSimples)
    return _mapaSimple
  }

  static generarMapaCompleto(mapaSimple:MapaSimple):Mapa{
    let _casillasCompletas:Casilla[] = [];
    mapaSimple.casillas.forEach(casillaSimple => {
      const _unidadJuego:UnidadCasilla|null = casillaSimple.unidad ?
      new UnidadCasilla(casillaSimple.unidad.nombreUnidad, casillaSimple.unidad.propietario, casillaSimple.unidad.hp, 
        casillaSimple.unidad.municiones, casillaSimple.unidad.gasActual, casillaSimple.unidad.estado) : null
        _casillasCompletas.push({
          sprite: null,
          propietario: casillaSimple.propietario, 
          tipo: casillaSimple.tipo, 
          unidad: _unidadJuego
        })
    })

    const _mapaCompleto = new Mapa(mapaSimple.nombre, mapaSimple.dimensiones, _casillasCompletas)
    return _mapaCompleto
  }

  static obtenerTerrenos1Tipo(mapa: Mapa|MapaSimple, tipo:nombreTerreno):Set<coordenada|unknown>{
    const setCoordTerrenos = new Set()
    if(!ListaTerrenos[tipo]){
      console.error('No existe ese tipo de terreno: ', tipo)
      return setCoordTerrenos
    }
    if( !mapa || !(mapa instanceof Mapa) && !(mapa instanceof MapaSimple)){
      console.error('El mapa no es válido')
      return setCoordTerrenos
    }

    for (let coordY = 0; coordY < mapa.dimensiones.filas; coordY++) {
      for (let coordX = 0; coordX < mapa.dimensiones.columnas; coordX++) {
        const casillaComparar = mapa.casillas[ ( ( coordY * mapa.dimensiones.columnas ) + coordX ) ]
        if( casillaComparar.tipo === tipo ){
          setCoordTerrenos.add({x: coordX, y: coordY})
        }
      }
    }

    return setCoordTerrenos
  }

  constructor(nombre: string, dimensiones: dimension, casillas: Casilla[]|CasillaSimple[]){
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
  nombre: string;
  dimensiones: dimension
  // clima?: Clima
  // idCreador: number; //Jugador que creo el mapa
  casillas: CasillaSimple[];

  constructor(nombre: string, dimensiones: dimension, casillas: CasillaSimple[]){
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
