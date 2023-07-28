import { useEffect, useState } from "react";
import { auth, database } from "../firebase/firebase.config";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("contexto no creado");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No hay usuario suscrito");
        setUser(null);
      } else {
        setUser(currentUser);
        const userData = {
          email: currentUser.email,
          displayName: currentUser.displayName,
        };

        set(ref(database, "usuarios/" + currentUser.uid), userData)
          .then(() => {
            console.log("Datos del usuario guardados en la base de datos.");
          })
          .catch((error) => {
            console.error(
              "Error al guardar los datos del usuario en la base de datos:",
              error
            );
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password, displayName) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
  
      // Establecer el displayName antes de almacenar los datos en Firebase
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });
  
      // Actualizar el estado del usuario con la información del registro
      setUser({ ...response.user, displayName: displayName });
  
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setUser(response.user);
      return response.operationType === "signIn" ? true : false;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      setUser(response.user);
      const userData = {
        email: response.user.email,
        displayName: response.user.displayName,
      };
      set(ref(database, "usuarios/" + response.user.uid), userData)
        .then(() => {
          console.log("Datos del usuario guardados en la base de datos.");
        })
        .catch((error) => {
          console.error(
            "Error al guardar los datos del usuario en la base de datos:",
            error
          );
        });
      return response;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError(error.message);
      return null;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout, // Agregamos la función logout al contexto
        user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;