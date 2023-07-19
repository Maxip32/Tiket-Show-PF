import axios from 'axios'


export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const filterByGenres = (payload) => {
    return {
        type: FILTER_BY_GENRES,
        payload: genres
    }
}