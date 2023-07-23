import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, database } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import registerPublic from '../../assets/image/registerPublic.jpg'

const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Registro con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
        <section className='w-2/4'>
          <img 
            src={registerPublic} 
            alt="Register image" 
            className="rounded-l-2xl object-cover h-full"
          />
        </section>

        <section className="p-6 flex flex-col justify-center items-center w-2/4 text-left">
          <div className="my-4 text-base text-Color1000 flex flex-col gap-3" >
            <h2 className="text-4xl font-bold text-primaryColor text-left">Regístrate</h2>
            <p>Regístrate con nosotros y entérate de nuevos eventos.</p>
          </div>
          <form className="flex flex-col gap-6 w-full justify-center items-center" onSubmit={handleRegister}>
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
              className="w-3/4 rounded-lg border border-none px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <label>
              <span className="text-purple-600">Contraseña:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="mt-4">
            <button
              onClick={handleRegisterWithGoogle}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none"
            >
              Registrarse con Google
            </button>
          </div>

        </section>
      </div>
    </div>
  );
};

export default RegisterForm;
