import React, { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Importa axios para realizar las solicitudes HTTP

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]); // Estado inicial como una matriz vacía

  // Implementa las funciones para realizar solicitudes HTTP al backend
  const addToCartBackend = async (item) => {
    try {
      const response = await axios.post(`http://localhost:3001/cart/cart`, item);
      const updatedCartItems = response.data.CartItems; // Asegúrate de usar la clave correcta que contiene la matriz de elementos del carrito
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };
  // const getCartItemsBackend = async (user) => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/cart/cart", {
  //       params: {
  //         email: user,
  //       },
  //     });
  //     const updatedCartItems = response.data.items;
  //     setCartItems(updatedCartItems);
  //   } catch (error) {
  //     console.error("Error al obtener el carrito:", error);
  //   }
  
  // };

  const removeFromCartBackend = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/cart/cart/${itemId}`);
      // Realiza una solicitud DELETE al backend para eliminar el elemento del carrito
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      ); // Actualiza el estado local eliminando el elemento del carrito
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

  const updateCartItemBackend = async (itemId, quantity) => {
    try {
      await axios.put(`http://localhost:3001/cart/cart/${itemId}`, {
        quantity,
      });
      // Realiza una solicitud PUT al backend para actualizar la cantidad del elemento en el carrito
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      ); // Actualiza el estado local con la nueva cantidad del elemento
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: addToCartBackend, // Usa las funciones para interactuar con el backend
        removeFromCart: removeFromCartBackend,
        updateCartItem: updateCartItemBackend,
        // getCartItem: getCartItemsBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
