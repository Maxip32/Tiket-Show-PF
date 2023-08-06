/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { editEvent, getUserById } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Suponiendo que el ícono FcGoogle proviene de react-icons
import registerPublic from "../../assets/image/registerPublic.jpg";
import { useParams } from 'react-router-dom';

const EditEvent = ({ selectedEvent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eventId } = useParams(); // Obtener el ID del evento de la URL
  const events = useSelector((state) => state.Events);
  const [eventData, setEventData] = useState(null);
  const [formData, setFormData] = useState(selectedEvent);


  useEffect(() => {
    // Aquí puedes buscar los datos del evento con el ID en la lista de eventos
    // y guardarlos en el estado local 'eventData'
    const event = events.find((event) => event.id === eventId);
    setEventData(event);
  }, [eventId, events]);
  // Si selectedEvent tiene datos, utiliza esos datos para el estado inicial de eventInfo.
  const [eventInfo, setEventInfo] = useState(
    selectedEvent || {
      id: eventId,
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
      genres: "",
    }
  );

  // Resto del código sin cambios...

  const handleChange = (e) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(eventInfo, "IFNROMACION DEL EVNETO POR PROPS");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEventInfo = {
      id: eventId,
      ...eventData,
    };
    console.log(updatedEventInfo, " INFORMACION DEL EVENTO")
    dispatch(editEvent(updatedEventInfo));
    dispatch(getUserById());
  };
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
              Edita el Evento
            </h2>
            <p className="text-base text-Color1000 text-left">
              modifica los detalles del evento y publicalo en el Inicio.
            </p>
          </div>

          <form
            className="flex flex-col gap-4 w-full justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div>
    <label>Nombre del evento:</label>
    <input
      type="text"
      name="name"
      value={eventData?.name}
      onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Descripción:</label>
    <textarea
      name="description"
      value={eventData?.description}
      onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Fecha:</label>
    <input
      type="text"
      name="date"
      value={eventData?.date}
      onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Horario de Inicio:</label>
    <input
      type="time"
      name="start"
      value={eventData?.start}
      onChange={(e) => setEventData({ ...eventData, start: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Horario de Finalización:</label>
    <input
      type="time"
      name="end"
      value={eventData?.end}
      onChange={(e) => setEventData({ ...eventData, end: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Precio por Entrada:</label>
    <input
      type="text"
      name="price"
      value={eventData?.price}
      onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Stock de Entradas:</label>
    <input
      type="text"
      name="quotas"
      value={eventData?.quotas}
      onChange={(e) => setEventData({ ...eventData, quotas: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Imagen Evento:</label>
    <input
      type="text"
      name="image"
      value={eventData?.image}
      onChange={(e) => setEventData({ ...eventData, image: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Direccion de Lugar:</label>
    <input
      type="text"
      name="address"
      value={eventData?.address}
      onChange={(e) => setEventData({ ...eventData, address: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Ciudad:</label>
    <input
      type="text"
      name="city"
      value={eventData?.city}
      onChange={(e) => setEventData({ ...eventData, city: e.target.value })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>

  <div>
    <label>Género musical:</label>
    <input
      type="text"
      name="genres"
      value={eventData?.genres ? eventData.genres.join(", "): "null"}
      onChange={(e) => setEventData({ ...eventData, genres: e.target.value.split(", ") })}
      className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
    />
  </div>


            <button
              type="submit"
              className="w-3/4 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor 
              border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
          transition duration-500 ease-in-out transform shadow-md rounded-xl mb-4"
            >
              Aceptar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditEvent;