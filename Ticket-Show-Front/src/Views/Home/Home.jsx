import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/Shoppingcart/SearchBar";
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

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const Home = () => {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.Events);
  const genres = useSelector((state) => state.genres);
  const [order, setOrder] = useState(true);
  const allEventsDates = useSelector((state) => state.date);
  const ciudades = useSelector((state) => state.city);
  const [filters, setFilters] = useState({
    genre: "",
    city: "",
    date: "",
  });
  const [events, setEvents] = useState(allEvents);

  const [orderType, setOrderType] = useState("asc");

  // useEffect(() => {
  //   dispatch(getEvents());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getGenres());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(GetByCity());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(GetByDate());
  // }, [dispatch]);

 
  const [date, setDate] = useState(new Date());
  const handleFilterGenres = (event) => {
    const genreValue = event.target.value;
    setFilters((prev) => ({ ...prev, genre: genreValue }));
  };

  const handleFiltroCiudades = (event) => {
    const cityValue = event.target.value;
    setFilters((prev) => ({ ...prev, city: cityValue }));
  };

  useEffect(() => {
    const eventosFiltrados = allEvents.filter((evento) => {
      const matchesGenre = !filters.genre || evento.genre.includes(filters.genre);
      const matchesCity = !filters.city || evento.city.includes(filters.city);
      const matchesDate = !filters.date || evento.date === filters.date;
      return matchesGenre && matchesCity && matchesDate;
    });
    setEvents(eventosFiltrados);
    setCurrentPage(1);
  }, [allEvents, filters]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Estado para controlar si el calendario está abierto o cerrado

  const handleToggleCalendar = () => {
    setIsCalendarOpen((prevIsCalendarOpen) => !prevIsCalendarOpen); // Cambia el estado al valor opuesto
  };

  const handleOrderDate = () => {
    setOrderType(orderType === "asc" ? "desc" : "asc");
    const sortedEvents = [...events].sort((a, b) => {
      return orderType === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
    setEvents(sortedEvents);
    setCurrentPage(1);
  };

  const handleOrderByName = () => {
    setOrderType(orderType === "asc" ? "desc" : "asc");
    const sortedEvents = [...events].sort((a, b) => {
      return orderType === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setEvents(sortedEvents);
    setCurrentPage(1);
  };


  const handleReset = () => {
    setFilters({
      genre: "",
      city: "",
      date: "",
    });
    setEvents(allEvents);
    //dispatch(getReset());
    dispatch(getResetOrder());
    setCurrentPage(1);
  };


  
  console.log(filters);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(12);
  const indexOfLastEvents = currentPage * eventsPerPage;
  const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvents, indexOfLastEvents);
  console.log(currentEvents);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const returnToFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Hero />

      {/* //- Filter bar ---------> */}
      <section className="w-8/12 max-w-3xl mx-auto h-24 flex justify-evenly items-center mt-[-66px] z-10 bg-primaryColor/95 rounded-2xl">
        {/* Filter by genres */}
        <div className="flex flex-col m-1 gap-2 text-LightText w-44">
          <span className="font-extralight text-xs">Géneros</span>
          <select
          id="genre-selector"
            className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700 "
            onChange={(event) => handleFilterGenres(event)}
           
          >
            <option value="default" disabled>
              {" "}
              
              Género musical{" "}
            </option>
            {genres?.map((gen) => (
              <option
                value={gen.name}
                key={gen.id}
                className="text-black rounded-lg"
              >
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
              className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700 cursor-pointer"
              type="text"
              value={date.toISOString().split("T")[0]}
              name="Fecha"
              onChange={() => {}}
              onClick={handleToggleCalendar}
              readOnly
              required
            />
            {/* Icono de calendario al lado del input */}
            <span className="absolute inset-y-0 right-0 flex items-center pr-0 mb-1 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                width="18"
                viewBox="0 -960 960 960"
                className="fill-LightText"
              >
                <path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
              </svg>
            </span>
            {isCalendarOpen && (
              <div className="absolute bg-LightText text-primaryColor shadow-md p-2 mt-2 ">
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

      {/* Title & order by events */}
      <section className="w-full max-w-5xl mx-auto mt-20 flex items-center justify-around">
        <p className="text-4xl m-0">Próximos Eventos</p>
        <select
          className="rounded-2xl"
          onChange={(event) => handleOrderByName(event)}
          defaultValue="default"
        >
          <option className="" value="default" disabled>
            Orden Alfabético
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

      {/* order by events */}

        <select
          className="border-white rounded-2xl ml-2"
          onChange={(event) => handleOrderDate(event)}
          defaultValue="default"
        >
          <option value="default" disabled>
            Orden de Eventos
          </option>
          <option value="asc">Eventos más recientes</option>
          <option value="desc">Eventos más lejanos</option>
        </select>

        <button
          className="border-white rounded-2xl ml-2"
          onClick={handleReset}
        >
          Reiniciar Filtros
        </button>
      </section>
      {/* Fin Title & order by events */}
      
      {/* Card section */}
      <section className="w-full max-w-7xl mx-auto gap-4 p-10 m-6 flex flex-wrap justify-center">
        {currentEvents?.map((cu) => {
          return (
            <Card
              id={cu.id}
              name={cu.name}
              image={cu.image}
              genres={cu.genre}
              date={cu.date}
              location={cu.location}
              city={cu.city}
              price={cu.price}
              key={cu.id}
            />
          );
        })}
      </section>
      {/* Fin Card section */}

      {/* Pagination */}
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
  );
};

export default Home;
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
  "2023-11-29",
];
