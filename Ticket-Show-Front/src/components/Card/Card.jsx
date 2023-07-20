import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`detail/${props.id}`} className={style.link}>
        <div className="">
          <img
            className="w-60 h-40 object-contain"
            src={props.image}
            alt="imagen no encontrada"
          />
        </div>
        <div className={style.healtScoreContainer}>
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h3>
          <h3 className={style.healtScore}>Fecha: {props.date}</h3>
        </div>
        <div className={style.infoContainer}>
         
          <h3 className={style.name}>{props.location}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;
