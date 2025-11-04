export function getInfoCasillaVariables(contenedor:HTMLElement){
  const estrellaOutput = contenedor.querySelector('#estrella-txt>span') as HTMLOutputElement
  const hpOutput = contenedor.querySelector('#hp-txt') as HTMLOutputElement
  const gasOutput = contenedor.querySelector('#gas-txt') as HTMLOutputElement
  const munPrincipalOutput = contenedor.querySelector('#mun-principal-txt') as HTMLOutputElement
  const munSecundariaOutput = contenedor.querySelector('#mun-secundaria-txt') as HTMLOutputElement
  const statusOutput = contenedor.querySelector('#status-txt') as HTMLOutputElement

  return { estrellaOutput, hpOutput, gasOutput, munPrincipalOutput, munSecundariaOutput, statusOutput }
}

export function actualizarInfo(info:{
    estrellas:number|null|undefined,
    hp?:number|null,
    gasolina?:number|null,
    municionesPrincipales?:number|null,
    municionesSecundarias?:number|null,
    status?:string|null,
  }, outPutsHtml: {
    estrellaOutput:HTMLElement,
    hpOutput:HTMLElement,
    gasOutput:HTMLElement,
    munPrincipalOutput:HTMLElement,
    munSecundariaOutput:HTMLElement,
    statusOutput:HTMLElement
  }){
  const { estrellas, hp, gasolina, municionesPrincipales, municionesSecundarias, status } = info
  const { estrellaOutput, hpOutput, gasOutput, munPrincipalOutput, munSecundariaOutput, statusOutput } = outPutsHtml

  if(estrellas != null){
    estrellaOutput.innerText = estrellas.toString()
  } else{
    estrellaOutput.innerText = '0'
  }

  if(hp != null){
    hpOutput.style.display = 'flex'
    hpOutput.querySelector('span').innerText = hp.toString()
  } else{
    hpOutput.style.display = 'none'
  }
  if(gasolina != null){
    gasOutput.style.display = 'flex'
    gasOutput.querySelector('span').innerText = gasolina.toString()
  } else{
    gasOutput.style.display = 'none'
  }
  if(municionesPrincipales != null){
    munPrincipalOutput.style.display = 'flex'
    munPrincipalOutput.querySelector('span').innerText = municionesPrincipales.toString()
  } else{
    munPrincipalOutput.style.display = 'none'
  }
  if(municionesSecundarias != null){
    munSecundariaOutput.style.display = 'flex'
    munSecundariaOutput.querySelector('span').innerText = municionesSecundarias.toString()
  } else{
    munSecundariaOutput.style.display = 'none'
  }
  // Buscar el icono de status (si es que aplica)
  if(status != null){
    statusOutput.style.display = 'flex'
    statusOutput.querySelector('span').innerText = status
  } else{
    statusOutput.style.display = 'none'
  }
}