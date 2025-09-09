import "./Map.css";

const Map = () => {
  const productos = [
    {
      id: 1,
      nombre: "Monstera deliciosa",
      precio: 39000,
      imagen: "src/assets/monstera.jpg",
    },
    {
      id: 2,
      nombre: "Sansevieria (Lengua de suegra)",
      precio: 45000,
      imagen: "src/assets/sansevieria.jpg",
    },
    {
      id: 3,
      nombre: "Potus",
      precio: 28000,
      imagen: "src/assets/potus.jpg",
    },
    {
      id: 4,
      nombre: "Ficus lyrata (Higuera lira)",
      precio: 54000,
      imagen: "src/assets/ficus.jpg",
    },
  ];

  const formatearARS = (n) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="mapa">
      <h2 className="mapa__titulo">Plantas disponibles:</h2>
      <ul className="mapa__grilla">
        {productos.map((p) => (
          <li key={p.id} className="mapa__tarjeta">
            <img className="mapa__img" src={p.imagen} alt={p.nombre} />
            <div className="mapa__cuerpo">
              <h3 className="mapa__nombre">{p.nombre}</h3>
              <p className="mapa__precio">{formatearARS(p.precio)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Map;
