import React, { useRef } from 'react'
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
  const listaPaginas:Ref<HTMLUListElement> = useRef(null)
  const btnMenuClickHandler = () => {
    if ( listaPaginas.current.classList.toggle ){
      listaPaginas.current.classList.toggle('mostrar')
    }
  }

  return (
    React.useMemo(() => (
      <header className='justify-between'>
        <a href="" className='flex items-center' style={{ columnGap: '8px' }}>
          <div className="icono-seccion">
            <img src="./awds_rebalanced.ico" />
          </div>
          <div className="nombre-pagina">AW Rebalanced!</div>
        </a>
        <div className='cursor-pointer'>
          <img id="btn-menu" onClick={btnMenuClickHandler} src="./img/icons/burger-bar.png" alt="Btn menu movil" className='object-cover' style={{ width: '2rem' }} />
        </div>
        <ul className="lista-paginas" ref={listaPaginas}>
          {elementosHeader.map((elemHeader, i) => {
            if ( !elemHeader.privada ){
              return (
                <a className='pagina-link' key={i} href={elemHeader.liga}>{elemHeader.texto}</a>
              )
            }
          })}
        </ul>
      </header>
    ), [])
  )
}
