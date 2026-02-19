import Konva from 'konva'
import {
  // spriteMotocicletas, spriteSniper, spriteMegatanque, spritePiperunner, spriteStealthFighter,
  // spriteBlackBomb, spriteBlackBoat, spriteCarrier, spriteLanchas
  spriteInfanteria, spriteMecha, spriteRecon, spriteTanqueLigero, spriteTanqueMediano, spriteNeotanque,
  spriteApc, spriteArtilleria, spriteCohetes, spriteTanqueAntiaereo, spriteMisiles,
  spriteBCopter, spriteTCopter, spriteFighter, spriteBomber,
  spriteLander, spriteCruiser, spriteSubmarino, spriteBattleship
} from './spriteUnidades'

export type nombreUnidad = 'infanteria'|'mecha'|'recon'|'tanqueLigero'|'tanqueMediano'|'neotanque'|'megatanque'|'apc'|'artilleria'|'cohetes'|'tanqueAntiaereo'|'misiles'|'piperunner'|'bCopter'|'tCopter'|'fighter'|'bomber'|'stealthFighter'|'blackBomb'|'lander'|'cruiser'|'submarino'|'battleship'|'carrier'|'blackBoat'|'motocicletas'|'lanchas'|'sniper'
export type municiones = {
  principal: number|null,
  secundaria?: number|null,
}
export type tipoMovimiento = 'pie'|'mecha'|'ruedas'|'oruga'|'piperunner'|'aereo'|'naval';
// Se supone que si es soldado, no puede ser vehiculo
// Y si es Terrestre, no puede ser aereo o naval
// No hay problema si se empalma Directo, Indirecto y Transporte
// Técnicamente lo de directo e indirecto tendría que ser con una función que verifique si el rango minimo es de 1 y el rango máximo es de 2
export type categoriaUnidad = 'Soldado'|'Vehiculo'|'Directo'|'Indirecto'|'Transporte'|'Terrestre'|'Aereo'|'Naval'|'Antiaereo';
// Ocupo que las mismas habilidades indiquen si son posibles de realizar en ese momento o no
export type habilidades = {
  esperar: () => void,
  atacar?: () => void,
  combinar: () => void,
  capturar?: () => void,
  abordar?: () => void,
  soltar?: () => void,
  construir?: () => void,
  sumergir?: () => void,
  subir?: () => void,
  esconder?: () => void,
  reaparecer?: () => void,
  detonar?: () => void
}

// Necesario para submarinos y Stealth Fighters
export type estado = 'normal'|'oculto';

export type Matchup = Partial<Record<nombreUnidad, {base: number, suertePositiva: number} | null>>

export type UnidadInfoBasica = {
  nombreLargo: string
  nombreCorto: nombreUnidad
  descripcion: string
  categorias: categoriaUnidad[]
  costo: number // Gold
  rango: {minimo: number, extra: number}|null
  movilidad: number
  tipoMovimiento: tipoMovimiento
  vision: number
  maxGasolina: number
  consumoDiario: (estado:estado)=> number
  maxMuniciones: municiones|null
  atacarYMoverse: boolean
  contraataque: number|null
  sprite: Konva.Sprite
  // habilidadesEspeciales: habilidades[]
  matchups: Matchup
}

export function getInfoBasica (nombre: nombreUnidad) : UnidadInfoBasica|null {
  switch (nombre){
  case 'infanteria':
    return ListaUnidades['infanteria']
  case 'mecha':
    return ListaUnidades['mecha']
  case 'recon':
    return ListaUnidades['recon']
  case 'tanqueLigero':
    return ListaUnidades['tanqueLigero']
  case 'tanqueMediano':
    return ListaUnidades['tanqueMediano']
  case 'neotanque':
    return ListaUnidades['neotanque']
    // case 'megatanque':
    // megatanque {
    //   nombreLargo: 'Mega Tanque', nombreCorto: 'megatanque', descripcion: 'El súper tanque. Capaz de asestar un daño letal contra todos los vehiculos terrestres y daño significativo a unidades navales y aéreas.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //   costo: 28000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: truematchups: matchupTemp, , sprite:
    // }

    // 'APC', 'Vehiculo de transporte capaz de mover soldados, reponer municiones y gasolina a todas las unidades y *puede construir aeropuertos y puertos navales temporales.', ['Vehiculo', 'Terrestre', 'Transporte'],
    // 4000, 1, 1, 6, 'oruga', 1, 99, (estado: estado) => {return 0}, null, 1, true, spriteApc
  case 'apc':
    return ListaUnidades['apc']
    // 'Artillería', 'Vehículo indirecto efectivo contra unidades terrestres y navales.', ['Soldado', 'Terrestre', 'Indirecto'],
    // 25000, 1, 1, 4, 'oruga', 1, 50, (estado: estado)=>{return 0}, {'principal': 4, 'secundaria': 8 }, 1, true, spriteMegatanque
  case 'artilleria':
    return ListaUnidades['artilleria']
    // 'Cohetes', 'Vehículo indirecto potente y de buen alcance contra unidades terrestres y navales..', ['Vehiculo', 'Terrestre', 'Directo'],
    // 15000, 2, 5, 5, 'ruedas', 3, 50, (estado: estado) => {return 0}, { 'principal': 7 }, 0, false, spriteCohetes
  case 'cohetes':
    return ListaUnidades['cohetes']
    // 'Tanque Antiaéreo', 'Vehículo directo terrestre letal contra vehículos aéreos.', ['Vehiculo', 'Terrestre', 'Directo', 'Antiaereo'],
    // 6000, 2, 3, 5, 'oruga', 2, 50, (estado: estado) => {return 0}, { 'principal': 7 }, 0, false, spriteArtilleria
  case 'tanqueAntiaereo':
    return ListaUnidades['tanqueAntiaereo']
    // 'Misiles', 'Vehículo indirecto letal contra todos tipo de unidades aéreas y que cubre una vasta área.', ['Soldado', 'Terrestre', 'Directo'],
    // 12000, 3, 6, 5, 'ruedas', 5, 40, (estado: estado) => {return 0}, { 'principal': 6 }, 0, false, spriteMisiles
  case 'misiles':
    return ListaUnidades['misiles']
    // case 'piperunner':
    // 'Pipe', 'Vehículo indirecto que solo puede moverse a través de pipes.', ['Soldado', 'Terrestre', 'Directopiperunner],
    // 15000, 2, 5, 9, 'piperunner', 3, 99, (estado: estado)=>{return 0}, {'principal': 8 }, 0, false, spritePiperunner
    //   }
    // 'Battle Copter', 'Helicóptero efectivo contra vehiculos pequeños, soldados y otros helicópteros.', ['Vehiculo', 'Aereo', 'Directo'],
    // 9000, 1, 1, 6, 'aereo', 3, 99, (estado: estado) => {return 2}, { 'principal': 6, 'secundaria': 6 }, 1, true, spriteBCopter
  case 'bCopter':
    return ListaUnidades['bCopter']
    // 'Transport Copter', 'Helicóptero capaz de transportar soldados a cualquier zona del mapa.', ['Vehiculo', 'Aereo', 'Transporte'],
    // 5000, 1, 1, 6, 'aereo', 2, 99, (estado: estado) => {return 2}, null, 1, true, spriteTCopter
  case 'tCopter':
    return ListaUnidades['tCopter']
    // 'Fighter', 'El mejor antiaéreo aéreo. Letal contra todas las demás unidades, la mejor movilidad y excelente visión.', ['Vehiculo', 'Aereo', 'Directo', 'Antiaereo'],
    // 19000, 1, 1, 9, 'aereo', 5, 110, (estado: estado) => {return 5}, { 'principal': 8 }, 1, true, spriteFighter
  case 'fighter':
    return ListaUnidades['fighter']
    // 'Bomber', 'Unidad áerea poderosa contra vehículos terrestres y navales.', ['Vehiculo', 'Aereo', 'Directo'],
    // 20000, 1, 1, 7, 'aereo', 3, 99, (estado: estado) => {return 5}, { 'principal': 8 }, 1, true, spriteBomber
  case 'bomber':
    return ListaUnidades['bomber']
    // case 'stealthFighter':
    // 'Stealth Fighter', 'Vehiculo aereo capaz de ocultarse y atacar a todo tipo de unidades.', ['Vehiculo', 'Aereo', 'DirectostealthFighter],
    // 24000, 1, 1, 6, 'aereo', 2, 60, (estado: estado)=
    //   return {
    //     nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //     costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteInfanteria
    //   }
    // case 'blackBomb':
    //   // 'Black Bomb', 'Unidad aérea capaz de autodetonarse y causar un potente daño amplio de área.', ['Aereo', 'DirectoblackBomb],
    //   // 30000, 1, 1, 9, 'aereo', 1, 40, (estado: estado)=>{return 5}, null, 0, false, spriteBlackBomb
    //   return {
    //     nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //     costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteInfanteria
    //   }
    // 'Lander', 'Unidad de transporte naval. Puede mover hasta 2 unidades terrestres de cualquier tipo.', ['Vehiculo', 'Naval', 'Transporte'],
    // 8000, 1, 1, 6, 'naval', 2, 99, (estado: estado) => {return 1}, null, 0, false, spriteLander
  case 'lander':
    return ListaUnidades['lander']
    // 'Cruiser', 'Unidad naval eficaz contra unidades aéreas y submarinos.', ['Vehiculo', 'Naval', 'Directo', 'Antiaereo', 'Transporte'],
    // 12000, 1, 1, 6, 'naval', 3, 80, (estado: estado) => {return 1}, { 'principal': 8 }, 1, true, spriteCruiser
  case 'cruiser':
    return ListaUnidades['cruiser']
    // 'Submarino', 'Unidad naval efectivo contra unidades navales y capaz de esconderse.', ['Vehiculo', 'Naval', 'Directo'],
    // 1000, 1, 1, 6, 'naval', 5, 70, (estado: estado) =>
  case 'submarino':
    return ListaUnidades['submarino']
    // 'Battleship', 'Unidad indirecta naval capaz de moverse y atacar en el mismo turno.', ['Vehiculo', 'Naval', 'Indirecto'],
    // 20000, 2, 3, 5, 'naval', 3, 70, (estado: estado) => {return 1}, { 'principal': 7 }, 0, true, spriteBattleship
  case 'battleship':
    return ListaUnidades['battleship']
    //   case 'carrier':
    //     // 'Carrier', 'Unidad antiaérea a distancia, capaz de hacer 2 acciones en un mismo turno y de reparar unidades aéreas abordo.', ['Vehiculo', 'Naval', 'Indirecto', 'Antiaereo', 'Transportecarrier],
    //     // 25000, 3, 7, 5, 'naval', 2, 70, (estado: estado) => {return 1}, null, 0, false, spriteBlackBoat
    //     return {
    //       nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //       costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteInfanteria
    //     }
    //   case 'blackBoat':
    //     // 'Black Boat', 'Unidad de transporte naval que puede mover hasta 2 soldados y puede reparar y reponer a otras unidades.', ['Vehiculo', 'Naval', 'TransporteblackBoat],
    //     // 7000, 1, 1, 7, 'naval', 1, 60, (estado: estado) => {return 1}, null, 0, false, spriteCruiser
    //     return {
    //       nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //       costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteInfanteria
    //     }
    // case 'motocicletas':
    //   motocicletas {
    //     nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //     costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteInfanteria
    //   }
    // case 'lanchas':
    // 'Infantería', 'Soldado capaz de capturar propiedades.', ['Soldado', 'Naval', 'Directolanchas],
    // 3500, 1, 1, 4, 'pie', 2, 60, (estado: estado) => {return 1}, { 'principal': 6 }, 1, true, spriteLanchas
    // return {
    //   nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //   costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteInfanteria
    // }
    // case 'sniper':
    //   sniper {
    //     nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //     costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteInfanteria
    //   }
  default:
    return null
  }
}

// : { [key: string]: InfoBasica
type listaUnidades = {
  'infanteria': UnidadInfoBasica
  'mecha': UnidadInfoBasica
  'recon': UnidadInfoBasica
  'tanqueLigero': UnidadInfoBasica
  'tanqueMediano': UnidadInfoBasica
  'neotanque': UnidadInfoBasica
  'apc': UnidadInfoBasica
  'artilleria': UnidadInfoBasica
  'cohetes': UnidadInfoBasica
  'tanqueAntiaereo': UnidadInfoBasica
  'misiles': UnidadInfoBasica
  'bCopter': UnidadInfoBasica
  'tCopter': UnidadInfoBasica
  'fighter': UnidadInfoBasica
  'bomber': UnidadInfoBasica
  'lander': UnidadInfoBasica
  'cruiser': UnidadInfoBasica
  'submarino': UnidadInfoBasica
  'battleship': UnidadInfoBasica
}

const matchupTemp:Matchup = {
  apc: { base: 50, suertePositiva: 9 }
}
export const ListaUnidades:listaUnidades = {
  'infanteria': {
    nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteInfanteria
  },
  'mecha': {
    nombreLargo: 'Mecha', nombreCorto: 'mecha', descripcion: 'Soldado que puede atacar vehiculos y capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    costo: 3000, rango: { minimo: 1, extra: 0 }, movilidad: 2, tipoMovimiento: 'mecha', vision: 2, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': 4, 'secundaria': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteMecha
  },
  'recon': {
    nombreLargo: 'Recon', nombreCorto: 'recon', descripcion: 'Vehículo pequeño con alta visión, eficiente contra soldados.', categorias: ['Vehiculo', 'Terrestre', 'Directo'],
    costo: 4000, rango: { minimo: 1, extra: 0 }, movilidad: 8, tipoMovimiento: 'ruedas', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 8 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteRecon
  },
  'tanqueLigero': {
    nombreLargo: 'Tanque Ligero', nombreCorto: 'tanqueLigero', descripcion: 'Tanque ágil eficaz contra otros vehiculos terrestres iguales o más pequeños y contra soldados.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    costo: 7000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 70, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteTanqueLigero
  },
  'tanqueMediano': {
    nombreLargo: 'Tanque Mediano', nombreCorto: 'tanqueMediano', descripcion: 'Tanque pesado muy efectivo contra todos los vehiculos terrestres.', categorias: ['Vehiculo', 'Terrestre', 'Directo'], costo: 15000, rango: { minimo: 1, extra: 0 }, movilidad: 5, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': 6, 'secundaria': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteTanqueMediano, matchups: matchupTemp
  },
  'neotanque': {
    nombreLargo: 'Neotanque', nombreCorto: 'neotanque', descripcion: 'Tanque ágil y poderoso contra todos los vehiculos terrestres.', categorias: ['Vehiculo', 'Terrestre', 'Directo'], costo: 20000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 99, consumoDiario: () => 0, maxMuniciones: { 'principal': 9, 'secundaria': 9 }, contraataque: 1, atacarYMoverse: true, sprite: spriteNeotanque, matchups: matchupTemp
  },
  'apc': {
    nombreLargo: 'APC', nombreCorto: 'apc', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Vehiculo', 'Terrestre', 'Transporte'],
    costo: 4000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 1, maxGasolina: 99, consumoDiario: () => 0, maxMuniciones: null, contraataque: null, atacarYMoverse: true, matchups: matchupTemp, sprite: spriteApc
  },
  'artilleria': {
    nombreLargo: 'Artillería', nombreCorto: 'artilleria', descripcion: 'Vehículo indirecto efectivo contra unidades terrestres y navales.', categorias: ['Vehiculo', 'Terrestre', 'Indirecto'], costo: 6000, rango: { minimo: 2, extra: 1 }, movilidad: 5, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': 7 }, contraataque: 0, atacarYMoverse: true, sprite: spriteArtilleria, matchups: matchupTemp
  },
  'cohetes': {
    nombreLargo: 'Cohetes', nombreCorto: 'cohetes', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'], costo: 15000, rango: { minimo: 2, extra: 3 }, movilidad: 5, tipoMovimiento: 'ruedas', vision: 3, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 0, atacarYMoverse: true, sprite: spriteCohetes, matchups: matchupTemp
  },
  'tanqueAntiaereo': {
    nombreLargo: 'Tanque Antiaéreo', nombreCorto: 'tanqueAntiaereo', descripcion: 'Vehículo directo terrestre letal contra vehículos aéreos.', categorias: ['Vehiculo', 'Terrestre', 'Directo', 'Antiaereo'], costo: 8000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 70, consumoDiario: () => 0, maxMuniciones: { 'principal': 9 }, contraataque: 1, atacarYMoverse: true, sprite: spriteTanqueAntiaereo, matchups: matchupTemp
  },
  'misiles': {
    nombreLargo: 'Misiles', nombreCorto: 'misiles', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Vehiculo', 'Indirecto', 'Antiaereo'], costo: 12000, rango: { minimo: 2, extra: 3 }, movilidad: 5, tipoMovimiento: 'ruedas', vision: 5, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 0, atacarYMoverse: true, sprite: spriteMisiles, matchups: matchupTemp
  },
  'bCopter': {
    nombreLargo: 'Battle Copter', nombreCorto: 'bCopter', descripcion: 'Helicóptero de combate efectivo contra vehiculos pequeños, soldados y otros helicópteros.', categorias: ['Vehiculo', 'Aereo', 'Directo'], costo: 9000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'aereo', vision: 3, maxGasolina: 90, consumoDiario: () => 2, maxMuniciones: null, contraataque: 1, atacarYMoverse: true, sprite: spriteBCopter, matchups: matchupTemp
  },
  'tCopter': {
    nombreLargo: 'Transport Copter', nombreCorto: 'tCopter', descripcion: 'Helicóptero capaz de transportar soldados a cualquier zona del mapa.', categorias: ['Vehiculo', 'Aereo', 'Transporte'], costo: 4000, rango: null, movilidad: 6, tipoMovimiento: 'aereo', vision: 2, maxGasolina: 90, consumoDiario: () => 2, maxMuniciones: null, contraataque: 1, atacarYMoverse: false, sprite: spriteTCopter, matchups: matchupTemp
  },
  'fighter': {
    nombreLargo: 'Fighter', nombreCorto: 'fighter', descripcion: 'Nave aérea letal contra todas las demás unidades aéreas, ofrece excelente movilidad y visión.', categorias: ['Vehiculo', 'Directo', 'Aereo', 'Indirecto'], costo: 18000, rango: { minimo: 1, extra: 0 }, movilidad: 9, tipoMovimiento: 'aereo', vision: 5, maxGasolina: 99, consumoDiario: () => 5, maxMuniciones: { 'principal': 9 }, contraataque: 1, atacarYMoverse: true, sprite: spriteFighter, matchups: matchupTemp
  },
  'bomber': {
    nombreLargo: 'Bomber', nombreCorto: 'bomber', descripcion: 'Unidad áerea poderosa contra vehículos terrestres y navales.', categorias: ['Vehiculo', 'Aereo', 'Directo'], costo: 20000, rango: { minimo: 1, extra: 0 }, movilidad: 7, tipoMovimiento: 'aereo', vision: 3, maxGasolina: 99, consumoDiario: () => 5, maxMuniciones: { 'principal': 9 }, contraataque: 1, atacarYMoverse: true, sprite: spriteBomber, matchups: matchupTemp
  },
  'lander': {
    nombreLargo: 'Lander', nombreCorto: 'lander', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'], costo: 8000, rango: null, movilidad: 6, tipoMovimiento: 'naval', vision: 1, maxGasolina: 90, consumoDiario: () => 1, maxMuniciones: null, contraataque: null, atacarYMoverse: false, sprite: spriteLander, matchups: matchupTemp
  },
  'cruiser': {
    nombreLargo: 'Cruiser', nombreCorto: 'cruiser', descripcion: 'Unidad naval eficaz contra unidades aéreas y submarinos.', categorias: ['Vehiculo', 'Naval', 'Directo', 'Antiaereo'], costo: 14000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'naval', vision: 3, maxGasolina: 80, consumoDiario: () => 1, maxMuniciones: { 'principal': 8 }, contraataque: 1, atacarYMoverse: true, sprite: spriteCruiser, matchups: matchupTemp
  },
  'submarino': {
    nombreLargo: 'Submarino', nombreCorto: 'submarino', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Vehiculo', 'Naval', 'Directo'], costo: 12500, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'naval', vision: 5, maxGasolina: 70, consumoDiario: (estado:estado) => { return estado === 'oculto' ? 5 : 1 }, maxMuniciones: { 'principal': 7 }, contraataque: 1, atacarYMoverse: true, sprite: spriteSubmarino, matchups: matchupTemp
  },
  'battleship': {
    nombreLargo: 'Battleship', nombreCorto: 'battleship', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'], costo: 20000, rango: { minimo: 2, extra: 1 }, movilidad: 5, tipoMovimiento: 'naval', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 7 }, contraataque: 1, atacarYMoverse: true, sprite: spriteBattleship, matchups: matchupTemp
  }
}
