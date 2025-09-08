// import PaisesJS from "./paises";
// const { listaPaises } = PaisesJS()
import type { nombresPaises } from './paises'


type nombreComandantes = 'Andy'|'Max'|'Sami'|'Nell'|'Hachi'|'Rachel'|'Jake'|'Olaf'|'Grit'|'Colin'|'Sasha'|'Kanbei'|'Sonja'|'Sensei'|'Grimm'|'Eagle'|'Drake'|'Jess'|'Javier'|'Flak'|'Lash'|'Adder'|'Hawke'|'Sturm'|'Jugger'|'Koal'|'Kindle'|'Von Bolt'
type DayToDay = {
  descripcion: string,
  // efectos, reemplazaría las funciones por defecto del personaje
}
type ComandantePoder = {
  nombre: string,
  costoEstrellas: number,
  efectoActivacion: (unidades: string, adversarios: string)=>{}
}
type spritesComandante = {
  normal: any,
  festejando: any,
  perdiendo: any
}
type records = {
  unidadesConstruidas: number,
  unidadesDestruidas: number,
  unidadesPerdidas: number,
  dineroGenerado: number;
  dineroGastado: number
}
// perks (Cambio a futuro): mejora las habilidades de un personaje
// type perks = {}

export class ComandanteJugable{
  personaje: nombreComandantes;
  idInstancia: string; // crypto.randomUUID
  dineroActual: number;
  cargaActual: number;
  usosPoder: number;
  activo: boolean;
  // records: records;

  // Será el nombre del poder en vez de solo cop o scop y así poder tener más opciones para más poderes (pienso que máximo 3)
  // estadoActual: 'normal'|'cop'|'scop';

  constructor(personaje: nombreComandantes, idInstancia: string, dineroActual: number, cargaActual: number, usosPoder: number, activo: boolean){
    this.personaje = personaje;
    this.idInstancia = idInstancia;
    this.dineroActual=dineroActual;
    this.cargaActual=cargaActual;
    this.usosPoder=usosPoder;
    this.activo=activo;
  }
}  

export class Comandante{
  nombre: string;
  descripcion: string;
  pais: nombresPaises;
  cancion: AudioData|null;
  // spritesComandante: spritesComandante; //Talvez sean coordenadas como los terrenos
  // canciones: {normal: AudioData, cop: AudioData, scop: AudioData};

  // d2d: DayToDay;
  // Definiría como se cargan y como se activan los poderes de los comandantes
  // Advance Wars 2: carga aumenta basado en el valor de las unidades por el daño hecho (60%) y recibido (90%)
  // y puede ser activado sin unidad con zona de comandante
  // Days of Ruin: Los poderes cargan solamente por daño hecho a unidades enemigas
  // Si pierdes tu unidad con zona de comandante, pierdes toda tu carga
  // Debes gastar el turno de tu unidad con CO para activar el poder (no puede atacar el mismo turno)
  // tipoCarga: 'Advance Wars 2'|'Days of Ruin';
  poderes: ComandantePoder[]|null;

  // Funciones de daño, ataque, defensa, costo, movimiento, rango, etc.
  constructor(nombre: string, descripcion: string, pais: nombresPaises, cancion: AudioData|null){
    this.nombre=nombre;
    this.descripcion=descripcion;
    this.pais=pais;
    this.poderes=null;
    this.cancion=cancion;
  }
}
