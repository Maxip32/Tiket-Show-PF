/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser, getUserByEmail, getUserById } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; // Suponiendo que el ícono FcGoogle proviene de react-icons

const FormFirebase = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;
  const usuario = useSelector(state => state.users);
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
    dispatch(getUserById());
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
      return alert("Usuario existente");
    }

    try {
      await auth.register(emailRegister, passwordRegister, name);
      dispatch(createUser(userInfo));
      clearState(); // Limpiar el estado
      alert("Usuario registrado correctamente");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Registrarse</h2>
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
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none"
          >
            Registrarse
          </button>
        </form>
        <span className="m-4 text-sm text-secondaryColor"></span>
        <button
          onClick={handleGoogle}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none"
        >
          <FcGoogle /> Regístrate con Google
        </button>
        <section></section>
      </div>
    </div>
  );
};

export default FormFirebase;