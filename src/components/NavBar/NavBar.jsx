import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import logo from "../../assets/logovivaverde.png";
import "./NavBar.css";

export default function NavBar() {

  const IDS = {
    // interior
    monstera: "RPUtChv2ygrJpGS8Z5C6",
    sansevieria: "7vswZw1EX6hpWBpy2M5c",
    potus: "oo0i6FkjhO8uEadwqHvt",
    ficus: "QHqPM1aZtflaDppRN5rk",
    // exterior
    jazmin: "8dDAibO7L4cdUiqJhyMS",
    lavanda: "EBciSrIpde40eJB2Mqeu",
    aloe: "b7FTtzaw409LFuxrTU5G",
    geranio: "OBzwIyom3yT3eBlGLawm",
  };

  const [open, setOpen] = useState(null);
  const interiorRef = useRef(null);
  const exteriorRef = useRef(null);

  const navClass = ({ isActive }) => "navlink" + (isActive ? " active" : "");
  const toggle = (menu) => setOpen((o) => (o === menu ? null : menu));
  const close = () => setOpen(null);

  useEffect(() => {
    function onDown(e) {
      const inInterior = interiorRef.current?.contains(e.target);
      const inExterior = exteriorRef.current?.contains(e.target);
      if (!inInterior && !inExterior) setOpen(null);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo" onClick={close}>
        <img src={logo} alt="VivaVerde" />
      </Link>

      <nav className="nav-categorias">
        <NavLink to="/" className={navClass} onClick={close}>
          Home
        </NavLink>

        <div className={`menu ${open === "interior" ? "open" : ""}`} ref={interiorRef}>
          <button
            type="button"
            className="menu__btn"
            aria-haspopup="true"
            aria-expanded={open === "interior"}
            onClick={() => toggle("interior")}
          >
            Interior
          </button>
          <ul className="menu__list" role="menu">
            <li role="none">
              <NavLink to="/categoria/interior" className={navClass} onClick={close}>
                Ver todo interior
              </NavLink>
            </li>
            <li role="none">
              <NavLink to={`/producto/${IDS.monstera}`} className={navClass} onClick={close}>
                Monstera
              </NavLink>
            </li>
            <li role="none">
              <NavLink to={`/producto/${IDS.sansevieria}`} className={navClass} onClick={close}>
                Sansevieria
              </NavLink>
            </li>
            <li role="none">
              <NavLink to={`/producto/${IDS.potus}`} className={navClass} onClick={close}>
                Potus
              </NavLink>
            </li>
            <li role="none">
              <NavLink to={`/producto/${IDS.ficus}`} className={navClass} onClick={close}>
                Ficus
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={`menu ${open === "exterior" ? "open" : ""}`} ref={exteriorRef}>
          <button
            type="button"
            className="menu__btn"
            aria-haspopup="true"
            aria-expanded={open === "exterior"}
            onClick={() => toggle("exterior")}
          >
            Exterior
          </button>
          <ul className="menu__list" role="menu">
            <li role="none">
              <NavLink to="/categoria/exterior" className={navClass} onClick={close}>
                Ver todo exterior
              </NavLink>
            </li>
            <li role="none">
              <NavLink to={`/producto/${IDS.jazmin}`} className={navClass} onClick={close}>
                Jazmín
              </NavLink>
            </li>
            <li role="none">
              <NavLink to={`/producto/${IDS.lavanda}`} className={navClass} onClick={close}>
                Lavanda
              </NavLink>
            </li>
            <li role="none">
              <NavLink to={`/producto/${IDS.aloe}`} className={navClass} onClick={close}>
                Aloe vera
              </NavLink>
            </li>
            <li role="none">
              <NavLink to={`/producto/${IDS.geranio}`} className={navClass} onClick={close}>
                Geranio
              </NavLink>
            </li>
          </ul>
        </div>

        <NavLink to="/ganadores" className={navClass} onClick={close}>
          Ganadores del sorteo
        </NavLink>
      </nav>

      <div className="nav-carrito">
        <CartWidget />
      </div>
    </header>
  );
}
