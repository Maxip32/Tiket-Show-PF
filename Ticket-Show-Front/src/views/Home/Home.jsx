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

const Home = () => {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.Events);
  const genres = useSelector((state) => state.genres);
  const [order, setOrder] = useState(true);
  const dates = useSelector((state) => state.date)
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

  const [date, setDate] = useState({
    dates: "",
  });
  const handleInputChange = (event) => {
    const { value } = event.target;
    console.log("Fecha seleccionada:", value);
    dispatch(FilterByDate(event.target.value));
    setDate({
      dates: value,
    });
    setCurrentPage(1)
  };

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
          <input
            className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700 text-LightText"
            type="date"
            value={date.dates} min="2023-08-01" max="2023-10-28" 
            name="Fecha"
            onChange={(event) => handleInputChange(event)}
          />
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
  );
};

export default Home;
