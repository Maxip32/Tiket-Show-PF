import React, { useContext } from "react";
import { CartContext } from "./shoppingCartContext";

 export const CartPage = () => {
    
    const [cart, setCart] = useContext(CartContext)
    console.log(cart, 'soycart')
    const quantity = cart.reduce((acc, curr) => {
      return acc + curr.quantity
    }, 0)

    const totalPrice = cart.reduce((acc, curr) =>
    acc + curr.quantity * curr.price,
        0
    ) 
    
    
  return (
    <div>
   
      <div>Cantidad de boletos:{quantity}</div>
      <div>Costo Total: ${totalPrice}</div>
      <button onClick={() => console.log(cart)}>Verificar</button>

      {/* Mostrar los elementos del carrito */}
      {cart.map((item) => (
        <div key={item.id}>
          <img>{item.image}</img>
          <h3>{item.name}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio Unitario: ${item.price}</p>
          <hr />
        </div>
      ))}

    </div>
  );
};


