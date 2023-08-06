import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { createArtist, updateUser, getUserByEmail, getUserById } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
//import { FcGoogle } from 'react-icons/fc';
import registerArtist from '../../assets/image/registerArtist1.jpg'
import Swal from "sweetalert2";
//import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ArtistForm = () => {
 const [imageFile, setImageFile] = useState(null);
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
    image:"",
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
      image: null,
    }));
    
  },[user?.displayName,
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


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  
    // Agregar la imagen al estado userInfo
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      image: file,
    }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (validRegister?.length > 0) {
      return alert("El artista ya Existe");
    }

    try {

      // Establecer la imagen predeterminada (puedes cambiar esta URL por la que desees)
      const defaultImageUrl = 'https://res.cloudinary.com/dhickjcbz/image/upload/v1690770100/user_r20d1h.png';
  
      // Asignar la URL de la imagen predeterminada al objeto userInfo
      const userInfoWithImage = {
        ...userInfo,
        image: defaultImageUrl,
      };

          await auth.register(emailRegister, passwordRegister, name);
          //console.log(userInfo, " esto necesito ahora")
          dispatch(createArtist(userInfoWithImage));
          clearState(); // Limpiar el estado
    
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Artista registrado correctamente!',
            showConfirmButton: false,
            timer: 2500
          })
      
      
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
    <div className="w-full flex justify-center items-center mt-2 max-w-4xl md:mx-auto">
      <div className="bg-white rounded-2xl shadow-lg flex w-full">
      {/* image section */}
      <section className="w-2/4">
        <img
          src={registerArtist}
          alt="Register image"
          className="rounded-l-2xl object-cover h-full"
        />
      </section>

      <section className="p-4 flex flex-col justify-center items-center w-2/4 text-left">
        <div className="my-4 text-base text-Color1000 flex flex-col gap-4">
          <h2 className="text-4xl font-bold text-primaryColor text-left">
            Regístrate
          </h2>
          <p className="text-base text-Color1000 text-left">
            Regístrate con nosotros, crea y promociona tus eventos.
          </p>
        </div>

        <form className="flex flex-col gap-6 w-full justify-center items-center" onSubmit={handleRegister}>
          <input
            placeholder='Nombre completo'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />

          <input
            placeholder='Correo electrónico'
            type="email"
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
            className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />

          <input
            placeholder='Contraseña'
            type="password"
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
            className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />

          <input
            placeholder='Nombre de la banda'
            name= "nameBand"
            type="text"
            value={nameBand}
            onChange= {(e)=> setNameBand(e.target.value)}
            className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />

          <input
            placeholder='Nombre de artista'
            type="text"
            value={nameArtist}
            onChange={(e) => setnameArtist(e.target.value)}
            className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />

          <input
            placeholder='Año de creación de tu banda'
            type="text"
            value={yearCreation}
            onChange={(e) => setyearCreation(e.target.value)}
            className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />
           {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
        /> */}

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

export default ArtistForm;