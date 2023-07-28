
//codigo con formik
/* Modal de Google*/
/* Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Registro con Google exitoso!',
  showConfirmButton: false,
  timer: 1500
}) */


/* const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;
  const usuario = useSelector(state => state.user);
  const oneUserCreated = useSelector(state => state.user);
 */

  /* useEffect(() => {
    // Load user data if the user is already logged in
    if (user) {
      dispatch(getUserById());
    }
  }, [user, dispatch]);
  
  const handleRegister = async (values) => {
    const { email, password } = values;

    const validRegister = usuario?.filter(usr => usr.email === email);
    
    if (validRegister?.length > 0) {
      return (
        /* Modal 
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Usuario existente',
          showConfirmButton: false,
          timer: 1500
        })
      )  alert("Usuario existente");
    }
    try {
      // Registro con email y contraseña
      await auth.register(email, password);
      dispatch(createUser(values));
      formik.resetForm(); // Limpiar el estado
      
      /* Modal 
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te registraste correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Manejar el error aquí
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.loginWithGoogle();
      const user = userCredential.user;
      formik.setValues(prevUserInfo => ({
        ...prevUserInfo,
        name: user.displayName,
        email: user.email
      }));
      formik.resetForm(); // Limpiar el estado
      redirectLogin(user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Manejar el error aquí
    }
  };

  const redirectLogin = (userGoogle) => {
    const matchGoogleEmail = usuario?.find(usr => usr.email === userGoogle.email);
    if (matchGoogleEmail?.email) {
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } else {
      dispatch(createUser({
        ...formik.values,
        name: userGoogle.displayName,
        email: userGoogle.email
      }));
      if (oneUserCreated) {
        dispatch(getUserById());
        navigate("/"); // Redireccionar al usuario a la página de inicio
      }
    }
  };

  // Hook de Formik con la función de manejo de envío 'handleRegister'
  const { handleSubmit, handleChange, errors, formik } = useFormik({
    initialValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      password: '',
      verified: true,
      role: "customer"
    },
    onSubmit: handleRegister,
    validationSchema: schema, 
  });

   */