import React, { useEffect, useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, newUser } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

const FormFirebaseregister = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;
  const usuario = useSelector(state => state.users);
  const oneUserCreated = useSelector(state => state.user);

  const [nombreToDB, setNombreToDB] = useState("");
  const [emailToDB, setEmailToDB] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const validRegister = usuario?.filter(usr => usr.email === emailRegister);
  
  
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    verified: true,
    role: "customer"
  });

  useEffect(() => {
    setNombreToDB(user?.displayName);
    setEmailToDB(user?.email);
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      name: nombreToDB || prevUserInfo.name,
      email: emailToDB || emailRegister || prevUserInfo.email
    }));
    dispatch(getUser());
  }, [user?.displayName, user?.email, emailToDB, nombreToDB, emailRegister, dispatch]);

  const clearState = () => {
    setNombreToDB("");
    setEmailToDB("");
    setEmailRegister("");
    setPasswordRegister("");
    setEmail("");
    setPassword("");
    setUserInfo({
      name: "",
      email: "",
      password: "",
      address: "",
      verified: true,
      role: "customer"
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validRegister?.length > 0) {
      return alert("Usuario existente");
    }

    try {
      await auth.register(emailRegister, passwordRegister);
      dispatch(newUser(userInfo));
      clearState(); // Limpiar el estado
      alert("Usuario registrado correctamente");
      navigate("/home"); // Redireccionar al usuario a la página de inicio
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Manejar el error aquí
    }
  };

 

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      const respGoogle = await auth.loginWithGoogle();
      if (respGoogle.operationType === "signIn") {
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          name: respGoogle.user.displayName,
          email: respGoogle.user.email
        }));
        clearState(); // Limpiar el estado
        redirectLogin(respGoogle.user);
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Manejar el error aquí
    }
  };

  const redirectLogin = (userGoogle) => {
    const matchGoogleEmail = usuario?.find(usr => usr.email === userGoogle.email);
    if (matchGoogleEmail?.email) {
      navigate("/home"); // Redireccionar al usuario a la página de inicio
    } else {
      dispatch(newUser({
        ...userInfo,
        name: userGoogle.displayName,
        email: userGoogle.email
      }));
      if (oneUserCreated) {
        dispatch(getUser());
        navigate("/home"); // Redireccionar al usuario a la página de inicio
      }
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
      verified: true,
      role: "customer"
    });
  };

  return (
    
      
      <div >
    <form>
      {/* ===================Register================== */}
      <h3 >Registro</h3>
  <div >
    <label >Nombre completo:</label>
    <input type="text"  id="exampleInputEmail1" value={userInfo.name} onChange={handleOnChange} placeholder={nombreToDB} name="name"/>
    <div id="emailHelp" >Nunca compartas datos personales con desconocidos.</div>
  </div>
  <div >
    <label >Direccion de correo</label>
    <input type="email" id="exampleInputEmail1" onChange={(e)=> {setEmailRegister(e.target.value); setUserInfo({...userInfo, email:e.target.value})}}/>
    <div id="emailHelp">Nunca compartas datos personales con desconocidos.</div>
  </div>
  <div >
    <label >Password</label>
    <input type="password" id="exampleInputPassword1" onChange={(e)=> setPasswordRegister(e.target.value)}/>
  </div>
  <div >
  </div>
  <div >
  <button type="submit" onClick={(e)=>handleRegister(e)}>Submit</button>
  <button  onClick={(e)=>handleGoogle(e)}>Google</button>
  </div>

  </form>
  </div>

   
   
  )
  
};

export default FormFirebaseregister;