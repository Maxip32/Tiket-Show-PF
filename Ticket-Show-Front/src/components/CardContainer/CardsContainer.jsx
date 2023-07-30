import { useSelector } from "react-redux";
import Card from "../Card/Card";

const CardsContainer = () => {
  const Events = useSelector((state) => state.Events);
  console.log(Events);
  return (
    <div className=" mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 ">
      {Events.map((evento) => {
        return (
          <Card
            key={evento.id}
            id={evento.id}
            name={evento.name}
            image={evento.image}
            summary={evento.description}
            date={evento.date}
            genre={evento.genre}
            lugar={evento.address}
            city={evento.city}
            cost={evento.price}
          />
        );
      })}
    </div>
  );
};



export default CardsContainer;