//import { useEffect } from "react"
import SearchBar from "../../components/SearchBar/SearchBar"
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
  //   dispatch(filtrodegeneroenlasactions(event.target.value))
  // }
  
  //const handleFiltroCiudades = (event) => {
  //   dispatch(filtrodeciudadesenactions(event.target.value))
  // }
  
  return (
    <div>
      <SearchBar/>

      <select className="border-2 border-solid border-gray-500 rounded-lg " onChange={event => handleFiltroGeneros(event)} defaultValue='default' >
        <option value='default' disabled > Género musical </option>
      </select>
     
     <select className="border-2 border-solid border-gray-500 rounded-lg " onChange={event => handleFiltroCiudades(event)} defaultValue='default'>
        <option value='default' disabled > Ciudades </option>
     </select>

      </div>
  )
}

export default Home