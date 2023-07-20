import {
  FILTER_BY_GENRES,
  GET_EVENTS,
  GET_GENRES,
  ORDER_BY_DATE,
} from "./actions";

const initialState = {
  Events: [],
  allEvents: [],
  genres: [],
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
              if (a.even > b.even) return 1;
              if (b.even > a.even) return -1;
              return 0;
            })
          : state.Events.sort((a, b) => {
              if (a.even > b.even) return -1;
              if (b.even > a.even) return 1;
              return 0;
            });
      return {
        ...state,
        Events: EventsByDate,
      };
    default:
      return { ...state };
  }
};
export default rootReducer;
