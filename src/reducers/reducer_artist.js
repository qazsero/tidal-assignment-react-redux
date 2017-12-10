import {GET_ARTIST_INFO, GET_ARTIST_INFO_SUCCESS, GET_ARTIST_INFO_FAIL} from '../actions/types'

const initialState = {
  artistName: null,
  albums: [],
  error: null,
  loading: false
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_ARTIST_INFO:
      return {...initialState, loading:true}
    case GET_ARTIST_INFO_SUCCESS:
      return {...state, artistName: action.meta, albums: action.payload, loading: false}
    case GET_ARTIST_INFO_FAIL:
      return {...initialState, error: true, loading: false}
    default:
      return state
  }
}
