import { Jugador } from '../jugador'
// import { ComandanteJugable } from '../comandantes/comandante'
// import { ComandanteAndy } from '../comandantes/andy'
// import { ComandanteMax } from '../comandantes/max'
// import { ComandanteGenerico } from '../comandantes/generico'
import { Sami_Comandante } from '../comandantes/Sami_Comandante'

// const Andy = await ComandanteJugable.crear('Andy', crypto.randomUUID(), 50000, 0, 0, true, 'normal')
// const Generico = await ComandanteJugable.crear('Generico', crypto.randomUUID(), 50000, 0, 0, true, 'normal')
// const Max = await ComandanteJugable.crear('Max', crypto.randomUUID(), 30000, 0, 0, true, 'normal')

// const Andy = new ComandanteJugable('Andy', 50000, 0, 0, true, 'normal', ComandanteAndy)
const ComandanteSami1 = new Sami_Comandante({ activo: true, cargaActual: 21000, dineroActual: 20000, statusEffects: [], usosPoder: 0 }, { ref: null, id: 'string' })
// const Max = new ComandanteJugable('Max', 30000, 0, 0, true, 'normal', ComandanteGenerico)

export const usuario1 = new Jugador('Juan Sabor', 'A', true, null, [ComandanteSami1], '#b64f54')
export const usuario2 = new Jugador('NPC1234', 'B', true, null, [ComandanteSami1], '#4f85b6')
export const usuario3 = new Jugador('Startank', 'B', true, null, [ComandanteSami1], '#66A068')
