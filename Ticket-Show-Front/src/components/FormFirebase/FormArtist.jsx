import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { createArtist, updateUser, getUserByEmail, getUserById } from '../../redux/actions';
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
  const [ nameBand, setNameBand] = useState("");
  const [ nameBandToDB, setNameBandToDB] = useState("");
  const [ nameArtist, setnameArtist] = useState("");
  const [ yearCreation, setyearCreation] = useState("");
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
    nameBand:"",
    nameArtist:"",
    yearCreation:"",
    verified: true,
    role: "artista"
  });

  useEffect(() => {
    setNombreToDB(user?.displayName);
    setEmailToDB(user?.email);
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      name: nombreToDB || prevUserInfo.name,
      email: emailToDB || emailRegister || prevUserInfo.email,
      nameBand: nameBand ||prevUserInfo.nameBand,
      nameArtist: nameArtist || prevUserInfo.nameArtist,
      yearCreation: yearCreation || prevUserInfo.yearCreation,
    }));
    
  }, [user?.displayName,
     user?.email,
     nameBand,
     nameArtist,
     yearCreation,
     emailToDB,
     nombreToDB,
     nameBandToDB,
     emailRegister,
     dispatch]);

  const clearState = () => {
    setNombreToDB("");
    setEmailToDB("");
    setEmailRegister("");
    setPasswordRegister("");
    setEmail("");
    setPassword("");
    setNameBand(""),
    setnameArtist(""),
    setyearCreation(""),
    setUserInfo({
      name: "",
      nameBand: "",
      nameArtist:"",
      yearCreation:"",
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
      console.log(userInfo, " esto necesito ahora")
      dispatch(createArtist(userInfo));
      clearState(); // Limpiar el estado
      alert("Artista registrado correctamente Bienvenido");
      dispatch(getUserById());
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } catch (error) {
      console.error(" Error al registrar Ya existe el Artista:", error);
      // Manejar el error aquí
    }
  };
// console.log(userInfo, " informacion q quiero ver")
//   console.log(bandName, " informacion de nombre de banda")


    
  
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
              name= "nameBand"
              type="text"
              value={nameBand}
              onChange= {(e)=> setNameBand(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <label>
            <span className="text-purple-600">Nombre de artista:</span>
            <input
              type="text"
              value={nameArtist}
              onChange={(e) => setnameArtist(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <label>
            <span className="text-purple-600">Año de creación de tu banda:</span>
            <input
              type="text"
              value={yearCreation}
              onChange={(e) => setyearCreation(e.target.value)}
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
