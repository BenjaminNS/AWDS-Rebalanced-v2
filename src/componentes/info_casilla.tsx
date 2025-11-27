import React from 'react'

export type InfoCasillaT = {estrellas:number, terreno: string, hp:number, gasActual: number,
  gasMaxima: number, munPrincipal: number|null, munSecundaria: number|null, status: string|null
}
export function InfoCasilla ({ info }:{info: InfoCasillaT}){
  console.log('Dato actualizado', info)

  const { hp, gasActual, gasMaxima, munPrincipal, munSecundaria, estrellas } = info
  return (
    <section id="casilla-info" className="mb-2 p-2 bg-amber-100 grid grid-cols-3 grid-rows-2 justify-center align-top">
      <output className="info-txt" id="estrella-txt">
        <img src="./img/huds/star.png" alt="hp-txt" className="icon" />
        <span>{estrellas} stars</span>
      </output>
      <output className="info-txt" id="hp-txt">
        <img src="./img/huds/indicador_hp.png" alt="hp-txt" className="icon" />
        <span>{hp}/100</span>
      </output>
      <output className="info-txt" id="gas-txt">
        <img src="./img/huds/indicador_gas.png" alt="gas-txt" className="icon" />
        <span>{gasActual}/{gasMaxima}</span>
      </output>
      { munPrincipal !== null &&
          <output className="info-txt" id="mun-principal-txt">
            <img src="./img/huds/indicador_municion.png" alt="mun-principal-txt" className="icon" />
            <span>{munPrincipal}</span>
          </output>
      }
      { munSecundaria !== null &&
          <output className="info-txt" id="mun-secundaria-txt">
            <img src="./img/huds/indicador_municion.png" alt="mun-secundaria-txt" className="icon" />
            <span>{munSecundaria}</span>
          </output>
      }
      <output className="info-txt" id="status-txt">
        <img src="./img/huds/candado.png" alt="status-txt" className="icon" />
        <span>Status</span>
      </output>
    </section>
  )
}
