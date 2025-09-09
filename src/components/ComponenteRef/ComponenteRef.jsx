import { useRef } from 'react'

const ComponenteRef = () => {
  const cantidadProductos = useRef(0)

  function agregarAlCarrito() {
    cantidadProductos.current = cantidadProductos.current + 1
    console.log(cantidadProductos.current)
  }

  return (
    <div>
      <p>Productos comprados: {cantidadProductos.current}</p>
      <button onClick={agregarAlCarrito}>Comprar</button>
    </div>
  )
}

export default ComponenteRef
