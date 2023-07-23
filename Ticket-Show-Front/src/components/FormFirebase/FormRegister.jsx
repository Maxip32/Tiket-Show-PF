import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import registerPublic from "../../assets/image/registerPublic.jpg";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Registro con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Almacenar datos adicionales en Realtime Database
      await database.ref("users/" + user.uid).set({
        name: name,
        email: email,
      });

      alert("Usuario registrado correctamente");
      navigate("/login"); // Redireccionar al usuario al formulario de inicio de sesión
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Manejar el error aquí
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Almacenar datos adicionales en Realtime Database
      await database.ref("users/" + user.uid).set({
        name: user.displayName,
        email: user.email,
      });

      alert("Registro con Google exitoso!");
      navigate("/home"); // Redireccionar al usuario al formulario de inicio de sesión
    } catch (error) {
      console.error("Error al registrar con Google:", error);
      // Manejar el error aquí
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
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
              className="w-3/4 bg-primaryColor text-Color200 hover:bg-transparent hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
              transition duration-500 ease-in-out transform shadow-md rounded-xl"
            >
              Registrarse
            </button>
          </form>

          <span className="m-4 text-sm text-secondaryColor">
            ó
          </span>

          <button
            onClick={handleRegisterWithGoogle}
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
