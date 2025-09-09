
import React from "react";
import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ productos = [] }) => {
  return (
    <section className="plant-grid">
      {productos.map((p) => (
        <Item
          key={p.id}
          id={p.id}
          nombre={p.nombre}
          precio={p.precio}
          imagen={p.imagen}
          stock={p.stock ?? 0}
        />
      ))}
    </section>
  );
};

export default ItemList;
