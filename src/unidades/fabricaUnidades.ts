import type { ComandanteBase } from '../comandantes/ComandanteBase';
import type { Casilla } from '../mapa/casilla';
import { Infanteria } from './modelos/infanteria'
import { type nombreUnidad } from './unidadBase'
import type { datosActuales } from './unidadCasilla';

export function fabricarUnidad(nombreUnidad: nombreUnidad, unidadInfo: datosActuales, refComandante: ComandanteBase, casilla: Casilla, otros: Object){
  switch(nombreUnidad){
    case 'infanteria':
      return new Infanteria(refComandante, casilla, unidadInfo, otros)
  }
}