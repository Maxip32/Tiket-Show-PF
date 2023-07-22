import { useEffect, useState } from "react";
//import CardsContainer from "../../components/CardContainer/CardsContainer";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  filterByGenres,
  getEvents,
  getGenres,
  orderByDate,
  orderByName
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import Paginate from "../../components/Paginate/Paginate";

const Home = () => {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.Events);
  const genres = useSelector((state) => state.genres);
  const [order, setOrder] = useState(true);
  //const ciudades = useSelector(state => state.ciudades)

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  // useEffect(() => {
  // dispatch(getCiudades())
  //}, [dispatch])

  const handleFilterGenres = (event) => {
    dispatch(filterByGenres(event.target.value));
  };

  //const handleFiltroCiudades = (event) => {
  //   dispatch(filtroDeCiudadesEnActions(event.target.value))
  // }

  const [date, setDate] = useState({
    dates: "",
  });
  const handleInputChange = (event) => {
    const { value } = event.target;
    setDate({
      dates: value,
    });
  };

  const handleOrderDate = (event) => {
    dispatch(orderByDate(event.target.value));
    order ? setOrder(false) : setOrder(true);
    setCurrentPage(1)
  };

  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value))
    order ? setOrder(false) : setOrder(true)
    setCurrentPage(1)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const indexOfLastEvents = currentPage * eventsPerPage;
  const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstEvents, indexOfLastEvents);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const returnToFirstPage = () => {
    setCurrentPage(1)
  }

  return (
    <div>
      <Hero />

      {/* //- Filter bar ---------> */}
      <section className='w-8/12 h-24 flex justify-evenly items-center mt-[-66px] z-10 bg-primaryColor/95 rounded-2xl'>
        {/* Filter by genres */}
        <div className='flex flex-col m-1 gap-2 text-LightText w-44'>
          <span className='font-extralight text-xs'>Géneros</span>
          <select
            className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700"
            onChange={(event) => handleFilterGenres(event)}
            defaultValue="default"
          >
            <option value="default" disabled>
              {" "}
              Género musical{" "}
            </option >
            {genres?.map((gen) => (
              <option value={gen.name} key={gen.id}>
                {gen.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by cities */}
        <div className='flex flex-col m-1 gap-2 text-LightText w-44'>
        <span className='font-extralight text-xs'>Ciudades</span>
          <select
            className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700"
            /* onChange={(event) => handleFiltroCiudades(event)} */
            defaultValue="default"
          >
            <option value="default" disabled>
              {" "}
              Ciudades{" "}
            </option>
          </select>
        </div>

        {/* Select by dates */}
        <div className='flex flex-col m-1 gap-2 text-LightText w-44'>
          <span className='font-extralight text-xs'>Fechas</span>
          <input
            className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700 text-LightText"
            type="date"
            value={date.dates}
            name="Fecha"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        </section>
      {/* //- Fin Filter bar ---------> */}

      <SearchBar returnToFirstPage={returnToFirstPage}/>

      {/* order by events */}
      <section className=" mt-20 relative mb-2 flex w-full flex-wrap justify-around m-w-xl ">
        <h1 className="text-6xl">Proximos Eventos</h1>
        <div className=" flex h-12 ">
          <select
            className="border-white rounded-2xl "
            onChange={(event) => handleOrderByName(event)}
            defaultValue="default"
          >
            <option value="default" disabled>
              Orden Alfabetico
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>x
          </select>

          <select
            className="border-white rounded-2xl"
            onChange={(event) => handleOrderDate(event)}
            defaultValue="default"
          >
            <option value="default" disabled>
              Orden de Eventos
            </option>
            <option value="asc">Eventos más recientes</option>
            <option value="desc">Eventos más lejanos</option>
          </select>
        </div>
      </section>

      <section className="  w-full max-w-7xl p-28 flex justify-center flex-wrap items-center gap-2 md:gap-4">
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
            />
          );
        })}
      </section>
      <section className="">
        <Paginate
          eventsPerPage={eventsPerPage}
          allEvents={allEvents.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default Home;
