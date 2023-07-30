import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, loginWithGoogle } = useAuth(); // Asegúrate de que el contexto tenga las funciones de inicio de sesión
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
      // Iniciar sesión con Firebase usando los datos ingresados en el formulario Y GUARDAR EN LA DB
      await login(email, password, name);
      console.log("Bienvenido nuevamente!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
      console.log("Inicio de sesión con Google exitoso!");
      navigate("/");
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