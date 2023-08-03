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

  function upperLetter(inputString) {
    if (!inputString) {
      return "";
    }

    const wordsArray = inputString.split(" ");
    const formattedArray = wordsArray.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstLetter + restOfWord;
    });

    return formattedArray.join(" ");
  }

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

      <section className="max-w-6xl mx-auto mt-10 bg-white shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-shrink-0 flex justify-center items-center h-60 md:w-1/6">
            <button
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
              className="absolute left-30 top-40 uppercase bg-white text-primaryColor font-bold hover:shadow-md shadow text-lg rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            >
              <BsPlusSquareFill />
            </button>
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
            <img
              id="imagenPrevia"
              src={
                preview ||
                user.photoURL ||
                "https://res.cloudinary.com/dhickjcbz/image/upload/v1690770100/user_r20d1h.png"
              }
              className="shadow-xl w-40 ml-20 rounded-full align-middle border-none"
              alt=""
            />
          </div>
          <div className="md:ml-20 h-50 py-16 md:w-1/8">
            <h1 className="text-3xl font-bold  text-primaryColor ">
              {upperLetter(user.displayName)}
            </h1>
            <h1 className="text-md"> {user.email}</h1>
            <h1>
              <button onClick={handleSaveChanges} className="">
                Guardar Cambios
              </button>
              {error && (
                <p className="text-red-600 text-base">Error: {error}</p>
              )}
            </h1>
          </div>
          {usersFinder?.role === "artista" ? (
            <div className=" w-20 h-10  basis-1/4">
              <p className="text-xs font-bold flex text-primaryColor justify-center items-center">
                Nombre Artístico :
              </p>
              <p className="flex text-LightGrayText justify-center items-center">
                {upperLetter(datosartist?.nameBand)}
              </p>
            </div>
          ) : null}
          {usersFinder?.role === "artista" ? (
            <div className="w-20 h-10  basis-1/4 ">
              <p className="text-xs font-bold flex text-primaryColor justify-center items-center ">
                Año de Creacion:
              </p>
              <p className="flex  justify-center items-center ">
                {datosartist?.yearCreation}
              </p>
            </div>
          ) : null}

        </div>
        <div className="flex flex-col border-2  ml-10 md:flex-row">
          <div className="md:h-20 border-2  md:w-1/8">
            <p className="flex justify-start font-bold text-xs">
              Cambiar Nombre:
            </p>
            {user?.displayName ? (
              <>
                <input
                  type="text"
                  className="ml-2 w-2/8 text-xs bg-LightText rounded-xl text-black"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                />
                <button
                  onClick={handleChangeName}
                  className=" flex flex-col  text-xs"
                >
                  Guardar
                </button>
              </>
            ) : (
              <p>Cargando...</p>
            )}
            {error && <p className="text-red-600 text-base">Error: {error}</p>}
          </div>
          <div className="md:w-1/4"></div>
          <div className="md:w-1/4"></div>
        </div>
        <div>
          <div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">

                <div className="flex flex-row w-full">
                  <div className="flex-1 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700 flex">
                      {<MyShopping user_id={user} />}
                    </p>
                    <a href="#pablo" className="font-normal text-pink-500"></a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
