/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser, getUserByEmail, getUserById } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; // Suponiendo que el ícono FcGoogle proviene de react-icons
import registerPublic from "../../assets/image/registerPublic.jpg";
import Swal from "sweetalert2";


const FormFirebase = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;
  const usuario = useSelector(state => state.user);
  const oneUserCreated = useSelector(state => state.user);

  const [nombreToDB, setNombreToDB] = useState("");
  const [emailToDB, setEmailToDB] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const validRegister = usuario?.filter(usr => usr.email === emailRegister);
  const [email, setEmail] = useState("");
  const [ name, setName] = useState("");
  const [password, setPassword] = useState("");
  //const validLogin = usuario?.filter(usr => usr.email === email);// NO DESCOMENTAR

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    verified: true,
    role: "customer"
  });

  useEffect(() => {
    setNombreToDB(user?.displayName);
    setEmailToDB(user?.email);
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      name: nombreToDB || prevUserInfo.name,
      email: emailToDB || emailRegister || prevUserInfo.email
    }));
    
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
      role: "customer"
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validRegister?.length > 0) {
      return (
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Usuario existente!',
          showConfirmButton: false,
          timer: 2500
        })
      )
    }

    try {
      await auth.register(emailRegister, passwordRegister, name);
      dispatch(createUser(userInfo));
      clearState(); // Limpiar el estado
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado correctamente!',
        showConfirmButton: false,
        timer: 2500
      })

      dispatch(getUserById());
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Manejar el error aquí
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      const respGoogle = await auth.loginWithGoogle();
      if (respGoogle.operationType === "signIn") {
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          name: respGoogle.user.displayName,
          email: respGoogle.user.email
        }));
        clearState(); // Limpiar el estado
        redirectLogin(respGoogle.user);
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
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

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado correctamente!',
        showConfirmButton: false,
        timer: 2500
      })

      if (oneUserCreated) {
        dispatch(getUserById());
        navigate("/"); // Redireccionar al usuario a la página de inicio
      }
    }
  };

  // const handleOnChange = (e) => {
  //   e.preventDefault();
  //   setUserInfo({
  //     ...userInfo,
  //     [e.target.name]: e.target.value,
  //     verified: true,
  //     role: "customer"
  //   });
  // };

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
          <input
            placeholder="Nombre completo"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />

          <input
            placeholder="Correo electrónico"
            type="email"
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
            className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
          />

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
            transition duration-500 ease-in-out transform shadow-md rounded-xl mb-4"
          >
            <FcGoogle/> Regístrate con Google
          </button>
        </section>
      </div>
    </div>
  );
};

export default FormFirebase;