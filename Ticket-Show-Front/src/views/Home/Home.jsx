
import { useEffect, useState } from "react";
import CardsContainer from "../../components/CardContainer/CardsContainer";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import { filterByGenres, getEvents, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import Paginate from "../../components/Paginate/Paginate";
const Home = () => {
  const dispatch = useDispatch();
  const allevents = useSelector(state => state.Events)
  const genres = useSelector((state) => state.genres);
  const [order, setOrder] = useState(true);
  //const ciudades = useSelector(state => state.ciudades)

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])
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
  };

  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(10)
  const indexOfLastevents = currentPage * eventsPerPage
  const indexOfFirstevents = indexOfLastevents - eventsPerPage
  const currentEvents = allevents.slice(indexOfFirstevents, indexOfLastevents)
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <Hero />

      <SearchBar />

      <select
        className="border-2 border-solid border-gray-500 rounded-lg "
        onChange={(event) => handleFilterGenres(event)}
        defaultValue="default"

      >
        <option value="default" disabled>
          {" "}
          Género musical{" "}
        </option>
        {genres?.map((gen) => (
          <option value={gen.name} key={gen.id}>
            {gen.name}
          </option>
        ))}
      </select>
      <select
        className="border-2 border-solid border-gray-500 rounded-lg "
         onChange={event => handleFiltroCiudades(event)}  defaultValue="default"
      >
        <option value="default" disabled>
          {" "}
          Ciudades{" "}
        </option>
      </select>

      <select
        onChange={(event) => handleOrderDate(event)}
        defaultValue="default"
      >
        <option value="default" disabled>
          Orden de Eventos
        </option>
        <option value="desc">Eventos más recientes</option>
        <option value="asc">Eventos más lejanos</option>
      </select>
      <input
        type="date"
        value={date.dates}
        name="Fecha"
        onChange={(event) => handleInputChange(event)}
      />
      <Paginate 
      eventsPerPage={eventsPerPage}
      allevents= {allevents.length}
      paginate={paginate}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      />

    {currentEvents?.map((cu) =>{

      return (

        <Card id={cu.id} name={cu.name} image={cu.image} genres={cu.genre} date={cu.date} location={cu.location} key={cu.id}/>
      )
    })}


    </div>
  );
};

export default Home;
