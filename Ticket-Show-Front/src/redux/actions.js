import axios from "axios";

export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENT_ID = "GET_EVENT_ID";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART = "UPDATE_CART";
export const getEvents = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/event/getEvents`);

    const Events = apiData.data;
    dispatch({
      type: GET_EVENTS,
      payload: Events,
    });
  };
};

export const getEventId = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `http://localhost:3001/event/getEvent/${id}`
      );

      const detail = apiData.data;
      console.log(apiData.data, "soy api data");
      dispatch({
        type: GET_EVENT_ID,
        payload: detail,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
};

export const GET_GENRES = "GET_GENRES";

export const getGenres = () => {
  return async (dispatch) => {
    const Data = await axios.get(`http://localhost:3001/genres/allGenres`);
    const genres = Data.data;
    return dispatch({
      type: GET_GENRES,
      payload: genres,
    });
  };
};

export const ORDER_BY_DATE = "ORDER_BY_DATE";

export const orderByDate = (payload) => {
  return {
    type: ORDER_BY_DATE,
    payload,
  };
};

export const GET_SEARCH_BY_NAME = "GET_SEARCH_BY_NAME";

export const searchByName = (name) => {
  return async (dispatch) => {
    const apiData = await axios.get(
      `http://localhost:3001/event/getEvent/name/${name}`
    );
    const Events = apiData.data;
    return dispatch({
      type: GET_SEARCH_BY_NAME,
      payload: Events,
    });
  };
};

//// CARRITO DE COMPRAS POR EL MOMENTO NO DESCOMENTAR ESTO ES DE PRUEBA. /////
// Agregar elemento al carrito en el backend
// export const addToCart = (item) => {
//   return async (dispatch) => {
//     try {
//       // Asegurarnos de que el objeto item contenga la propiedad 'id'
//       if (!item.id) {
//         // Si el objeto item no tiene la propiedad 'id', podemos generar un id único o manejarlo de alguna otra manera
//         item.id = generateUniqueId(); // Por ejemplo, podemos usar una función para generar un id único
//       }

//       // Realizar una solicitud POST al backend para agregar el elemento al carrito
//       const response = await axios.post(`http://localhost:3001/cart/cart`, item);

//       // El backend debería procesar la solicitud y agregar el elemento al carrito en la base de datos
//       // Luego, puedes despachar la acción con el elemento agregado para actualizar el estado en el frontend
//       dispatch({ type: ADD_TO_CART, payload: response.data });
//     } catch (error) {
//       console.error("Error al agregar al carrito:", error);
//     }
//   };
// };

// Eliminar elemento del carrito en el backend
// export const removeFromCart = (itemId) => {
//   return async (dispatch) => {
//     try {
//       // Realizar una solicitud DELETE al backend para eliminar el elemento del carrito
//       await axios.delete(`http://localhost:3001/CartItem/cart/${itemId}`);
//       // El backend debería procesar la solicitud y eliminar el elemento del carrito en la base de datos
//       // Luego, puedes despachar la acción con el ID del elemento eliminado para actualizar el estado en el frontend
//       dispatch({ type: REMOVE_FROM_CART, payload: itemId });
//     } catch (error) {
//       console.error("Error al eliminar del carrito:", error);
//     }
//   };
// };

// Actualizar elemento del carrito en el backend
// export const updateCartItem = (itemId, quantity) => {
//   return async (dispatch) => {
//     try {
//       // Realizar una solicitud PUT al backend para actualizar la cantidad del elemento en el carrito
//       await axios.put(`http://localhost:3001/CartItem/cart/${itemId}`, { quantity });
//       // El backend debería procesar la solicitud y actualizar la cantidad del elemento en la base de datos
//       // Luego, puedes despachar la acción con el ID del elemento actualizado y la nueva cantidad
//       // para actualizar el estado en el frontend
//       dispatch({ type: UPDATE_CART, payload: { itemId, quantity } });
//     } catch (error) {
//       console.error("Error al actualizar el carrito:", error);
//     }
//   };
// };
export const GET_ORDER_BY_NAME = "GET_GET_ORDER_BY_NAME";

export const orderByName = (payload) => {
  return {
    type: GET_ORDER_BY_NAME,
    payload,
  };
};

export const FILTER_BY_DATE = "FILTER_BY_DATE";

export const FilterByDate = (payload) => {
  return {
    type: FILTER_BY_DATE,
    payload,
  };
};

export const GET_BY_CITY = "GET_BY_CITY";

export const GetByCity = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/city/allCity`);
    const city = apiData.data;
    return dispatch({
      type: GET_BY_CITY,
      payload: city,
    });
  };
};

export const FILTER_BY_CITY = "FILTER_BY_CITY";

export const FilterByCity = (payload) => {
  return {
    type: FILTER_BY_CITY,
    payload,
  };
};

export const GET_BY_DATE = "GET_BY_DATE";
export const GetByDate = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/date/allDate`);
    const allDate = apiData.data;
    return dispatch({
      type: GET_BY_DATE,
      payload: allDate,
    });
  };
};
// Acción para crear un nuevo usuario en el back-end
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/user/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      dispatch({ type: CREATE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
    }
  };
};

// Acción para obtener un usuario por su ID desde el back-end

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const GET_USER_BY_EMAIL_SUCCESS = "GET_USER_BY_EMAIL_SUCCESS";
export const GET_USER_BY_EMAIL_FAILURE = "GET_USER_BY_EMAIL_FAILURE";

export const getUserByEmail = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3001/cart/users/${email}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch({ type: GET_USER_BY_EMAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USER_BY_EMAIL_FAILURE, payload: error.message });
    }
  };
};

export const getUserById = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/user/`, {
        method: "GET",
      });
      const data = await response.json();
      dispatch({ type: GET_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USER_FAILURE, payload: error.message });
    }
  };
};

////////// TRAIGO Y CREO USUARIOS ARTISTAS ////////////////
export const CREATE_ARTIST_SUCCESS = "CREATE_ARTIST_SUCCESS";
export const CREATE_ARTIST_FAILURE = "CREATE_ARTIST_FAILURE";
export const createArtist = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:3001/artist/createArtist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      dispatch({ type: CREATE_ARTIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_ARTIST_FAILURE, payload: error.message });
    }
  };
};

export const GET_ARTIST_SUCCESS = "GET_ARTIST_SUCCESS";
export const GET_ARTIST_FAILURE = "GET_ARTIST_FAILURE";

export const getArtistById = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/artist/allArtist`, {
        method: "GET",
      });
      const data = await response.json();
      dispatch({ type: GET_ARTIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ARTIST_FAILURE, payload: error.message });
    }
  };
};

////// TERMINO DE CREAR ARTISTAS Y LOS REQUIERO ////////////

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const updateUser = (email, userData) => async (dispatch) => {
  try {
    // Realizar la petición al backend para buscar al usuario por su email y actualizarlo
    const response = await fetch(`http://localhost:3001/cart/users/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const updatedUser = await response.json();

    // Si la actualización es exitosa, actualizamos el estado en Redux
    dispatch(updateUserSuccess(updatedUser.user));
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const GET_RESET = "GET_RESET";
export const getReset = () => {
  return {
    type: GET_RESET,
  };
};
export const GET_RESET_ORDER = "GET_RESET_ORDER";
export const getResetOrder = () => {
  return {
    type: GET_RESET_ORDER,
  };
};

export const POST_PAYPAL = "POST_PAYPAL";
export const postPaypal = () => {
  return async (dispatch) => {
    const apiData = await axios.post(`http://localhost:3001/create-order`);
    const allData = apiData.data;
    return dispatch({
      type: POST_PAYPAL,
      payload: allData,
    });
  };
};

export const GET_CAPTURE_ORDER = "GET_CAPTURE_ORDER";

export const getCaptureOrder = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/capture-order`);
    const allData = apiData.data;
    return dispatch({
      type: GET_CAPTURE_ORDER,
      payload: allData,
    });
  };
};

export const GET_CANCEL_ORDER = "GET_CANCEL_ORDER";

export const getCancelOrder = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/cancel-order`);
    const allData = apiData.data;
    return dispatch({
      type: GET_CANCEL_ORDER,
      payload: allData,
    });
  };
};
