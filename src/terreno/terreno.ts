import type { nombreUnidad } from '../unidades/unidadInfoBasica'
import type { obtenerSpriteFn } from './spriteTerrenos'
import { planicieSpriteFn, aeropuertoSpriteFn, arrecifeSpriteFn, bosqueSpriteFn, caminoSpriteFn,
  ciudadSpriteFn, costaSpriteFn, cuartelGeneralSpriteFn, fabricaSpriteFn, invalidoSpriteFn, marSpriteFn, montanaSpriteFn, puenteSpriteFn,
  puertoNavalSpriteFn, rioSpriteFn, siloSpriteFn, tuberiaSpriteFn } from './spriteTerrenos'
import { fabricaUnidades, aeropuertoUnidades, puertoNavalUnidades } from './terrenosCompra'

// 'laboratorio'|'torreDeComunicacion'|
export type nombreTerreno = 'planicie'|'bosque'|'montana'|'cuartelGeneral'|'ciudad'|'fabrica'|'aeropuerto'|'puertoNaval'|'silo'|'camino'|'puente'|'tuberia'|'mar'|'arrecife'|'rio'|'costa'|'invalido'|'inexistente'
export type nombrePropiedad = 'fabrica'|'aeropuerto'|'puertoNaval'
export const arregloTerrenosNombres = [
  'planicie', 'bosque', 'montana', 'cuartelGeneral', 'ciudad', 'fabrica', 'aeropuerto', 'puertoNaval', 'silo', 'camino', 'puente', 'tuberia', 'mar', 'arrecife', 'rio', 'costa', 'invalido']

export type propiedad = {
  unidadesCompra: nombreUnidad[]
  // Posibilidad de tener otras acciones
}

export class Terreno {
  nombreLargo: string
  nombreCorto: nombreTerreno
  estrellasDefensa: number
  descripcion: string
  puedeOcultarEnFOW: boolean
  propiedad: propiedad|null
  obtenerSprite: obtenerSpriteFn

  constructor (nombreLargo: string, nombreCorto: nombreTerreno, estrellasDefensa: number, descripcion: string, puedeOcultarEnFOW: boolean, propiedad: propiedad|null, obtenerSprite: obtenerSpriteFn){
    this.nombreLargo = nombreLargo
    this.nombreCorto = nombreCorto
    this.estrellasDefensa = estrellasDefensa
    this.descripcion = descripcion
    this.puedeOcultarEnFOW = puedeOcultarEnFOW
    this.propiedad = propiedad
    this.obtenerSprite = obtenerSprite
  }

}

// En vez de hacer una constante, mejor hagamos una función que retorne
// el objeto completo (como con las unidades) y así simplificamos y mejoramos la obtención de datos
export const ListaTerrenos = {
  'planicie': new Terreno(
    'Planicie', 'planicie', 1, 'Terreno de fácil navegación pero poca protección', false, null, planicieSpriteFn
  ),
  'bosque': new Terreno(
    'Bosque', 'bosque', 2, 'Terreno difícil de atravesar pero que otorga buena defensa y permite ocultar unidades terrestres', true, null, bosqueSpriteFn
  ),
  'montana': new Terreno(
    'Montaña', 'montana', 4, 'Terreno que ofrece una excelente defensa pero de muy difícil acceso. Solo puede ser navegada por Soldados y unidades aéreas. Ofrece una unidad extra de visión a Soldados a Pie.', false, null,
    montanaSpriteFn
  ),
  'cuartelGeneral': new Terreno(
    'Cuartel General', 'cuartelGeneral', 4, 'Base de operaciones. Si es capturada, pierdes automáticamente el juego y todas tus propiedades pasan al personaje que te quitó esta propiedad.Excelentes defensas. ', false, { unidadesCompra: [] },
    cuartelGeneralSpriteFn
  ),
  'ciudad': new Terreno(
    'Ciudad', 'ciudad', 3, 'Propiedad que puede reparar unidades terrestres 2 de HP y puede ser capturada por Soldados', false, { unidadesCompra: [] },
    ciudadSpriteFn
  ),
  'fabrica': new Terreno(
    'Fábrica', 'fabrica', 3, 'Puedes comprar y reparar unidades terrestres aquí.', false, { unidadesCompra: fabricaUnidades },
    fabricaSpriteFn
  ),
  'aeropuerto': new Terreno(
    'Aeropuerto', 'aeropuerto', 3, 'Puedes comprar y reparar unidades aéreas aquí.', false, { unidadesCompra: aeropuertoUnidades },
    aeropuertoSpriteFn
  ),
  'puertoNaval': new Terreno(
    'Puerto naval', 'puertoNaval', 3, 'Puedes comprar y reparar unidades navales aquí.', false, { unidadesCompra: puertoNavalUnidades },
    puertoNavalSpriteFn
  ),
  'silo': new Terreno(
    'Silo', 'silo', 3, 'Contiene un misil que puede ser dirigido por un soldado, haciendo 3 de daño en un área de 3x3', false, null,
    siloSpriteFn
  ),
  'camino': new Terreno(
    'Camino', 'camino', 0, 'Camino pavimentado de fácil acceso pero que no ofrece defensas', false, null,
    caminoSpriteFn
  ),
  'puente': new Terreno(
    'Puente', 'puente', 0, 'Conecta islas para permitir el acceso a unidades terrestres. Las unidades navales pueden atravesarlo, pero con algo de dificultad. No ofrece bonus defensivos.', false, null,
    puenteSpriteFn
  ),
  'tuberia': new Terreno(
    'Tubería', 'tuberia', 0, 'Bloquea el paso a todas las unidades, imposible de destruir.', false, null,
    tuberiaSpriteFn
  ),
  'mar': new Terreno(
    'Mar', 'mar', 0, 'Terreno marítimo donde pueden cruzar unidades navales y aéreas', false, null,
    marSpriteFn
  ),
  'arrecife': new Terreno(
    'Arrecife', 'arrecife', 2, 'Terreno marítimo que puede ocultar unidades navales y que ofrece algunas capacidades defensivas, aunque algo difícil de navegar.', true, null,
    arrecifeSpriteFn
  ),
  'rio': new Terreno(
    'Rio', 'rio', 0, 'Puede ser atravesado por soldados y unidades navales. No ofrece defensa', false, null,
    rioSpriteFn
  ),
  'costa': new Terreno(
    'Costa', 'costa', 0, 'Puede ser navegador por cualquier unidad. Conecta mar con tierra. No ofrece defensa', false, null,
    costaSpriteFn
  ),
  'invalido': new Terreno(
    'Casilla invalida', 'invalido', 0, 'Casilla inválida. Error', false, null,
    invalidoSpriteFn
  )
}
