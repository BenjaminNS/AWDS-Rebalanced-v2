
import { describe, it, expect } from 'vitest'
import { MapaJS } from '../mapa'
const { Mapa } = MapaJS()
import mapaPrueba from '../mapas/test.json'
// const { generarMapaKonva } = mapaKonva()

describe('Función Mapa Konva', async () => {
  it('Debe regresar "planicie" si la coordenada enviada es 0, 0', async () => {
    const MapaJuego = new Mapa(mapaPrueba.nombre, mapaPrueba.dimensiones, mapaPrueba.casillas)
    expect(MapaJuego.obtenerCasilla(0, 0)).toBe('planicie')
  })
})
