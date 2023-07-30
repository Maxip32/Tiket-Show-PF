import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";

import MyShopping from "./Shoppinguser"
import { useSelector } from "react-redux";


export default function UserProfile() {
  const { user, updateUserDisplayName } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState("");
  const [error, setError] = useState(null);
  const datosbanda= useSelector((state)=> state?.user)
  const datosartist= datosbanda?.find(date => date.email === user?.email)
  //const RolesUsers= useSelector((state)=> state?.user)
  //const Roles= RolesUsers.length > 0 ? RolesUsers.find(rol => rol.email === user?.email):
  //null;
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
    <>
      <section className="flex block mt-20 h-500-px">
        <div
          className="absolute mt-20 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>

      <section className="relative mt-20 py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      src={
                        user.photoURL ||
                        "https://res.cloudinary.com/ds41xxspf/image/upload/v1669140075/Donde-Suena-Assets/user_snefch.png"
                      }
                      className="shadow-xl rounded-full h-auto align-middle border-none "
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Home
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span> */}
                    </div>
                    <div className="mr-4 p-3 text-center">
                      {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>*/}
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      {/*  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>*/}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {user.displayName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user.email}
                </div>
                <div>
                  <div  className="flex flex-col items-center">
                    <div className="flex items-center justify-center px-8 gap-8 flex-col">
                      <p className="text-1xl font-semibold w-fit">
                        Cambiar Nombre:
                      </p>
                      {user?.displayName ? (
                        <>
                          <input
                            type="text"
                            className="text-xl rounded-3xl text-black px-6"
                            value={newDisplayName}
                            onChange={(e) => setNewDisplayName(e.target.value)}
                          />
                          <button
                            onClick={handleChangeName}
                            className="text-lg text-black talic font-semibold bg-customRed px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-700 ease-in-out"
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
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="flex flex-row w-full">
                    <div className="flex-1 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700 flex">
                        {<MyShopping user_id={user} />}
                      </p>
                      <a href="#pablo" className="font-normal text-pink-500">
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         // {
                  //Roles?.role === 'artista'?
          //<div className="flex-col">
            //<div className="flex items-center justify-start px-8 gap-8">
              //<p className="text-2xl font-semibold w-fit">Nombre de tu Banda</p>
              //<p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
                //{datosartist?.nameBand}
              //</p>
           // </div>
         // </div> : null
}
          //{
                 // Roles?.role === 'artista'?
         // <div className="flex-col">
           // <div className="flex items-center justify-start px-8 gap-8">
             // <p className="text-2xl font-semibold w-fit">Nombre de Artista</p>
              //<p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
               // {datosartist?.nameArtist}
            //  </p>
           // </div>
          //</div> : null
           // }
         // {
                //  Roles?.role === 'artista'?
          //<div className="flex-col">
           // <div className="flex items-center justify-start px-8 gap-8">
             // <p className="text-2xl font-semibold w-fit">Año de Creacion</p>
             // <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
              //  {datosartist?.yearCreation}
            //  </p>
           // </div>
         // </div> : null
         //  }              

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
        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with{" "}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Notus JS
                  </a>{" "}
                  by{" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
          </div>
          </div>
      </section>
    </>

  );
}
