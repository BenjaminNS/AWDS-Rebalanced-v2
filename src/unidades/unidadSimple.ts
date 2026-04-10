import { type nombreUnidad } from './unidadInfoBasica'
import { type municiones, type estado } from './unidadInfoBasica'

// Interfaz por si crece
interface otrosDatos {
  puntosCaptura: number
}

export type UnidadSimple = {
  nombreUnidad: nombreUnidad,
  id: string, // Opcional. No se si sea necesario cuando guardas los datos de la jugada después
  propietario: number|null,
  hp: number,
  municiones: municiones|null,
  gasActual: number,
  estado: estado
  turnos: number
  params: otrosDatos
}

// export class UnidadSimple {
//   nombreCorto: nombreUnidad
//   id: string
//   propietario: number|null
//   hp: number
//   municiones: municiones|null
//   gasActual: number
//   estado: estado // status
//   turnos: number

//   constructor (){

//   }
// }
