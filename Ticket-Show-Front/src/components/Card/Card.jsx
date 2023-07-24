import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions";
import { Link } from "react-router-dom";

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
    10: "OCT",
    11: "NOV",
    12: "DIC",
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
    <button onClick={handleAddToCart} className={""}></button>
  </div>
  )
};

export default Card;
