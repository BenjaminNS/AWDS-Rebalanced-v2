import './style.css'
import Konva from 'konva'
import { generarMapaAleatorio, generarMapaRelleno, tamanoCasilla, MAPA_CAPAS, generarSpriteTerreno, generarSpriteUnidad } from './mapa/mapaKonva'
import { Mapa, type coordenada } from './mapa/mapa'
import { ListaTerrenos, type nombreTerreno } from './mapa/terreno'
import { ListaUnidades, Unidad, UnidadCasilla, type nombreUnidad } from './unidades/unidades'
let layerUnidad:Konva.Layer

let mapaGenerado:Mapa|null = null
type dimensiones = {
  anchoMin:number, altoMin:number,
  anchoActual: number, altoActual: number,
  anchoMax: number, altoMax: number
}
type accionBrocha = 'pintar'|'seleccionar'|'borrar'
type espejoOpcion = 'Ninguno'|'Horizontal'|'Vertical'|'Diagonal'
type tipoBrocha = 'Terreno'|'Unidad'
type brochaUnidad = {
  accion: accionBrocha,
  unidad: nombreUnidad,
  propietario: number,
  hp: number,
  gas: number,
  munPrincipal: number|null,
  munSecundaria: number|null
}
type formulario = {
  dimensiones: dimensiones,
  brochaSeleccionada: tipoBrocha,
  brochaTerreno: {
    accion: accionBrocha,
    valor: nombreTerreno,
    espejo: espejoOpcion
  },
  brochaUnidad: brochaUnidad,
  propietarioTerreno: null|number
}
const formularioMapa:formulario = {
  dimensiones: {
    anchoMin: 10, altoMin: 10,
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
    unidad: 'infanteria',
    propietario: 0,
    gas: 1, hp: 100,
    munPrincipal: null, munSecundaria: null
  },
  propietarioTerreno: null
}

function configurarFormulario(){
  const btnNavBrochaTerreno = document.querySelector('#nav-brocha-terreno') as HTMLButtonElement
  const btnNavBrochaUnidad = document.querySelector('#nav-brocha-unidad') as HTMLButtonElement

  const anchoMapaInput = document.querySelector('#ancho-mapa') as HTMLInputElement
  const altoMapaInput = document.querySelector('#alto-mapa') as HTMLInputElement
  const btnRedimensionarMapa = document.querySelector('#btn-redimensionar-mapa') as HTMLButtonElement

  const brochaTerrenoSelect = document.querySelector('#brocha-terreno') as HTMLSelectElement
  const seccionPropietarioTerreno = document.querySelector('#seccion-propietario') as HTMLInputElement
  const propietarioTerreno = document.querySelector('#propietario-casilla') as HTMLInputElement
  const espejoInput = document.querySelector('#opcion-espejo') as HTMLInputElement
  
  const brochaUnidadSelect = document.querySelector('#brocha-unidad') as HTMLSelectElement

  const inputUnidadPropietario = document.querySelector('#unidad_propietario') as HTMLInputElement
  const inputUnidadHP = document.querySelector('#unidad_hp') as HTMLInputElement
  const inputUnidadGas = document.querySelector('#unidad_gas') as HTMLInputElement
  const inputUnidadMun_Principales = document.querySelector('#unidad_municiones_principales') as HTMLInputElement
  const inputUnidadMun_Secundarias = document.querySelector('#unidad_municiones_secundarias') as HTMLInputElement
  
  
  const btnGuardarMapa = document.querySelector('#btn-guardar') as HTMLButtonElement

  btnNavBrochaTerreno.addEventListener('click', ()=>{
    formularioMapa.brochaSeleccionada = 'Terreno'
  })
  btnNavBrochaUnidad.addEventListener('click', ()=>{
    formularioMapa.brochaSeleccionada = 'Unidad'
  })

  anchoMapaInput.addEventListener('change', ()=>{
    btnRedimensionarMapa.removeAttribute('disabled')
  })
  altoMapaInput.addEventListener('change', ()=>{
    btnRedimensionarMapa.removeAttribute('disabled')
  })

  generarOpcionesTerreno(brochaTerrenoSelect, ListaTerrenos)
  formularioMapa.brochaTerreno.valor = 'aeropuerto'
  generarOpcionesUnidad(brochaUnidadSelect, ListaUnidades)
  formularioMapa.brochaUnidad.unidad = 'infanteria'
  formularioMapa.brochaTerreno.espejo = espejoInput.value as espejoOpcion

  btnRedimensionarMapa.addEventListener('click', async ()=>{
    const ancho = parseInt(anchoMapaInput.value)
    const alto = parseInt(altoMapaInput.value)

    formularioMapa.dimensiones.anchoActual = ancho
    formularioMapa.dimensiones.altoActual = alto

    mapaGenerado = await generarMapaRelleno({dimensiones: {columnas: formularioMapa.dimensiones.anchoActual, filas: formularioMapa.dimensiones.altoActual}, idContenedor: 'mapa-konva', tipoCasilla: 'planicie'})
    AgregarEventosMapa(mapaGenerado)
    btnRedimensionarMapa.setAttribute('disabled', 'true')
  })


  // Terreno
  brochaTerrenoSelect?.addEventListener('change', (ev)=>{
    formularioMapa.brochaTerreno.valor = ev.target?.value
    mostrarPropietarioTerreno(formularioMapa.brochaTerreno.valor)
  })
  espejoInput?.addEventListener('change', (ev)=>{
    formularioMapa.brochaTerreno.espejo = ev.target?.value
    console.log(formularioMapa.brochaTerreno.espejo)
  })
  propietarioTerreno?.addEventListener('change', (ev)=>{
    if( ev.target?.value === '' ) {
      formularioMapa.propietarioTerreno = ev.target?.value
    } else{
      formularioMapa.propietarioTerreno = parseInt(ev.target?.value)
    }
  })
  //Unidad 
  brochaUnidadSelect?.addEventListener('change', (ev)=>{
    formularioMapa.brochaUnidad.unidad = ev.target?.value
    inputUnidadGas?.setAttribute('value', ListaUnidades[ev.target?.value].maxGasolina)
    inputUnidadGas?.setAttribute('max', ListaUnidades[ev.target?.value].maxGasolina)
    formularioMapa.brochaUnidad.gas = ListaUnidades[ev.target?.value].maxGasolina

    const munPrincipalMax = ListaUnidades[ev.target?.value].maxMuniciones?.principal
    if( munPrincipalMax ){
      document.querySelector('#seccion-mun-principal')?.classList.remove('hidden')
      inputUnidadMun_Principales?.removeAttribute('disabled')
      inputUnidadMun_Principales?.setAttribute('max', munPrincipalMax)
      inputUnidadMun_Principales?.setAttribute('value', munPrincipalMax)
      formularioMapa.brochaUnidad.munPrincipal = munPrincipalMax
    } else{
      document.querySelector('#seccion-mun-principal')?.classList.add('hidden')
      inputUnidadMun_Principales?.setAttribute('disabled', '')
      formularioMapa.brochaUnidad.munPrincipal = null
    }

    const munSecundariaMax = ListaUnidades[ev.target?.value].maxMuniciones?.secundaria
    if( munSecundariaMax ){
      document.querySelector('#seccion-mun-secundaria')?.classList.remove('hidden')
      inputUnidadMun_Secundarias?.removeAttribute('disabled')
      inputUnidadMun_Secundarias?.setAttribute('max', munSecundariaMax)
      inputUnidadMun_Secundarias?.setAttribute('value', munSecundariaMax)
      formularioMapa.brochaUnidad.munSecundaria = munSecundariaMax
    } else{
      document.querySelector('#seccion-mun-secundaria')?.classList.add('hidden')
      inputUnidadMun_Secundarias?.setAttribute('disabled', '')
      formularioMapa.brochaUnidad.munSecundaria = null
    }
  })
  inputUnidadPropietario?.addEventListener('change', (ev)=>{
    formularioMapa.brochaUnidad.propietario = ev.target?.value
  })
  inputUnidadHP?.addEventListener('change', (ev)=>{
    formularioMapa.brochaUnidad.hp = ev.target?.value
  })
  inputUnidadGas?.addEventListener('change', (ev)=>{
    formularioMapa.brochaUnidad.gas = ev.target?.value
  })
  inputUnidadMun_Principales?.addEventListener('change', (ev)=>{
    formularioMapa.brochaUnidad.munPrincipal = ev.target?.value
  })
  inputUnidadMun_Secundarias?.addEventListener('change', (ev)=>{
    formularioMapa.brochaUnidad.munSecundaria = ev.target?.value
  })


  btnGuardarMapa?.addEventListener('click', ()=>{
    // Convertir a un dato más simple
    console.log('Guardar mapa')
    const datos = JSON.stringify({x: 0, y: 0})
    const blob = new Blob([datos], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mapa_${Math.floor(Math.random()*999999)}.json`
    a.click()
    URL.revokeObjectURL(url)
  
    console.log(mapaGenerado)
  })

  document.querySelector('#creador-mapas')?.addEventListener('submit', (ev)=>{
    ev.preventDefault()
  }, )

  // brochaUnidadSelect.dispatchEvent(new Event('change', { bubbles: true }))
  brochaUnidadSelect.dispatchEvent(new Event('change', { bubbles: false }))

  function mostrarPropietarioTerreno(terreno: nombreTerreno){
    if( ListaTerrenos[terreno].esPropiedad ){
      seccionPropietarioTerreno.style.display = ''
    } else{
      seccionPropietarioTerreno.style.display = 'none'
    }
  }
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
  let mousePresionado = false
  habilitarBotonGuardar()

  mapa.konvaStage?.on('click', ()=>{
    const pos = mapa.konvaStage?.getPointerPosition()
    if (!pos) return
    const casillaX = Math.floor(pos.x / tamanoCasilla)
    const casillaY = Math.floor(pos.y / tamanoCasilla)
    
    switch(formularioMapa.brochaSeleccionada){
      case 'Unidad':
        switch(formularioMapa.brochaUnidad.accion){
          case 'pintar':
            pintarUnidad(formularioMapa.brochaUnidad, {x: casillaX, y: casillaY}, mapa)
            break
          case 'borrar':
            break
          case 'seleccionar':
            break
        }
        break;
    }
  })
  mapa.konvaStage?.on('mousedown', () => {
    mousePresionado = true

    const pos = mapa.konvaStage?.getPointerPosition()
    if (!pos) return
    const casillaX = Math.floor(pos.x / tamanoCasilla)
    const casillaY = Math.floor(pos.y / tamanoCasilla)
    
    switch(formularioMapa.brochaSeleccionada){
      case 'Terreno':
        pintarTerrenoEspejo(formularioMapa.brochaTerreno.valor, {x: casillaX, y: casillaY}, mapa, formularioMapa.brochaTerreno.espejo)
        break
      case 'Unidad':
        switch(formularioMapa.brochaUnidad.accion){
          case 'pintar':
            pintarUnidad(formularioMapa.brochaUnidad, {x: casillaX, y: casillaY}, mapa)
            break
          case 'borrar':
            break
          case 'seleccionar':
            break
        }
        break;
    }
  })
  mapa.konvaStage?.on('mouseup', () => {
    mousePresionado = false
    // actualizarAnálisis (num de jugadores y de cada tipo de propiedad)
    habilitarBotonGuardar()
  })
  function habilitarBotonGuardar(){
    // Falta validar que tenga nombre el archivo
    if( mapaGenerado != null && mapaGenerado.esMapaValido() ){
      document.querySelector('#btn-guardar')?.removeAttribute('disabled')
    } else{
      document.querySelector('#btn-guardar')?.setAttribute('disabled', 'true')
    }
  }

  const casillaTxt = document.querySelector('#casilla-output')
  mapa.konvaStage?.on('mousemove', () => {
    const pos = mapa.konvaStage?.getPointerPosition()
    if (!pos) return
    const casillaX = Math.floor(pos.x / tamanoCasilla)
    const casillaY = Math.floor(pos.y / tamanoCasilla)

    if( casillaTxt )  casillaTxt.textContent = `CASILLA: [${casillaX}, ${casillaY}]`

    if(mousePresionado){
      switch(formularioMapa.brochaSeleccionada){
        case 'Terreno':
          pintarTerrenoEspejo(formularioMapa.brochaTerreno.valor, {x: casillaX, y: casillaY}, mapa, formularioMapa.brochaTerreno.espejo)
          break
      }
    }
  })
}


// FUNCIONES CASILLAS TERRENO
async function pintarTerrenoEspejo(tipoCasilla: nombreTerreno, coordenada: coordenada, mapa: Mapa, espejo: espejoOpcion){
  pintarTerreno(tipoCasilla, coordenada, mapa)

  switch(espejo){
    case 'Horizontal':
      {
        // 5
        // 0,4  1,3  2,2  3,1  4,0
        // (0-5)=-5 (1-)
        const coordenada2:coordenada = {
          x: Math.abs( coordenada.x - (mapa.dimensiones.columnas - 1) ),
          y: coordenada.y 
        }
        pintarTerreno(tipoCasilla, coordenada2, mapa)
      }
      break;
    case 'Vertical':
      {
        const coordenada2:coordenada = {
          x: coordenada.x,
          y: Math.abs( coordenada.y - (mapa.dimensiones.filas - 1) ) 
        }
        pintarTerreno(tipoCasilla, coordenada2, mapa)
      }
      break;
    case 'Diagonal':
      {
        const coordenada2:coordenada = {
          x: Math.abs( coordenada.x - (mapa.dimensiones.columnas - 1) ),
          y: Math.abs( coordenada.y - (mapa.dimensiones.filas - 1) ) 
        }
        pintarTerreno(tipoCasilla, coordenada2, mapa)
      }
      break;
  }
}
async function pintarTerreno(tipoCasilla: nombreTerreno, coordenada: coordenada, mapa: Mapa){
  if( !tipoCasilla && ListaTerrenos[tipoCasilla] ){
    console.log('Terreno inválido')
    return
  }

  const casillaPintada = mapa.casillas[( ( coordenada.y * mapa.dimensiones.columnas ) + coordenada.x )]
  if( casillaPintada == null){
    return
  }
  
  casillaPintada.tipo = tipoCasilla

  if( ListaTerrenos[tipoCasilla].esPropiedad ){
    casillaPintada.propietario = formularioMapa.propietarioTerreno
  } else{
    casillaPintada.propietario = null
  }
  
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

  // casillaPintada.sprite?.filters(tileCasilla.filters())
  // casillaPintada.sprite?.tintColor = tileCasilla.tintColor
}

// FUNCIONES CASILLAS UNIDAD
async function pintarUnidad(brochaUnidad: brochaUnidad, coordenada: coordenada, mapa: Mapa){
  if( !brochaUnidad.unidad && ListaUnidades[brochaUnidad.unidad] ){
    console.log('Unidad inválida')
    return
  }
  const casillaUnidad = mapa.casillas[( ( coordenada.y * mapa.dimensiones.columnas ) + coordenada.x )]
  if( casillaUnidad == null){
    return
  }
  
  // const unidadCasilla = new UnidadCasilla(tipoUnidad, 0, 100, {principal: 6}, 10, null, 'normal')
  const spriteAnterior = layerUnidad.findOne('#' + casillaUnidad.unidad?.id)
  spriteAnterior?.destroy()

  let municiones:object|null= {}
  if( !brochaUnidad.munPrincipal && !brochaUnidad.munSecundaria ){
    municiones = null
  }
  
  if ( brochaUnidad.munPrincipal ){
    municiones.principal = brochaUnidad.munPrincipal
  }
  if ( brochaUnidad.munSecundaria ){
    municiones.secundaria = brochaUnidad.munSecundaria
  }

  casillaUnidad.unidad = new UnidadCasilla(brochaUnidad.unidad, brochaUnidad.propietario, brochaUnidad.hp, municiones, brochaUnidad.gas, null, 'normal')
  const spriteUnidad = generarSpriteUnidad(casillaUnidad, coordenada) as Konva.Sprite
  casillaUnidad.unidad.sprite = spriteUnidad

  // if(casillaUnidad.unidad){
  //   // Si existe, reemplazar info
  //   const cropObject = await spriteUnidad?.getAttr('crop')
  //   casillaUnidad.unidad.sprite?.crop({
  //     x: cropObject.x,
  //     y: cropObject.y,
  //     width: cropObject.width,
  //     height: cropObject.height,
  //   });
    

  //   // casillaUnidad.unidad?.sprite?.filters(spriteUnidad?.filters())
  //   // casillaUnidad.unidad?.sprite?.tintColor = spriteUnidad?.tintColor
  //   // casillaUnidad.hue( hsv.h )
  //   // casillaUnidad.saturation( hsv.s )
  //   // casillaUnidad.value( hsv.v )

  // } else{
  //   // Si no existe, agregarlo
  //   layerUnidad.add(spriteUnidad)
  // }

  layerUnidad.add(spriteUnidad)
}

window.addEventListener('load', async ()=> {
  configurarFormulario()
  mapaGenerado = await generarMapaRelleno({dimensiones: {columnas: formularioMapa.dimensiones.anchoActual, filas: formularioMapa.dimensiones.altoActual}, idContenedor: 'mapa-konva', tipoCasilla: 'planicie'})
  layerUnidad = mapaGenerado?.konvaStage.getLayers().find((layer) => layer.getName() === MAPA_CAPAS.UNIDADES)
  AgregarEventosMapa(mapaGenerado)
})

// POR HACER
/*
▄ Evitar que se redibuje el mapa cuando se haga enter en cualquier input (solo debe funcionar haciendo click en el botón de ridimensionar)
▄ Despachar evento de botón de redimensionar y de select de terreno
▄ Calcular el número de jugadores basados en las unidades dentro del mapa (solo está contando las propiedades)
▄ Redibujar casillas alrededor cuando se pinte un terreno (para corregir apariencia)
▄ Modo de brocha borrar
▄ Pintar correctamente la casilla dependiendo el propietario (en caso de propiedades)
▄ *Modo de brocha seleccionar
▄ Guardar el JSON del mapa localmente
*/