import './tab.css'

window.addEventListener('load', ()=>{
  const navLinks = [...document.querySelectorAll('.nav-link')]
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', (ev)=>{
      navLinks.forEach(navLink => {
        navLink.classList.remove('seleccionado')
        const targetLinkTabtemp = navLink.getAttribute('data-bs-target')
        document.querySelector(targetLinkTabtemp).classList.remove('seleccionado')
      });
      ev.target.classList.add('seleccionado')
      const targetLinkTab = ev.target.getAttribute('data-bs-target')
      document.querySelector(targetLinkTab).classList.add('seleccionado')
    })
  });
});
