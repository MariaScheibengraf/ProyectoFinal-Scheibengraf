import React, { useState } from "react";
import { productos } from "../../asyncmock";
import "./Ficus.css";

const formatARS = (n) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
};

export default function Ficus({ onAddToCart }) {
  const p = productos.find((x) => x.nombre.toLowerCase().includes("ficus"));
  const [quantity, setQuantity] = useState(1);

  if (!p) return <p style={{ color: "crimson" }}>item no encontrado</p>;

  const handleAdd = () => {
    if (typeof onAddToCart === "function") onAddToCart(quantity);
    setQuantity(1);
  };

  return (
    <section className="plant">
      <article className="plant__card">
        <div className="plant__imageWrap">
          <img className="plant__image" src={p.imagen} alt={p.nombre} />
        </div>

        <div className="plant__info">
          <h1 className="plant__title">{p.nombre}</h1>
          <p className="plant__price">{formatARS(p.precio)}</p>

          <div className="plant__actions">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
            <span className="plant__qtyValue">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            <button className="plant__cta" onClick={handleAdd}>
              agregar al carrito
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
