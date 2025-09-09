import React from "react";
import { useCart } from "../../context/CartContext";
import "./CartItem.css";

const formatoARS = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(Number(n || 0));

export default function CartItem({
  id,
  nombre,
  precio,
  imagen,
  quantity = 1,
  onRemove /* opcional */
}) {
  const { removeItem } = useCart() || {};
  const handleRemove = () => {
    if (onRemove) onRemove(id);
    else if (removeItem) removeItem(id);
  };

  const subtotal = (precio || 0) * (quantity || 0);

  return (
    <article className="cart-item">
      <img className="cart-item__thumb" src={imagen} alt={nombre} />

      <div className="cart-item__body">
        <h3 className="cart-item__title">{nombre}</h3>
        <p className="cart-item__meta">
          {formatoARS(precio)} × {quantity} = <strong>{formatoARS(subtotal)}</strong>
        </p>
      </div>

      <button
        className="cart-item__remove"
        aria-label={`Quitar ${nombre} del carrito`}
        title="Quitar"
        onClick={handleRemove}
      >
        ✕
      </button>
    </article>
  );
}
