import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import { fetchProductById } from "../../services/firebase";

const ItemDetailContainer = () => {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    setCargando(true);
    fetchProductById(id)
      .then((data) => { if (activo) setProducto(data); })
      .catch((e) => { if (activo) setError(e.message); })
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, [id]);

  if (cargando) return <p>cargando detalle…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return <ItemDetail {...producto} />;
};

export default ItemDetailContainer;
