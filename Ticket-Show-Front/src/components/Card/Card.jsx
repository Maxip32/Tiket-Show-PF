import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Aquí despachas la acción de agregar al carrito con la información del evento
    dispatch(
      addToCart({
        id: props.id,
        name: props.name,
        cost: props.price, // Asegúrate de utilizar el nombre correcto de la propiedad del precio si es diferente
        // Otros datos relevantes del evento si los tienes
      })
    );
  };

  return (
    <div className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${style.card}`}>
      <Link to={`/detail/${props.id}`} className={style.link}>
        <div className="">
          <img
            className="w-80 h-40 object-contain"
            src={props.image}
            alt="imagen no encontrada"
          />
        </div>
        <div className={style.healtScoreContainer}>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.name}
          </h3>
          <h3 className={style.healtScore}>Fecha: {props.date}</h3>
          <h5>{props.city}</h5>
        </div>
        <div>
          <h5>{props.genre} </h5>
        </div>
      </Link>
      <button onClick={handleAddToCart} className={style.addToCartButton}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default Card;

