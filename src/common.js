export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default sleep
// function compararColores(color1, color2) { }
