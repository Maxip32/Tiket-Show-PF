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
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";



const schema = Yup.object().shape({
  //aca se definen los nombre de nuestros inputs
  name: Yup.string()
    .min(2, 'El nombre debe tener Mínimo 2 caracteres')
    .max(30, 'El nombre debe tener Máximo 30 caracteres')
    .required('Debes completar tu nombre'),
  email: Yup.string()
    .email('Correo invalido')
    .required('Debes colocar tu email'),
  password: Yup.string()
    .min(2, 'Debe tener al menos 4 caracteres')
    .max(8, 'Debe tener máximo 8 caracteres')
    .required('Es necesario crear una contraseña'),
})

const RegisterForm = () => {

  const navigate = useNavigate();

   //cloudinary inicia
   const [image, setImage] = useState("")
   const [loading, setLoading] = useState(false)
 
   const uploadImage = async (e) =>{
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
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
  }
 
   //cloudinary acaba

  const handleRegister = async (values) => {
    try {
      const { name, email, password } = values;
      
      // Carga la imagen a Cloudinary y obtiene la URL de la imagen cargada
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
        console.log(imageUrl)
      }

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
        profileImageURL: imageUrl, // Guarda la URL de la imagen de perfil
      });

      /* Modal */
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te registraste correctamente',
        showConfirmButton: false,
        timer: 1500
      })

      /* alert("Usuario registrado correctamente"); */
      navigate("/login"); // Redireccionar al usuario al formulario de inicio de sesión
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Manejar el error aquí
    }
  };

  // Hook de Formik con la función de manejo de envío 'handleRegister'
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: handleRegister,
    validationSchema: schema, 
  });

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

      /* Modal de Google*/
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro con Google exitoso!',
        showConfirmButton: false,
        timer: 1500
      })

      /* alert("Registro con Google exitoso!"); */
      navigate("/home"); // Redireccionar al usuario al formulario de inicio de sesión
    } catch (error) {
      console.error("Error al registrar con Google:", error);
      // Manejar el error aquí
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
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
            onSubmit={handleSubmit}
          >
            { errors.name && <span className='text-red-600 text-xs mb-[-20px] '>{errors.name}</span> }
            <input
              placeholder="Nombre completo"
              type="text"
              name='name'
              onChange={handleChange}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />

            { errors.email && <span className='text-red-600 text-xs mb-[-20px] '>{errors.email}</span> }
            <input
              placeholder="Correo electrónico"
              type="email"
              name="email"
              onChange={handleChange}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />

            { errors.password && <span className='text-red-600 text-xs mb-[-20px] '>{errors.password}</span> }
            <input
              placeholder="Contraseña"
              type="password"
              name="password"
              onChange={handleChange}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
            <div class="mb-3">
            <label
              for="formFile"
              class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >
              Foto de perfil
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
              onChange={(e) => {
                handleChange(e); // Importante: Asegúrate de mantener esta llamada para que Formik pueda manejar los cambios en el input
                uploadImage(e); // Llamamos a la función uploadImage aquí sin pasar el evento 'e'
              }}
            />
          </div>
            <button
              type="submit"
              className="w-3/4 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
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
