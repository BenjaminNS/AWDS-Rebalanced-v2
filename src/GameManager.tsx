import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Header, ElementosHeader } from './componentes/header.tsx'
import { GameUI } from './componentes/GameUi.tsx'

createRoot(document.getElementById('app') as HTMLElement).render(
  <>
    <Header elementosHeader={ElementosHeader}/>
    <GameUI/>
  </>
)
