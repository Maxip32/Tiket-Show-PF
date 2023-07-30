/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../Shoppingcart/shoppingCartContext";
//import { addToCartBackend } from "../Shoppingcart/CartContext"

const Card = ({id, image, name, date, price, genres,city}) => {
  const { user} = useAuth(); // Obtén el usuario autenticado desde el contexto de autenticación

  const monthsMap = {
    "01": "ENE",
    "02": "FEB",
    "03": "MAR",
    "04": "ABR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AGO",
    "09": "SEP",
    '10': "OCT",
    '11': "NOV",
    '12': "DIC",
  };
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);

      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id, name, quantity: 1, price, image }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getQuantityById = () => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);

  const [year, month, day] = date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (

    <div className="bg-white w-64 h-80 m-4 border shadow-md rounded-2xl flex flex-col">
      <Link to={`/detail/${id}`} className={""}>
        <div className="flex flex-col items-center justify-center h-56 w-full">
          <img
            className="w-full h-full object-cover rounded-t-2xl"
            src={image}
            alt="imagen no encontrada"
          />
        </div>
        <div className="ml-3 mr-6 flex flex-col md:flex-row items-center justify-between">
          <div className="p-3 text-black flex flex-col items-center">
            <h2 className="text-md text-ChryslerBlue">{formattedMonth}</h2>
            <h2 className="text-3xl font-bold">{day}</h2>
          </div>
          <div className="flex font-bold md:text-xl text-black text-left md:text-right">
            <h3>{name}</h3>
          </div>
          <div>
            <h1>{price}</h1>
          </div>
        </div>
      </Link>

      {user && (
        <>
          {quantityPerItem > 0 && <div>{quantityPerItem}</div>}

          {/* <p onClick={handleCountItem}>{counterItem}</p> */}
          {quantityPerItem === 0 ? (
            <button onClick={() => addToCart()}>+ Agregar</button>
          ) : (
            <button onClick={() => addToCart()}>+ Añadir más</button>
          )}

          {quantityPerItem > 0 && (
            <button onClick={() => removeItem(id)}>- Remover</button>
          )}
          <button onClick={() => addToCart()} className={""}>
            {/* Icono de carrito */}
            <FiShoppingCart size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
