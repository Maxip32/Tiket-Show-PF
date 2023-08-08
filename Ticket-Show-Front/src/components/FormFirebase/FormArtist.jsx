import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { createArtist, updateUser, getUserByEmail, getUserById } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
//import { FcGoogle } from 'react-icons/fc';
import registerArtist from '../../assets/image/registerArtist1.jpg'
import Swal from "sweetalert2";
//import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const validate = (form) =>{
  let errors = {}
  if (!form.name) {
    errors.name = 'Debes colocar tu nombre'
  } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
    errors.name = 'El nombre solo puede tener letras y espacios';
  }
  if (!form.emailRegister) {
    errors.emailRegister = 'Debes colocar un email'
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(form.emailRegister)) {
    errors.emailRegister = 'Debes colocar un email valido';
  }
  if (!form.passwordRegister) {
    errors.passwordRegister = 'Debes colocar una contraseña'
  } else if (!/^(?=.*\d)(?=.*[a-zA-Z])(.{7,})$/.test(form.passwordRegister)) {
    errors.passwordRegister = 'Debe tener un Numero, una letra y ser mayor de 6 caracteres';
  }
  if (!form.nameBand) {
    errors.nameBand = 'Debes colocar el nombre de tu banda'
  } else if (!/^[a-zA-Z\s]+$/.test(form.nameBand)) {
    errors.nameBand = 'El nombre solo puede tener letras y espacios';
  }
  if (!form.nameArtist) {
    errors.nameArtist = 'Debes colocar tu nombre de artista'
  } else if (!/^[a-zA-Z\s]+$/.test(form.nameArtist)) {
    errors.nameArtist = 'El nombre solo puede tener letras y espacios';
  }
  if (!form.yearCreation) {
    errors.yearCreation = 'Debes colocar tu nombre de artista'
  }
  return errors;
}

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
  const [ nameBandToDB, setNameBandToDB] = useState("");
  
  
  
  const validRegister = usuario?.filter(usr => usr.email === emailRegister);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validLogin = usuario?.filter(usr => usr.email === email);
  
  //-Nuevo
  const [form, setForm] = useState({
    name: '',
    emailRegister: '',
    passwordRegister: '',
    nameBand: '',
    nameArtist: '',
    yearCreation: '',
  });
  const [errors, setErrors] = useState({
    name: true,
    emailRegister: true,
    passwordRegister: true,
    nameBand: true,
    nameArtist: true,
    yearCreation: true,
  });

  const handlerInputChange= (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...form, 
      [e.target.name]: e.target.value,
    }))
  }

  /* const [ name, setName] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [ nameBand, setNameBand] = useState("");
  const [ nameArtist, setnameArtist] = useState("");
  const [ yearCreation, setyearCreation] = useState(""); */

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
      email: emailToDB || form.emailRegister || prevUserInfo.email,
      nameBand: form.nameBand ||prevUserInfo.nameBand,
      nameArtist: form.nameArtist || prevUserInfo.nameArtist,
      yearCreation: form.yearCreation || prevUserInfo.yearCreation,
      image: null,
    }));
    
  },[user?.displayName,
      user?.email,
      form.nameBand,
      form.nameArtist,
      form.yearCreation,
      emailToDB,
      nombreToDB,
      nameBandToDB,
      form.emailRegister,
      dispatch]);

  const clearState = () => {
    setNombreToDB("");
    setEmailToDB("");
    setForm.emailRegister("");
    setForm.passwordRegister("");
    setEmail("");
    setPassword("");
    setForm.nameBand(""),
    setForm.nameArtist(""),
    setForm.yearCreation(""),
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

          await auth.register(form.emailRegister, form.passwordRegister, name);
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
// console.log(userInfo, " información q quiero ver")
//   console.log(bandName, " información de nombre de banda")


  return (
    <div className="w-full flex justify-center items-center mt-2 max-w-4xl md:mx-auto md:mb-6">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col-reverse md:flex-row w-full justify-center mx-10 md:mx-0">
      {/* image section */}
      <section className="w-2/4">
        <img
          src={registerArtist}
          alt="Register image"
          className="rounded-l-2xl hidden md:flex md:object-cover h-full"
        />
      </section>

      <section className="p-4 flex flex-col justify-center items-center w-full md:w-2/4 text-left">
        <div className="my-4 text-base text-Color1000 flex flex-col gap-4">
          <h2 className="text-4xl font-bold text-primaryColor text-left">
            Regístrate
          </h2>
          <p className="text-base text-Color1000 text-left">
            Regístrate con nosotros, crea y promociona tus eventos.
          </p>
        </div>

        <form className="flex flex-col gap-6 w-full justify-center items-center px-3" onSubmit={handleRegister}>
          <section className="w-full">
            <input
              placeholder='Nombre completo'
              type="text"
              name='name'
              onChange={handlerInputChange}
              value={form.name}
              className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            { errors.name && (<p className='text-xs text-red-500'>{errors.name}</p>) }
          </section>

          <section className="w-full">
            <input
              placeholder='Correo electrónico'
              type="email"
              name='emailRegister'
              value={form.emailRegister}
              onChange={handlerInputChange}
              className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            { errors.emailRegister && (<p className='text-xs text-red-500'>{errors.emailRegister}</p>) }
          </section>

          <section className="w-full">
            <input
              placeholder='Contraseña'
              type="password"
              name='passwordRegister'
              onChange={handlerInputChange}
              value={form.passwordRegister}
              className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            { errors.passwordRegister && (<p className='text-xs text-red-500'>{errors.passwordRegister}</p>) }
          </section>

          <section className="w-full">
          <input
            placeholder='Nombre de la banda'
            type="text"
            name='nameBand'
            onChange= {handlerInputChange}
            value={form.nameBand}
            className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />
          { errors.nameBand && (<p className='text-xs text-red-500'>{errors.nameBand}</p>) }
          </section>

          <section className="w-full">
            <input
              placeholder='Nombre de artista'
              type="text"
              name='nameArtist'
              onChange={handlerInputChange}
              value={form.nameArtist}
              className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            { errors.nameArtist && (<p className='text-xs text-red-500'>{errors.nameArtist}</p>) }
          </section>

          <section className="w-full">
            <input
              placeholder='Año de creación de tu banda'
              type="text"
              name='yearCreation'
              onChange={handlerInputChange}
              value={form.yearCreation}
              className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            { errors.yearCreation && (<p className='text-xs text-red-500'>{errors.yearCreation}</p>) }
          </section>

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