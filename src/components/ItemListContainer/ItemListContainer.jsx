import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { fetchProducts } from "../../services/firebase";

export default function ItemListContainer() {
  const { categoryId } = useParams(); // "interior" | "exterior" | undefined
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let vivo = true;
    setCargando(true);

    fetchProducts(categoryId)
      .then((data) => { if (vivo) setProductos(data); })
      .catch((e) => { if (vivo) setError(e.message || "error al cargar"); })
      .finally(() => { if (vivo) setCargando(false); });

    return () => { vivo = false; };
  }, [categoryId]);

  if (cargando) return <p className="tenue">cargando productos…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!productos.length) return <p>no hay productos{categoryId ? ` en ${categoryId}` : ""}</p>;

  return <ItemList productos={productos} />;
}
