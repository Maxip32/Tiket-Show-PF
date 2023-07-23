import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventId } from "../../redux/actions";
import Loading from '../Landing/Landing'

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
    '10': "OCT",
    '11': "NOV",
    '12': "DIC",
  };

  const { id } = useParams();

  const { event }  = useSelector((state) => state.detail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventId(id));
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const [year, month, day] = event.date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (
    <div className="">
      {
        event ? (
          <>
          <div className="bg-primaryColor w-full shadow-lg p-4">
            <div className="flex items-start flex-col sm:flex-row">
              <div className="w-60 h-60 bg-white mb-4 sm:mb-0 sm:mr-4">
                <img src={event.image} alt="foto del artista" />
              </div>
              <div>
                <h2 className="text-5xl text-white font-bold">{event.name}</h2>
                <div className="text-3xl text-white font-bold">
                  <h2>{event.city}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto !mx-auto text-xl px-10 py-10 text-black  bg-white max-h-90 max-w-9xl shadow-lg p-4 overflow-y-auto font-bold ">
            <h2>{event.description}</h2>
          </div>
          <div className="mx-auto !mx-auto items-center bg-primaryColor border-white h-40 m-5 max-w-4xl min-w-0 flex justify-center">
            <div className=" flex- text-4xl  h-40 text-white font-bold p-5 first:bg-purple-500">
              <h2 className="mt-5">{formattedMonth}</h2>
              <h2 className="items-center justify-center flex ">{day}</h2>
            </div>
            <div className="pl-8 flex-1 text-3xl text-white">
              <h2>-{event.start}hs</h2>
              <h2 className="font-bold">{event.address}</h2>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <button
                className="  bg-purple-500 hover:bg-purple-700 text-white 
        font-bold py-3 px-11 border  rounded"
              >
                Adquirir Entrada
              </button>
            </div>
          </div>
          </>
        ) : (
          <Loading />
        )
      }
    </div>
  );
};

export default Detail;
