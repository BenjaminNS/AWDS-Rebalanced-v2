import './header.css'

type elementoHeader = {
  texto: string,
  liga: string,
  privada?: boolean
}

export let elementosHeader:elementoHeader[] = [
  // Si no encuentra la página, me regresa a la original
  // Públicas
  // { texto: 'Bienvenida', liga: 'bienvenida.html'}, //Esta ocupa el dato del jugador
  { texto: 'Mis partidas', liga: 'mis_partida.html'}, //Esta ocupa el dato del jugador
  { texto: 'Crear partida', liga: 'crear_partida.html'},
  { texto: 'Buscar partida', liga: 'buscar_partida.html'},
  { texto: 'Jugar partida', liga: 'buscar_partida.html'}, //Esta ocupa el dato del código de la partida y del jugador
  { texto: 'Creador de mapa', liga: 'creador-mapas.html'},
  { texto: 'Lista de Comandantes', liga: 'lista_comandantes.html'},
  { texto: 'Lista de unidades', liga: 'lista_unidades.html'},
  { texto: '¿Cómo jugar?', liga: 'como_jugar.html'},

  // Privadas
  { texto: 'Editor de unidades', liga: 'editor_unidades.html', privada: true},
  { texto: 'Editor de terrenos', liga: 'editor_terrenos.html', privada: true},
  { texto: 'Editor de Comandantes', liga: 'editor_comandantes.html', privada: true},
]

export function headerHTML({elementosHeader, contenedor}: {elementosHeader: elementoHeader[], contenedor: HTMLElement}){
  const headerHTML = document.createElement('header')
  headerHTML.innerHTML = `
    <div class="icono-seccion">
      <a href="./index.html">
        <img src="./awds_rebalanced.ico">
      </a>
    </div>
    <div class="nombre-pagina">AW Rebalanced!</div>
  `
  const listaLigasHtml = document.createElement('ul')
  listaLigasHtml.setAttribute('class', 'lista-paginas')
  elementosHeader.forEach((elementoHeader) => {
    // Verificar si está en modo desarrollo
    // O talvez si es usuario con permisos
    if(!elementoHeader.privada){
      listaLigasHtml.innerHTML += `
        <li>
          <a href="${elementoHeader.liga}">${elementoHeader.texto}</a>
        </li>
      `
    }
  })

  headerHTML.append(listaLigasHtml)
  contenedor.prepend(headerHTML)
}

// document.addEventListener('load', () => {
  // debugger
  headerHTML({elementosHeader: elementosHeader, contenedor: document.querySelector('body')})
// })