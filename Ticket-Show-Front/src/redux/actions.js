import axios from 'axios'

export const GET_EVENTS = 'GET_EVENTS'

export const getEvents = () => {
    return async(dispatch) => {
        dispatch({
            type:GET_EVENTS,
            payload: Events
        })
    }
}
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const filterByGenres = (payload) => {
    return {
        type: FILTER_BY_GENRES,
        payload: genres
    }
}