import { type nombreTerreno } from './terrenov2'
import { Aeropuerto } from './modelos/aeropuerto'
import { Arrecife } from './modelos/arrecife'
import { Bosque } from './modelos/bosque'
import { Camino } from './modelos/camino'
import { Ciudad } from './modelos/ciudad'
import { CuartelGeneral } from './modelos/cuartelGeneral'
import { Fabrica } from './modelos/fabrica'
import { Invalido } from './modelos/invalido'
import { Mar } from './modelos/mar'
import { Montana } from './modelos/montana'
import { Planicie } from './modelos/planicie'
import { PuertoNaval } from './modelos/puertoNaval'
import { Rio } from './modelos/rio'
import { Silo } from './modelos/silo'
import { Tuberia } from './modelos/tuberia'

export function getTerrenoClase (nombreTerreno: nombreTerreno, propietario?: number){
  switch (nombreTerreno){
  case 'aeropuerto':
    return new Aeropuerto({ propietario: propietario })
  case 'arrecife':
    return new Arrecife()
  case 'bosque':
    return new Bosque()
  case 'camino':
    return new Camino()
  case 'ciudad':
    return new Ciudad({ propietario: propietario })
  case 'cuartelGeneral':
    return new CuartelGeneral({ propietario: propietario })
  case 'fabrica':
    return new Fabrica({ propietario: propietario })
  case 'mar':
    return new Mar()
  case 'montana':
    return new Montana()
  case 'planicie':
    return new Planicie()
  case 'puertoNaval':
    return new PuertoNaval({ propietario: propietario })
  case 'rio':
    return new Rio()
  case 'silo':
    return new Silo()
  case 'tuberia':
    return new Tuberia()

  default:
    console.error('Terreno inválido: ', nombreTerreno)
    return new Invalido()
  }
}
