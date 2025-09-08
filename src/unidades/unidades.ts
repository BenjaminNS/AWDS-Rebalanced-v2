import Konva from 'konva'
import { spriteInfanteria, spriteMecha, 
  // spriteMotocicletas, spriteSniper,
  spriteRecon, spriteTanqueLigero, spriteTanqueMediano, spriteNeotanque, 
  // spriteMegatanque, 
  spriteApc, spriteArtilleria, spriteCohetes, spriteTanqueAntiaereo, spriteMisiles, 
  // spritePiperunner, 
  spriteBCopter, spriteTCopter, spriteFighter, spriteBomber, 
  // spriteStealthFighter, spriteBlackBomb, 
  spriteLander, 
  // spriteBlackBoat, 
  spriteCruiser, spriteSubmarino, spriteBattleship, 
  // spriteCarrier, spriteLanchas 
} from './spriteUnidades';
// export type nombreUnidades = 'planicie'|'bosque'|'montana'|'cuartelGeneral'|'ciudad'|'fabrica'|'aeropuerto'|'puertoNaval'|'silo'|'camino'|'puente'|'tuberia'|'mar'|'arrecife'|'rio'|'costa'|'invalido'

type nombreUnidad = 'infanteria'|'mecha'|'recon'|'tanqueLigero'|'tanqueMediano'|'neotanque'|'megatanque'|'apc'|'artilleria'|'cohetes'|'tanqueAntiaereo'|'misiles'|'piperunner'|'bCopter'|'tCopter'|'fighter'|'bomber'|'stealthFighter'|'blackBomb'|'lander'|'cruiser'|'submarino'|'battleship'|'carrier'|'blackBoat'|'motocicletas'|'lanchas'|'sniper'

type municiones = {
  principal: number|null,
  secundaria?: number|null,
}
type tipoMovimiento = 'pie'|'mecha'|'ruedas'|'oruga'|'piperunner'|'aereo'|'naval';
// Se supone que si es soldado, no puede ser vehiculo
// Y si es Terrestre, no puede ser aereo o naval
// No hay problema si se empalma Directo, Indirecto y Transporte
// Técnincamente lo de directo e indirecto tendría que ser con una función que verifique si el rango minimo es de 1 y el rango máximo es de 2 
type categorias = 'Soldado'|'Vehiculo'|'Directo'|'Indirecto'|'Transporte'|'Terrestre'|'Aereo'|'Naval'|'Antiaereo';
type habilidades = {
  moverUnidad: Function,
  atacar?: Function,
  combinar: Function,
  capturar?: Function,
  abordar?: Function,
  soltar?: Function,
  construir?: Function,
  sumergir?: Function,
  subir?: Function,
  esconder?: Function,
  reaparecer?: Function,
  detonar?: Function
}

// Necesario para submarinos y Stealth Fighters
type estado = 'normal'|'oculto';

// const arregloUnidadesNombres = ['infanteria','mecha','recon','tanqueLigero','tanqueMediano','neotanque','megatanque','apc','artilleria','cohetes','tanqueAntiaereo','misiles','piperunner','bCopter','tCopter','fighter','bomber','stealthFighter','blackBomb','lander','cruiser','submarino','battleship','carrier','blackBoat','motocicletas','lanchas','sniper']

export class UnidadCasilla {
  id: string;
  propietario: number;
  hp: number;
  municiones: municiones|null;
  gasActual: number;
  estado: estado;
  nombreUnidad: nombreUnidad;
  sprite: Konva.Sprite|null;

  // animarMovimiento = () => {  }
  obtenerTipo = () =>{
    return ListaUnidades[this.nombreUnidad]
  }

  // destruirUnidad()

  constructor(nombreUnidad: nombreUnidad, propietario: number, hp: number, municiones: municiones|null, gasActual: number, sprite: Konva.Sprite|null, estado: estado ){
    // Talvez también pueda validar que el nombre de la unidad si exista
    this.nombreUnidad = nombreUnidad;
    this.id = crypto.randomUUID();
    if( propietario < 0 ){
      console.error('La unidad no puede tener este propietario: ', propietario )
      this.propietario = null;
    } else{
      this.propietario = propietario;
    }

    if( hp <= 0 ){
      console.error('El HP no puede ser menos de 1')
      this.hp = 1;
    } else if( hp > 100 ){
      console.error('El HP no puede ser mayor a 100')
      this.hp = 100;
    }else{
      this.hp = hp;
    }

    // TO-DO: Validar municiones
    this.municiones = municiones;
    this.gasActual = gasActual;
    if( gasActual <= 0 ){
      console.error('La gasActual actual no puede ser menos de 0')
      this.gasActual = 0;
    } else if( gasActual > ListaUnidades[nombreUnidad].maxGasolina ){
      console.error('La gasActual actual no puede ser mayor a la actual', gasActual)
      this.gasActual = ListaUnidades[nombreUnidad].maxGasolina;
    }else{
      this.gasActual = gasActual;
    }
    this.sprite = null;
    this.estado = estado;
  }
}

export class Unidad {
  nombre: string;
  descripcion: string;
  categorias: categorias[];
  costo: number; //Gold
  // Debería cambiar esto, sobre todo por las unidades de transporte que se supone no atacan
  rangoMinimo: number; 
  rangoMaximo: number;
  movilidad: number;
  tipoMovimiento: tipoMovimiento;
  vision: number; //Talvez esta ocupe cambiarlo a una función, porque los soldados obtienen más visión cuando están arriba de montañas
  maxGasolina: number;
  consumoDiario: (estado: estado) => number;
  maxMuniciones: municiones|null;
  atacarYMoverse: boolean;
  contraataque: number|null;
  sprite: Konva.Sprite;
  // habilidades: {}
  // listaDanos: listaDano;

  constructor( nombre: string, descripcion: string, categorias: categorias[], costo: number, rangoMinimo: number, rangoMaximo: number, movilidad: number, tipoMovimiento: tipoMovimiento, vision: number, maxGasolina: number, consumoDiario: (estado: estado) => number, maxMuniciones: municiones|null, contraataque: number|null, atacarYMoverse: boolean, sprite: Konva.Sprite ){
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categorias = categorias;
    this.costo = costo;

    // Validar que el rango minimo sea menor que el rango maximo
    this.rangoMinimo = rangoMinimo;
    this.rangoMaximo = rangoMaximo;
    this.movilidad = movilidad;
    this.tipoMovimiento = tipoMovimiento;
    this.vision = vision;
    this.maxGasolina = maxGasolina;
    this.consumoDiario = consumoDiario;
    this.maxMuniciones = maxMuniciones;
    this.contraataque = contraataque;
    this.atacarYMoverse = atacarYMoverse;
    this.sprite = sprite;
    // this.habilidades = habilidades;
    // this.listaDanos = ListaDanos[nombre]
  }
}

// type ListaUnidades = {
//   infanteria: Unidad,
//   mecha: Unidad,
//   recon: Unidad,
//   tanqueLigero: Unidad,
//   tanqueMediano: Unidad,
//   neotanque: Unidad,
//   megatanque: Unidad,
//   apc: Unidad,
//   artilleria: Unidad,
//   cohetes: Unidad,
//   tanqueAntiaereo: Unidad,
//   misiles: Unidad,
//   piperunner: Unidad,
//   bCopter: Unidad,
//   tCopter: Unidad,
//   fighter: Unidad,
//   bomber: Unidad,
//   stealthFighter: Unidad,
//   blackBomb: Unidad,
//   lander: Unidad,
//   cruiser: Unidad,
//   submarino: Unidad,
//   battleship: Unidad,
//   carrier: Unidad,
//   blackBoat: Unidad,
//   motocicletas: Unidad,
//   lanchas: Unidad,
//   sniper: Unidad,
// }

const ListaUnidades = {
  //Soldados terrestres
  infanteria: new Unidad('Infantería', 'Soldado capaz de capturar propiedades.', ['Soldado', 'Terrestre', 'Directo'], 
    1000, 1, 1, 3, 'pie', 2, 40, (estado: estado)=>{return 0}, {'principal': 6, 'secundaria': 1 }, 1, true, spriteInfanteria),

  mecha: new Unidad('Mecha', 'Soldado que puede atacar vehiculos y capturar propiedades.', ['Soldado', 'Terrestre', 'Directo'], 
    3000, 1, 1, 2, 'mecha', 2, 50, (estado: estado)=>{return 0}, {'principal': 4, 'secundaria': 6 }, 1, true, spriteMecha),
  
  // motocicletas: new Unidad('Infantería', 'Soldado capaz de capturar propiedades.', ['Soldado', 'Naval', 'Directo'], 
  //   1000, 1, 1, 3, 'pie', 2, 40, (estado: estado)=>{return 0}, {'principal': 6, 'secundaria': 1 }, 1, true, spriteMotocicletas),

  // sniper: new Unidad('Infantería', 'Soldado capaz de capturar propiedades.', ['Soldado', 'Naval', 'Directo'], 
  //   1000, 1, 1, 3, 'pie', 2, 40, (estado: estado)=>{return 0}, {'principal': 6, 'secundaria': 1 }, 1, true, spriteSniper),

  //Vehiculos terrestres
  recon: new Unidad('Recon', 'Vehículo pequeño con alta visión, eficiente contra soldados.', ['Vehiculo', 'Terrestre', 'Directo'], 
    4000, 1, 1, 8, 'ruedas', 5, 70, (estado: estado)=>{return 0}, {'principal': 8 }, 1, true, spriteRecon),

  tanqueLigero: new Unidad('Tanque ligero', 'Tanque pequeño eficaz contra otros vehiculos terrestres iguales o más pequeños y contra soldados.', ['Vehiculo', 'Terrestre', 'Directo'], 
    7000, 1, 1, 6, 'oruga', 2, 70, (estado: estado)=>{return 0}, {'principal': 6, 'secundaria': 6 }, 1, true, spriteTanqueLigero),

  tanqueMediano: new Unidad('Tanque Mediano', 'Tanque pesado muy efectivo contra todos los vehiculos terrestres.', ['Vehiculo', 'Terrestre', 'Directo'], 
    15000, 1, 1, 5, 'oruga', 2, 50, (estado: estado)=>{return 0}, {'principal': 6, 'secundaria': 6 }, 1, true, spriteTanqueMediano),

  neotanque: new Unidad('Neotanque', 'Tanque ágil y poderoso contra todos los vehiculos terrestres.', ['Vehiculo', 'Terrestre', 'Directo'], 
    20000, 1, 1, 6, 'oruga', 2, 99, (estado: estado)=>{return 0}, {'principal': 9, 'secundaria': 9 }, 1, true, spriteNeotanque),

  // megatanque: new Unidad('Mega Tanque', 'El super tanque. Capaz de asestar un daño letal contra todos los vehiculos terrestres y daño significativo a unidades navales y aéreas. Puede aplastar a soldados con su movimiento', ['Vehiculo', 'Terrestre', 'Directo'], 
  // 25000, 1, 1, 4, 'oruga', 1, 50, (estado: estado)=>{return 0}, {'principal': 4, 'secundaria': 8 }, 1, true, spriteMegatanque),

  apc: new Unidad('APC', 'Vehiculo de transporte capaz de mover soldados, reponer municiones y gasolina a todas las unidades y *puede construir aeropuertos y puertos navales temporales.', ['Vehiculo', 'Terrestre', 'Transporte'], 
    4000, 1, 1, 6, 'oruga', 1, 99, (estado: estado)=>{return 0}, null, 1, true, spriteApc),

  artilleria: new Unidad('Artillería', 'Vehículo indirecto efectivo contra unidades terrestres y navales.', ['Soldado', 'Terrestre', 'Indirecto'], 
    6000, 2, 3, 5, 'oruga', 2, 50, (estado: estado)=>{return 0}, {'principal': 7 }, 0, false, spriteArtilleria),

  cohetes: new Unidad('Cohetes', 'Vehículo indirecto potente y de buen alcance contra unidades terrestres y navales..', ['Vehiculo', 'Terrestre', 'Directo'], 
    15000, 2, 5, 5, 'ruedas', 3, 50, (estado: estado)=>{return 0}, {'principal': 7 }, 0, false, spriteCohetes),

  tanqueAntiaereo: new Unidad('Tanque Antiaéreo', 'Vehículo directo terrestre letal contra vehículos aéreos.', ['Vehiculo', 'Terrestre', 'Directo', 'Antiaereo'], 
    8000, 1, 1, 6, 'oruga', 2, 60, (estado: estado)=>{return 0}, {'principal': 8 }, 1, true, spriteTanqueAntiaereo),

  misiles: new Unidad('Misiles', 'Vehículo indirecto letal contra todos tipo de unidades aéreas y que cubre una vasta área.', ['Soldado', 'Terrestre', 'Directo'], 
    12000, 3, 6, 5, 'ruedas', 5, 40, (estado: estado)=>{return 0}, {'principal': 6 }, 0, false, spriteMisiles),

  //Creo que prefiría borrar esta unidad, solo funciona en modos campaña
  // piperunner: new Unidad('Pipe', 'Vehículo indirecto que solo puede moverse a través de pipes.', ['Soldado', 'Terrestre', 'Directo'], 
  // 15000, 2, 5, 9, 'piperunner', 3, 99, (estado: estado)=>{return 0}, {'principal': 8 }, 0, false, spritePiperunner),

  //Unidades aéreas
  bCopter: new Unidad('Battle Copter', 'Helicóptero efectivo contra vehiculos pequeños, soldados y otros helicópteros.', ['Vehiculo', 'Aereo', 'Directo'], 
    9000, 1, 1, 6, 'aereo', 3, 99, (estado: estado)=>{return 2}, {'principal': 6, 'secundaria': 6 }, 1, true, spriteBCopter),

  tCopter: new Unidad('Transport Copter', 'Helicóptero capaz de transportar soldados a cualquier zona del mapa.', ['Vehiculo', 'Aereo', 'Transporte'], 
    5000, 1, 1, 6, 'aereo', 2, 99, (estado: estado)=>{return 2}, null, 1, true, spriteTCopter),

  fighter: new Unidad('Fighter', 'El mejor antiaéreo aéreo. Letal contra todas las demás unidades, la mejor movilidad y excelente visión.', ['Vehiculo', 'Aereo', 'Directo', 'Antiaereo'], 
    19000, 1, 1, 9, 'aereo', 5, 110, (estado: estado)=>{return 5}, { 'principal': 8 }, 1, true, spriteFighter),

  bomber: new Unidad('Bomber', 'Unidad áerea poderosa contra vehículos terrestres y navales.', ['Vehiculo', 'Aereo', 'Directo'], 
    20000, 1, 1, 7, 'aereo', 3, 99, (estado: estado)=>{return 5}, {'principal': 8 }, 1, true, spriteBomber),

  // stealthFighter: new Unidad('Stealth Fighter', 'Vehiculo aereo capaz de ocultarse y atacar a todo tipo de unidades.', ['Vehiculo', 'Aereo', 'Directo'], 
  //   24000, 1, 1, 6, 'aereo', 2, 60, (estado: estado)=>{
  //     if(estado === 'oculto'){
  //       return 8
  //     } else{
  //       return 5
  //     }
  //   }, {'principal': 6 }, 1, true, spriteStealthFighter),

  // //Talvez también me gustaría borrar esta unidad. O de plano replantearla
  // blackBomb: new Unidad('Black Bomb', 'Unidad aérea capaz de autodetonarse y causar un potente daño amplio de área.', ['Aereo', 'Directo'], 
  //   30000, 1, 1, 9, 'aereo', 1, 40, (estado: estado)=>{return 5}, null, 0, false, spriteBlackBomb),

  //Unidades navales 
  lander: new Unidad('Lander', 'Unidad de transporte naval. Puede mover hasta 2 unidades terrestres de cualquier tipo.', ['Vehiculo', 'Naval', 'Transporte'], 
    8000, 1, 1, 6, 'naval', 2, 99, (estado: estado)=>{return 1}, null, 0, false, spriteLander),

  // blackBoat: new Unidad('Black Boat', 'Unidad de transporte naval que puede mover hasta 2 soldados y puede reparar y reponer a otras unidades.', ['Vehiculo', 'Naval', 'Transporte'], 
    // 7000, 1, 1, 7, 'naval', 1, 60, (estado: estado)=>{return 1}, null, 0, false, spriteCruiser),

  cruiser: new Unidad('Cruiser', 'Unidad naval eficaz contra unidades aéreas y submarinos.', ['Vehiculo', 'Naval', 'Directo', 'Antiaereo', 'Transporte'], 
    12000, 1, 1, 6, 'naval', 3, 80, (estado: estado)=>{return 1}, {'principal': 8 }, 1, true, spriteCruiser),

  submarino: new Unidad('Submarino', 'Unidad naval efectivo contra unidades navales y capaz de esconderse.', ['Vehiculo', 'Naval', 'Directo'], 
    1000, 1, 1, 6, 'naval', 5, 70, (estado: estado)=>{
      if(estado === 'oculto'){
        return 5
      } else{
        return 1
      }
    }, {'principal': 7 }, 1, true, spriteSubmarino),

  battleship: new Unidad('Battleship', 'Unidad indirecta naval capaz de moverse y atacar en el mismo turno.', ['Vehiculo', 'Naval', 'Indirecto'], 
    20000, 2, 3, 5, 'naval', 3, 70, (estado: estado)=>{return 1}, {'principal': 7 }, 0, true, spriteBattleship),

  // carrier: new Unidad('Carrier', 'Unidad antiaérea a distancia, capaz de hacer 2 acciones en un mismo turno y de reparar unidades aéreas abordo.', ['Vehiculo', 'Naval', 'Indirecto', 'Antiaereo', 'Transporte'], 
  //   25000, 3, 7, 5, 'naval', 2, 70, (estado: estado)=>{return 1}, null, 0, false, spriteBlackBoat),

  // lanchas: new Unidad('Infantería', 'Soldado capaz de capturar propiedades.', ['Soldado', 'Naval', 'Directo'], 
  //   3500, 1, 1, 4, 'pie', 2, 60, (estado: estado)=>{return 1}, {'principal': 6 }, 1, true, spriteLanchas),
}
