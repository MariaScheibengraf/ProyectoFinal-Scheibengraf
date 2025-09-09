// src/components/JsonPlaceHolder/GanadoresSorteo.jsx
import { useEffect, useState } from "react";
import "./GanadoresSorteo.css";

const ciudadesAR = [
  "Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata",
  "Mar del Plata", "San Miguel de Tucumán", "Salta", "Santa Fe",
  "Corrientes", "Bahía Blanca", "Resistencia", "Paraná",
  "Neuquén", "Posadas", "San Juan", "San Salvador de Jujuy",
  "Trelew", "Comodoro Rivadavia", "Río Grande"
];

export default function GanadoresSorteo() {
  const [ganadores, setGanadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("No se pudo obtener la lista de ganadores");
        const data = await res.json();

        const adaptados = data.map((u) => {
          const ciudad = ciudadesAR[u.id % ciudadesAR.length];
          return {
            id: u.id,
            nombre: u.name,
            ciudad,
            email: u.email,
            avatar: `https://i.pravatar.cc/300?u=${u.id}`,
          };
        });

        setGanadores(adaptados);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  if (cargando) return <p className="tenue">Cargando ganadores…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section className="lista-ganadores">
      <h2 className="titulo-seccion-pequena">Ganadores de nuestro sorteo – agosto 2025</h2>

      <div className="grilla-pequena">
        {ganadores.map((g) => (
          <article className="tarjeta tarjeta--pequena" key={g.id}>
            <img className="tarjeta__img tarjeta__img--pequena" src={g.avatar} alt={g.nombre} />
            <div className="tarjeta__cuerpo tarjeta__cuerpo--pequeno">
              <h3 className="tarjeta__titulo tarjeta__titulo--pequeno">{g.nombre}</h3>
              <p className="tarjeta__precio tarjeta__dato-pequeno">Ciudad: {g.ciudad}</p>
              <div className="tarjeta__extra">
                <span className="etiqueta etiqueta--suave">ganador</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
