/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../Shoppingcart/shoppingCartContext";
import { LiaCartPlusSolid, LiaCartArrowDownSolid, LiaTicketAltSolid } from "react-icons/lia";
//import { addToCartBackend } from "../Shoppingcart/CartContext"

const Card = ({ id, image, name, date, price, genres, city, }) => {
 
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
    "10": "OCT",
    "11": "NOV",
    "12": "DIC",
  };

  
  const [year, month, day] = date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (
    <div className="bg-white w-64 h-96 md:w-72 m-4 border shadow-md rounded-2xl flex-none lg:flex lg:flex-col transform transition-all hover:-translate-y-3 hover:shadow-xl">
      
        <div className="flex flex-col h-60 md:h-72 justify-center items-center w-full">
          <img
            className="w-full h-full object-cover rounded-t-2xl"
            src={image}
            alt="imagen no encontrada"
          />
        </div>
      
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
              <Link to={`/detail/${id}`}>
                <button className="font-semibold text-lg text-primaryColor "> Comprar </button>
                </Link>
              </>
            )}
          </div>
          </div>
      </div>
    </div>
  );
};

export default Card;
