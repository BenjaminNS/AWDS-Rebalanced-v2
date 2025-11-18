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
export type categorias = 'Soldado'|'Vehiculo'|'Directo'|'Indirecto'|'Transporte'|'Terrestre'|'Aereo'|'Naval'|'Antiaereo';
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

export type UnidadInfoBasica = {
  nombreLargo: string
  nombreCorto: nombreUnidad
  descripcion: string
  categorias: categorias[]
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
  // listaDanos: listaDano
}

export function getInfoBasica (nombre: nombreUnidad) : UnidadInfoBasica|null {
  switch (nombre){
  case 'infanteria':
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteInfanteria
    }
  case 'mecha':
    return {
      nombreLargo: 'Mecha', nombreCorto: 'mecha', descripcion: 'Soldado que puede atacar vehiculos y capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 3000, rango: { minimo: 1, extra: 0 }, movilidad: 2, tipoMovimiento: 'mecha', vision: 2, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': 4, 'secundaria': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteMecha
    }
  case 'recon':
    return {
      nombreLargo: 'Recon', nombreCorto: 'recon', descripcion: 'Vehículo pequeño con alta visión, eficiente contra soldados.', categorias: ['Vehiculo', 'Terrestre', 'Directo'],
      costo: 4000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'ruedas', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 8 }, contraataque: 1, atacarYMoverse: true, sprite: spriteRecon
    }
  case 'tanqueLigero':
    return {
      nombreLargo: 'Tanque Ligero', nombreCorto: 'tanqueLigero', descripcion: 'Tanque ágil eficaz contra otros vehiculos terrestres iguales o más pequeños y contra soldados.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 7000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 70, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteTanqueLigero
    }
  case 'tanqueMediano':
    return {
      nombreLargo: 'Tanque Mediano', nombreCorto: 'tanqueMediano', descripcion: 'Tanque pesado muy efectivo contra todos los vehiculos terrestres.', categorias: ['Vehiculo', 'Terrestre', 'Directo'],
      costo: 15000, rango: { minimo: 1, extra: 0 }, movilidad: 5, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 50, consumoDiario: () => 0, maxMuniciones: { 'principal': 6, 'secundaria': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteTanqueMediano
    }
  case 'neotanque':
    return {
      nombreLargo: 'Neotanque', nombreCorto: 'neotanque', descripcion: 'Tanque ágil y poderoso contra todos los vehiculos terrestres.', categorias: ['Vehiculo', 'Terrestre', 'Directo'],
      costo: 20000, rango: { minimo: 1, extra: 0 }, movilidad: 6, tipoMovimiento: 'oruga', vision: 2, maxGasolina: 99, consumoDiario: () => 0, maxMuniciones: { 'principal': 9, 'secundaria': 9 }, contraataque: 1, atacarYMoverse: true, sprite: spriteNeotanque
    }
    // case 'megatanque':
    // return {
    //   nombreLargo: 'Mega Tanque', nombreCorto: 'megatanque', descripcion: 'El súper tanque. Capaz de asestar un daño letal contra todos los vehiculos terrestres y daño significativo a unidades navales y aéreas.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //   costo: 28000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite:
    // }

  case 'apc':
    // 'APC', 'Vehiculo de transporte capaz de mover soldados, reponer municiones y gasolina a todas las unidades y *puede construir aeropuertos y puertos navales temporales.', ['Vehiculo', 'Terrestre', 'Transporte'],
    // 4000, 1, 1, 6, 'oruga', 1, 99, (estado: estado) => {return 0}, null, 1, true, spriteApc
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteApc
    }
  case 'artilleria':
    // 'Artillería', 'Vehículo indirecto efectivo contra unidades terrestres y navales.', ['Soldado', 'Terrestre', 'Indirecto'],
    // 25000, 1, 1, 4, 'oruga', 1, 50, (estado: estado)=>{return 0}, {'principal': 4, 'secundaria': 8 }, 1, true, spriteMegatanque
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteArtilleria
    }
  case 'cohetes':
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteCohetes
    }
  case 'tanqueAntiaereo':
    // 'Tanque Antiaéreo', 'Vehículo directo terrestre letal contra vehículos aéreos.', ['Vehiculo', 'Terrestre', 'Directo', 'Antiaereo'],
    // 6000, 2, 3, 5, 'oruga', 2, 50, (estado: estado) => {return 0}, { 'principal': 7 }, 0, false, spriteArtilleria
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteTanqueAntiaereo
    }
  case 'misiles':
    // 'Cohetes', 'Vehículo indirecto potente y de buen alcance contra unidades terrestres y navales..', ['Vehiculo', 'Terrestre', 'Directo'],
    // 15000, 2, 5, 5, 'ruedas', 3, 50, (estado: estado) => {return 0}, { 'principal': 7 }, 0, false, spriteCohetes
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteMisiles
    }
    // case 'piperunner':
    // 'Pipe', 'Vehículo indirecto que solo puede moverse a través de pipes.', ['Soldado', 'Terrestre', 'Directo'],
    // 15000, 2, 5, 9, 'piperunner', 3, 99, (estado: estado)=>{return 0}, {'principal': 8 }, 0, false, spritePiperunner
    //   }
  case 'bCopter':
    // 'Misiles', 'Vehículo indirecto letal contra todos tipo de unidades aéreas y que cubre una vasta área.', ['Soldado', 'Terrestre', 'Directo'],
    // 12000, 3, 6, 5, 'ruedas', 5, 40, (estado: estado) => {return 0}, { 'principal': 6 }, 0, false, spriteMisiles
    // 'Battle Copter', 'Helicóptero efectivo contra vehiculos pequeños, soldados y otros helicópteros.', ['Vehiculo', 'Aereo', 'Directo'],
    // 9000, 1, 1, 6, 'aereo', 3, 99, (estado: estado) => {return 2}, { 'principal': 6, 'secundaria': 6 }, 1, true, spriteBCopter
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteBCopter
    }
  case 'tCopter':
    // 'Transport Copter', 'Helicóptero capaz de transportar soldados a cualquier zona del mapa.', ['Vehiculo', 'Aereo', 'Transporte'],
    // 5000, 1, 1, 6, 'aereo', 2, 99, (estado: estado) => {return 2}, null, 1, true, spriteTCopter
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteTCopter
    }
  case 'fighter':
    // 'Fighter', 'El mejor antiaéreo aéreo. Letal contra todas las demás unidades, la mejor movilidad y excelente visión.', ['Vehiculo', 'Aereo', 'Directo', 'Antiaereo'],
    // 19000, 1, 1, 9, 'aereo', 5, 110, (estado: estado) => {return 5}, { 'principal': 8 }, 1, true, spriteFighter
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteFighter
    }
  case 'bomber':
    // 'Bomber', 'Unidad áerea poderosa contra vehículos terrestres y navales.', ['Vehiculo', 'Aereo', 'Directo'],
    // 20000, 1, 1, 7, 'aereo', 3, 99, (estado: estado) => {return 5}, { 'principal': 8 }, 1, true, spriteBomber
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteBomber
    }
    // case 'stealthFighter':
    // 'Stealth Fighter', 'Vehiculo aereo capaz de ocultarse y atacar a todo tipo de unidades.', ['Vehiculo', 'Aereo', 'Directo'],
    // 24000, 1, 1, 6, 'aereo', 2, 60, (estado: estado)=
    //   return {
    //     nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //     costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteInfanteria
    //   }
    // case 'blackBomb':
    //   // 'Black Bomb', 'Unidad aérea capaz de autodetonarse y causar un potente daño amplio de área.', ['Aereo', 'Directo'],
    //   // 30000, 1, 1, 9, 'aereo', 1, 40, (estado: estado)=>{return 5}, null, 0, false, spriteBlackBomb
    //   return {
    //     nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //     costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteInfanteria
    //   }
  case 'lander':
    // 'Lander', 'Unidad de transporte naval. Puede mover hasta 2 unidades terrestres de cualquier tipo.', ['Vehiculo', 'Naval', 'Transporte'],
    // 8000, 1, 1, 6, 'naval', 2, 99, (estado: estado) => {return 1}, null, 0, false, spriteLander
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteLander
    }
  case 'cruiser':
    // 'Cruiser', 'Unidad naval eficaz contra unidades aéreas y submarinos.', ['Vehiculo', 'Naval', 'Directo', 'Antiaereo', 'Transporte'],
    // 12000, 1, 1, 6, 'naval', 3, 80, (estado: estado) => {return 1}, { 'principal': 8 }, 1, true, spriteCruiser
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteCruiser
    }
  case 'submarino':
    // 'Submarino', 'Unidad naval efectivo contra unidades navales y capaz de esconderse.', ['Vehiculo', 'Naval', 'Directo'],
    // 1000, 1, 1, 6, 'naval', 5, 70, (estado: estado) =>
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteSubmarino
    }
  case 'battleship':
    // 'Battleship', 'Unidad indirecta naval capaz de moverse y atacar en el mismo turno.', ['Vehiculo', 'Naval', 'Indirecto'],
    // 20000, 2, 3, 5, 'naval', 3, 70, (estado: estado) => {return 1}, { 'principal': 7 }, 0, true, spriteBattleshi
    return {
      nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
      costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteBattleship
    }
    //   case 'carrier':
    //     // 'Carrier', 'Unidad antiaérea a distancia, capaz de hacer 2 acciones en un mismo turno y de reparar unidades aéreas abordo.', ['Vehiculo', 'Naval', 'Indirecto', 'Antiaereo', 'Transporte'],
    //     // 25000, 3, 7, 5, 'naval', 2, 70, (estado: estado) => {return 1}, null, 0, false, spriteBlackBoat
    //     return {
    //       nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //       costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteInfanteria
    //     }
    //   case 'blackBoat':
    //     // 'Black Boat', 'Unidad de transporte naval que puede mover hasta 2 soldados y puede reparar y reponer a otras unidades.', ['Vehiculo', 'Naval', 'Transporte'],
    //     // 7000, 1, 1, 7, 'naval', 1, 60, (estado: estado) => {return 1}, null, 0, false, spriteCruiser
    //     return {
    //       nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //       costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteInfanteria
    //     }
    // case 'motocicletas':
    //   return {
    //     nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //     costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteInfanteria
    //   }
    // case 'lanchas':
    // 'Infantería', 'Soldado capaz de capturar propiedades.', ['Soldado', 'Naval', 'Directo'],
    // 3500, 1, 1, 4, 'pie', 2, 60, (estado: estado) => {return 1}, { 'principal': 6 }, 1, true, spriteLanchas
    // return {
    //   nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //   costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteInfanteria
    // }
    // case 'sniper':
    //   return {
    //     nombreLargo: 'Infantería', nombreCorto: 'infanteria', descripcion: 'Soldado capaz de capturar propiedades.', categorias: ['Soldado', 'Terrestre', 'Directo'],
    //     costo: 1000, rango: { minimo: 1, extra: 0 }, movilidad: 3, tipoMovimiento: 'pie', vision: 2, maxGasolina: 40, consumoDiario: () => 0, maxMuniciones: { 'principal': 6 }, contraataque: 1, atacarYMoverse: true, sprite: spriteInfanteria
    //   }
  default:
    return null
  }
}
