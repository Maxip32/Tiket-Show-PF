import React from "react";
import { useCart } from "../Shoppingcart/CartContext";

const CartPage = () => {
  const { cartItems } = useCart(); // Extrae la información del carrito del contexto

  return (
    <div>
      <h1>Carrito de compras</h1>
      {/* Verificar si hay elementos en el carrito antes de mostrarlos */}
      {cartItems.length > 0 ? (
        <ul>
          {cartItems?.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              {/* Puedes mostrar más detalles del ítem aquí si es necesario */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay elementos en el carrito</p>
      )}
    </div>
  );
};

export default CartPage;

