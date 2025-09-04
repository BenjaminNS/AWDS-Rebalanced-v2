export type nombresPaises = 'Orange Star'|'Blue Moon'|'Green Earth'|'Yellow Comet'|'Black Hole';
export type PaisType = {
  nombre: nombresPaises,
  colorFavorito: string //código de color
}

export type ListaPaises = PaisType[]

function PaisesJS(){
  const listaPaises:ListaPaises = [
    { nombre: 'Orange Star', colorFavorito: 'red'},
    { nombre: 'Blue Moon', colorFavorito: 'blue'},
    { nombre: 'Green Earth', colorFavorito: 'green'},
    { nombre: 'Yellow Comet', colorFavorito: 'yellow'},
    { nombre: 'Black Hole', colorFavorito: 'black'},
  ]
  return { listaPaises }
}

export default PaisesJS