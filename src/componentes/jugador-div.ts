import './jugador-div.css'
import { Jugador } from "../jugador"

export function generarDivJugadores({listaJugadores, contenedor}: {listaJugadores: Jugador[], contenedor: HTMLElement|null}){
  if( contenedor == null ) return

  let htmlDivJugadores = ''
  listaJugadores.forEach((jugador) => {
    htmlDivJugadores += `
    <div class="elemento-jugador">
      <div class="top" style="display: flex; align-items: center;">
        <h3 data-text="nombre-jugador" style="flex: auto; padding: .5rem;">${jugador.nombre}</h3>
        <img class="personaje-img" src="./img/comandantes/default.png" alt="Comandante">
      </div>

      <div style="padding: .5rem;">
        <div class="carga-cop" title="35000"></div>

        <!--<p>Unidades: <span data-text="unidades">?</span></p>
        <p>Dinero: <span data-text="dinero">?</span></p>
        <p>Propiedades: <span data-text="propiedades">?</span></p>
        <p>Ingresos diarios: <span data-text="ingresos-diarios">?</span></p>-->

        <section class="letra-equipo" data-text="equipo">${jugador.equipo}</section>

        <!-- <button>Poder</button>
        <button>Super Poder</button> -->
      </div>
    </div>
  `

  // TO-DO: Función para generar los botones de los poderes
  })

  contenedor.innerHTML = htmlDivJugadores
  // ¿Irían aquí los eventos también?
}