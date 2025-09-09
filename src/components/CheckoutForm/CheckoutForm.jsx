import { useState, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/firebase";
import { Link } from "react-router-dom";
import "./CheckoutForm.css";

const formatoARS = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(Number(n || 0));

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();

  const [buyer, setBuyer] = useState({
    nombre: "",
    email: "",
    email2: "",
    telefono: "",
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const digitsOnly = (s) => (s || "").replace(/\D/g, "");

  const errors = useMemo(() => {
    const e = {};
    if (!buyer.nombre.trim() || buyer.nombre.trim().length < 2) {
      e.nombre = "Ingresá tu nombre";
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(buyer.email.trim());
    if (!emailOk) {
      e.email = "Ingresá un email válido";
    }
    if (buyer.email.trim() !== buyer.email2.trim()) {
      e.email2 = "Los emails no coinciden";
    }
    const phoneDigits = digitsOnly(buyer.telefono);
    if (phoneDigits.length < 11) {
      e.telefono = "Ingresá solo números, mínimo 11 dígitos";
    }
    if (!items.length) {
      e.items = "Tu carrito está vacío";
    }
    return e;
  }, [buyer, items]);

  const hasErrors = Object.keys(errors).length > 0;
  const canSubmit = !hasErrors && !submitting;

  const onChange = (e) => {
    const { name, value } = e.target;
    setBuyer((b) => ({ ...b, [name]: value }));
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (hasErrors) {
      setTouched({ nombre: true, email: true, email2: true, telefono: true });
      return;
    }
    setSubmitting(true);
    try {
      const orderItems = items.map(({ id, nombre, precio, quantity }) => ({
        id, nombre, precio, quantity
      }));
      const id = await createOrder({
        buyer: {
          nombre: buyer.nombre.trim(),
          email: buyer.email.trim(),
          telefono: digitsOnly(buyer.telefono),
        },
        items: orderItems,
        total
      });
      setOrderId(id);
      clearCart();
    } catch (err) {
      console.error(err);
      setSubmitError("No se pudo crear el pedido. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <section className="checkout">
        <div className="checkout__card checkout__success">
          <h2 className="checkout__title">Gracias por tu compra</h2>
          <p>Este es tu ID de pedido:</p>
          <p className="order-id">{orderId}</p>
          <Link to="/" className="btn btn--primary">Volver al inicio</Link>
        </div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="checkout">
        <div className="checkout__card checkout__empty">
          <h2 className="checkout__title">Checkout</h2>
          <p>Tu carrito está vacío</p>
          <Link to="/" className="btn btn--primary">Ir al catálogo</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="checkout__card">
        <h2 className="checkout__title">Página de pago</h2>

        <form className="checkout__form" onSubmit={onSubmit} noValidate>
          <div className="checkout__row">
            <div className="field">
              <input
                name="nombre"
                placeholder="Tu nombre"
                value={buyer.nombre}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={!!errors.nombre}
                aria-describedby="err-nombre"
                autoComplete="name"
                required
              />
              {touched.nombre && errors.nombre && (
                <p id="err-nombre" className="field__error" aria-live="polite">{errors.nombre}</p>
              )}
            </div>

            <div className="field">
              <input
                name="email"
                type="email"
                placeholder="Tu email"
                value={buyer.email}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={!!errors.email}
                aria-describedby="err-email"
                autoComplete="email"
                required
              />
              {touched.email && errors.email && (
                <p id="err-email" className="field__error" aria-live="polite">{errors.email}</p>
              )}
            </div>

            <div className="field">
              <input
                name="email2"
                type="email"
                placeholder="Repetí tu email"
                value={buyer.email2}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={!!errors.email2}
                aria-describedby="err-email2"
                autoComplete="email"
                required
              />
              {touched.email2 && errors.email2 && (
                <p id="err-email2" className="field__error" aria-live="polite">{errors.email2}</p>
              )}
            </div>

            <div className="field">
              <input
                name="telefono"
                type="tel"
                placeholder="Tu teléfono"
                value={buyer.telefono}
                onChange={onChange}
                onBlur={onBlur}
                inputMode="numeric"
                aria-invalid={!!errors.telefono}
                aria-describedby="err-telefono"
                required
              />
              {touched.telefono && errors.telefono && (
                <p id="err-telefono" className="field__error" aria-live="polite">
                  {errors.telefono}
                </p>
              )}
            </div>
          </div>

          {errors.email2 && (
            <p className="form-error-global" role="alert">
              Tu email debe coincidir en ambos campos
            </p>
          )}

          <p className="checkout__total">
            Total a pagar: <strong>{formatoARS(total)}</strong>
          </p>

          {submitError && (
            <p className="field__error" role="alert" style={{ marginTop: 4 }}>
              {submitError}
            </p>
          )}

          <div className="checkout__actions">
            <button className="btn btn--primary" type="submit" disabled={!canSubmit}>
              {submitting ? "Generando pedido..." : "Confirmar compra"}
            </button>
            <Link to="/cart" className="btn">Volver al carrito</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
