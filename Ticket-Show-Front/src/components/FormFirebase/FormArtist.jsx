import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const ArtistForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bandName, setBandName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [creationYear, setCreationYear] = useState("");
  
  //cloudinary inicia
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  const uploadImage = async (e) =>{
    const files=e.target.files;
    const data = new FormData();
    data.append("file",files[0]);
    data.append("upload_preset", "k0eexbwx");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhickjcbz/image/upload",
      {
          method: "POST",
          body: data,
      }
    )
    const file = await res.json();
    console.log(res)
    setImage(file.secure_url)
    setLoading(false)
  }

  //cloudinary acaba


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.register(email, password);
      if (image) {
        const imageUrl = await uploadImage(image);
        setImage(imageUrl); // Guarda la URL de la imagen en el estado del componente
        console.log("URL de la imagen cargada:", imageUrl);
      }
      // Aquí puedes realizar cualquier acción adicional con el nuevo usuario registrado,
      // como guardar datos adicionales en tu base de datos utilizando Sequelize.
      alert("Usuario registrado correctamente");
      navigate("/login"); // Redireccionar al usuario al formulario de inicio de sesión
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Manejar el error aquí
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Registrarse como Artista</h2>
        <form className="flex flex-col space-y-4"  onSubmit={handleSubmit}>
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
          <label>
            <span className="text-purple-600">Nombre de la banda:</span>
            <input
              type="text"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <div class="mb-3">
            <label
              for="formFile"
              class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >
              Foto de la Banda
            </label>
            <input
              class="relative m-0 block w-full min-w-0 
              flex-auto rounded border border-solid border-neutral-300 bg-clip-padding 
              px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300
               ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0
                file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition
                 file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary
                  focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100
                   dark:focus:border-primary"
              type="file"
              id="formFile"
              onChange={(e) => uploadImage(e)} // Pasa el evento 'e' como argument
            />
          </div>
          <label>
            <span className="text-purple-600">Nombre de artista:</span>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="rounded border border-purple-400 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </label>
          <label>
            <span className="text-purple-600">Año de creación:</span>
            <input
              type="text"
              value={creationYear}
              onChange={(e) => setCreationYear(e.target.value)}
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
      </div>
    </div>
  );
};

export default ArtistForm;
