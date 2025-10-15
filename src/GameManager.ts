import './style.css'
import Konva from 'konva'
// Esta función solo debería usarlo en el creador de mapas.html
import { tamanoCasilla, MAPA_CAPAS } from './mapa/mapaKonva.ts'
// import { ListaTerrenos } from './mapa/terreno.ts'
import { generarDivJugadores } from './componentes/jugador-div.ts'
import { PartidaSnapshotMock } from './mocks/PartidaSnapshotMock.ts'
import { PartidaJuego } from './partida.ts'
import { Casilla, type coordenada } from './mapa/mapa.ts'
import type { UnidadCasilla } from './unidades/unidades.ts'
let layerUnidad:Konva.Layer, layerTerreno:Konva.Layer
let controlesHabilitados = true

// import type { nombreTerreno } from './mapa/terreno.ts'
// import type { Unidad, UnidadCasilla } from './unidades/unidades.ts'

/*
a. Seleccionar accion (activar poder o rendirse)

b. Seleccionar unidad
    1 Escoger casilla destino
    2 Escoger accion
    3 (Opcional) Seleccionar casilla(s) afectadas, ej: ataque

c. Seleccionar propiedad
    1 Mostrar opciones de propiedad (ej: comprar)
    2 (Opcional) Seleccionar casilla(s) destino, ej: comprar
*/
// Comandos, acciones

class Interaccion {
    private casillaSeleccionada: null|coordenada

    constructor(){
        this.casillaSeleccionada = null
    }

    public setCasillaSeleccionada(coord: coordenada){}
    public getCasillaSeleccionada(){
        return this.casillaSeleccionada
    }
}
// const interaccion = new Interaccion()
let unidadSeleccionada:UnidadCasilla|null = null

async function iniciarJuego(partidaLiga:string){
    // Esto debería obtenerse con el método GET (o POST) y solicitando a una DB
    // fetch(partidaLiga).then(response => response.json()).then(async(mapa) => { })
    // if( Math.random() >.5 ){
    //     await cargarMapa(PartidaSnapshotMock['Mapa'])
    //     cargarJugadores({jugadores: PartidaSnapshotMock['Jugadores']})
    //     if( partidaJuego.obtenerEquipos().size < 1 ){
    //         console.error('El número de equipos es menos de 2. No puede haber perdedores ni ganadores')
    //     }
    //     cargarEstadoPartida(PartidaSnapshotMock['climaActual'], PartidaSnapshotMock['diaActual'], PartidaSnapshotMock['turnoActual'])
    // } else{
    //     partidaJuego["Mapa"] = await generarMapaAleatorio({dimensiones: {filas: 18, columnas: 23}, idContenedor: 'mapa-konva'})
    // }
    
    // Object.freeze(partidaJuego)
    // console.log('Partida Data', partidaJuego)
}

// const seleccionarCasilla(jugador, casilla){
//   // UNIDAD
//   const unidad = casilla.unidad
//   if( unidad ){
//     unidad.clickUnidad(jugador)
//     return
//   }

//   // PROPIEDAD
//   if( ListaTerrenos[casilla.tipo].propietario === jugador.id ){
//     console.log('Abrir opciones de compra')
//   }
// }

window.addEventListener('load', async ()=>{
    // iniciarJuego({mapaLiga: './mapas/test.json'})
    const Partida = new PartidaJuego(PartidaSnapshotMock, null)
    await Partida.dibujarMapa('mapa-konva')
    generarDivJugadores({contenedor: document.querySelector('.seccion-jugadores'), listaJugadores: Partida['Jugadores']})
    Partida.getMapa().agregarEventoClick(clickMapa, tamanoCasilla)
    Partida.getMapa().konvaStage
    layerUnidad = Partida.getMapa().konvaStage?.getLayers().find((layer) => layer.getName() === MAPA_CAPAS.UNIDADES)
    layerTerreno = Partida.getMapa().konvaStage?.getLayers().find((layer) => layer.getName() === MAPA_CAPAS.TERRENO)
    
    Object.freeze(Partida)
    console.log('Partida Data', Partida)

    function clickMapa(coordenada:coordenada){
        if( !controlesHabilitados ) return

        console.log(coordenada)
        const casillaSeleccionada = Partida.getMapa().obtenerCasilla(coordenada)
        if( !casillaSeleccionada ){
            return
        }
        
        if( unidadSeleccionada ){
            controlesHabilitados = false
            const spriteUnidad = layerUnidad.findOne(`#${unidadSeleccionada.id}`) as Konva.Node
            new Konva.Tween({
                node: spriteUnidad,
                duration: .3,
                x: tamanoCasilla, y: tamanoCasilla,
                // easing: Konva.Easings.BounceEaseOut,
                onFinish: ()=>{
                    controlesHabilitados = true
                    unidadSeleccionada = null
                }
            }).play()
            // spriteUnidad.setAttrs({x: tamanoCasilla, y: tamanoCasilla})
            // spriteUnidad.cache({
            //     pixelRatio: 1,
            //     imageSmoothingEnabled: false
            // })
            // Partida.getMapa().konvaStage?
        } else{
            if( casillaSeleccionada.unidad != null ) {
                unidadSeleccionada = casillaSeleccionada.unidad
                console.log( 'Unidad seleccionada: ', unidadSeleccionada )
            }
        }
    }
})
