const toSlug = (nombre) =>
  nombre.toLowerCase().includes("monstera") ? "monstera"
  : nombre.toLowerCase().includes("sansevieria") ? "sansevieria"
  : nombre.toLowerCase().includes("potus") ? "potus"
  : "ficus";

export const productos = [
  {
    id: 1,
    nombre: "Monstera deliciosa",
    precio: 39000,
    imagen: "/img/Monstera.jpg",
    stock: 12,
    descripcion: "Planta de interior de hojas grandes y fácil cuidado."
  },
  {
    id: 2,
    nombre: "Sansevieria (Lengua de suegra)",
    precio: 45000,
    imagen: "/img/sansevieria.jpg",
    stock: 20,
    descripcion: "Resistente y purificadora. Ideal para principiantes."
  },
  {
    id: 3,
    nombre: "Potus",
    precio: 28000,
    imagen: "/img/Potus.jpg",
    stock: 25,
    descripcion: "Enredadera clásica que crece en casi cualquier ambiente."
  },
  {
    id: 4,
    nombre: "Ficus lyrata (Higuera lira)",
    precio: 54000,
    imagen: "/img/ficus.jpg",
    stock: 8,
    descripcion: "Protagonista decorativa con hojas grandes tipo violín."
  }
];


export const getProductos = () =>
  new Promise((resolve) => setTimeout(() => resolve(productos), 500));


export const getProducto = (idOrSlug) =>
  new Promise((resolve) => {
    const key = String(idOrSlug).toLowerCase();
    const prod = productos.find(
      (p) => String(p.id) === key || toSlug(p.nombre) === key
    );
    setTimeout(() => resolve(prod ?? null), 400);
  });
