/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  createArtist,
  updateUser,
  getUserByEmail,
  getUserById,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Suponiendo que el ícono FcGoogle proviene de react-icons
import registerPublic from "../../assets/image/registerPublic.jpg";

const CreateEvent = () => {
  const [eventInfo, setEventInfo] = useState({
    name: "",
    description: "",
    date: "",
    start: "",
    end: "",
    price: "",
    quotas: "",
    image: "",
    address: "",
    city: "",
    genre: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    date: "",
    start: "",
    end: "",
    price: "",
    quotas: "",
    image: "",
    address: "",
    city: "",
    genre: "",
  });

  const handleChange = (e) => {
    setEventInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    event.preventDefault();
  };
console.log(eventInfo)
  return (
    <div className="w-full flex justify-center items-center mt-2">
      <div className="bg-white rounded-2xl shadow-lg flex w-4/6">
        {/* image section */}
        <section className="w-2/4">
          <img
            src={registerPublic}
            alt="Register image"
            className="rounded-l-2xl object-cover h-full"
          />
        </section>

        <section className="p-2 flex flex-col justify-center items-center w-2/4 text-left">
          <div className="my-4 text-base text-Color1000 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-primaryColor text-left">
              Regístra tu Evento
            </h2>
            <p className="text-base text-Color1000 text-left">
              Deja los detalles de tu evento y publicalo en el Inicio.
            </p>
          </div>

          <form
            className="flex flex-col gap-4 w-full justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Nombre Evento"
              type="text"
              value={eventInfo.name}
              onChange={handleChange}
              name={"name"}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Descripcion del evento"
              onChange={handleChange}
              type="text"
              value={eventInfo.description}
              name={"description"}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Fecha del Evento"
              type="date"
              value={eventInfo.date}
              name={"date"}
              onChange={handleChange}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Horario de Inicio"
              onChange={handleChange}
              name={"start"}
              type="time"
              value={eventInfo.start}
              //onChange= {(e)=> setNameBand(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Horario de Finalizacion"
              onChange={handleChange}
              type="time"
              value={eventInfo.end}
              name={"end"}
              // onChange={(e) => setnameArtist(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Precio por Entrada"
              onChange={handleChange}
              type="text"
              value={eventInfo.price}
              name={"price"}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Stock de Entradas"
              onChange={handleChange}
              type="text"
              value={eventInfo.stock}
              name={"stock"}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Imagen Evento"
              onChange={handleChange}
              type="text"
              value={eventInfo.image}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Direccion de Lugar"
              onChange={handleChange}
              type="text"
              value={eventInfo.address}
              name={"address"}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Ciudad"
              onChange={handleChange}
              type="text"
              value={eventInfo.city}
              name={"city"}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Genero"
              onChange={handleChange}
              type="text"
              value={eventInfo.genre}
              name={"genre"}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <button
              type="submit"
              className="w-3/4 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
          transition duration-500 ease-in-out transform shadow-md rounded-xl mb-4"
            >
              Regístrate
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CreateEvent;
