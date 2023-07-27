import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";
import Landing from "../Landing/Landing";
import {
  FilterByCity,
  FilterByDate,
  GetByCity,
  GetByDate,
  filterByGenres,
  getEvents,
  getGenres,
  getReset,
  getResetOrder,
  orderByDate,
  orderByName,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import Paginate from "../../components/Paginate/Paginate";
import { CartProvider } from "../../components/Shoppingcart/CartContext";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const Home = () => {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.Events);
  const genres = useSelector((state) => state.genres);
  const [order, setOrder] = useState(true);
  const allEventsDates = useSelector((state) => state.date)
  const ciudades = useSelector(state => state.city)
  

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetByCity())
  }, [dispatch])

  useEffect(() => {
    dispatch(GetByDate())
  }, [dispatch])

  const handleFilterGenres = (event) => {
    dispatch(filterByGenres(event.target.value));
    setCurrentPage(1)
  };

  const handleFiltroCiudades = (event) => {
     dispatch(FilterByCity(event.target.value))
     setCurrentPage(1)
   }

  

   const allowedDates = [
    "2023-08-10",
    "2023-08-16",
    "2023-08-17",
    "2023-08-18",
    "2023-08-23",
    "2023-08-26",
    "2023-08-27",
    "2023-09-01",
    "2023-09-07",
    "2023-09-09",
    "2023-09-13",
    "2023-09-15",
    "2023-09-20",
    "2023-09-23",
    "2023-09-24",
    "2023-09-26",
    "2023-09-30",
    "2023-10-03",
    "2023-10-13",
    "2023-10-17",
    "2023-10-18",
    "2023-10-20",
    "2023-10-28",
    "2023-11-04",
    "2023-11-05",
    "2023-11-07",
    "2023-11-09",
    "2023-11-13",
    "2023-11-15",
    "2023-11-21",
    "2023-11-24",
    "2023-11-28",
    "2023-11-29"
  ];
  const [date, setDate] = useState(new Date());
  const handleInputChange = (value) => {
    setDate(value);
    const selectedDate = value.toISOString().split("T")[0];
    if (allowedDates.includes(selectedDate)) {
      dispatch(FilterByDate(selectedDate));
      setCurrentPage(1);
    }
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Estado para controlar si el calendario está abierto o cerrado

  const handleToggleCalendar = () => {
    setIsCalendarOpen((prevIsCalendarOpen) => !prevIsCalendarOpen); // Cambia el estado al valor opuesto
  };
//   const alldates= [
//     "2023-08-10",
//     "2023-08-16"
//     ,
//     "2023-08-17",
//     "2023-08-18"
//     ,
//     "2023-08-23"
//     ,
//     "2023-08-26"
//     ,
//     "2023-08-27"
//     ,
//     "2023-09-01"
//     ,
//     "2023-09-07"
//     ,
//     "2023-09-09"
//     ,
//     "2023-09-13"
//     ,
//      "2023-09-15"
//     ,
//     "2023-09-20"
//     ,
//     "2023-09-23"
//     ,
//     "2023-09-24"
//     ,
//    "2023-09-26"
//     ,
//    "2023-09-30"
//     ,
//    "2023-10-03"
//     ,
//     "2023-10-13"
//     ,
//     "2023-10-17"
//     ,
//     "2023-10-18"
//     ,
//     "2023-10-20"
//     ,
//     "2023-10-28"
//     ,
//     "2023-11-04"
//     ,
//     "2023-11-05"
//     ,
//     "2023-11-07"
//     ,
//     "2023-11-09"
//     ,
//    "2023-11-13"
//     ,
//     "2023-11-15"
//     ,
//     "2023-11-21"
//     ,
//    "2023-11-24"
//     ,
//     "2023-11-28"
//     ,
//     "2023-11-29"
    


// ]
  
  const handleOrderDate = (event) => {
    dispatch(orderByDate(event.target.value));
    order ? setOrder(false) : setOrder(true);
    setCurrentPage(1);
  };

  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value));
    order ? setOrder(false) : setOrder(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    dispatch(getReset())
    dispatch(getResetOrder())
    setCurrentPage(1)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(12);
  const indexOfLastEvents = currentPage * eventsPerPage;
  const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstEvents, indexOfLastEvents);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const returnToFirstPage = () => {
    setCurrentPage(1);
  };

  

  return (
    <CartProvider>
    <div className="flex flex-col items-center">
      <Hero />

      {/* //- Filter bar ---------> */}
      <section className="w-8/12 h-24 flex justify-evenly items-center mt-[-66px] z-10 bg-primaryColor/95 rounded-2xl">
        {/* Filter by genres */}
        <div className="flex flex-col m-1 gap-2 text-LightText w-44">
          <span className="font-extralight text-xs">Géneros</span>
          <select
            className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700 "
            onChange={(event) => handleFilterGenres(event)}
            defaultValue="default"
          >
            <option value="default" disabled>
              {" "}
              Género musical{" "}
            </option>
            {genres?.map((gen) => (
              <option value={gen.name} key={gen.id} className="text-black rounded-lg">
                {gen.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by cities */}
        <div className="flex flex-col m-1 gap-2 text-LightText w-44">
          <span className="font-extralight text-xs">Ciudades</span>
          <select
            className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700"
            onChange={(event) => handleFiltroCiudades(event)} 
            defaultValue="default"
          >
            <option value="default" disabled>
              {" "}
              Ciudades{" "}
            </option>
            {ciudades?.map((cit) => (
              <option value={cit.name} key={cit.id} className="text-black">
                {cit.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select by dates */}
        <div className="flex flex-col m-1 gap-2 text-LightText w-44">
          <span className="font-extralight text-xs">Fechas</span>
          <div className="relative inline-block">
        <input
          id="fecha"
          className= 'bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700 cursor-pointer'
          type="text"
          value={date.toISOString().split("T")[0]}
          name="Fecha"
          onChange={() => {}}
          onClick={handleToggleCalendar}
          readOnly
          required
          />
        {/* Icono de calendario al lado del input */}
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
        {isCalendarOpen && (
          <div className="absolute bg-white shadow-lg p-2 mt-2 ">
            <Calendar
              onChange={handleInputChange}
              value={date}
              minDate={new Date("2023-08-10")}
              maxDate={new Date("2023-11-29")}
              tileDisabled={({ activeStartDate, date, view }) => {
                const dateString = date.toISOString().split("T")[0];
                return !allowedDates.includes(dateString);
              }}
            />
          </div>
        )}
    </div>
    </div>
      </section>
      {/* //- Fin Filter bar ---------> */}

      <SearchBar returnToFirstPage={returnToFirstPage} />

      {/* order by events */}

      <section className=" mt-20 mb-1 flex flex-wrap items-center ">
  <h1 style={{ textAlign: "start", color: "", backgroundColor: "", textDecoration: "underline pink" }} 
  className="text-4xl mr-4   font-primaryColor">Proximos Eventos</h1>
  <div className="fle text-red">
    <select
      className="rounded-2xl"
      style={{ textAlign: "center", color: "grey", backgroundColor: "whiteSmoke" }}
      onChange={(event) => handleOrderByName(event)}
      defaultValue="default"
    >
      <option className="" value="default" disabled>
        Orden Alfabetico
      </option>
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>

    <select
      className="border-white rounded-2xl ml-2"
      style={{ textAlign: "center", color: "grey", backgroundColor: " whitesmoke" }}
      onChange={(event) => handleOrderDate(event)}
      defaultValue="default"
    >
      <option value="default" disabled>
        Orden de Eventos
      </option>
      <option value="asc">Eventos más recientes</option>
      <option value="desc">Eventos más lejanos</option>
    </select>
    <div className="flex flex-col bg-red justify-end text-sm">
      <button
      style={{ textAlign: "center", color: "pink", backgroundColor: "" }}
      onClick={handleReset}>Resetear Filtros</button>
      </div>
  </div>
</section>

<section className="w-full pb-4 p-10 md:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
  {currentEvents?.map((cu) => {
    return (
      <Card
        id={cu.id}
        name={cu.name}
        image={cu.image}
        genres={cu.genre}
        date={cu.date}
        location={cu.location}
        key={cu.id}
        className="w-full h-full md:h-[300px]" // Ajusta la altura deseada de las tarjetas aquí
      />
    );
  })}
</section>
      <section className="mb-5">
        <Paginate
          eventsPerPage={eventsPerPage}
          allEvents={allEvents.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
      <Landing />
      <Footer />
    </div>
    </CartProvider>
  );
};

export default Home;
