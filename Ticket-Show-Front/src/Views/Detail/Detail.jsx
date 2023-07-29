import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventId } from "../../redux/actions";
import Loading from "../Landing/Landing";
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

  
  const [, /* year */ month, day] = event?.date?.split("-") || []; // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (
    <div className=" mt-15 flex flex-col mx-auto ">
      {event ? (
        <>
          <div className="bg-primaryColor/80 w-full shadow-lg p-4">
            <div className="flex items-start flex-col sm:flex-row">
              <div className="w-60 max-h-fit bg-primaryColor mb-4 sm:mb-0 sm:mr-4">
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
          <div className=" mx-auto text-xl px-10 py-10 text-black  bg-white max-h-90 
          shadow-lg p-4 overflow-y-auto  ">
            <h2 style={{ whiteSpace: "pre-line", textAlign: "justify", width: "100rem" }}>
              {event.description}
            </h2>
            {console.log(event.description)}
          </div>
          <div className="mx-auto items-center bg-primaryColor border-white h-40 m-5 max-w-4xl min-w-0 flex justify-center">
            <div className=" flex- text-4xl  h-40 text-white font-bold p-5 first:bg-secondaryColor">
              <h2 className="mt-5">{formattedMonth}</h2>
              <h2 className="items-center justify-center flex ">{day}</h2>
            </div>
            <div className="pl-8 flex-1 text-3xl text-white">
              <h2>-{event.start}hs</h2>
              <h2 className="font-bold">{event.address}</h2>
            </div>
            <div className="pl-8 flex-1 text-3xl text-white">
            <h1>Precio ${event.price}</h1>

            </div>
            
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Detail;
