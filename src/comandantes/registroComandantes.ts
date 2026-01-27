import type { Comandante, nombreComandante } from './comandante'

let REGISTRO_COMANDANTES: Record<nombreComandante, Comandante> | null = null

async function inicializarRegistro (): Promise<void> {
  if (REGISTRO_COMANDANTES !== null) return

  const [
    { ComandanteAndy },
    { ComandanteMax },
    { ComandanteGenerico }
    // ... importar resto de comandantes según tengas
  ] = await Promise.all([
    import('./andy'),
    import('./max'),
    import('./generico')
  ])

  REGISTRO_COMANDANTES = {
    'Andy': ComandanteAndy,
    'Max': ComandanteMax,
    'Generico': ComandanteGenerico
    // ... resto
  } as Record<nombreComandante, Comandante>
}

export async function CargarComandante (nombre: nombreComandante): Promise<Comandante> {
  await inicializarRegistro()

  const comandante = REGISTRO_COMANDANTES![nombre]
  if (!comandante) {
    throw new Error(`Comandante no encontrado: ${nombre}`)
  }
  return comandante
}

export async function PrecargarTodosComandantes (): Promise<void> {
  await inicializarRegistro()
}
