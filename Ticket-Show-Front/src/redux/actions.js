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
      console.log(apiData.data, "soy api data")
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

export const GET_SEARCH_BY_NAME = 'GET_SEARCH_BY_NAME'

export const searchByName = (name) => {
    return async (dispatch) => {
        const apiData = await axios.get(`http://localhost:3001/event/getEvent/name/${name}`)
        const Events = apiData.data
        return dispatch({
            type: GET_SEARCH_BY_NAME,
            payload: Events
        })
    }

}

//// CARRITO DE COMPRAS /////
// Agregar elemento al carrito en el backend
export const addToCart = (item) => {
  return async (dispatch) => {
    try {
      // Realizar una solicitud POST al backend para agregar el elemento al carrito
      const response = await axios.post(`http://localhost:3001/CartItem/cart`, item);
      // El backend debería procesar la solicitud y agregar el elemento al carrito en la base de datos
      // Luego, puedes despachar la acción con el elemento agregado para actualizar el estado en el frontend
      dispatch({ type: ADD_TO_CART, payload: response.data });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };
};

// Eliminar elemento del carrito en el backend
export const removeFromCart = (itemId) => {
  return async (dispatch) => {
    try {
      // Realizar una solicitud DELETE al backend para eliminar el elemento del carrito
      await axios.delete(`http://localhost:3001/CartItem/cart/${itemId}`);
      // El backend debería procesar la solicitud y eliminar el elemento del carrito en la base de datos
      // Luego, puedes despachar la acción con el ID del elemento eliminado para actualizar el estado en el frontend
      dispatch({ type: REMOVE_FROM_CART, payload: itemId });
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };
};

// Actualizar elemento del carrito en el backend
export const updateCartItem = (itemId, quantity) => {
  return async (dispatch) => {
    try {
      // Realizar una solicitud PUT al backend para actualizar la cantidad del elemento en el carrito
      await axios.put(`http://localhost:3001/CartItem/cart/${itemId}`, { quantity });
      // El backend debería procesar la solicitud y actualizar la cantidad del elemento en la base de datos
      // Luego, puedes despachar la acción con el ID del elemento actualizado y la nueva cantidad
      // para actualizar el estado en el frontend
      dispatch({ type: UPDATE_CART, payload: { itemId, quantity } });
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };
};
export const GET_ORDER_BY_NAME = 'GET_GET_ORDER_BY_NAME'

export const orderByName = (payload) => {
  return {
    type: GET_ORDER_BY_NAME,
    payload
  }
}

export const FILTER_BY_DATE = 'FILTER_BY_DATE'

export const FilterByDate = (payload) => {

  return {
    type: FILTER_BY_DATE,
    payload
  }
}

export const GET_BY_CITY = 'GET_BY_CITY'

export const GetByCity = () => {
  return async(dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/city/allCity`)
    const city = apiData.data
    return dispatch ({
      type: GET_BY_CITY,
      payload: city
    })
  }

}

export const FILTER_BY_CITY = 'FILTER_BY_CITY'

export const FilterByCity = (payload) => {
  return {
    type: FILTER_BY_CITY,
    payload
  }
}

export const GET_BY_DATE = 'GET_BY_DATE'
export const GetByDate = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/date/allDate`)
    const allDate = apiData.data
    return dispatch({
      type: GET_BY_DATE,
      payload: allDate
    })
  }
}

export const GET_RESET = 'GET_RESET'
export const getReset = () => {
  return ({
    type: GET_RESET
  })
}
export const GET_RESET_ORDER = 'GET_RESET_ORDER'
export const getResetOrder = () => {
  return {
    type: GET_RESET_ORDER
  }
}

