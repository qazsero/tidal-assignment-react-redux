import {GET_ALBUM, ADD_TRACK, GET_ALBUM_FAILED, REMOVE_ALBUM} from '../actions/types'

const initialState = {
  album: {},
  tracks: [],
  error: null
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_ALBUM:
      return {...state, album: action.payload}
    case ADD_TRACK:
      return {...state, tracks: [...state.tracks, action.payload]}
    case GET_ALBUM_FAILED:
      return {...state, error: true}
    case REMOVE_ALBUM:
      return initialState
    default:
      return state
  }
}
