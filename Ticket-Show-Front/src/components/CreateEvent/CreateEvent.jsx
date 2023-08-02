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
  //   const auth = useAuth();
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const user = auth.user;
  //   const usuario = useSelector((state) => state.users);
  //   const oneUserCreated = useSelector((state) => state.user);

  //   const [nombreToDB, setNombreToDB] = useState("");
  //   const [emailToDB, setEmailToDB] = useState("");
  //   const [emailRegister, setEmailRegister] = useState("");
  //   const [ nameBand, setNameBand] = useState("");
  //   const [ nameBandToDB, setNameBandToDB] = useState("");
  //   const [ nameArtist, setnameArtist] = useState("");
  //   const [ yearCreation, setyearCreation] = useState("");
  //   const [ name, setName] = useState("");
  //   const [passwordRegister, setPasswordRegister] = useState("");
  //   const validRegister = usuario?.filter(usr => usr.email === emailRegister);
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const validLogin = usuario?.filter(usr => usr.email === email);
  /// INFO DEL ESTADO ///
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

  //   useEffect(() => {
  //     setNombreToDB(user?.displayName);
  //     setEmailToDB(user?.email);
  //     setUserInfo(prevUserInfo => ({
  //       ...prevUserInfo,
  //       name: nombreToDB || prevUserInfo.name,
  //       email: emailToDB || emailRegister || prevUserInfo.email,
  //       nameBand: nameBand ||prevUserInfo.nameBand,
  //       nameArtist: nameArtist || prevUserInfo.nameArtist,
  //       yearCreation: yearCreation || prevUserInfo.yearCreation,
  //     }));

  //   }, [user?.displayName,
  //      user?.email,
  //      nameBand,
  //      nameArtist,
  //      yearCreation,
  //      emailToDB,
  //      nombreToDB,
  //      nameBandToDB,
  //      emailRegister,
  //      dispatch]);

  //   const clearState = () => {
  //     setNombreToDB("");
  //     setEmailToDB("");
  //     setEmailRegister("");
  //     setPasswordRegister("");
  //     setEmail("");
  //     setPassword("");
  //     setNameBand(""),
  //     setnameArtist(""),
  //     setyearCreation(""),
  //     setUserInfo({
  //       name: "",
  //       nameBand: "",
  //       nameArtist:"",
  //       yearCreation:"",
  //       email: "",
  //       password: "",
  //       address: "",
  //       verified: true,
  //       role: "artista"
  //     });
  //   };

  //   const handleRegister = async (e) => {
  //     e.preventDefault();
  //     if (validRegister?.length > 0) {
  //       return alert("El artista ya Existe");
  //     }

  //     try {
  //       await auth.register(emailRegister, passwordRegister, name);
  //       console.log(userInfo, " esto necesito ahora")
  //       dispatch(createArtist(userInfo));
  //       clearState(); // Limpiar el estado
  //       alert("Artista registrado correctamente Bienvenido");
  //       dispatch(getUserById());
  //       navigate("/"); // Redireccionar al usuario a la página de inicio
  //     } catch (error) {
  //       console.error(" Error al registrar Ya existe el Artista:", error);
  //       // Manejar el error aquí
  //     }
  //   };
  // // console.log(userInfo, " informacion q quiero ver")
  // //   console.log(bandName, " informacion de nombre de banda")

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
            onSubmit={"handleRegister"}
          >
            <input
              placeholder="Nombre Evento"
              type="text"
              value={""}
              //onChange={(e) => setName(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Descripcion del evento"
              type="text"
              value={""}
              //  onChange={(e) => setEmailRegister(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Fecha del Evento"
              type="date"
              value={""}
              // onChange={(e) => setPasswordRegister(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Horario de Inicio"
              name="nameBand"
              type="time"
              value={""}
              //onChange= {(e)=> setNameBand(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Horario de Finalizacion"
              type="time"
              value={""}
              // onChange={(e) => setnameArtist(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Precio por Entrada"
              type="text"
              value={""}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Stock de Entradas"
              type="text"
              value={""}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Imagen Evento"
              type="text"
              value={""}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Direccion de Lugar"
              type="text"
              value={""}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Ciudad"
              type="text"
              value={""}
              //onChange={(e) => setyearCreation(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <input
              placeholder="Genero"
              type="text"
              value={""}
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

/* import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { createArtist, updateUser, getUserByEmail, getArtistById } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; // Suponiendo que el ícono FcGoogle proviene de react-icons

const ArtistForm = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;
  const usuario = useSelector(state => state.users);
  const oneUserCreated = useSelector(state => state.user);


  const [nombreToDB, setNombreToDB] = useState("");
  const [emailToDB, setEmailToDB] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [ bandName, setBandName] = useState("");
  const [ artistName, setArtistName] = useState("");
  const [ creationYear, setCreationYear] = useState("");
  const [ name, setName] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const validRegister = usuario?.filter(usr => usr.email === emailRegister);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validLogin = usuario?.filter(usr => usr.email === email);
/// INFO DEL ESTADO ///
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    bandName:"",
    artistName:"",
    creationYear:"",
    verified: true,
    role: "artista"
  });

  useEffect(() => {
    setNombreToDB(user?.displayName);
    setEmailToDB(user?.email);
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      name: nombreToDB || prevUserInfo.name,
      email: emailToDB || emailRegister || prevUserInfo.email
    }));
    dispatch(getArtistById());
  }, [user?.displayName, user?.email, emailToDB, nombreToDB, emailRegister, dispatch]);

  const clearState = () => {
    setNombreToDB("");
    setEmailToDB("");
    setEmailRegister("");
    setPasswordRegister("");
    setEmail("");
    setPassword("");
    setUserInfo({
      name: "",
      email: "",
      password: "",
      address: "",
      verified: true,
      role: "artista"
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validRegister?.length > 0) {
      return alert("El artista ya Existe");
    }

    try {
      await auth.register(emailRegister, passwordRegister, name);
      dispatch(createArtist(userInfo));
      clearState(); // Limpiar el estado
      alert("Artista registrado correctamente Bienvenido");
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } catch (error) {
      console.error("Error al registrar el Artista:", error);
      // Manejar el error aquí
    }
  };

  


    
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Registrarse como Artista</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
          <label>
            <span className="text-purple-600">Nombre completo:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <label>
            <span className="text-purple-600">Correo electrónico:</span>
            <input
              type="email"
              value={emailRegister}
              onChange={(e) => setEmailRegister(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <label>
            <span className="text-purple-600">Contraseña:</span>
            <input
              type="password"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <label>
            <span className="text-purple-600">Nombre de la banda:</span>
            <input
              type="text"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <label>
            <span className="text-purple-600">Nombre de artista:</span>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <label>
            <span className="text-purple-600">Año de creación de tu banda:</span>
            <input
              type="text"
              value={creationYear}
              onChange={(e) => setCreationYear(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none"
          >
            Registrarse Ahora!!
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArtistForm;
 */
