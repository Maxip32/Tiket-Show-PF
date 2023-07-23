import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
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
    "10": "OCT",
    "11": "NOV",
    "12": "DIC",
  };

  

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

  const [  year , month, day] = props.date.split("-"); // Dividimos la fecha en año, mes y día
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
  <button
    onClick={handleAddToCart}
    className={style.addToCartButton}
  ></button>
</div>
  );
};

export default Card;
