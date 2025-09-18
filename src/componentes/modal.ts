import './modal.css'

window.addEventListener('load', ()=>{
  const botonesModal = [...document.querySelectorAll('[data-bs-toggle="modal"]')]

  botonesModal.forEach(botonModal => {
    botonModal.addEventListener('click', (ev)=>{
      const modal = document.querySelector(ev.target?.getAttribute('data-bs-target'))
      if( modal != null ) modal.classList.add('activo')
    });
  });

  const modales = [...document.querySelectorAll('#modal-recomendaciones')]
  modales.forEach(modal => {
    modal.addEventListener('click', (ev)=>{
      ev.target?.classList.remove('activo')
    })
  })
})
