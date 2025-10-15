import { Jugador } from "../jugador";
import { ComandanteJugable } from "../comandantes/comandante";

export const usuario1 = new Jugador('Juan Sabor', "A", true, null, [new ComandanteJugable("Andy", crypto.randomUUID(), 0, 0, 0, true)])
export const usuario2 = new Jugador('Fatboy Slim', "B", true, null, [new ComandanteJugable("Andy", crypto.randomUUID(), 0, 0, 0, true)])
