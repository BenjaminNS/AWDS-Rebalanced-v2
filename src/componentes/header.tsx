import React from 'react'
import './header.css'

type elementoHeader = {
  texto: string,
  liga: string,
  privada?: boolean
}

export const ElementosHeader:elementoHeader[] = [
  // TODO: Si no encuentra la página, mandar a una pagina 404
  // Públicas
  // { texto: 'Bienvenida', liga: 'bienvenida.html'},
  { texto: 'Mis partidas', liga: 'mis_partida.html' }, // Esta ocupa el dato del jugador
  { texto: 'Crear partida', liga: 'crear_partida.html' },
  { texto: 'Buscar partida', liga: 'buscar_partida.html' },
  { texto: 'Crear mapa 🔧', liga: 'creador-mapas.html' },
  { texto: '¿Cómo jugar?', liga: 'como_jugar.html' }, // Esta página enlista las páginas de comandantes, terrenos, propiedades y unidades

  // Privadas
  { texto: 'Editor de unidades', liga: 'editor_unidades.html', privada: true },
  { texto: 'Editor de terrenos', liga: 'editor_terrenos.html', privada: true },
  { texto: 'Editor de Comandantes', liga: 'editor_comandantes.html', privada: true }
]

export function Header ({ elementosHeader }: { elementosHeader: elementoHeader[] }){
  return (
    React.useMemo(() => (
      <header>
        <a href="" className='flex items-center' style={{ columnGap: '8px' }}>
          <div className="icono-seccion">
            <img src="./awds_rebalanced.ico" />
          </div>
          <div className="nombre-pagina">AW Rebalanced!</div>
        </a>
        <ul className="lista-paginas">
          {elementosHeader.map((elemHeader, i) => {
            if ( !elemHeader.privada ){
              return (
                <a key={i} href={elemHeader.liga}>{elemHeader.texto}</a>
              )
            }
          })}
        </ul>
      </header>
    ), [])
  )
}
