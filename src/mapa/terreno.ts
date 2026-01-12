import type { nombreUnidad } from '../unidades/unidadInfoBasica'
import type { obtenerSpriteFn } from './spriteTerrenos'
import { planicieSpriteFn, aeropuertoSpriteFn, arrecifeSpriteFn, bosqueSpriteFn, caminoSpriteFn,
  ciudadSpriteFn, costaSpriteFn, cuartelGeneralSpriteFn, fabricaSpriteFn, invalidoSpriteFn, marSpriteFn, montanaSpriteFn, puenteSpriteFn,
  puertoNavalSpriteFn, rioSpriteFn, siloSpriteFn, tuberiaSpriteFn } from './spriteTerrenos'

// 'laboratorio'|'torreDeComunicacion'|
export type nombreTerreno = 'planicie'|'bosque'|'montana'|'cuartelGeneral'|'ciudad'|'fabrica'|'aeropuerto'|'puertoNaval'|'silo'|'camino'|'puente'|'tuberia'|'mar'|'arrecife'|'rio'|'costa'|'invalido'|'inexistente'
export type nombrePropiedad = 'fabrica'|'aeropuerto'|'puertoNaval'
export const arregloTerrenosNombres = [
  'planicie', 'bosque', 'montana', 'cuartelGeneral', 'ciudad', 'fabrica', 'aeropuerto', 'puertoNaval', 'silo', 'camino', 'puente', 'tuberia', 'mar', 'arrecife', 'rio', 'costa', 'invalido']

export type propiedad = {
  unidadesCompra: nombreUnidad[]
  // Posibilidad de tener otras acciones
}

export const fabricaUnidades:nombreUnidad[] = [
  'infanteria', 'mecha', 'recon', 'apc', 'tanqueLigero', 'tanqueMediano', 'neotanque', 'tanqueAntiaereo', 'artilleria', 'cohetes', 'misiles'
]
export const aeropuertoUnidades:nombreUnidad[] = [
  'tCopter', 'bCopter', 'bomber', 'fighter'
]
export const puertoNavalUnidades:nombreUnidad[] = [
  'battleship', 'submarino', 'cruiser', 'lander'
]

export class Terreno {
  nombre: string
  estrellasDefensa: number
  descripcion: string
  costosMovimientos: object
  puedeOcultarEnFOW: boolean
  propiedad: propiedad|null
  obtenerSprite: obtenerSpriteFn

  // static obtenerTerreno(terreno:nombreTerreno){
  //   if( ListaTerrenos[terreno] ){}
  // }

  constructor (nombre: string, estrellasDefensa: number, descripcion: string, costosMovimientos: object, puedeOcultarEnFOW: boolean, propiedad: propiedad|null, obtenerSprite: obtenerSpriteFn){
    this.nombre = nombre
    this.estrellasDefensa = estrellasDefensa
    this.descripcion = descripcion
    this.costosMovimientos = costosMovimientos
    this.puedeOcultarEnFOW = puedeOcultarEnFOW
    this.propiedad = propiedad
    this.obtenerSprite = obtenerSprite
  }

}

// En vez de hacer una constante, mejor hagamos una función que retorne
// el objeto completo (como con las unidades) y así simplificamos y mejoramos la obtención de datos
export const ListaTerrenos = {
  'planicie': new Terreno(
    'Planicie', 1, 'Terreno de fácil navegación pero poca protección',
    { oruga: 1,ruedas: 2,aereo: 1, pie: 1 }, false, null, planicieSpriteFn
  ),
  'bosque': new Terreno(
    'Bosque', 2, 'Terreno difícil de atravesar pero que otorga buena defensa y permite ocultar unidades terrestres',
    { oruga: 2,ruedas: 3,aereo: 1, pie: 1 }, true, null, bosqueSpriteFn
  ),
  'montana': new Terreno(
    'Montaña', 4, 'Terreno que ofrece una excelente defensa pero de muy difícil acceso. Solo puede ser navegada por Soldados y unidades aéreas. Ofrece una unidad extra de visión a Soldados a Pie.', { pie: 2, aereo: 1 }, false, null,
    montanaSpriteFn
  ),
  'cuartelGeneral': new Terreno(
    'Cuartel General', 4, 'Base de operaciones. Si es capturada, pierdes automáticamente el juego y todas tus propiedades pasan al personaje que te quitó esta propiedad.Excelentes defensas. ', { oruga: 1,ruedas: 1,aereo: 1, pie: 1 }, false, { unidadesCompra: [] },
    cuartelGeneralSpriteFn
  ),
  'ciudad': new Terreno(
    'Ciudad', 3, 'Propiedad que puede reparar unidades terrestres 2 de HP y puede ser capturada por Soldados', { oruga: 1,ruedas: 1,aereo: 1, pie: 1 }, false, { unidadesCompra: [] },
    ciudadSpriteFn
  ),
  'fabrica': new Terreno(
    'Fábrica', 3, 'Puedes comprar y reparar unidades terrestres aquí.', { oruga: 1,ruedas: 1,aereo: 1, pie: 1 }, false, { unidadesCompra: fabricaUnidades },
    fabricaSpriteFn
  ),
  'aeropuerto': new Terreno(
    'Aeropuerto', 3, 'Puedes comprar y reparar unidades aéreas aquí.', { oruga: 1,ruedas: 1,aereo: 1, pie: 1 }, false, { unidadesCompra: aeropuertoUnidades },
    aeropuertoSpriteFn
  ),
  'puertoNaval': new Terreno(
    'Puerto naval', 3, 'Puedes comprar y reparar unidades navales aquí.', { oruga: 1,ruedas: 1,aereo: 1, pie: 1, naval: 1 }, false, { unidadesCompra: puertoNavalUnidades },
    puertoNavalSpriteFn
  ),
  'silo': new Terreno(
    'Silo', 3, 'Contiene un misil que puede ser dirigido por un soldado, haciendo 3 de daño en un área de 3x3', { oruga: 1,ruedas: 1,aereo: 1, pie: 1 }, false, null,
    siloSpriteFn
  ),
  'camino': new Terreno(
    'Camino', 0, 'Camino pavimentado de fácil acceso pero que no ofrece defensas', { oruga: 1,ruedas: 1,aereo: 1, pie: 1 }, false, null,
    caminoSpriteFn
  ),
  'puente': new Terreno(
    'Puente', 0, 'Conecta islas para permitir el acceso a unidades terrestres. Las unidades navales pueden atravesarlo, pero con algo de dificultad. No ofrece bonus defensivos.', { oruga: 1,ruedas: 1,aereo: 1, pie: 1, naval: 2 }, false, null,
    puenteSpriteFn
  ),
  'tuberia': new Terreno(
    'Tubería', 0, 'Bloquea el paso a todas las unidades, imposible de destruir.', {}, false, null,
    tuberiaSpriteFn
  ),
  'mar': new Terreno(
    'Mar', 0, 'Terreno marítimo donde pueden cruzar unidades navales y aéreas', { aereo: 1, naval: 1 }, false, null,
    marSpriteFn
  ),
  'arrecife': new Terreno(
    'Arrecife', 2, 'Terreno marítimo que puede ocultar unidades navales y que ofrece algunas capacidades defensivas, aunque algo difícil de navegar.', { aereo: 1, naval: 2 }, true, null,
    arrecifeSpriteFn
  ),
  'rio': new Terreno(
    'Rio', 0, 'Puede ser atravesado por soldados y unidades navales. No ofrece defensa', { aereo: 1, naval: 1, pie: 2 }, false, null,
    rioSpriteFn
  ),
  'costa': new Terreno(
    'Costa', 0, 'Puede ser navegador por cualquier unidad. Conecta mar con tierra. No ofrece defensa', { oruga: 1,ruedas: 1,aereo: 1, naval: 1, pie: 1 }, false, null,
    costaSpriteFn
  ),
  'invalido': new Terreno(
    'Casilla invalida', 0, 'Casilla inválida. Error', {}, false, null,
    invalidoSpriteFn
  )
}
