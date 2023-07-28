import React from 'react';
import { useEffect } from 'react';
//import { useCart } from '../Shoppingcart/CartContext';
//import Card from '../Card/Card'; // Asegúrate de ajustar la ruta al archivo Card.js según la ubicación real
import { useSelector } from 'react-redux';

const CartPage = () => {
  const cartItems = useSelector(state=> state.cart); // Extrae la información del carrito del contexto

  useEffect(() => {
    // Esta función se ejecutará cada vez que cambie el estado cartItems del contexto
    console.log('CartItems actualizados:', cartItems);
  }, [cartItems]); // Establece cartItems como una dependencia para que useEffect se ejecute cuando cambie


  return (
    <div>
      <h1>Carrito de compras</h1>
      {/* Verificar si hay elementos en el carrito antes de mostrarlos */}
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <div>

            <li key={item.id}>
              
                {/* id={item.id} */}
                name={item.name}
                <img src={item.image} alt="No se encontro Imagen"></img> 
                date={item.date}
              
            </li>
             {/* <button onClick={}>Limpiar Carrito</button> */}
            </div>
          ))}
        </ul>
      ) : (
        <p>No hay elementos en el carrito</p>
      )}
    </div>
  );
};

export default CartPage;
