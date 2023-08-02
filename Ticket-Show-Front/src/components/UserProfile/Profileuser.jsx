import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { NavLink } from "react-router-dom";
import MyShopping from "./Shoppinguser";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { BsPlusSquareFill } from "react-icons/bs";

export default function UserProfile() {
  const navigate = useNavigate();
  //const auth = useAuth();
  const { user, updateUserDisplayName, updateUserPhotoURL } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState("");
  const [error, setError] = useState(null);
  const datosbanda = useSelector((state) => state?.user);
  const datosartist = datosbanda?.find((date) => date.email === user?.email);
  const users = useSelector((state) => state?.user);
  const usersFinder = users?.length
    ? users?.find((rol) => rol.email === user?.email)
    : null;
  const userImageURL =
    usersFinder?.image ||
    "https://res.cloudinary.com/dhickjcbz/image/upload/v1690770100/user_r20d1h.png";
  const [imageFile, setImageFile] = useState(null);
  //const RolesUsers= useSelector((state)=> state?.user)

  const [preview, setPreview] = useState(null);
  console.log(users, "aquí user redux");

  const handleImageChange = (e) => {
    console.log(handleImageChange, " esta es la nueva imagen");
    const file = e.target.files[0];
    if (!file) {
      // El usuario canceló la selección de la imagen, así que borramos la URL temporal
      setNewImageUrl(null);
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    // Subir la nueva imagen al servicio Firebase Storage
    // const storageRef = ref(getStorage(), "imagenesUsuarios/" + file.name);
    // uploadBytes(storageRef, file)
    //   .then(() => getDownloadURL(storageRef))
    //   .then((url) => {
    //     // Obtener la URL de la nueva imagen almacenada en Firebase Storage
    //     console.log(url, "URL de la imagen");
    //     // Almacenar la URL temporal en el estado
    //     setNewImageUrl(url);
    //     console.log(url, " NUEVA URL DE LA NUEVA imagen")
    //   })
    //   .catch((error) => {
    //     console.error("Error al subir la imagen:", error);
    //     setError("Error al subir la imagen. Por favor, inténtelo de nuevo más tarde.");
    //   });
  };

  const handleSaveChanges = async () => {
    setError(null);
    try {
      if (!user || typeof user !== "object") {
        setError("Usuario no autenticado.");
        return;
      }

      // console.log(imageFile, " este es el image file ")

      if (imageFile) {
        // Subir la nueva imagen al servicio Firebase Storage
        const storageRef = ref(
          getStorage(),
          "imagenesUsuarios/" + imageFile.name
        );
        await uploadBytes(storageRef, imageFile);

        // Obtener la URL de la nueva imagen almacenada en Firebase Storage
        const url = await getDownloadURL(storageRef);
        // console.log({url}, "direccion de imagen de firebase")
        // Actualizar la URL de la imagen en Firebase Auth
        try {
          await updateUserPhotoURL(url);
          //alert("cambie imagen")
        } catch (error) {
          console.error(
            "Error al actualizar la imagen de perfil en Firebase Auth:",
            error
          );
          setError(
            "Error al actualizar la imagen de perfil. Por favor, inténtelo de nuevo más tarde."
          );
          return;
        }

        // // Actualizar la URL de la imagen en la base de datos (tabla "users")
        // const userRef = doc(getFirestore(), "users", user.uid);
        // await updateDoc(userRef, { image: url });

        // // Actualizar la URL de la imagen en el estado local
        // setImageFile(null); // Reiniciar el archivo seleccionado

        console.log(url, "ESTO QUIERO VER AHORA DE LA URL");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Imagen de perfil actualizada correctamente!",
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        setError("Error a subir la imagen.");
      }
    } catch (error) {
      console.error("Error al guardar la imagen de perfil:", error);
      setError(
        "Error al guardar la imagen de perfil. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

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
      <section>
      <div class="flex flex-row">
  <div className="border-2 w-20 h-10  basis-1/4">01</div>
  <div className=" border-2 w-20 h-10  basis-2/4">{user.displayName}</div>
  <div className="border-2 w-20 h-10  basis-1/4">03</div>
    
</div>
<div class="flex flex-row">
  <div className="border-2 w-20 h-10  basis-1/4">01</div>
  <div className=" border-2 w-20 h-10  basis-2/4">{user.displayName}</div>
  <div className="border-2 w-20 h-10  basis-1/4">03</div>
    
</div>
        <div>
          <div>
            <div className="">
              <div className="">
                <div className="">
                  <div className="relative">
                    <img
                      id="imagenPrevia" // O "vistaPreviaImagen" u otro nombre
                      src={
                        preview ||
                        user.photoURL ||
                        "https://res.cloudinary.com/dhickjcbz/image/upload/v1690770100/user_r20d1h.png"
                      }
                      className="shadow-xl w-40 rounded-full align-middle border-none"
                      alt=""
                    />
                    <div className="flex  absolute top-1">
                      <button
                        onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        }
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      >
                        <BsPlusSquareFill />
                      </button>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                    <button onClick={handleSaveChanges} className="">
                      Guardar Cambios
                    </button>
                    {error && (
                      <p className="text-red-600 text-base">Error: {error}</p>
                    )}
                    <span></span>
                  </div>
                </div>
                <div className="">
                
                </div>
                <div className="">
                  <div className="">
                    <div className="">
                      {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span> 
                    </div>
                    <div className="mr-4 p-3 text-center">
                      {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>*/}
                    </div>
                    <div className="">
                      {/*  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>*/}
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <divc>
                  <h3 className="">
                    {user.displayName}
                  </h3>
                </divc>
                <div className=" ">
                  <i className=""></i>
                  {user.email}
                </div>
                {/* {* si es artista*} */}
                {/* {usersFinder?.role === "artista" ? (
                  <div className="flex-col">
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                      <p className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                        Nombre de Artista :
                      </p>
                      <p className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">
                        {datosartist?.nameArtist}
                      </p>
                    </div>
                  </div>
                ) : null} */}
                {usersFinder?.role === "artista" ? (
                  <div className="flex-col">
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                      <p className="text-sm leading-normal mt-0 mb-2 text-primaryColor text-blueGray-400 font-bold ">
                        Nombre Artístico :
                      </p>
                      <p className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">
                        {datosartist?.nameBand}
                      </p>
                    </div>
                  </div>
                ) : null}
                {usersFinder?.role === "artista" ? (
                  <div className="flex-col">
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                      <p className="text-sm leading-normal mt-0 mb-2 text-primaryColor text-blueGray-400 font-bold ">
                        Año de creacion:
                      </p>
                      <p className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">
                        {datosartist?.yearCreation}
                      </p>
                    </div>
                  </div>
                ) : null}
                <div>
                  <div className="">
                    <div className="">
                      <p className="">
                        Cambiar Nombre:
                      </p>
                      {user?.displayName ? (
                        <>
                          <input
                            type="text"
                            className="text-xl bg-LightText rounded-3xl text-black px-6"
                            value={newDisplayName}
                            onChange={(e) => setNewDisplayName(e.target.value)}
                          />
                          <button
                            onClick={handleChangeName}
                            className=""
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
                      <a
                        href="#pablo"
                        className="font-normal text-pink-500"
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                    {" "}
                    <a
                      href="https://www.creative-tim.com/product/notus-js"
                      className="text-blueGray-500 hover:text-gray-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>{" "}
                    <a
                      href="https://www.creative-tim.com"
                      className="text-blueGray-500 hover:text-blueGray-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
