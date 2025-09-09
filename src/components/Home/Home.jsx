import React from "react";
import ItemListContainer from "../ItemListContainer/ItemListContainer";
import GanadoresSorteo from "../JsonPlaceHolder/GanadoresSorteo";
import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      <section className="home__container">
        <h2 className="titulo-seccion home__title">
          Bienvenid@ a VivaVerde. Elegí tus plantas favoritas 🌿
        </h2>
        <ItemListContainer />
      </section>

      <section className="home__container home__sorteo">

        <GanadoresSorteo />
      </section>
    </main>
  );
}
