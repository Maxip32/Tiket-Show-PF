import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, createUser } from '../../redux/actions';
import { useAuth } from "../../context/AuthContext";
/* import { auth, database } from "../../firebase/firebase.config"; */
/* import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"; */

import registerPublic from "../../assets/image/registerPublic.jpg";
import { FcGoogle } from "react-icons/fc";
//import { useFormik } from "formik";
//import * as Yup from 'yup';
import Swal from "sweetalert2";

/* const schema = Yup.object().shape({
  //aca se definen los nombre de nuestros inputs
  name: Yup.string()
    .min(2, 'El nombre debe tener Mínimo 2 caracteres')
    .max(30, 'El nombre debe tener Máximo 30 caracteres')
    .required('Debes completar tu nombre'),
  email: Yup.string()
    .email('Correo invalido')
    .required('Debes colocar tu email'),
  password: Yup.string()
    .min(6, 'Debe tener al menos 6 caracteres')
    .max(10, 'Debe tener máximo 10 caracteres')
    .required('Es necesario crear una contraseña'),
}) */

const RegisterForm = () => {

  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;
  const usuario = useSelector(state => state.users);
  const oneUserCreated = useSelector(state => state.user);

  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  
  const validRegister = usuario?.filter(usr => usr.email === emailRegister);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    verified: true,
    role: "customer"
  });

  useEffect(() => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      name: user?.displayName || prevUserInfo.name,
      email: user?.email || emailRegister || prevUserInfo.email
    }));
    dispatch(getUserById());
  }, [user?.displayName, user?.email, emailRegister, dispatch]);

  const clearState = () => {
    setEmailRegister("");
    setPasswordRegister("");
    setUserInfo({
      name: "",
      email: "",
      password: "",
      address: "",
      verified: true,
      role: "customer"
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validRegister?.length > 0) {
      return alert("Usuario existente");
    }

    try {
      await auth.register(emailRegister, passwordRegister);
      dispatch(createUser(userInfo));
      clearState(); // Limpiar el estado
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado correctamente!',
        showConfirmButton: false,
        timer: 2500
      })
      //alert("Usuario registrado correctamente");
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Manejar el error aquí
    }
  };

  const redirectLogin = (userGoogle) => {
    const matchGoogleEmail = usuario?.find(usr => usr.email === userGoogle.email);
    if (matchGoogleEmail?.email) {
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } else {
      dispatch(createUser({
        ...userInfo,
        name: userGoogle.displayName,
        email: userGoogle.email
      }));
      if (oneUserCreated) {
        dispatch(getUserById());
        navigate("/"); // Redireccionar al usuario a la página de inicio
      }
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.loginWithGoogle();
      const user = userCredential.user;
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        name: user.displayName,
        email: user.email
      }));
      setUserInfo.name(''); // Limpiar el estado
      redirectLogin(user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Manejar el error aquí
    }
  };


  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="bg-white rounded-2xl shadow-lg flex w-3/4">
        {/* image section */}
        <section className="w-2/4">
          <img
            src={registerPublic}
            alt="Register image"
            className="rounded-l-2xl object-cover h-full"
          />
        </section>

        <section className="p-6 flex flex-col justify-center items-center w-2/4 text-left">
          <div className="my-4 text-base text-Color1000 flex flex-col gap-3">
            <h2 className="text-4xl font-bold text-primaryColor text-left">
              Regístrate
            </h2>
            <p className="text-base text-Color1000 text-left">
              Regístrate con nosotros y entérate de nuevos eventos.
            </p>
          </div>

          <form
            className="flex flex-col gap-6 w-full justify-center items-center"
            onSubmit={handleRegister}
          >
            {/* { errors.name && <span className='text-red-600 text-xs mb-[-20px] '>{errors.name}</span> } */}
            <input
              placeholder="Nombre completo"
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />

            {/* { errors.email && <span className='text-red-600 text-xs mb-[-20px] '>{errors.email}</span> } */}
            <input
              placeholder="Correo electrónico"
              type="email"
              value={emailRegister}
              onChange={(e) => setEmailRegister(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />

            {/* { errors.password && <span className='text-red-600 text-xs mb-[-20px] '>{errors.password}</span> } */}
            <input
              placeholder="Contraseña"
              type="password"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <button
              type="submit"
              className="w-3/4 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
              transition duration-500 ease-in-out transform shadow-md rounded-xl"
            >
              Registrarse
            </button>
          </form>

          <span className="m-4 text-sm text-secondaryColor">
            ó
          </span>

          <button
            onClick={handleGoogle}
            type="submit"
            className="flex justify-center items-center gap-3 w-3/4 bg-Color200 text-primaryColor hover:bg-white hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-10 py-3.5 font-medium 
            transition duration-500 ease-in-out transform shadow-md rounded-xl"
          >
            <FcGoogle/> Regístrate con Google
          </button>
        </section>
      </div>
    </div>
  );
};

export default RegisterForm;
