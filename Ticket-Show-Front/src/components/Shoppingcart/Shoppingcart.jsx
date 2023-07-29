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
          body: JSON.stringify({ value: totalPrice,  }), // Enviar el precio en el cuerpo de la solicitud
        });
        // Verificar si la solicitud fue exitosa (código de estado 200)
        if (response.status === 200) {
          const data = await response.json();
  
          // Verificar si 'links' existe en data
          if (!data.links || data.links.length < 2) {
            console.error("La propiedad 'links' no existe o no tiene suficientes elementos");
            return;
          }
          
          const detailsShopping = {
            date: new Date().toISOString(), // Agregar la fecha de compra
            total: totalPrice,
            cantidad: quantity, // Agregar el precio total
            name: "Nombre del Evento"
            // Agregar otros detalles relevantes, como nombres de eventos, cantidades, etc. si es necesario
          };
  
          // Obtener compras existentes desde localStorage o crear un array vacío
          const savedPurchases = JSON.parse(localStorage.getItem("userPurchases")) || [];
  
          // Agregar la nueva compra a las compras existentes
          savedPurchases.push(detailsShopping);
  
          // Guardar las compras actualizadas en localStorage
          localStorage.setItem("userPurchases", JSON.stringify(savedPurchases));
          console.log("savedPurchases in CartPage:", JSON.parse(localStorage.getItem("userPurchases")));
          
          // Realizar la redirección a la pasarela de pago
          window.location.href = data.links[1].href;
        } else {
          // La compra fue cancelada o hubo un error
      // Puedes guardar un mensaje especial en lugar de los detalles de la compra
      const detailsShopping = {
        date: new Date().toISOString(), // Agregar la fecha de compra
        message: "Esta compra fue cancelada", // Mensaje especial indicando que la compra fue cancelada
      };

      // Obtener compras existentes desde localStorage o crear un array vacío
      const savedPurchases = JSON.parse(localStorage.getItem("userPurchases")) || [];

      // Agregar la nueva compra (o mensaje especial) a las compras existentes
      savedPurchases.push(detailsShopping);

      // Guardar las compras actualizadas en localStorage
      localStorage.setItem("userPurchases", JSON.stringify(savedPurchases));
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


