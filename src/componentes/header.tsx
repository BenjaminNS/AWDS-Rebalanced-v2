import React from 'react'
import './header.css'

type elementoHeader = {
  texto: string,
  liga: string,
  privada?: boolean
}

export const ElementosHeader:elementoHeader[] = [
  // Si no encuentra la página, me regresa a la original
  // Públicas
  // { texto: 'Bienvenida', liga: 'bienvenida.html'}, //Esta ocupa el dato del jugador
  { texto: 'Mis partidas', liga: 'mis_partida.html' }, // Esta ocupa el dato del jugador
  { texto: 'Crear partida', liga: 'crear_partida.html' },
  { texto: 'Buscar partida', liga: 'buscar_partida.html' },
  { texto: 'Jugar partida', liga: 'buscar_partida.html' }, // Esta ocupa el dato del código de la partida y del jugador
  { texto: 'Creador de mapa', liga: 'creador-mapas.html' },
  { texto: 'Lista de Comandantes', liga: 'lista_comandantes.html' },
  { texto: 'Lista de unidades', liga: 'lista_unidades.html' },
  { texto: '¿Cómo jugar?', liga: 'como_jugar.html' },

  // Privadas
  { texto: 'Editor de unidades', liga: 'editor_unidades.html', privada: true },
  { texto: 'Editor de terrenos', liga: 'editor_terrenos.html', privada: true },
  { texto: 'Editor de Comandantes', liga: 'editor_comandantes.html', privada: true }
]

export function Header ({ elementosHeader }: { elementosHeader: elementoHeader[] }){
  return (
    <header>
      <div className="icono-seccion">
        <a href="./index.html">
          <img src="./awds_rebalanced.ico" />
        </a>
      </div>
      <div className="nombre-pagina">AW Rebalanced!</div>
      <ul className="lista-paginas">
        {elementosHeader.map((elemHeader, i) => {
          if ( !elemHeader.privada ){
            return (
              <li key={i}>
                <a href={elemHeader.liga}>{elemHeader.texto}</a>
              </li>
            )
          }
        })}
      </ul>
    </header>
  )
}
