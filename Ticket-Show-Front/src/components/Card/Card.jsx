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
    // ...
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

  // ...

  const [year, month, day] = props.date.split("-");
  const formattedMonth = monthsMap[month];

  return (
    <div className="bg-secondaryColor max-w-xs max-h-xs border  rounded-t-3xl ">
      <Link to={`/detail/${props.id}`} className={style.link}>
        <div className="flex justify-center items-center h-40">
          <img
            className="rounded-t-3xl w-full h-full object-cover"
            src={props.image}
            alt="imagen no encontrada"
          />
        </div>
        <div className="ml-2 mr-3 flex items-center justify-between gap-10">
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
              {props.name}
            </h3>
          </div>
          <div className="flex-2 font-bold text-xl text-white text-right">
            <h3>
              {formattedMonth} {day}
            </h3>
          </div>
        </div>
      </Link>
      <button onClick={()=>handleAddToCart({ id: props.id, name: props.name, user }, )} className={style.addToCartButton}>

        {/* Icono de carrito */}
        <FiShoppingCart size={20} />
      </button>
    </div>
  );
};

export default Card;
