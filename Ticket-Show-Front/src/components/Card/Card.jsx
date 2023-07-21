import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`detail/${props.id}`} className={style.link}>
        <div className="p-5">
          <img
            className="rounded-t-lg"
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
    </div>
  );
};

export default Card;
