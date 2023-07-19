import React, { useEffect, useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, newUser } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

const FormFirebaselogin = () => {

  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;
  const usuario = useSelector(state => state.users);
  const oneUserCreated = useSelector(state => state.user);

  const [nombreToDB, setNombreToDB] = useState("");
  const [emailToDB, setEmailToDB] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validLogin = usuario?.filter(usr => usr.email === email);

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



  const handleLogin = async (e) => {
    e.preventDefault();
    const matchEmail = usuario?.find(usr => usr.email === email);
    if (matchEmail?.email) {
      try {
        const respLogin = await auth.login(email, password);
        if (respLogin && validLogin?.length > 0) {
          dispatch(getUser());
          navigate("/home"); // Redireccionar al usuario a la página de inicio
          return;
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        // Manejar el error aquí
      }
    }
    alert('Usuario o contraseña incorrectos');
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
      <p></p>
      
    {/* ===============Login====================== */}


    <div >
      <p></p>
    <form>
    <h3 >Login</h3>
  <div >
    <label >Email address</label>
    <input type="email" id="exampleInputEmail1" onChange={(e)=> {setEmail(e.target.value); setUserInfo({...userInfo, email:e.target.value})}}/>
    <div > Nunca compartas datos con desconocidos</div>
  </div>
  <div >
    <label >Password</label>
    <input type="password" id="exampleInputPassword1" onChange={(e)=> setPassword(e.target.value)}/>
  </div>
  <div >
  </div>
  <div >
  <button type="submit"  onClick={(e)=>handleLogin(e)}>Submit</button>
  <button  onClick={(e)=>handleGoogle(e)}>Google</button>
  </div>
  </form>
  </div>

</div>
  )
};

export default FormFirebaselogin;