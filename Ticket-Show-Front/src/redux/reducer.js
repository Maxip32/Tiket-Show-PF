import {
  FILTER_BY_GENRES,
  GET_EVENTS,
  GET_GENRES,
  ORDER_BY_DATE,
  GET_EVENT_ID,
  GET_SEARCH_BY_NAME,
  GET_ORDER_BY_NAME,
  FILTER_BY_DATE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  GET_BY_CITY,
  FILTER_BY_CITY,
  GET_BY_DATE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  CREATE_ARTIST_SUCCESS,
  CREATE_ARTIST_FAILURE,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAILURE,
  GET_USER_BY_EMAIL_SUCCESS,
  GET_USER_BY_EMAIL_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_RESET,
  GET_RESET_ORDER,
  POST_PAYPAL,
  GET_CAPTURE_ORDER,
  GET_CANCEL_ORDER,
} from "../redux/actions";

const initialState = {
  Events: [],
  allEvents: [],
  genres: [],
  detail: {},
  cart: [],
  city: [],
  date: [],
  paypalData: [],
  captureOrderData: [],
  cancelOrderData: [],
  user: null,
  loading: true,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, Events: action.payload, allEvents: action.payload };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_EVENT_ID:
      return { ...state, detail: action.payload };
    case FILTER_BY_GENRES:
      let eventos;
      if (action.payload === "all") {
        eventos = state.allEvents;
      } else {
        eventos = state.allEvents.filter((evento) =>
          evento.genre.includes(action.payload)
        );
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          genres: action.payload,
        },
        Events: eventos,
      };
    case ORDER_BY_DATE:
      const EventsByDate =
        action.payload === "asc"
          ? state.Events.sort((a, b) => {
              if (a.date > b.date) return 1;
              if (b.date > a.date) return -1;
              return 0;
            })
          : state.Events.sort((a, b) => {
              if (a.date > b.date) return -1;
              if (b.date > a.date) return 1;
              return 0;
            });
      return {
        ...state,
        Events: EventsByDate,
      };
    case GET_SEARCH_BY_NAME:
      return {
        ...state,
        Events: action.payload,
      };

    /////// CARRITO DE COMPRA //////

    case ADD_TO_CART:
      const ItemsCarts = state.allEvents.find(
        (itemcart) => itemcart.id === action.payload.id
      );
      return {
        ...state,
        cart: [...state.cart, ItemsCarts],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: [],
      };
    case GET_ORDER_BY_NAME:
      const EventsSorted =
        action.payload === "asc"
          ? state.Events.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.Events.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        Events: EventsSorted,
      };
    case FILTER_BY_DATE:
      const eventsWithDate =
        action.payload === "all"
          ? state.allEvents
          : state.allEvents.filter((event) =>
              event.date.includes(action.payload)
            );
      return {
        ...state,
        Events: eventsWithDate,
      };
    case GET_BY_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case FILTER_BY_CITY:
      let ciudades;
      if (action.payload === "all") {
        ciudades = state.allEvents;
      } else {
        ciudades = state.Events.filter((cit) =>
          cit.city.includes(action.payload)
        );
      }

      return {
        ...state,
        Events: ciudades,
      };
    case GET_BY_DATE:
      return {
        ...state,
        date: action.payload,
      };
    ////// REDUCER CREATE Y GET USER CREO Y TRAIGO USUARIOS //////
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };

    ////////////// CREO Y TRAIGO USUARIOS ARTISTAS /////////////
    case CREATE_ARTIST_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_ARTIST_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case GET_ARTIST_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case GET_ARTIST_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };

    ///////////// GET USER BY EMAIL Y UPDATE ///////////

    case GET_USER_BY_EMAIL_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_BY_EMAIL_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_RESET:
      return {
        ...state,
        Events: state.allEvents,
      };
    case GET_RESET_ORDER:
      return {
        ...state,
        allEvents: [...state.allEvents],
      };
    case POST_PAYPAL:
      return {
        ...state,
        paypalData: action.payload,
      };
    case GET_CAPTURE_ORDER:
      return {
        ...state,
        captureOrderData: action.payload,
      };
    case GET_CANCEL_ORDER:
      return {
        ...state,
        cancelOrderData: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
