import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import GanadoresSorteo from "./components/JsonPlaceHolder/GanadoresSorteo";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/CartContext";
import Home from "./components/Home/Home";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<ItemDetailContainer />} />
            <Route path="/ganadores" element={<GanadoresSorteo />} />
            <Route path="/cart" element={<Cart />} />
        
            <Route path="/monstera" element={<Navigate to="/producto/RPUtChv2ygrJpGS8Z5C6" replace />} />
            <Route path="/sansevieria" element={<Navigate to="/producto/7vswZw1EX6hpWBpy2M5c" replace />} />
            <Route path="/potus" element={<Navigate to="/producto/oo0i6FkjhO8uEadwqHvt" replace />} />
            <Route path="/ficus" element={<Navigate to="/producto/QHqPM1aZtflaDppRN5rk" replace />} />
            <Route path="/jazmin"  element={<Navigate to="/producto/8dDAibO7L4cdUiqJhyMS" replace />} />
            <Route path="/lavanda" element={<Navigate to="/producto/EBciSrIpde40eJB2Mqeu" replace />} />
            <Route path="/aloe" element={<Navigate to="/producto/b7FTtzaw409LFuxrTU5G" replace />} />
            <Route path="/geranio" element={<Navigate to="/producto/OBzwIyom3yT3eBlGLawm" replace />} /><Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}
