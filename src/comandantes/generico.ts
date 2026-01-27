import { Comandante } from './comandante'

export const ComandanteGenerico = new Comandante('Genérico', 'generico', 'Comandante genérico. Sin fortalezas o debilidad.', 'No designado',
  {
    // COM Towers le dan más descuento o suben mas el tope de sus reparaciones
    descripcion: 'Sin fortalezas o debilidad.',
    variables: {}
  }, null, [], null)
