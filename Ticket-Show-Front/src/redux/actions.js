import axios from "axios";

export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENT_ID = "GET_EVENT_ID";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART = "UPDATE_CART";
export const getEvents = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`/event/getEvents`);

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
      const apiData = await axios.get(`/event/getEvent/${id}`);
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
    const Data = await axios.get(`/genres/allGenres`);
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
    const apiData = await axios.get(`/event/getEvent/name/${name}`);
    const Events = apiData.data;
    return dispatch({
      type: GET_SEARCH_BY_NAME,
      payload: Events,
    });
  };
};

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
    const apiData = await axios.get(`/city/allCity`);
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
    const apiData = await axios.get(`/date/allDate`);
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
      const response = await axios.post("/user/createUser", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
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
      const response = await axios.get(`/cart/users/${email}`);

      dispatch({ type: GET_USER_BY_EMAIL_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_USER_BY_EMAIL_FAILURE, payload: error.message });
    }
  };
};

export const getUserById = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/user/");

      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
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
      const response = await axios.post("/artist/createArtist", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: CREATE_ARTIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_ARTIST_FAILURE, payload: error.message });
    }
  };
};

export const CREATE_EVENT_SUCCESS = "GET_ARTIST_SUCCESS";
export const CREATE_EVENT_FAILURE = "GET_ARTIST_FAILURE";
export const createEvent = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/event/createEvent");

      dispatch({ type: GET_ARTIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ARTIST_FAILURE, payload: error.message });
    }
  };
};



export const GET_ARTIST_SUCCESS = "GET_ARTIST_SUCCESS";
export const GET_ARTIST_FAILURE = "GET_ARTIST_FAILURE";

export const getArtistById = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/artist/allArtist");

      dispatch({ type: GET_ARTIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ARTIST_FAILURE, payload: error.message });
    }
  };
};
////nodemailer
export const CREATE_MAIL_SUCCESS = "CREATE_ARTIST_SUCCESS";
export const CREATE_MIAL_FAILURE = "CREATE_ARTIST_FAILURE";
export const sendMail = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/send/mail", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: CREATE_ARTIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_ARTIST_FAILURE, payload: error.message });
    }
  };
};

////// TERMINO DE CREAR ARTISTAS Y LOS REQUIERO ////////////

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const updateUser = (email, userData) => async (dispatch) => {
  try {
    // Realizar la petición al backend para buscar al usuario por su email y actualizarlo
    const response = await axios.put(`/cart/users/${email}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.status === 200) {
      throw new Error("Error al actualizar el usuario");
    }

    const updatedUser = response.data;

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
    const apiData = await axios.post(`/create-order`);
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
    const apiData = await axios.get(`/capture-order`);
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
    const apiData = await axios.get(`/cancel-order`);
    const allData = apiData.data;
    return dispatch({
      type: GET_CANCEL_ORDER,
      payload: allData,
    });
  };
};
