import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'




const CardsContainer = () => {

const Events = useSelector(state => state.Events)
  return (
    <div className=' mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 '>
      {Events.map((evento) =>{
      
      return(
        <Card 
        key={evento.id}
        id={evento.id}
        name={evento.artistName}
        event={evento.eventName}
        image={evento.artisImage}
        summary={evento.eventDescription}
        date={evento.eventDate}
        diets={evento.diets}
        genre={evento.genre}
        location={evento.locationName}
        direccion={evento.eventLocation}
        phone={evento.locationPhone}
        email={evento.locationEmail}
        city={evento.eventCity}
        cost={evento.price}
          />
      )
    })}</div>
  )
}

export default CardsContainer