/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../Shoppingcart/shoppingCartContext";
import { LiaCartPlusSolid, LiaCartArrowDownSolid, LiaTicketAltSolid } from "react-icons/lia";
//import { addToCartBackend } from "../Shoppingcart/CartContext"


const Card = ({ id, image, name, date, price, genres, city }) => {
  const { user } = useAuth(); // Obtén el usuario autenticado desde el contexto de autenticación

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
    10: "OCT",
    11: "NOV",
    12: "DIC",
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
    <div className="bg-white w-64 h-96 md:w-72 m-4 border shadow-md rounded-2xl flex-none lg:flex lg:flex-col">
      <Link to={`/detail/${id}`}>
        <div className="flex flex-col h-60 md:h-72 justify-center items-center w-full">
          <img
            className="w-full h-full object-cover rounded-t-2xl"
            src={image}
            alt="imagen no encontrada"
          />
        </div>
      </Link>
      <div className="w-full flex flex-col md:flex-row items-center justify-between p-2">
        <div className="text-black flex flex-col items-center justify-center md:ml-2">
          <p className="text-md text-ChryslerBlue">{formattedMonth}</p>
          <h2 className="text-3xl font-bold">{day}</h2>
        </div>
        <div className="w-full flex flex-col items-center gap-2 h-full mt-2">
          <div className="w-full flex gap-2 items-center justify-center md:justify-end h-2/4 mr-1">
            <span className="font-semibold text-lg text-primaryColor ">{name}</span>
            <span className="p-1 rounded-lg bg-DarkTextPurple text-Color200 text-sm font-extralight">$ {price} </span>
          </div>
          <div className="flex items-center gap-2 h-2/4">
            {user && (
              <>
                {quantityPerItem > 0 && <div>Total: {quantityPerItem}</div>}
                {quantityPerItem === 0 ? (
                  <button onClick={() => addToCart()}>
                    <LiaCartPlusSolid size={26} color="#ed4690" />
                  </button>
                ) : (
                  <button onClick={() => addToCart()}>
                    <LiaCartPlusSolid size={26} color="#ed4690"/>
                  </button>
                )}
                {/* <span>Total: </span> */}
                {quantityPerItem > 0 && (
                  <button onClick={() => removeItem(id)}>
                    <LiaCartArrowDownSolid size={26} color="#5522CC"/>
                  </button>
                )}
              </>
            )}
          </div>
          </div>
      </div>
    </div>
  );
};

export default Card;
