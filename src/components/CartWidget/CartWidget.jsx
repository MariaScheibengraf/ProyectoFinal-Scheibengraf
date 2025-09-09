import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartWidget.css";

export default function CartWidget() {
  const { items = [], count } = useCart() || {};

  const totalUnits =
    typeof count === "number"
      ? count
      : items.reduce((acc, it) => acc + Number(it?.quantity || 0), 0);

  const qty = Number.isFinite(totalUnits) ? totalUnits : 0;

  return (
    <Link to="/cart" className="cartwidget" aria-label={`Ir al carrito. ${qty} artículo(s)`}>
      <span className="cartwidget__icon" aria-hidden>🛒</span>
      <span className="cartwidget__label">Mi carrito ({qty})</span>
    </Link>
  );
}
