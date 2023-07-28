/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
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
    '10': "OCT",
    '11': "NOV",
    '12': "DIC",
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

  const [/* year */, month, day] = props.date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (
    <div className="bg-white w-64 h-80 m-4 border shadow-md rounded-2xl flex flex-col">
    <Link to={`/detail/${props.id}`} className="">
      <div className="flex flex-col items-center justify-center h-56 w-full">
        <img
          className="w-full h-full object-cover rounded-t-2xl"
          src={props.image}
          alt="imagen no encontrada"
        />
      </div>
      <div className="ml-3 mr-6 flex flex-col md:flex-row items-center justify-between">
        <div className="p-3 text-black flex flex-col items-center">
          <h2 className="text-md text-ChryslerBlue">{formattedMonth}</h2>
          <h2 className="text-3xl font-bold">{day}</h2>
        </div>
        <div className="flex font-bold md:text-xl text-black text-left md:text-right">
          <h3>{props.name}</h3>
        </div>
      </div>
    </Link>
    <button onClick={handleAddToCart} className=""></button>
  </div>
  )
};

export default Card;
