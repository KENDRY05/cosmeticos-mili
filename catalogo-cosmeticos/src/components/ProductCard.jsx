
import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ producto }) {
  const [cantidad, setCantidad] = useState(1);

  const numeroWhatsApp = "50558427509";
  const cantidadMayorista = 6;

  const precioUnitario = Number(
    producto.precioUnitario ?? producto.precio ?? 0
  );

  const precioMayorista = Number(
    producto.precioMayorista ?? 0
  );

  const aplicaMayorista =
    cantidad >= cantidadMayorista &&
    producto.precioMayorista !== undefined &&
    producto.precioMayorista !== null &&
    producto.precioMayorista !== "" &&
    Number.isFinite(precioMayorista) &&
    precioMayorista >= 0;

  const precioAplicado = aplicaMayorista
    ? precioMayorista
    : precioUnitario;

  const total = precioAplicado * cantidad;

  const mensajeWhatsApp =
    `Hola, me interesa este producto del catálogo.\n` +
    `Producto: ${producto.nombre}\n` +
    `Cantidad: ${cantidad} unidad(es)\n` +
    `Precio por unidad: C$ ${precioAplicado.toFixed(2)}\n` +
    `Total estimado: C$ ${total.toFixed(2)}\n` +
    (aplicaMayorista
      ? "Precio mayorista aplicado."
      : cantidad < cantidadMayorista
        ? `El precio mayorista aplica desde ${cantidadMayorista} unidades.`
        : "Quisiera confirmar el precio del producto.");

  const enlaceWhatsApp =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;

  return (
    <article className="producto-card">
      <div className="producto-image">
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
        />
      </div>

      <div className="producto-info">
        <h3>{producto.nombre}</h3>

        <p>{producto.descripcion}</p>

        <div className="producto-precios">
          <p>
            Precio unitario:{" "}
            <strong>
              C$ {precioUnitario.toFixed(2)}
            </strong>
          </p>

          <p>
            Precio mayorista:{" "}
            <strong>
              {producto.precioMayorista !== undefined &&
              producto.precioMayorista !== null &&
              producto.precioMayorista !== ""
                ? `C$ ${precioMayorista.toFixed(2)}`
                : "Consultar"}
            </strong>
          </p>
        </div>

        <div className="producto-cantidad">
          <label htmlFor={`cantidad-${producto.id}`}>
            Cantidad:
          </label>

          <div className="cantidad-controles">
            <button
              type="button"
              onClick={() =>
                setCantidad((actual) => Math.max(1, actual - 1))
              }
              disabled={cantidad <= 1}
              aria-label="Disminuir cantidad"
            >
              −
            </button>

            <input
              id={`cantidad-${producto.id}`}
              type="number"
              min="1"
              step="1"
              value={cantidad}
              onChange={(e) => {
                const valor = e.target.value;

                if (valor === "") {
                  setCantidad("");
                  return;
                }

                const numero = Number(valor);

                if (Number.isInteger(numero) && numero >= 1) {
                  setCantidad(numero);
                }
              }}
              onBlur={() => {
                if (!cantidad || cantidad < 1) {
                  setCantidad(1);
                }
              }}
            />

            <button
              type="button"
              onClick={() =>
                setCantidad((actual) =>
                  Math.max(1, Number(actual) || 1) + 1
                )
              }
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>

        {cantidad >= cantidadMayorista ? (
          aplicaMayorista ? (
            <p className="mayorista-aviso">
              ¡Precio mayorista aplicado!
            </p>
          ) : (
            <p className="mayorista-aviso">
              Consulta el precio mayorista por WhatsApp.
            </p>
          )
        ) : (
          <p className="mayorista-aviso">
            Compra {cantidadMayorista - cantidad} unidad(es) más
            para alcanzar el precio mayorista.
          </p>
        )}

        <div className="producto-total">
          <span>Precio por unidad:</span>
          <strong>C$ {precioAplicado.toFixed(2)}</strong>

          <span>Total estimado:</span>
          <strong>C$ {total.toFixed(2)}</strong>
        </div>

        <a
          href={enlaceWhatsApp}
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por WhatsApp sobre ${producto.nombre}`}
        >
          <svg
            className="whatsapp-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="21"
            height="21"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2a9.85 9.85 0 0 0-8.48 14.87L2 22l5.29-1.39A9.9 9.9 0 1 0 12.04 2Zm0 17.98a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.14.83.84-3.06-.2-.31a8.1 8.1 0 1 1 6.93 3.85Zm4.45-6.07c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
          </svg>

          Consultar por WhatsApp
        </a>
      </div>
    </article>
  );
}

export default ProductCard;
