import { type nombreUnidad } from '../unidades/unidadInfoBasica'

export type nombrePropiedad = 'aeropuerto'|'fabrica'|'puertoNaval'
export const fabricaUnidades:nombreUnidad[] = [
  'infanteria', 'mecha', 'recon', 'apc', 'tanqueLigero', 'tanqueMediano', 'neotanque', 'tanqueAntiaereo', 'artilleria', 'cohetes', 'misiles'
]
export const aeropuertoUnidades:nombreUnidad[] = [
  'tCopter', 'bCopter', 'bomber', 'fighter'
]
export const puertoNavalUnidades:nombreUnidad[] = [
  'battleship', 'submarino', 'cruiser', 'lander'
]
