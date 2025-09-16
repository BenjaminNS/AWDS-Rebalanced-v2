import './header.css'

export function formCreadorMapa(contenedor: HTMLElement){
  const formHTML = document.createElement('form')
  formHTML.innerHTML = `
    <div class="nombre-pagina">AW Rebalanced!</div>
  `

  contenedor.prepend(formHTML)
}

// document.addEventListener('load', () => {
  // debugger
  // formCreadorMapa(document.querySelector('#contenedor-forma'))
// })