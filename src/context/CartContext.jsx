import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "vv_cart_v1";

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && Array.isArray(parsed.items)) return parsed.items;
  } catch (_) {}
  return [];
}

export function CartProvider({ children }) {

  const [items, setItems] = useState(() => readStoredCart());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
  }, [items]);

  const addToCart = (product, qty = 1) => {
    if (!product || !product.id || qty <= 0) return;
    setItems((curr) => {
      const idx = curr.findIndex((it) => it.id === product.id);
      if (idx === -1) {
        return [...curr, { ...product, quantity: qty }];
      }
      const next = [...curr];
      const stock = Number(product.stock ?? next[idx].stock ?? Infinity);
      const currentQty = Number(next[idx].quantity ?? 0);
      const newQty = Math.min(currentQty + qty, stock);
      next[idx] = { ...next[idx], quantity: newQty };
      return next;
    });
  };

  const removeItem = (id) => {
    setItems((curr) => curr.filter((it) => it.id !== id));
  };

  const clearCart = () => {
    setItems([]);

  };

  const totals = useMemo(() => {
    const total = items.reduce((acc, it) => acc + Number(it.precio || 0) * Number(it.quantity || 0), 0);
    const count = items.reduce((acc, it) => acc + Number(it.quantity || 0), 0);
    return { total, count };
  }, [items]);

  const value = { items, addToCart, removeItem, clearCart, total: totals.total, count: totals.count };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
