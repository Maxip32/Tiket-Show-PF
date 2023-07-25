import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase.config";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, loginWithGoogle } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await loginWithGoogle();
      console.log("Inicio de sesión con Google exitoso!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Ingresa tus datos</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSignIn}>
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
            Ingresar
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleSignInWithGoogle}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none"
          >
            Iniciar sesión con Google
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
