import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";

const formatoARS = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(n));

export default function ItemDetail({
  id,
  nombre,
  precio,
  imagen,
  stock = 10,
  descripcion = "Producto sin descripción."
}) {
  const { addToCart } = useCart();
  const [addedQty, setAddedQty] = useState(0);

  const handleAdd = (qty) => {
    addToCart({ id, nombre, precio, imagen, stock }, qty);
    setAddedQty(qty);
  };

  return (
    <section className="item-detail__wrap">
      <article className="item-detail">
        <img src={imagen} alt={nombre} className="item-detail__img" />

        <div>
          <h2 className="item-detail__title">{nombre}</h2>
          <p className="item-detail__desc">{descripcion}</p>
          <p className="item-detail__price">{formatoARS(precio)}</p>

          {stock < 1 && <p>Producto sin stock</p>}

          {addedQty === 0 ? (
            <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
          ) : (
            <div className="item-detail__actions">
              <p>Agregaste {addedQty} al carrito.</p>
              <Link to="/cart" className="btn btn--primary">Ir al carrito</Link>
              <Link to="/" className="btn btn--secondary">Seguir comprando</Link>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
