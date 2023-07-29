import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import MyShopping from "./Shoppinguser"
export default function UserProfile() {
  const { user, updateUserDisplayName } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState("");
  const [error, setError] = useState(null);

  const handleChangeName = () => {
    setError(null);
    if (newDisplayName.trim() === "") {
      setError("El nombre no puede estar vacío.");
      return;
    }

    if (!user) {
      setError("Usuario no autenticado.");
      return;
    }

    updateProfile(user, { displayName: newDisplayName })
      .then(() => {
        console.log("Nombre actualizado exitosamente.");
        updateUserDisplayName(newDisplayName);
      })
      .catch((error) => {
        console.error("Error al actualizar el nombre:", error);
        setError("Error al actualizar el nombre.");
      });
  };

  if (!user) {
    // Si el usuario no está autenticado, mostrar un mensaje o redireccionar a la página de inicio de sesión.
    return <p>Usuario no autenticado</p>;
  }
  return (
    <div className="container min-w-full min-h-screen w-full bg-gray-400 flex flex-col p-12 gap-10 text-customGray justify-center items-center">
      <div className="flex justify-center gap-10 w-full border-b-2 pb-4">
        <p className="text-3xl uppercase font-bold">Mis Datos</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-5/6 p-8 bg-customGray rounded-3xl text-white flex flex-col justify-center items-center gap-8">
          <div className="flex border-2 bg-gray-400 w-52 h-52 items-center justify-center rounded-full overflow-hidden">
            <img
              src={
                user.photoURL ||
                "https://res.cloudinary.com/ds41xxspf/image/upload/v1669140075/Donde-Suena-Assets/user_snefch.png"
              }
              className="object-cover h-full w-full"
              alt=""
            />
          </div>
          <h4 className="text-3xl font-bold uppercase italic border-2 rounded-3xl px-4 w-fit">
            {user.displayName}
          </h4>
          <div className="flex-col">
            <div className="flex items-center justify-start px-8 gap-8">
              <p className="text-2xl font-semibold w-fit">Email:</p>
              <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
                {user.email}
              </p>
            </div>
          </div>

          {/* Sección para cambiar el nombre */}
          <div className="flex-col">
        <div className="flex items-center justify-start px-8 gap-8">
          <p className="text-2xl font-semibold w-fit">
            Cambiar Nombre:
          </p>
          {user?.displayName ? (
            <>
              <input
                type="text"
                className="text-xl  rounded-3xl text-black px-6"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
              <button
                onClick={handleChangeName}
                className="text-lg text-white italic font-semibold bg-customRed px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-700 ease-in-out"
              >
                Guardar
              </button>
            </>
          ) : (
            <p>Cargando...</p>
          )}
          {error && (
            <p className="text-red-600 text-base">Error: {error}</p>
          )}
        </div>
          </div>
        </div>
      </div>

      {/* Aquí mantenemos la sección de "Mis Compras" */}
      <div className="bg-customGray">
        <ul className="flex items-center justify-center bg-white">
          <li
            id="select-tab"
            className="p-2  w-full font-bold cursor-pointer bg-customRed hover:bg-red-300"
          >
            Mis Compras 🛒
          </li>
        </ul>
        <section
          id="select-content"
          className="container min-h-0 bg-customGray p-3 text-4xl flex items-center justify-center"
        >
          {/* Aquí coloca el contenido del componente MyShopping */}
          {(<MyShopping user_id ={user}/>)}
        </section>
      </div>
    </div>
  );
}
