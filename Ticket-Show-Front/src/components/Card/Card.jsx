import React from "react";
import { useDispatch } from "react-redux";
import { useCart } from "../Shoppingcart/CartContext";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import style from "./Card.module.css";
import { useAuth } from "../../context/AuthContext";

const Card = (props) => {
  const { user} = useAuth(); // Obtén el usuario autenticado desde el contexto de autenticación
  const dispatch = useDispatch();
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
  const { addToCart } = useCart();
  const handleAddToCart = ({ id, name, user}) => {
    console.log(user.email, " esto quiero ver")
    if (!id || !name || !user ) {
      
      console.error("El artículo no tiene todas las propiedades necesarias");
      return;
    }

    const itemToAdd = {
      id: id,
      name: name,
      user: user.email, // Usamos el email del usuario en lugar del objeto user
    };

    addToCart(itemToAdd)
      .then(() => {
        // La promesa se resuelve correctamente, aquí puedes realizar acciones adicionales si es necesario
      })
      .catch((error) => {
        // Manejo de errores si la promesa es rechazada
        console.error("Error al agregar al carrito:", error);
      });
  };

  const [year, month, day] = props.date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (
    <div className="bg-white m-4 max-h-lg border shadow-md rounded-t-3xl rounded-b-lg flex flex-col">
    <Link to={`/detail/${props.id}`} className={""}>
      <div className="flex flex-col items-center justify-center h-40">
        <img
          className="rounded-t-3xl w-full h-full object-cover"
          src={props.image}
          alt="imagen no encontrada"
        />
      </div>
      <div className="ml-1 mr-3 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="w-20 h-20 text-black flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-xl">{formattedMonth}</h2>
          <h2 className="text-4xl md:text-5xl font-bold">{day}</h2>
        </div>
        <div className="flex-2 font-bold text-sm md:text-lg text-black text-center md:text-right mt-3 md:mt-0">
          <h3>{props.name}</h3>
        </div>
      </div>
    </Link>
    <button onClick={()=>handleAddToCart({ id: props.id, name: props.name, user }, )} className={style.addToCartButton}>

        {/* Icono de carrito */}
        <FiShoppingCart size={20} />
      </button>
  </div>
  )
};

export default Card;
