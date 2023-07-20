//import { useEffect } from "react"

import CardsContainer from "../../components/CardContainer/CardsContainer";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
//import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  //const dispatch = useDispatch()
  //const generos = useSelector(state => state.generos)
  //const ciudades = useSelector(state => state.ciudades)

  // useEffect(() => {
  //   dispatch(getGeneros())
  // }, [dispatch])

  // useEffect(() => {
  // dispatch(getCiudades())
  //}, [dispatch])

  // const handleFiltroGeneros = (event) => {
  //   dispatch(filtroDeCiudadesEnActions(event.target.value))
  // }

  //const handleFiltroCiudades = (event) => {
  //   dispatch(filtroDeCiudadesEnActions(event.target.value))
  // }

  return (
    <div>
      <Hero />
      <SearchBar />
        <div className="flex  justify-center space-x-9 "> 
        <label for="underline_select" class="sr-only">Underline select</label>
      <select
        className="block py-2.5 px-0 w-44 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer "
        /* onChange={event => handleFiltroGeneros(event)} */ defaultValue="default"
      >
        <option value="default" disabled>
          {" "}
          Género musical{" "}
        </option>
      </select>
      <select
        className="block py-2.5 px-0 w-44 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer "
        /* onChange={event => handleFiltroCiudades(event)} */ defaultValue="default"
      >
        <option value="default" disabled>
          {" "}
          Ciudades{" "}
        </option>
      </select>
      </div>
      <CardsContainer />
    </div>
  );
};

export default Home;
