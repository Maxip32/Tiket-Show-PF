import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventId } from "../../redux/actions";

const Detail = () => {
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

  const { id } = useParams();

  const { event } = useSelector((state) => state.detail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventId(id));
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const [year, month, day] = event.date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (
    <div>
      <div className="bg-primaryColor w-full shadow-lg p-4">
        <div className="flex items-start">
          <div className="w-60 h-60 bg-white  mr-4">
            <img src={event.image} alt="foto del artista" />
          </div>
          <div>
            <h2 className="text-5xl text-white font-bold">{event.name}</h2>
            <div className="text-3xl text-white font-bold">
              <h2>{event.city} </h2>

              <h2>{event.address}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-10 bg-primaryColor h-60 w-full shadow-lg p-4">
        <p className="text-xl text-white ">
          {" "}
          Mauro Ezequiel Lombardo (Almagro, Buenos Aires, 24 de junio de 1996),
          conocido artísticamente como Duki, es un rapero y compositor
          argentino.1​ Es reconocido por haber popularizado el género del trap
          en la música mainstream hispanohablante a fines de la década de los
          2010, y por su utilización del autotune en sus vocales y sus ganchos
          melódicos en su estilo de rapeo. Lombardo surgió de sus
          participaciones en las batallas de rap, en especial de la competencia
          El Quinto Escalón, la cual al volverse un fenómeno viral en YouTube,
          le dio su primera cuota de popularidad cuando se proclamó campeón en
          2016; su victoria significó que pudiera lanzar su primer sencillo y
          trabajar con el productor discográfico Omar Varela un par de meses
          después. En 2017, irrumpió en la escena musical argentina con su
          primer sencillo exitoso, «She Don't Give a FO», y al año siguiente
          formó parte del supergrupo Modo Diablo junto a los raperos YSY A y Neo
          Pistea, cuyos sencillos «Quavo» y «Trap N' Export» ayudaron a
          popularizar y formar un masivo culto de seguidores alrededor del
          género del trap en Sudaméricsa.{" "}
        </p>
      </div>
      <div className="  items-center bg-primaryColor border-white h-40 m-5 max-w-4xl min-w-0 flex">
        <div className="flex-2 text-4xl text-white font-bold p-5 first:bg-red-500 ">
          <h2>{formattedMonth}</h2>
          <h2 className="items-center justify-center flex ">{day}</h2>
        </div>
        <div className=" pl-8 flex-1 text-3xl text-white">
          <h2>-{event.start}hs</h2>
          <h2 className="font-bold">Teatro Luna Park</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white 
    font-bold py-2 px-4 border border-blue-700 rounded "
          >
            Adquirir Entrada
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
