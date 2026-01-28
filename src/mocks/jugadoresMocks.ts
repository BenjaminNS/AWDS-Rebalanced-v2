import { Jugador } from '../jugador'
import { ComandanteJugable } from '../comandantes/comandante'
import { ComandanteAndy } from '../comandantes/andy'
import { ComandanteMax } from '../comandantes/max'
import { ComandanteGenerico } from '../comandantes/generico'

// const Andy = await ComandanteJugable.crear('Andy', crypto.randomUUID(), 50000, 0, 0, true, 'normal')
// const Generico = await ComandanteJugable.crear('Generico', crypto.randomUUID(), 50000, 0, 0, true, 'normal')
// const Max = await ComandanteJugable.crear('Max', crypto.randomUUID(), 30000, 0, 0, true, 'normal')

const Andy = new ComandanteJugable('Andy', 50000, 0, 0, true, 'normal', ComandanteAndy)
const Generico = new ComandanteJugable('Generico', 50000, 0, 0, true, 'normal', ComandanteMax)
const Max = new ComandanteJugable('Max', 30000, 0, 0, true, 'normal', ComandanteGenerico)

export const usuario1 = new Jugador('Juan Sabor', 'A', true, null, [Andy], '#b64f54')
export const usuario2 = new Jugador('NPC1234', 'B', true, null, [Generico], '#4f85b6')
export const usuario3 = new Jugador('Startank', 'B', true, null, [Max], '#66A068')
