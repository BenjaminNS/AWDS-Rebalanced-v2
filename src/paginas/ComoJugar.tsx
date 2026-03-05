import React from 'react'
import { createRoot } from 'react-dom/client'
import './../style.css'
import { Header, ElementosHeader } from './../componentes/header.tsx'
import './comojugar.css'

function ComoJugar (){
  return <>
    <div id='div-como-jugar' className='bg-gray-300 rounded-2xl p-3'>
      <h1 className='text-3xl mb-3 font-bold'>¿Cómo jugar?</h1>

      <section id='seccion-reglas' className='seccion-info'>
        <ul className='list-disc'>
          <li>Para ganar, destruye las fuerzas armadas de tu oponente antes de que el haga lo mismo con las tuyas, captura su HQ para reclamar todas sus propiedades para ganar el juego o tener una ventaja muy grande sobre tu oponente que decida resignar.</li>
          <li>Captura propiedades para generar mas ingresos y poder comprar mas y mejores unidades en fábricas, aeropuertos o puertos navales.</li>
          <li>Daña y destruye las unidades de tu oponente para marcar ventaja de recursos y control de mapa.</li>
          <li>Usa tus poderes para sobrepasar los limites de tus unidades y lograr romper barreras.</li>
        </ul>
      </section>

      <section id='seccion-fow' className='seccion-info'>
        <h2 className='text-xl font-bold'>Propiedades e ingresos</h2>
        <ul className='list-disc'>
          <li>Generas *1,000G (la moneda del juego) por cada ciudad, fábrica, aeropuerto y puerto naval que esté bajo tu poder cada inicio de día.</li>
          <li>
            Puedes juntar máximo 5,000G por cada propiedad que genere ingresos.
            <br />
            <b>Ejemplo:</b> Tienes 20 propiedades, por ende: 20 X 5,000G = 100,000G máximo
          </li>
        </ul>
        <p style={{ fontSize: '.95rem' }}><b>NOTA:</b> Esto solo bajo reglas estándar</p>
      </section>

      <section id='seccion-captura-propiedades' className='seccion-info'>
        <h2 className='text-xl font-bold'>¿Cómo capturo propiedades?</h2>
        <ol className='list-decimal'>
          <li>Escoge una Infantería o Mecha y posicionalo encima de una propiedad que sea neutra o del oponente.</li>
          <li>
            Escoge la opción de capturar la propiedad para empezar el proceso de captura. Necesitas al menos 20 puntos para poder capturar la propiedad. Cuando superes esta marca, la propiedad pasará a ser tuya.
          </li>
          <li>
            Cada punto de captura equivale a los puntos de vida de la unidad entre 10 redondeado hacia arriba que esté capturando.
            <br />
            <b>Ejemplo:</b> Si tienes alguna unidad capturando con 55 de HP, termina generando 6 puntos de captura.
          </li>
        </ol>
        <p style={{ fontSize: '.95rem' }}><b>NOTA:</b> La captura puede ser interrumpida si la unidad que inicio la captura es destruida o si se mueve de lugar. Cualquier otra accion tomada en la misma casilla no afecta directamente los puntos de captura (atacar, esperar o combinar)</p>
      </section>

      <section id='seccion-compra-unidades' className='seccion-info'>
        <h2 className='text-xl font-bold'>¿Cómo comprar unidades?</h2>
        <ol className='list-decimal'>
          <li>Haz clic en alguna fábrica, aeropuerto o puerto naval para comprar unidades terrestres, aéreas o navales, respectivamente.</li>
          <li>Aparecerá un menú de compras de lo que puedes comprar en esa propiedad.</li>
          <li>Selecciona la unidad que quieras comprar. Si tienes suficiente dinero, la unidad será construida en esa misma casilla y se te resta el costo de la unidad a tu fondos. Podrás mover tu unidad hasta el siguiente turno.</li>
        </ol>
      </section>

      <section id='seccion-mover-unidades' className='seccion-info'>
        <h2 className='text-xl font-bold'>¿Cómo muevo mis unidades?</h2>
        <ol className='list-decimal'>
          <li>Se marcarán las casillas de movimiento a donde puede moverse tu unidad, la cual varía en tamaño y forma dependiendo de la movilidad de tu unidad y del contexto (como lo es que tan difícil es pasar ciertos terrenos y los espacios ocupados por unidades enemigas).</li>
          <li>Pasa el mouse por las casillas que quieres que tomé como camino y haz clic en la casilla destino.</li>
          <li>Aparecerá un menú de acciones, cuyas opciones varían también dependiendo el contexto. Para solo mover tus unidades, selecciona esperar.</li>
          <li>Cuando termines, la unidad que seleccionaste navegará por el camino que le indicaste hasta llegar a la casilla destino.</li>
        </ol>
      </section>

      <section id='seccion-mover-unidades' className='seccion-info'>
        <h2 className='text-xl font-bold'>¿Cómo ataco con mis unidades?</h2>
        <ol className='list-decimal mb-2'>
          <li>Al igual que para mover las unidades, debes seleccionar tu unidad y decirle que camino tomar</li>
          <li>Si la casilla destino tiene a su alcance enemigos a los que puedes atacar, puedes escoger la opción de atacar en el menú de opciones.</li>
          <li>Después de eso, podrás seleccionar la casilla donde esté la unidad enemiga que quieras atacar.</li>
          <li>Cuando termines, la unidad que seleccionaste navegará por el camino que le indicaste hasta llegar a la casilla destino, atacará la unidad que seleccionaste. Si la unidad enemiga puede contraatacar, lo hará. Verás los puntos de vida de las unidades en el número que salga por encima de la unidad o para ser más exacto, si pasas el cursor por encima de estas después del combate.</li>
        </ol>
        <p style={{ fontSize: '.95rem' }}><b>NOTA:</b> Si no tienes suficientes municiones, no puedes ver la unidad, las unidades enemigas están fuera de tu rango o si intentas mover la unidad de lugar (en caso de ser *indirecta), la opción de atacar no va a aparecer.</p>
      </section>

      <section id='seccion-poderes' className='seccion-info'>
        <h2 className='text-xl font-bold'>¿Cómo uso mis poderes?</h2>
        <ul className='list-disc mb-2'>
          <li>Cada combate carga tu barra de poder dependiendo del costo de la unidad, del daño hecho y de quien es la unidad o unidades afectadas.</li>
          <li>Generas más carga cuando tus unidades son dañadas que cuando haces daño a las unidades enemigas, 100% contra 50% respectivamente.</li>
          <li>Cuando tienes algún poder activo, no puedes generar carga.</li>
          <li>Cada vez que usas un poder, la siguiente carga será más larga. Se agrega un 20% de costo por cada vez que usas tus poderes.</li>
        </ul>
        <p style={{ fontSize: '.95rem' }}><b>NOTA:</b> Cada estrella tiene un valor inicial de 9,000. Conforme más poderes usas, el costo de cada estrella aumenta.</p>
      </section>

      <section id='seccion-fow' className='seccion-info'>
        <h2 className='text-xl font-bold'><i>Fog of War</i> (Niebla de guerra)</h2>
        <ul className='list-disc'>
          <li>Cuando esta regla esta activa, todas las casillas son desconocidas, excepto las casillas donde estan tus propiedades y lo que vean tus unidades.</li>
          <li>En el caso de tus unidades, todos los caminos que tomes, así como las casillas que ya vieron y que ven ahora, son marcadas como tu zona de visión</li>
          <li>Es recomendable que tengas la información de las casillas, por qué si intentas avanzar a una casilla de la que no tengas visión, es posible que tu acción sea interrumpida si está ocupada por alguna unidad de tu oponente, lo que puede dejar expuesta tu unidad a un contraataque.</li>
          <li>Las unidades pueden ocultarse dentro de <b>bosques</b> o de <b>arrecifes</b>, y aunque estén dentro de tu rango de visión, no las podrás ver a menos que tengas al menos una unidad adyacente</li>
          <li>Los <b>Recon's</b> son muy recomendables en este modo de juego por su amplio rango de vista, bajo precio y decente movilidad. También puedes mover tus soldados a montañas para ampliar su rango de visión a lo mismo que un recon. También los <b>Submarinos</b> y <b>Fighters</b> son excelentes inversiones en mar y aire respectivamente en este modo de juego.</li>
        </ul>
      </section>
    </div>
  </>
}

createRoot(document.getElementById('app') as HTMLElement).render(
  <>
    <Header elementosHeader={ElementosHeader}/>
    <ComoJugar/>
  </>
)
