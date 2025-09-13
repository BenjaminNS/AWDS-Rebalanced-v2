const tamanoCasilla=16

export type spriteTerreno = {
  width: number, height: number, offsetY: number
  crop: {
    x: number, y: number,
    width: number, height: number
  }
  // animations: {} //Para HQ's y fábricas
}
export type casillasAdyacentes = {
  top: string,
  left: string,
  right: string,
  bottom: string
}
// export type nombreTerreno = 'planicie'|'bosque'|'montana'|'cuartelGeneral'|'laboratorio'|'torreDeComunicacion'|'ciudad'|'fabrica'|'aeropuerto'|'puertoNaval'|'silo'|'camino'|'puente'|'tuberia'|'mar'|'arrecife'|'rio'|'costa'|'invalido'
export type nombreTerreno = 'planicie'|'bosque'|'montana'|'cuartelGeneral'|'ciudad'|'fabrica'|'aeropuerto'|'puertoNaval'|'silo'|'camino'|'puente'|'tuberia'|'mar'|'arrecife'|'rio'|'costa'|'invalido'
type obtenerSprite = (casillasAdyacentes: casillasAdyacentes) => spriteTerreno;

export const arregloTerrenosNombres = [
  'planicie', 'bosque', 'montana', 'cuartelGeneral', 'ciudad', 'fabrica', 'aeropuerto', 'puertoNaval', 'silo', 'camino', 'puente', 'tuberia', 'mar', 'arrecife', 'rio', 'costa', 'invalido']

export class Terreno {
  nombre: string;
  estrellasDefensa: number;
  descripcion: string;
  costosMovimientos: object;
  puedeOcultarEnFOW: boolean;
  esPropiedad: boolean;
  obtenerSprite: obtenerSprite;

  constructor(nombre: string, estrellasDefensa: number, descripcion: string, costosMovimientos: object, puedeOcultarEnFOW: boolean, esPropiedad: boolean, obtenerSprite: obtenerSprite){
    this.nombre= nombre
    this.estrellasDefensa = estrellasDefensa;
    this.descripcion = descripcion;
    this.costosMovimientos = costosMovimientos;
    this.puedeOcultarEnFOW = puedeOcultarEnFOW;
    this.esPropiedad = esPropiedad;
    this.obtenerSprite = obtenerSprite
  }
}

type ListaTerrenos = {
  planicie: Terreno,
  bosque: Terreno,
  montana: Terreno,
  cuartelGeneral: Terreno,
  ciudad: Terreno,
  fabrica: Terreno,
  aeropuerto: Terreno,
  puertoNaval: Terreno,
  silo: Terreno,
  camino: Terreno,
  puente: Terreno,
  tuberia: Terreno,
  mar: Terreno,
  arrecife: Terreno,
  rio: Terreno,
  costa: Terreno,
  invalido: Terreno,
}

export const ListaTerrenos : ListaTerrenos = {
  "planicie": new Terreno(
    "Planicie", 1, "Terreno de fácil navegación pero poca protección", {tractorOruga: 1,ruedas: 2,aereo: 1, infanteria: 1}, false, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
        width: 16, height: 16, offsetY: 0,
        crop: {
          x: (6 * tamanoCasilla), y: (1 * tamanoCasilla),
          width: 16, height: 16
        }
      }
    }
  ),
  "bosque": new Terreno(
    "Bosque", 2, "Terreno difícil de atravesar pero que otorga buena defensa y permite ocultar unidades terrestres", {tractorOruga: 2,ruedas: 3,aereo: 1, infanteria: 1}, true, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
        width: 16, height: 16, offsetY: 0,
        crop: {
          x: (13 * tamanoCasilla), y: (2 * tamanoCasilla),
          width: 16, height: 16
        }
      }
    }
  ),
  "montana": new Terreno(
    "Montaña", 0, "Terreno que ofrece una excelente defensa pero de muy difícil acceso. Solo puede ser navegada por Soldados y unidades aéreas. Ofrece una unidad extra de visión a Soldados a Pie.", {infanteria: 2, aereo: 1}, false, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      const {top} = casillasAdyacentes
      // Montaña alta
      if( top === 'ciudad' || top === 'cuartelGeneral' || top === 'fabrica' || top === 'aeropuerto' || top === 'puertoNaval' 
        || top === 'silo' ){
        return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (7 * tamanoCasilla), y: (1 * tamanoCasilla),
            width: 16, height: 16
          }
        }
      } else{
        // Montaña chaparra
        return {
          width: 16, height: 21,
          offsetY: 0,
          crop: {
            x: (5 * tamanoCasilla), y: (1 * tamanoCasilla - 5),
            width: 16, height: 21
          }
        }
      }
    }
  ),
  "cuartelGeneral": new Terreno(
    "Cuartel General", 4, "Base de operaciones. Si es capturada, pierdes automáticamente el juego y todas tus propiedades pasan al personaje que te quitó esta propiedad.Excelentes defensas. ", {tractorOruga: 1,ruedas: 1,aereo: 1, infanteria: 1}, false, true,
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      // Sabiendo que esta es propiedad, requiere 2 cosas
      // Saber de que personaje es la propiedad
      // Para determinar cual HQ le corresponde
      // Y también el color del personaje propietario (que varía dependiendo el orden y la armada a la que pertenece)
      return {
        width: 16, height: 32, offsetY: 19,
        crop: {
          x: (0 * tamanoCasilla), y: (3 * tamanoCasilla - 16),
          width: 16, height: 32
        }
      }
    }
  ),
  "ciudad": new Terreno(
    "Ciudad", 3, "Propiedad que puede reparar unidades terrestres 2 de HP y puede ser capturada por Soldados", {tractorOruga: 1,ruedas: 1,aereo: 1, infanteria: 1}, false, true,
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      // Similar al HQ, pero no requiere una versión exclusiva por armada
      return {
        width: 16, height: 20, offsetY: 0,
        crop: {
          x: (0 * tamanoCasilla), y: (11 * tamanoCasilla - 4),
          width: 16, height: 20
        }
      }
    }
  ),
  "fabrica": new Terreno(
    "Ciudad", 3, "Puedes comprar y reparar unidades terrestres aquí.", {tractorOruga: 1,ruedas: 1,aereo: 1, infanteria: 1}, false, true,
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      // Similar al HQ, pero no requiere una versión exclusiva por armada
      return {
        width: 16, height: 16, offsetY: 0,
        crop: {
          x: (2 * tamanoCasilla), y: (11 * tamanoCasilla ),
          width: 16, height: 16
        }
      }
    }
  ),
  "aeropuerto": new Terreno(
    "Ciudad", 3, "Puedes comprar y reparar unidades aéreas aquí.", {tractorOruga: 1,ruedas: 1,aereo: 1, infanteria: 1}, false, true,
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      // Similar al HQ, pero no requiere una versión exclusiva por armada
      return {
        width: 16, height: 18, offsetY: 0,
        crop: {
          x: (4 * tamanoCasilla), y: (11 * tamanoCasilla - 2),
          width: 16, height: 18
        }
      }
    }
  ),
  "puertoNaval": new Terreno(
    "Puerto naval", 3, "Puedes comprar y reparar unidades navales aquí.", {tractorOruga: 1,ruedas: 1,aereo: 1, infanteria: 1, naval: 1}, false, true,
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      // Similar al HQ, pero no requiere una versión exclusiva por armada
      return {
        width: 16, height: 21, offsetY: 0,
        crop: {
          x: (6 * tamanoCasilla), y: (11 * tamanoCasilla - 5),
          width: 16, height: 21
        }
      }
    }
  ),
  "silo": new Terreno(
    "Silo", 3, "Contiene un misil que puede ser dirigido por un soldado, haciendo 3 de daño en un área de 3x3", {tractorOruga: 1,ruedas: 1,aereo: 1, infanteria: 1}, false, false,
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      const desfase = 8
      return {
        width: 16, height: ( 16 + desfase ), offsetY: 0,
        crop: {
          x: (2 * tamanoCasilla), y: (1 * tamanoCasilla - desfase),
          width: 16, height: ( 16 + desfase )
        }
      }
    }
  ),
  "camino": new Terreno(
    "Camino", 0, "Camino pavimentado de fácil acceso pero que no ofrece defensas", {tractorOruga: 1,ruedas: 1,aereo: 1, infanteria: 1}, false, false,
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      const desfase = 0
      return {
        width: 16, height: ( 16 + desfase ), offsetY: 0,
        crop: {
          x: (13 * tamanoCasilla), y: (5 * tamanoCasilla - desfase),
          width: 16, height: ( 16 + desfase )
        }
      }
    }
  ),
  "puente": new Terreno(
    "Puente", 0, "Conecta islas para permitir el acceso a unidades terrestres. Las unidades navales pueden atravesarlo, pero con algo de dificultad. No ofrece bonus defensivos.", {tractorOruga: 1,ruedas: 1,aereo: 1, infanteria: 1, naval: 2}, false, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (7 * tamanoCasilla), y: (5 * tamanoCasilla),
            width: 16, height: 16
          }
        }
    }
  ),
  "tuberia": new Terreno(
    "Tubería", 0, "Bloquea el paso a todas las unidades, imposible de destruir.", {}, false, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (9 * tamanoCasilla), y: (7 * tamanoCasilla),
            width: 16, height: 16
          }
        }
    }
  ),
  "mar": new Terreno(
    "Mar", 0, "Terreno marítimo donde pueden cruzar unidades navales y aéreas", {aereo: 1, naval: 1}, false, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (7 * tamanoCasilla), y: (5 * tamanoCasilla),
            width: 16, height: 16
          }
        }
    }
  ),
  "arrecife": new Terreno(
    "Arrecife", 2, "Terreno marítimo que puede ocultar unidades navales y que ofrece algunas capacidades defensivas, aunque algo difícil de navegar.", {aereo: 1, naval: 2}, true, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (6 * tamanoCasilla), y: (5 * tamanoCasilla),
            width: 16, height: 16
          }
        }
    }
  ),
  "rio": new Terreno(
    "Rio", 0, "Puede ser atravesado por soldados y unidades navales. No ofrece defensa", {aereo: 1, naval: 1, infanteria: 2}, false, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (6 * tamanoCasilla), y: (5 * tamanoCasilla),
            width: 16, height: 16
          }
        }
    }
  ),
  "costa": new Terreno(
    "Costa", 0, "Puede ser navegador por cualquier unidad. Conecta mar con tierra. No ofrece defensa", {tractorOruga: 1,ruedas: 1,aereo: 1, naval: 1, infanteria: 1}, false, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (3 * tamanoCasilla), y: (7 * tamanoCasilla),
            width: 16, height: 16
          }
        }
    }
  ),
  "invalido": new Terreno(
    "Casilla invalida", 0, "Casilla inválida. Error", {}, false, false, 
    (casillasAdyacentes: casillasAdyacentes):spriteTerreno => {
      return {
          width: 16, height: 16, offsetY: 0,
          crop: {
            x: (15 * tamanoCasilla), y: (11 * tamanoCasilla),
            width: 16, height: 16
          }
        }
    }
  ),
}
