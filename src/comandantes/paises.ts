export type nombresPaises = 'Orange Star'|'Blue Moon'|'Green Earth'|'Yellow Comet'|'Black Hole'|'No designado'
export type PaisType = {
  nombre: nombresPaises,
  colorFavorito: string, // código de color
  hsv: {h: number|null, s: number|null, v: number|null}
}

export type ListaPaises = PaisType[]

export const listaPaises:ListaPaises = [
  { nombre: 'Orange Star', colorFavorito: 'red', hsv: { h: null, s: null, v: null } },
  { nombre: 'Blue Moon', colorFavorito: 'blue', hsv: { h: 140, s: null, v: null } },
  { nombre: 'Green Earth', colorFavorito: 'green', hsv: { h: 240, s: null, v: null } },
  { nombre: 'Yellow Comet', colorFavorito: 'yellow', hsv: { h: -30, s: 0, v: .7 } },
  { nombre: 'Black Hole', colorFavorito: 'black', hsv: { h: null, s: -4, v: -.1 } },
  { nombre: 'No designado', colorFavorito: 'gray', hsv: { h: 0, s: -30, v: 10 } }
  // h: 60 morado, h: 80 purpura
]
