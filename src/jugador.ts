// import { ComandanteJugable } from './comandantes/comandante'
type equipo = 'A'|'B'|'C'|'D';

export class Jugador {
  // Cada jugador debería existir en la base de datos y ser obtenido por medio de su ID
  // Pero en juego no es necesario tener el dato idéntico, solo necesita tener un código único por partida
  nombre: string;
  // idJugador: string; //crypto.randomUUID()}
  equipo: equipo;
  tiempoAcumulado: number|null;
  // comandantes: ComandanteJugable[]

  constructor(nombre: string, equipo: equipo, tiempoAcumulado: number|null){
    this.nombre = nombre
    this.equipo = equipo
    this.tiempoAcumulado = tiempoAcumulado;
  }
}