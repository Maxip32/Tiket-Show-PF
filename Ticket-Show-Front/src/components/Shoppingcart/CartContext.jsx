// context/CartContext.js
import React, { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateCartItem } from "../../redux/actions";




const CartContext = createContext();

const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]); // Estado inicial como una matriz vacía

  // Implementa las funciones con las acciones de Redux
  const addToCartRedux = (item) => {
    dispatch(addToCart(item));
  };

  const removeFromCartRedux = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const updateCartItemRedux = (itemId, quantity) => {
    dispatch(updateCartItem(itemId, quantity));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: addToCartRedux,
        removeFromCart: removeFromCartRedux,
        updateCartItem: updateCartItemRedux,
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
