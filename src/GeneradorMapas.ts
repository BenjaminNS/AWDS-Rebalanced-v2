import './style.css'
import { generarMapaAleatorio } from './mapa/mapaKonva'

document.querySelector('#creador-mapas')?.addEventListener('submit', (ev)=>{
  ev.preventDefault()
}, )

window.addEventListener('load', async ()=>{
    generarMapaAleatorio({dimensiones: {columnas: 10, filas: 10}, idContenedor: 'mapa-konva'})
})
