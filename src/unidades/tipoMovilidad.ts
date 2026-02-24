import { type nombreTerreno } from '../mapa/terreno'
export type tipoMovimiento = 'pie'|'mecha'|'ruedas'|'oruga'|'piperunner'|'aereo'|'naval'

export const LibroMovilidad:Record<tipoMovimiento, Partial<Record<nombreTerreno, number>>> = {
  pie: {
    aeropuerto: 1, bosque: 1, camino: 1, ciudad: 1, costa: 1, cuartelGeneral: 1,
    fabrica: 1, montana: 2, planicie: 1, puente: 1, puertoNaval: 1, rio: 2, silo: 1
  },
  mecha: {
    aeropuerto: 1, bosque: 1, camino: 1, ciudad: 1, costa: 1, cuartelGeneral: 1,
    fabrica: 1, montana: 1, planicie: 1, puente: 1, puertoNaval: 1, rio: 1, silo: 1
  },
  ruedas: {
    aeropuerto: 1, bosque: 3, camino: 1, ciudad: 1, costa: 1, cuartelGeneral: 1,
    fabrica: 1, planicie: 2, puente: 1, puertoNaval: 1, silo: 1
  },
  oruga: {
    aeropuerto: 1, bosque: 2, camino: 1, ciudad: 1, costa: 1, cuartelGeneral: 1,
    fabrica: 1, planicie: 1, puente: 1, puertoNaval: 1, silo: 1
  },
  aereo: {
    aeropuerto: 1, arrecife: 1, bosque: 1, camino: 1, ciudad: 1, costa: 1,
    cuartelGeneral: 1, fabrica: 1, mar: 1, montana: 1, planicie: 1, puente: 1,
    puertoNaval: 1, rio: 1, silo: 1
  },
  naval: {
    arrecife: 2, costa: 1, mar: 1, planicie: 1, puente: 2, puertoNaval: 1
  },
  piperunner: {
    tuberia: 1
  }
}
