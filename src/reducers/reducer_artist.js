import {GET_ARTIST_INFO, GET_ARTIST_INFO_FAILED} from '../actions/types'

const initialState = {
  error: null,
  artistName: null,
  albums: []
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_ARTIST_INFO:
      return {artistName: action.meta, albums: action.payload.data}
    case GET_ARTIST_INFO_FAILED:
      return {...initialState, error: true}
    default:
      return state
  }
}
