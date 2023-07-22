import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, database } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
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
      </div>
    </div>
  );
};

export default RegisterForm;
