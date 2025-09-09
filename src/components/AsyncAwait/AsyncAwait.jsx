import React, { useState, useEffect } from "react";

const misProductos = [
  { nombre: "Monstera deliciosa", precio: 39000 },
  { nombre: "Sansevieria (Lengua de suegra)", precio: 45000 },
  { nombre: "Potus", precio: 28000 },
  { nombre: "Ficus lyrata (Higuera lira)", precio: 54000 },
];

const getMisProductos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(misProductos);
    }, 2000);
  });
};

const AsyncAwait = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const pedirDatos = async () => {
    try {
      setCargando(true);
      const inventario = await getMisProductos();
      setProductos(inventario);
    } finally {
      setCargando(false);
    }
  };


  useEffect(() => {
    pedirDatos();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Mis productos usando Async Await</h2>

      <button onClick={pedirDatos} disabled={cargando}>
        {cargando ? "Cargando..." : "Volver a cargar"}
      </button>

      <ul>
        {productos.map((p, i) => (
          <li key={i}>
            {p.nombre} — $ {p.precio.toLocaleString("es-AR")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AsyncAwait;
