import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase/firebase.config";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("contexto no creado");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("no hay usuario suscrito");
        setUser("");
      } else {
        setUser(currentUser);

        // Guardar datos del usuario en la base de datos
        const userData = {
          email: currentUser.email,
          displayName: currentUser.displayName,
          // Otros datos que deseas guardar en la base de datos
        };

        // Utilizar la referencia a la base de datos y la función set para guardar los datos del usuario
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

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError(error.message); // Guardar el mensaje de error en el estado
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      return response.operationType === "signIn" ? true : false;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message); // Guardar el mensaje de error en el estado
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);

      // Guardar datos del usuario en la base de datos
      const userData = {
        email: response.user.email,
        displayName: response.user.displayName,
        // Otros datos que deseas guardar en la base de datos
      };

      // Utilizar la referencia a la base de datos y la función set para guardar los datos del usuario
      await set(ref(database, "usuarios/" + response.user.uid), userData);
      console.log("Datos del usuario guardados en la base de datos.");

      return response;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError(error.message); // Guardar el mensaje de error en el estado
      return null;
    }
  };

  const logout = async () => {
    try {
      const response = await signOut(auth);
      console.log(response);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError(error.message); // Guardar el mensaje de error en el estado
    }
  };

  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
        error, // Agregar el estado de error al contexto
      }}
    >
      {children}
    </authContext.Provider>
  );
}




