import React, { useEffect } from "react";
import "./Promesas.css";

const Promesas = () => {
  const pedidoPlantas = (hayStock) => {
    return new Promise((resolver, rechazar) => {
      setTimeout(() => {
        if (hayStock) {
          resolver("Tu pedido está listo para enviar");
        } else {
          rechazar("No tenemos stock en este momento");
        }
      }, 1500);
    });
  };

  useEffect(() => {
    pedidoPlantas(true)
      .then((mensaje) => console.log("ÉXITO:", mensaje))
      .catch((error) => console.log("ERROR:", error))
      .finally(() => console.log("Promesa finalizada"));
  }, []);

  return (
    <section className="seccion-promesas">
      <h2 className="titulo-promesas">Probando promesas en react</h2>
      <p className="texto-promesas">
        Si abro la consola del navegador puedo ver cómo se resuelve la promesa del pedido de plantas.
      </p>
    </section>
  );
};

export default Promesas;
