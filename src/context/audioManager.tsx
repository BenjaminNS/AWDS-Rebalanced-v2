import React from 'react'

type nombreSfx = 'bote_avanzando'|'fighter_avanzando'|'helicoptero_avanzando'|'infanteria_avanzando'|'tanque_avanzando'|'tanquegrande_avanzando'|'compra_unidades'|'poder_listo'|'accion_invalida'|'unidad_deseleccionada'|'unidad_destruida'|'unidad_seleccionada'
const sfxAudios:Record<nombreSfx, HTMLAudioElement> = {
  bote_avanzando: new Audio('./audio/sfx/bote_avanzando.wav'),
  fighter_avanzando: new Audio('./audio/sfx/fighter_avanzando.wav'),
  helicoptero_avanzando: new Audio('./audio/sfx/helicoptero_avanzando.wav'),
  infanteria_avanzando: new Audio('./audio/sfx/infanteria_avanzando.wav'),
  tanque_avanzando: new Audio('./audio/sfx/tanque_avanzando.wav'),
  tanquegrande_avanzando: new Audio('./audio/sfx/tanquegrande_avanzando.wav'),
  compra_unidades: new Audio('./audio/sfx/compra_unidades.wav'),
  poder_listo: new Audio('./audio/sfx/poder_listo.wav'),
  accion_invalida: new Audio('./audio/sfx/accion_invalida.wav'),
  unidad_deseleccionada: new Audio('./audio/sfx/unidad_deseleccionada.wav'),
  unidad_destruida: new Audio('./audio/sfx/unidad_destruida.wav'),
  unidad_seleccionada: new Audio('./audio/sfx/unidad_seleccionada.wav')
}

class AudioSFXPlayer {
  loadAllAudios (){
    Object.values(sfxAudios).forEach(sfxAudio => sfxAudio.load())
  }
  playSfx (src: nombreSfx){
    sfxAudios[src].currentTime = 0
    sfxAudios[src].play()
  }
  stopSFX (src: nombreSfx){
    sfxAudios[src].currentTime = 0
    sfxAudios[src].pause()
  }
}

export const AudioManagerContext = React.createContext({})

export function AudioManagerProvider ({ children } : {children:React.ReactNode}){
  const audiosfxplayer = React.useRef(new AudioSFXPlayer())

  return (
    <AudioManagerContext.Provider value={{
      audiosfxplayer
    }}>
      {children}
    </AudioManagerContext.Provider>
  )
}
