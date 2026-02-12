import { ListaTerrenos } from './terreno'
import type { nombreTerreno, Terreno } from './terreno'
import Konva from 'konva'
import { UnidadCasilla, type UnidadSimple } from '../unidades/unidades'
import { tamanoCasilla } from './spriteTerrenos'
import type { Jugador } from '../jugador'
// import type { equipo } from '../jugador'

export type dimension = {
  filas: number,
  columnas: number
}
export type coordenada = {
  x: number,
  y: number
}

export class CasillaSimple{
  tipo: nombreTerreno
  propietario: number|null
  // clima?: Clima
  unidad?: UnidadSimple|null

  constructor (tipo: nombreTerreno, propietario: number|null, unidad: UnidadSimple|null){
    if (ListaTerrenos[tipo] == undefined){
      console.error('Tipo de casilla no encontrada: ', tipo)
      this.tipo = 'invalido'
    } else {
      this.tipo = tipo
    }
    this.propietario = propietario
    this.unidad = unidad
  }
}
export class Casilla {
  #tipo: nombreTerreno
  #propietario: number|null
  #unidad: UnidadCasilla|null
  sprite: Konva.Image|null // ¿Debería ser spriteTerreno o Konva.Image?

  constructor (tipo: nombreTerreno, propietario: number|null, unidad: UnidadCasilla|null){
    if (ListaTerrenos[tipo] == undefined){
      console.error('Tipo de casilla no encontrada: ', tipo)
      this.#tipo = 'invalido'
      this.#propietario = null
    } else {
      this.#tipo = tipo

      if ( ListaTerrenos[tipo].propiedad != null ){
        this.#propietario = propietario
      } else if ( !ListaTerrenos[tipo].propiedad && propietario != null ) {
        console.error(`No se puede ser dueño de las casillas tipo "${tipo}"`)
        this.#propietario = null
      } else {
        this.#propietario = null
      }
    }

    // ¿Debería validar?
    this.#unidad = unidad
    this.sprite = null
  }

  // Quitar esta función y hacer composición
  public getTerrenoObjeto = ():Terreno|null => {
    return ListaTerrenos[this.#tipo]
  }
  public getTipo = () => {
    return this.#tipo
  }
  public setTipo = (nombreTerreno:nombreTerreno) => {
    this.#tipo = nombreTerreno
  }
  public getPropietario = () => this.#propietario
  public setPropietario (propietario:number|null){
    this.#propietario = propietario
  }
  public getUnidad = () => this.#unidad
  public setUnidad (unidad:UnidadCasilla|null){
    this.#unidad = unidad
  }
  public getSprite (){
    return
  }
  public setSprite (sprite:Konva.Image){
    this.sprite = sprite
  }
}

export class Mapa{
  nombre: string
  dimensiones: dimension
  casillas: Casilla[]
  konvaStage: Konva.Stage|null
  tamanoCasilla = tamanoCasilla
  modo:'estricto'|'permisivo' = 'permisivo'
  #casillasVision:boolean[] = []
  // estricto: No permite poner unidades en casillas inválidas
  // permisivo: Permite poner unidades en casillas inválidas
  // ejemplo: submarino en planicies o cualquier unidad en tuberías
  constructor (nombre: string, dimensiones: dimension, casillas: Casilla[]|CasillaSimple[]){
    this.nombre = nombre
    this.dimensiones = dimensiones
    if (dimensiones.columnas <= 0){
      console.error('columnas menor a 1: ', dimensiones.columnas)
      this.dimensiones.columnas = 1
    }
    if (dimensiones.filas <= 0){
      console.error('filas menor a 1: ', dimensiones.filas)
      this.dimensiones.filas = 1
    }

    // Área de casillas no corresponde con la cantidad de casillas
    if ( casillas.length < ( dimensiones.columnas * dimensiones.filas ) ){
      console.error('El número de casillas es menor que el área definido')
      console.error(`${dimensiones.columnas} x ${dimensiones.filas} = ${dimensiones.columnas * dimensiones.filas}`)
      console.error(`Total de casillas: ${casillas.length}`)
    } else if ( casillas.length > ( dimensiones.columnas * dimensiones.filas ) ){
      console.error('El número de casillas es mayor que el área definido')
      console.error(`${dimensiones.columnas} x ${dimensiones.filas} = ${dimensiones.columnas * dimensiones.filas}`)
      console.error(`Total de casillas: ${casillas.length}`)
    }

    const casillasTemp:Casilla[] = []
    for (const casilla of casillas){
      // if( casilla instanceof Casilla ){
      if ( casilla instanceof Casilla ) {
        casillasTemp.push(casilla)
      } else {
        // ### Aquí haríamos la validación
        // Si los datos no existen desde el json, los ponemos como nulos
        casillasTemp.push(new Casilla(casilla.tipo, casilla.propietario, casilla.unidad))
      }
      this.#casillasVision.push(true)
    }

    this.casillas = casillasTemp
    this.konvaStage = null
  }

  generarUnidadCasilla (unidad:UnidadCasilla, coordenada: coordenada){
    const casillaSeleccionada = this.getCasilla(coordenada)
    if ( casillaSeleccionada != null ){
      casillaSeleccionada.setUnidad(unidad)
    }
  }

  getCasilla = (coord: coordenada):(Casilla|null) => {
    // Fuera del mapa
    if ( coord.x < 0 || coord.y < 0 || (coord.y * this.dimensiones.columnas + coord.x) >= this.casillas.length
      || coord.x >= this.dimensiones.columnas || coord.y >= this.dimensiones.filas ){
      return null
    } else {
      return this.casillas[( ( coord.y * this.dimensiones.columnas ) + coord.x )]
    }
  }

  // Talvez debería mover esta función a partida
  obtenerComandantesJugables = ():Set<number|null> => {
    const setComandanteJugables = new Set()
    for (let i = 0; i < this.casillas.length; i++) {
      if ( typeof this.casillas[i].propietario === 'number' ){
        setComandanteJugables.add(this.casillas[i].propietario)
      }
      if ( this.casillas[i].unidad != null && typeof this.casillas[i].unidad?.propietario === 'number' ){
        setComandanteJugables.add(this.casillas[i].unidad?.propietario)

      }
    }

    return setComandanteJugables
  }

  esMapaValido = ():boolean => {
    const setComandanteJugables = this.obtenerComandantesJugables()

    if ( setComandanteJugables.size == 0 ){
      // console.error('No existen jugadores para este mapa')
      return false
    } else if ( setComandanteJugables.size < 2 ){
      // console.error('Deben haber al menos 2 jugador para que un mapa sea jugable')
      return false
    }

    // Que no falten jugadores (no haya brincos de un jugador a otro)
    const jugadoresFaltantes:number[] = []
    for (let i = 0; i < setComandanteJugables.size; i++) {
      if ( !setComandanteJugables.has(i) ) {
        jugadoresFaltantes.push(i)
        setComandanteJugables.delete(i)
      }
    }
    if ( jugadoresFaltantes.length > 0 ){
      console.error('Hay jugadores faltantes en este mapa', jugadoresFaltantes)
    }

    // Que al menos cada comandante jugable tenga una unidad o al menos algún tipo de fábrica
    for (let i = 0; i < this.casillas.length; i++) {
      // Que al menos cada comandante jugable tenga un tipo de fábrica
      if ( typeof this.casillas[i].propietario === 'number'
        &&
        ( this.casillas[i].tipo === 'fabrica' || this.casillas[i].tipo === 'aeropuerto' || this.casillas[i].tipo === 'puertoNaval' )
      ){
        setComandanteJugables.delete(this.casillas[i].propietario)
      }

      // O al menos una unidad
      if ( this.casillas[i].unidad != null && typeof this.casillas[i].unidad.propietario === 'number' ){
        setComandanteJugables.delete(this.casillas[i].unidad.propietario)
      }
    }
    if ( setComandanteJugables.size > 0 ){
      console.error('Hay jugadores invalidos en este mapa', setComandanteJugables)
    }

    if ( jugadoresFaltantes.length > 0 || setComandanteJugables.size > 0 ){
      return false
    }
    return true
  }

  public agregarEventoClick (fnClick: (coordenada: coordenada) => any, tamanoCasilla: number){
    if ( this.konvaStage && tamanoCasilla > 0){
      const manejarClick = (evt: any) => {
        // Si no es click izquierdo (solo aplica a eventos mouse)
        if ( evt.evt?.button != null && evt.evt.button != 0 ) return

        const pos = this.konvaStage?.getPointerPosition()
        if (!pos) return
        const casillaX = Math.floor(pos.x / tamanoCasilla)
        const casillaY = Math.floor(pos.y / tamanoCasilla)

        fnClick({ x: casillaX, y: casillaY })
      }

      this.konvaStage?.on('tap', manejarClick)
      this.konvaStage?.on('click', manejarClick)
    }
  }
  public quitarEventoClick (){
    this.konvaStage?.off('tap')
    this.konvaStage?.off('click')
  }

  static generarMapaSimple (mapa:Mapa):MapaSimple{
    const _casillasSimples:CasillaSimple[] = []
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

  // ¿Mandar las referencias de los jugadores o comandantes jugables?
  static generarMapaCompleto (mapaSimple:MapaSimple, listaJugadores: Jugador[]):Mapa{
    // listaJugadores[0].getComandantesJugador()
    const _casillasCompletas:Casilla[] = []
    mapaSimple.casillas.forEach(casillaSimple => {

      let refComandante = null
      if ( casillaSimple.unidad?.propietario != null ){
        refComandante = listaJugadores[casillaSimple.unidad.propietario].getComandantesJugador()[0]
      }
      const _unidadJuego:UnidadCasilla|null = casillaSimple.unidad ?
        new UnidadCasilla(casillaSimple.unidad.nombreUnidad, { propietario: casillaSimple.unidad.propietario, hp: casillaSimple.unidad.hp,
          municiones: casillaSimple.unidad.municiones, gasActual: casillaSimple.unidad.gasActual, estado: casillaSimple.unidad.estado, turnos: casillaSimple.unidad.turnos },
        refComandante) : null

      _casillasCompletas.push({
        sprite: null,
        propietario: casillaSimple.propietario,
        tipo: casillaSimple.tipo,
        unidad: _unidadJuego
      })
    })

    return new Mapa(mapaSimple.nombre, mapaSimple.dimensiones, _casillasCompletas)
  }

  habilitarTurnoUnidades1Comandante ( propietario: number ){
    this.casillas.forEach(casilla => {
      if ( casilla.getUnidad()?.getPropietario() === propietario ){
        casilla.getUnidad()?.recuperarTurno()
      }
    })
  }

  static obtenerTerrenos1Tipo (mapa: Mapa|MapaSimple, tipo:nombreTerreno):Set<coordenada|unknown>{
    const setCoordTerrenos = new Set()
    if (!ListaTerrenos[tipo]){
      console.error('No existe ese tipo de terreno: ', tipo)
      return setCoordTerrenos
    }
    if ( !mapa || !(mapa instanceof Mapa) && !(mapa instanceof MapaSimple)){
      console.error('El mapa no es válido')
      return setCoordTerrenos
    }

    for (let coordY = 0; coordY < mapa.dimensiones.filas; coordY++) {
      for (let coordX = 0; coordX < mapa.dimensiones.columnas; coordX++) {
        const casillaComparar = mapa.casillas[ ( ( coordY * mapa.dimensiones.columnas ) + coordX ) ]
        if ( casillaComparar.tipo === tipo ){
          setCoordTerrenos.add({ x: coordX, y: coordY })
        }
      }
    }

    return setCoordTerrenos
  }

  obtenerCoordenadasMovimiento (mapa:Mapa, coordOriginal: coordenada, unidad: UnidadCasilla|undefined|null){
    const listaCoordMovimiento = [{ ...coordOriginal, movDisponible: 0, costo: 0 }]
    if ( unidad == null ){
      return listaCoordMovimiento
    }
    const distanciaMax = Math.min(unidad.getMovilidad(), unidad.getGasActual())
    listaCoordMovimiento[0].movDisponible = distanciaMax

    // El paso puede ser de +0.5 para aceptar movimientos intermedios
    for (let movDisponible = distanciaMax; movDisponible > 0; movDisponible--) {
      const tempCoords = listaCoordMovimiento.filter(coord => coord.movDisponible === movDisponible)

      for (const coord of tempCoords){
        const top = esCoordenadaValida( { ...coord, y: ( coord.y - 1 ) }, this, unidad, listaCoordMovimiento )
        if ( top != null ) {
          listaCoordMovimiento.push(top)
        }
        const left = esCoordenadaValida( { ...coord, x: ( coord.x - 1 ) }, this, unidad, listaCoordMovimiento )
        if ( left != null ) {
          listaCoordMovimiento.push(left)
        }
        const right = esCoordenadaValida( { ...coord, x: ( coord.x + 1 ) }, this, unidad, listaCoordMovimiento )
        if ( right != null ) {
          listaCoordMovimiento.push(right)
        }
        const bottom = esCoordenadaValida( { ...coord, y: ( coord.y + 1 ) }, this, unidad, listaCoordMovimiento )
        if ( bottom != null ) {
          listaCoordMovimiento.push(bottom)
        }
      }
    }

    return listaCoordMovimiento
  }

  // (equipo:equipo, jugadores: jugador[])
  public getCasillasVision (){
    return this.#casillasVision
  }
  public calcularCasillasVision ( propietario:number ){
    this.casillas.forEach((casilla, index) => {
      const unidad = casilla.getUnidad()
      const propietarioPropiedad = casilla.getPropietario()

      // Debería revisar el equipo, no si coincide con el id del jugador
      if ( casilla.getTerrenoObjeto()?.esPropiedad && propietarioPropiedad !== propietario ){
        const coordInicio = { x: index % this.dimensiones.columnas, y: Math.floor(index / this.dimensiones.columnas) }
        this.marcarCasillasVision(coordInicio, 0)
      }

      if ( unidad !== null && unidad.getPropietario() === propietario ){
        const coordInicio = { x: index % this.dimensiones.columnas, y: Math.floor(index / this.dimensiones.columnas) }
        this.marcarCasillasVision(coordInicio, unidad.getVision())
      }
    })
  }

  private marcarCasillasVision (coord:coordenada, vision:number){
    console.log(coord, vision)
    // marcar todas las casillas en falso
    // marcar la casilla indicada
    // marcar casillas alrededor (basandose en la visión)

    // let indexCasilla = getIndexCoord(coord)

    // for (let i = 0; i < vision; i++) {
    //   const element = array[i];
    // }

    // if( indexCasilla !== -1 ){
    //   this.#casillasVision
    // }
  }

  public getIndexCoord (coord:coordenada){
    // Fuera del mapa
    if ( coord.x < 0 || coord.y < 0 || (coord.y * this.dimensiones.columnas + coord.x) >= this.casillas.length
      || coord.x >= this.dimensiones.columnas || coord.y >= this.dimensiones.filas ){
      return -1
    } else {
      return ( ( coord.y * this.dimensiones.columnas ) + coord.x )
    }
  }

  public getListaUnidadesDe1Comandante (numeroComandante: number){
    const listaUnidades:UnidadCasilla[] = []

    this.casillas.forEach(casilla => {
      const unidadTemp = casilla.getUnidad()
      if ( unidadTemp != null && unidadTemp.getPropietario() === numeroComandante ){
        listaUnidades.push(unidadTemp)
      }
    })

    return listaUnidades
  }

  public getListaPropiedades (numeroComandante: number):nombreTerreno[]{
    const listaPropiedades:nombreTerreno[] = []

    this.casillas.forEach(casilla => {
      if ( casilla.getPropietario() === numeroComandante ){
        listaPropiedades.push(casilla.getTipo())
      }
    })

    return listaPropiedades
  }
}

const casAdyacentes:{ top: any|null, left: any|null, right: any|null, bottom: any|null } = { top: null, left: null, right: null, bottom: null }
// type casillaAlcanzable = {x: number, y: number, movDisponible: number}
// type casillaAdyacente = {
//   top: casillaAlcanzable, top
// }

export class MapaSimple{
  nombre: string
  dimensiones: dimension
  // clima?: Clima
  // idCreador: number; //Jugador que creo el mapa
  casillas: CasillaSimple[]

  constructor (nombre: string, dimensiones: dimension, casillas: CasillaSimple[]){
    this.nombre = nombre
    this.dimensiones = dimensiones
    if (dimensiones.columnas <= 0){
      console.error('columnas menor a 1: ', dimensiones.columnas)
      this.dimensiones.columnas = 1
    }
    if (dimensiones.filas <= 0){
      console.error('filas menor a 1: ', dimensiones.filas)
      this.dimensiones.filas = 1
    }

    // Área de casillas no corresponde con la cantidad de casillas
    if ( casillas.length < ( dimensiones.columnas * dimensiones.filas ) ){
      console.error('El número de casillas es menor que el área definido')
      console.error(`${dimensiones.columnas} x ${dimensiones.filas} = ${dimensiones.columnas * dimensiones.filas}`)
      console.error(`Total de casillas: ${casillas.length}`)
    } else if ( casillas.length > ( dimensiones.columnas * dimensiones.filas ) ){
      console.error('El número de casillas es mayor que el área definido')
      console.error(`${dimensiones.columnas} x ${dimensiones.filas} = ${dimensiones.columnas * dimensiones.filas}`)
      console.error(`Total de casillas: ${casillas.length}`)
    }

    this.casillas = casillas
  }
}

function esCoordenadaValida (coordDato: {x: number, y: number, movDisponible: number}, mapa: Mapa,
  unidad: UnidadCasilla, coordCasillas: {x: number, y: number, movDisponible: number}[]):{x: number, y: number, movDisponible: number, costo: number}|null{
  const casillaValida = mapa.getCasilla(coordDato)
  if ( casillaValida == null ) return null

  const objTerreno = casillaValida.getTerrenoObjeto()
  if ( objTerreno == null ) return null

  const costoMovimiento = objTerreno.costosMovimientos[unidad.getTipoMovimiento()]
  if ( costoMovimiento == null ) return null

  if ( ( coordDato.movDisponible - costoMovimiento ) < 0 ) return null

  // Falta calcular la vista (en caso de ser dia soleado, el mapa de vista siempre lo ve todo)
  const unidadCasilla = casillaValida.getUnidad()
  const indexCoord = mapa.getIndexCoord(coordDato)
  if ( indexCoord !== -1 && mapa.getCasillasVision()[indexCoord] && unidadCasilla && unidadCasilla.getPropietario() !== unidad.getPropietario() ){
    return null
  }

  // Si ya existe la coordenada con dist
  const coordExistente = coordCasillas.find(c => c.x === coordDato.x && c.y === coordDato.y && c.movDisponible >= coordDato.movDisponible )
  if ( coordExistente != null ) return null

  return { ...coordDato, movDisponible: ( coordDato.movDisponible - costoMovimiento ), costo: costoMovimiento }
}
