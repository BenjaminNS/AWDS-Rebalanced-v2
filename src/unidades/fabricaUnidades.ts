import type { ComandanteBase } from '../comandantes/ComandanteBase';
import type { Casilla } from '../mapa/casilla';
import { Infanteria } from './modelos/infanteria'
import { type nombreUnidad } from './types.d'
import type { datosActuales } from './unidadCasilla';

export function fabricarUnidad(nombreUnidad: nombreUnidad, unidadInfo: datosActuales, otros: Object){
  switch(nombreUnidad){
    case 'infanteria':
      return new Infanteria(unidadInfo, otros)
  }

  console.error('No se encontró la unidad ', nombreUnidad)
  return null
}