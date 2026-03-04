import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Header, ElementosHeader } from './../componentes/header.tsx'

function ComoJugar (){
  return <>
    <div className=''>
      <section className=''></section>
    </div>
  </>
}

createRoot(document.getElementById('app') as HTMLElement).render(
  <>
    <Header elementosHeader={ElementosHeader}/>
    <ComoJugar/>
  </>
)
