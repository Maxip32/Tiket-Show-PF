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
  GET_RESET,
  GET_RESET_ORDER,
} from "./actions";

const initialState = {
  Events: [],
  allEvents: [],
  genres: [],
  detail: {},
  cart: [],
  city: [],
  date: [],
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
      const allEvents = state.allEvents;
      const EventsWithGenre =
        action.payload === "all"
          ? allEvents
          : allEvents.filter((evento) => evento.genre.includes(action.payload));
      return {
        ...state,
        Events: EventsWithGenre,
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
      return {
        ...state,
        cart: [...state.cart, action.payload],
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
          const EventsSorted = action.payload === 'asc'
          ? state.Events.sort((a,b) => {
            if (a.name > b.name) return 1
            if (b.name > a.name) return -1
            return 0
          }) :
          state.Events.sort((a,b) => {
            if (a.name > b.name) return -1
            if (b.name > a.name) return 1
            return 0
          })
          return {
            ...state,
            Events: EventsSorted
          }
          case FILTER_BY_DATE:
            const eventsWithDate =
        action.payload === "all"
          ? state.allEvents
          : state.allEvents.filter((event) => event.date.includes(action.payload));
      return {
        ...state,
        Events: eventsWithDate,
        
      };
          case GET_BY_CITY:
            return {
              ...state, city: action.payload
            }
            case FILTER_BY_CITY:
              const Citys = state.allEvents
              const EventsWithCity = action.payload === 'all'

              ? Citys

              : Citys.filter(cit => cit.city.includes(action.payload))
              return {
                ...state,
                Events: EventsWithCity
              }
              case GET_BY_DATE:
                return {
                  ...state, date: action.payload
                }
                case GET_RESET:
                  return {
                    ...state,
                    Events: state.allEvents
                  }
                  case GET_RESET_ORDER:
                    return {
                      ...state,
                      allEvents: [...state.allEvents]
                    }
                    
    default:
      return state;
  }
};


export default rootReducer;
