import './style.css'
import Konva from 'konva'
import { generarMapaAleatorio, generarMapaRelleno, tamanoCasilla, MAPA_CAPAS, generarSpriteTerreno } from './mapa/mapaKonva'
import { Mapa } from './mapa/mapa'
import { ListaTerrenos } from './mapa/terreno'
import { ListaUnidades } from './unidades/unidades'
import type { nombreTerreno } from './mapa/terreno'
import type { nombreUnidad } from './unidades/unidades'
// import type { coordenada } from './mapa/mapa'

let mapaGenerado:Mapa|null = null
type dimensiones = {
  anchoMin:number, altoMin:number,
  anchoActual: number, altoActual: number,
  anchoMax: number, altoMax: number
}
type accionBrocha = 'pintar'|'seleccionar'|'borrar'
type espejoOpcion = 'Ninguno'|'Horizontal'|'Vertical'|'Diagonal /'|'Diagonal \\'
type tipoBrocha = 'Terreno'|'Unidad'
type formulario = {
  dimensiones: dimensiones,
  brochaSeleccionada: tipoBrocha,
  brochaTerreno: {
    accion: accionBrocha,
    valor: nombreTerreno,
    espejo: espejoOpcion
  },
  brochaUnidad: {
    accion: accionBrocha,
    valor: nombreUnidad
  },
  selectTerreno: HTMLElement|null,
  selectUnidad: HTMLElement|null,
}
const formularioMapa:formulario = {
  dimensiones: {
    anchoMin: 5, altoMin: 5,
    anchoActual: 10, altoActual: 10,
    anchoMax: 40, altoMax: 40,
  },
  brochaSeleccionada: 'Terreno',
  brochaTerreno: {
    accion: 'pintar',
    valor: 'planicie',
    espejo: 'Ninguno'
  },
  brochaUnidad: {
    accion: 'pintar',
    valor: 'infanteria'
  }
}

function configurarFormulario(){
  generarOpcionesTerreno(document.querySelector('#brocha-terreno'), ListaTerrenos)
  generarOpcionesUnidad(document.querySelector('#brocha-unidad'), ListaUnidades)

  document.querySelector('#creador-mapas')?.addEventListener('submit', (ev)=>{
    ev.preventDefault()
  }, )

  function generarOpcionesTerreno(selectTerreno:HTMLElement, terrenosObjeto: Object){
    let opcionesTerreno = ''
    Object.keys(terrenosObjeto).sort().forEach((keyTerreno, i) => {
      if( keyTerreno != 'invalido' ){
        if( i === 0 ){
          opcionesTerreno += `<option value="${keyTerreno}" selected="selected">${terrenosObjeto[keyTerreno].nombre}</option>`
        } else{
          opcionesTerreno += `<option value="${keyTerreno}">${terrenosObjeto[keyTerreno].nombre}</option>`
        }
      }
    })
    selectTerreno.innerHTML = opcionesTerreno
  }
  function generarOpcionesUnidad(selectUnidad:HTMLElement, unidadesObjeto: Object){
    let opcionesUnidad = ''
    Object.keys(unidadesObjeto).forEach((keyUnidad, i) => {
      if( i === 0 ){
        opcionesUnidad += `<option value="${keyUnidad}" selected="selected">${unidadesObjeto[keyUnidad].nombre}</option>`
      } else{
        opcionesUnidad += `<option value="${keyUnidad}">${unidadesObjeto[keyUnidad].nombre}</option>`
      }
    })

    selectUnidad.innerHTML = opcionesUnidad
  }
}

function AgregarEventosMapa(mapa: Mapa){
  // mapa.konvaStage?.container().style.cursor = 'pointer'
  mapa.konvaStage?.on('click', () => {
    const pos = mapa.konvaStage?.getPointerPosition()
    if (pos) {
      const casillaX = Math.floor(pos.x / tamanoCasilla)
      const casillaY = Math.floor(pos.y / tamanoCasilla)

      // checar cual brocha está usando y usar la opción correspondiente
      const select = document.querySelector('#brocha-terreno') as HTMLSelectElement | null
      const terrenoSeleccionado = select?.options[select.selectedIndex]?.value

      if( terrenoSeleccionado != null ){
        pintarCasillaTerreno(terrenoSeleccionado, {x: casillaX, y: casillaY}, mapa)
      }
    }
  })

  // Cambiar el evento a mousemove y cambiar el comportamiento
  // mapa.konvaStage?.on('mousemove', (ev) => {
  // 1. Imprimir la coordenada
  // 2. Pintar terreno (o unidades) mientras muevas el mouse con el click presionado (de preferencia no repetir si ya existe un objeto idéntico o si ya sabes que casillas acaban de ser pintadas)
  //   console.log('Moviste el mouse')
  // })
}

async function pintarCasillaTerreno(tipoCasilla: nombreTerreno, coordenada: coordenada, mapa: Mapa){
  const casillaPintada = mapa.casillas[( ( coordenada.y * mapa.dimensiones.columnas ) + coordenada.x )]
  if( casillaPintada == null){
    return
  }
  
  casillaPintada.tipo = tipoCasilla
  casillaPintada.propietario = null
  const tileCasilla = generarSpriteTerreno(casillaPintada, coordenada, mapa)
  const cropObject = await tileCasilla.getAttr('crop')
  casillaPintada.sprite?.crop({
    x: cropObject.x,
    y: cropObject.y,
    width: cropObject.width,
    height: cropObject.height,
  });
  casillaPintada.sprite?.setAttrs({
    y: tileCasilla.getAttr('y'),
    height: tileCasilla.getAttr('height'),
    offsetY: tileCasilla.getAttr('offsetY')
  })
}

window.addEventListener('load', async ()=>{
  configurarFormulario()
  mapaGenerado = await generarMapaRelleno({dimensiones: {columnas: 10, filas: 10}, idContenedor: 'mapa-konva', tipoCasilla: 'planicie'})
  AgregarEventosMapa(mapaGenerado)
})

// POR HACER
/*
1. Cambiar evento de clic por evento de mouse down o de mousemove para pintar continuamente
2. Output de casilla con hover
3. Redimensionar mapa cuando hagas clic en aplicar dimensiones
4. Brocha para unidades
5. Campo de propietario en terreno (si es que aplica)
6. Modo de brocha seleccionar
5. Modo de brocha borrar
8. Hacer análisis del mapa (cuando no se esté haciendo clic) para saber si se puede guardar 
y habilitar el botón de guardar mapa cuando sea el caso
9. Guardar el JSON del mapa localmente
*/