// src/components/Item/Item.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Item.css";

const formatoARS = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(Number(n));

const Item = ({ id, nombre, precio, imagen, stock = 0 }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const quickAdd = () => {
    if (adding || stock < 1) return;
    setAdding(true);
    addToCart({ id, nombre, precio, imagen, stock }, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
    setAdding(false);
  };

  const label = stock < 1 ? "Sin stock" : justAdded ? "Agregado ✓" : "Agregar al carrito";

  return (
    <article className="card">
      <img className="card__img" src={imagen} alt={nombre} />
      <div className="card__body">
        <h3 className="card__title">{nombre}</h3>
        <p className="card__price">{formatoARS(precio)}</p>
        <div className="card__actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={quickAdd}
            disabled={adding || stock < 1}
            aria-label={`Agregar ${nombre} al carrito`}
          >
            {label}
          </button>

          <Link to={`/producto/${id}`} className="btn">
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Item;
