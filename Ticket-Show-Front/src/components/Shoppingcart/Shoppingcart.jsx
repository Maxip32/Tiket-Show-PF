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

    const handleAdquirirEntrada = async () => {
      try {
        const response = await fetch("http://localhost:3001/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indicar que los datos se envían en formato JSON
          },
          //PARA QUE ME LLEGUE Y TOME EL PRECIO DE CADA EVENTO AL BACK
          body: JSON.stringify({ value: totalPrice }), // Enviar el precio en el cuerpo de la solicitud
        });
        // Verificar si la solicitud fue exitosa (código de estado 200)
        if (response.status === 200) {
          const data = await response.json();
  
          // Verificar si 'links' existe en data
          if (!data.links || data.links.length < 2) {
            console.error("La propiedad 'links' no existe o no tiene suficientes elementos");
            return;
          }
  
          // Realizar la redirección a la pasarela de pago
          window.location.href = data.links[1].href;
        } else {
          console.error("Error al adquirir la entrada: ", response.statusText);
        }
      } catch (error) {
        console.error("Error al adquirir la entrada: ", error);
      }
    };
    
    
  return (
    <div>
   
      <div>Cantidad de boletos:{quantity}</div>
      <div>Costo Total: ${totalPrice}</div>
      <button className="bg-secondaryColor/80 hover:bg-secondaryColor text-white 
                font-bold py-3 px-11 border rounded" onClick={handleAdquirirEntrada} id='AdquirirEntrada'>Adquirir Entradas</button>

      {/* Mostrar los elementos del carrito */}
      {cart.map((item) => (
        <div key={item.id}>
          <div className="w-14 h-14 rounded-full">
          <img className="w-14 h-14 " src={item.image} alt="foto"/>
          </div>
          <h3>{item.name}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio Unitario: ${item.price}</p>
          <hr />
        </div>
      ))}

    </div>
  );
};


