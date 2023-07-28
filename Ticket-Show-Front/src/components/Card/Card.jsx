import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import style from "./Card.module.css";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../Shoppingcart/shoppingCartContext";
//import { addToCartBackend } from "../Shoppingcart/CartContext"
const Card = ({id, image, name, date, price}) => {
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
    10: "OCT",
    11: "NOV",
    12: "DIC",
  };
  const [cart, setCart] = useContext(CartContext)

  const addToCart = () => {
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id)

      if (isItemsFound) {
        return currItems.map((item) => {
          if(item.id === id) {
            return {...item, quantity: item.quantity +1}
          }else {
            return item
          }
        })
      } else {
        return [...currItems, {id, name, quantity: 1, price, image }]
      }
    })
  }

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1){
        return currItems.filter((item) => item.id !== id)
      }else {
        return currItems.map((item) => {
          if(item.id === id){
            return {...item, quantity: item.quantity -1}
          }else {
            return item
          }
        })
      }
    })
  }

  const getQuantityById = () => {
    return cart.find((item) => item.id === id )?.quantity || 0;
  }

  const quantityPerItem = getQuantityById(id)

  const [year, month, day] = date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (
    <div className="bg-white m-4 max-h-lg border shadow-md rounded-t-3xl rounded-b-lg flex flex-col">
    
    <Link to={`/detail/${id}`} className={""}>
      <div className="flex flex-col items-center justify-center h-40">
        <img
          className="rounded-t-3xl w-full h-full object-cover"
          src={image}
          alt="imagen no encontrada"
        />
      </div>
      <div className="ml-1 mr-3 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="w-20 h-20 text-black flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-xl">{formattedMonth}</h2>
          <h2 className="text-4xl md:text-5xl font-bold">{day}</h2>
        </div>
        <div className="flex-2 font-bold text-sm md:text-lg text-black text-center md:text-right mt-3 md:mt-0">
          <h3>{name}</h3>
        </div>
        <div>
          <h1>{price}</h1>
        </div>
      </div>
    </Link>
    {user && (
        <>
        {quantityPerItem > 0 && (
      <div>{quantityPerItem}</div>
    )}

        {/* <p onClick={handleCountItem}>{counterItem}</p> */}
    {
      quantityPerItem === 0 ? (
        <button onClick={() => addToCart()}>+ Agregar</button>
      ) : (
        <button onClick={() => addToCart()}>+ Añadir más</button>
      )}

      {
        quantityPerItem > 0 && (

        <button onClick={() => removeItem(id)}>- Remover</button>
      )}
    <button onClick={()=>addToCart() }className={style.addToCartButton}>

        {/* Icono de carrito */}
        <FiShoppingCart size={20} />
      </button>
      </>
    )}
  </div>
  )
};

export default Card;
