import { useEffect, useState } from "react"
import CardsContainer from "../../components/CardContainer/CardsContainer"
import Hero from "../../components/Hero/Hero"
import SearchBar from "../../components/SearchBar/SearchBar"
import { filterByGenres, getGenres, orderByDate } from "../../redux/actions"
import { useDispatch, useSelector } from 'react-redux'


const Home = () => {


  const dispatch = useDispatch()
  
  const genres = useSelector(state => state.genres)
  const [order, setOrder] = useState(true)
  //const ciudades = useSelector(state => state.ciudades)
  
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])


  // useEffect(() => {
  // dispatch(getCiudades())
  //}, [dispatch])


  const handleFilterGenres = (event) => {
      dispatch(filterByGenres(event.target.value))
    }
  

  //const handleFiltroCiudades = (event) => {
  //   dispatch(filtroDeCiudadesEnActions(event.target.value))
  // }


  const [date, setDate] = useState({
    dates:'',
  })
  const handleInputChange = (event) => {
    const { value } = event.target;
    setDate ({
      
      dates: value,
    });
  }

  const handleOrderDate = (event) => {
    dispatch(orderByDate(event.target.value))
    order ? setOrder(false) : setOrder(true)
  }

  return (
    <div>
      <Hero />

      <SearchBar/>

      <select className="border-2 border-solid border-gray-500 rounded-lg "  onChange={event => handleFilterGenres(event)}  defaultValue='default' >
        <option value='default' disabled > Género musical </option>
        {
                genres?.map(gen => (
                    <option value={gen.name} key={gen.id}>{gen.name}</option>
                    
                    ))
                }
      </select>
    <select className="border-2 border-solid border-gray-500 rounded-lg " /* onChange={event => handleFiltroCiudades(event)} */ defaultValue='default'>
        <option value='default' disabled > Ciudades </option>
    </select>

      <select onChange={event => handleOrderDate(event)} defaultValue='default'>
                <option value = 'default' disabled>Orden de Eventos</option>
                <option value= 'desc'>Eventos más recientes</option>
                <option value='asc'>Eventos más lejanos</option>
      </select>
      <input type='date' value={date.dates} name='Fecha' onChange={event => handleInputChange(event)} /> 
      <CardsContainer />

    


      </div>
  )

}
export default Home

