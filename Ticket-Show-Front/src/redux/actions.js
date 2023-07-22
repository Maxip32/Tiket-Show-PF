import axios from "axios";

export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENT_ID = "GET_EVENT_ID";

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

export const GET_ORDER_BY_NAME = 'GET_GET_ORDER_BY_NAME'

export const orderByName = (payload) => {
  return {
    type: GET_ORDER_BY_NAME,
    payload
  }
}
