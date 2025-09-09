import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const formatoARS = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(Number(n || 0));

export default function Cart() {
  const { items = [], total = 0, clearCart } = useCart();
  const unidades = items.reduce((acc, it) => acc + (it.quantity || 0), 0);

  if (!items.length) {
    return (
      <section className="cart cart--empty">
        <div className="cart__card">
          <h2 className="cart__title">Carrito</h2>
          <p className="cart__empty">Tu carrito está vacío</p>
          <Link to="/" className="btn btn--primary">Ir al catálogo</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2 className="cart__title">Carrito</h2>

      <div className="cart__list">
        {items.map((it) => (
          <CartItem key={it.id} {...it} />
        ))}
      </div>

      <div className="cart__footer">
        <div className="cart__summary">
          <p className="cart__units">Total de unidades: <strong>{unidades}</strong></p>
          <p className="cart__total">
            Total a pagar: <strong>{formatoARS(total)}</strong>
          </p>
        </div>

        <div className="cart__actions">
          <button className="btn" onClick={clearCart}>Vaciar carrito</button>
          <Link to="/checkout" className="btn btn--primary">Ir a pagar</Link>
        </div>
      </div>
    </section>
  );
}
