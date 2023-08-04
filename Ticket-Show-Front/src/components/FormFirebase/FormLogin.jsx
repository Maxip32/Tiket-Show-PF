import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginForm from "../../assets/image/login.jpg"
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, loginWithGoogle, checkUserDisabled  } = useAuth(); // Asegúrate de que el contexto tenga las funciones de inicio de sesión
  const [ name, setName] = useState("");
  const navigate= useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!email || !password) {
      setError("Por favor, ingresa tu correo electrónico y contraseña.");
      
      return;
    }

    try {
      // Verificar si el usuario está deshabilitado en alguna de las tablas antes de permitir el inicio de sesión
      const userDisabled = await checkUserDisabled(email);
      if (userDisabled) {
        console.log("Usuario deshabilitado. No se permite el inicio de sesión.");
        setError("Usuario deshabilitado. No se permite el inicio de sesión.");
        // Mostrar SweetAlert con el mensaje de usuario deshabilitado
      Swal.fire({
        icon: "error",
        title: "Usuario deshabilitado",
        text: "No se permite el inicio de sesión.",
      });
        return;
      }

      // Si el usuario no está deshabilitado, intentar iniciar sesión con Firebase
      await login(email, password, name);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Bienvenido nuevamente!",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bienvenido nuevamente!',
        showConfirmButton: false,
        timer: 2500
      })
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="bg-white rounded-2xl shadow-lg flex w-3/4">
        {/* image section */}
        <section className="w-2/4">
          <img
            src={loginForm}
            alt="Register image"
            className="rounded-l-2xl object-cover h-full"
          />
        </section>

        <section className="p-6 flex flex-col justify-center items-center w-2/4 text-left">
          <div className="my-4 text-base text-Color1000 flex flex-col gap-3">
            <h2 className="text-4xl font-bold text-primaryColor text-left">
              Ingresa 
            </h2>
            <p className="text-base text-Color1000 text-center">
              para que no te pierdas de ningún evento.
            </p>
          </div>
          <form className="flex flex-col gap-6 w-full justify-center items-center" onSubmit={handleSignIn}>
            {/* <input
            placeholder="Nombre completo"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            /> */}

            <input
              placeholder="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <input
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />

            <button
              type="submit"
              className="w-3/4 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
              transition duration-500 ease-in-out transform shadow-md rounded-xl"
            >
              Ingresa
            </button>
          </form>
        
          <span className="m-4 text-sm text-secondaryColor">
            ó
          </span>

          <button
            onClick={handleSignInWithGoogle}
            type="submit"
            className="flex justify-center items-center gap-3 w-3/4 bg-Color200 text-primaryColor hover:bg-white hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-10 py-3.5 font-medium 
            transition duration-500 ease-in-out transform shadow-md rounded-xl mb-4"
          >
            <FcGoogle/> Inicia con Google
          </button>
        </section>
      </div>
    </div>
  );
};

export default LoginForm;