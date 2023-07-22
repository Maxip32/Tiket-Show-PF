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
      console.log(apiData.data,"soy api data")
      const detail = apiData.data;
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
