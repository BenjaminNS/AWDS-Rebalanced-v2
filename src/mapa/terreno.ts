import type { spriteTerreno, casillasAdyacentes, obtenerSprite } from "./spriteTerrenos"
import { tamanoCasilla, planicieSpriteFn, aeropuertoSpriteFn, arrecifeSpriteFn, bosqueSpriteFn, caminoSpriteFn,
  ciudadSpriteFn, costaSpriteFn, cuartelGeneralSpriteFn, fabricaSpriteFn, invalidoSpriteFn, marSpriteFn, montanaSpriteFn, puenteSpriteFn,
  puertoNavalSpriteFn, rioSpriteFn, siloSpriteFn, tuberiaSpriteFn } from "./spriteTerrenos"

// 'laboratorio'|'torreDeComunicacion'|
export type nombreTerreno = 'planicie'|'bosque'|'montana'|'cuartelGeneral'|'ciudad'|'fabrica'|'aeropuerto'|'puertoNaval'|'silo'|'camino'|'puente'|'tuberia'|'mar'|'arrecife'|'rio'|'costa'|'invalido'|'inexistente'

export const arregloTerrenosNombres = [
  'planicie', 'bosque', 'montana', 'cuartelGeneral', 'ciudad', 'fabrica', 'aeropuerto', 'puertoNaval', 'silo', 'camino', 'puente', 'tuberia', 'mar', 'arrecife', 'rio', 'costa', 'invalido']

export class Terreno {
  nombre: string;
  estrellasDefensa: number;
  descripcion: string;
  costosMovimientos: object;
  puedeOcultarEnFOW: boolean;
  esPropiedad: boolean;
  obtenerSprite: obtenerSprite;

  // static obtenerTerreno(terreno:nombreTerreno){
  //   if( ListaTerrenos[terreno] ){}
  // }

  constructor(nombre: string, estrellasDefensa: number, descripcion: string, costosMovimientos: object, puedeOcultarEnFOW: boolean, esPropiedad: boolean, obtenerSprite: obtenerSprite){
    this.nombre= nombre
    this.estrellasDefensa = estrellasDefensa;
    this.descripcion = descripcion;
    this.costosMovimientos = costosMovimientos;
    this.puedeOcultarEnFOW = puedeOcultarEnFOW;
    this.esPropiedad = esPropiedad;
    this.obtenerSprite = obtenerSprite
  }
}

export const ListaTerrenos = {
  "planicie": new Terreno(
    "Planicie", 1, "Terreno de fácil navegación pero poca protección", 
    {oruga: 1,ruedas: 2,aereo: 1, pie: 1}, false, false, planicieSpriteFn
  ),
  "bosque": new Terreno(
    "Bosque", 2, "Terreno difícil de atravesar pero que otorga buena defensa y permite ocultar unidades terrestres", 
    {oruga: 2,ruedas: 3,aereo: 1, pie: 1}, true, false, bosqueSpriteFn
  ),
  "montana": new Terreno(
    "Montaña", 0, "Terreno que ofrece una excelente defensa pero de muy difícil acceso. Solo puede ser navegada por Soldados y unidades aéreas. Ofrece una unidad extra de visión a Soldados a Pie.", {pie: 2, aereo: 1}, false, false, 
    montanaSpriteFn
  ),
  "cuartelGeneral": new Terreno(
    "Cuartel General", 4, "Base de operaciones. Si es capturada, pierdes automáticamente el juego y todas tus propiedades pasan al personaje que te quitó esta propiedad.Excelentes defensas. ", {oruga: 1,ruedas: 1,aereo: 1, pie: 1}, false, true,
    cuartelGeneralSpriteFn
  ),
  "ciudad": new Terreno(
    "Ciudad", 3, "Propiedad que puede reparar unidades terrestres 2 de HP y puede ser capturada por Soldados", {oruga: 1,ruedas: 1,aereo: 1, pie: 1}, false, true,
    ciudadSpriteFn
  ),
  "fabrica": new Terreno(
    "Fábrica", 3, "Puedes comprar y reparar unidades terrestres aquí.", {oruga: 1,ruedas: 1,aereo: 1, pie: 1}, false, true,
    fabricaSpriteFn
  ),
  "aeropuerto": new Terreno(
    "Aeropuerto", 3, "Puedes comprar y reparar unidades aéreas aquí.", {oruga: 1,ruedas: 1,aereo: 1, pie: 1}, false, true,
    aeropuertoSpriteFn
  ),
  "puertoNaval": new Terreno(
    "Puerto naval", 3, "Puedes comprar y reparar unidades navales aquí.", {oruga: 1,ruedas: 1,aereo: 1, pie: 1, naval: 1}, false, true,
    puertoNavalSpriteFn
  ),
  "silo": new Terreno(
    "Silo", 3, "Contiene un misil que puede ser dirigido por un soldado, haciendo 3 de daño en un área de 3x3", {oruga: 1,ruedas: 1,aereo: 1, pie: 1}, false, false,
    siloSpriteFn
  ),
  "camino": new Terreno(
    "Camino", 0, "Camino pavimentado de fácil acceso pero que no ofrece defensas", {oruga: 1,ruedas: 1,aereo: 1, pie: 1}, false, false,
    caminoSpriteFn
  ),
  "puente": new Terreno(
    "Puente", 0, "Conecta islas para permitir el acceso a unidades terrestres. Las unidades navales pueden atravesarlo, pero con algo de dificultad. No ofrece bonus defensivos.", {oruga: 1,ruedas: 1,aereo: 1, pie: 1, naval: 2}, false, false, 
    puenteSpriteFn
  ),
  "tuberia": new Terreno(
    "Tubería", 0, "Bloquea el paso a todas las unidades, imposible de destruir.", {}, false, false, 
    tuberiaSpriteFn
  ),
  "mar": new Terreno(
    "Mar", 0, "Terreno marítimo donde pueden cruzar unidades navales y aéreas", {aereo: 1, naval: 1}, false, false, 
    marSpriteFn
  ),
  "arrecife": new Terreno(
    "Arrecife", 2, "Terreno marítimo que puede ocultar unidades navales y que ofrece algunas capacidades defensivas, aunque algo difícil de navegar.", {aereo: 1, naval: 2}, true, false, 
    arrecifeSpriteFn
  ),
  "rio": new Terreno(
    "Rio", 0, "Puede ser atravesado por soldados y unidades navales. No ofrece defensa", {aereo: 1, naval: 1, pie: 2}, false, false, 
    rioSpriteFn
  ),
  "costa": new Terreno(
    "Costa", 0, "Puede ser navegador por cualquier unidad. Conecta mar con tierra. No ofrece defensa", {oruga: 1,ruedas: 1,aereo: 1, naval: 1, pie: 1}, false, false, 
    costaSpriteFn
  ),
  "invalido": new Terreno(
    "Casilla invalida", 0, "Casilla inválida. Error", {}, false, false, 
    invalidoSpriteFn
  ),
}
