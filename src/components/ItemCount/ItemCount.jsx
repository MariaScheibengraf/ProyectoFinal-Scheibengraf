import { useEffect, useState } from "react";

const ItemCount = ({ stock = 15, initial = 1, onAdd }) => {
  const [contador, setContador] = useState(initial);

  const incrementar = () => {
    if (contador < stock) {
      setContador(contador + 1);
    }
  };

  const decrementar = () => {
    if (contador > 1) {
      setContador(contador - 1);
    }
  };

useEffect(() => {
  const prev = document.title;
  document.title = `Contador: ${contador}`;
  return () => { document.title = prev; };
}, [contador]);


  return (
    <div className="item-count">
      <button onClick={decrementar} disabled={contador <= 1}>−</button>
      <span style={{ padding: "0 12px" }}>{contador}</span>
      <button onClick={incrementar} disabled={contador >= stock}>+</button>

      <button
        onClick={() => onAdd(contador)}
        disabled={stock < 1}
        style={{ marginLeft: 12 }}
      >
        Agregar al carrito
      </button>

      {stock < 1 && <p>Producto sin stock</p>}
    </div>
  );
};

export default ItemCount;
