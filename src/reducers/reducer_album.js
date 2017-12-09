import {GET_ALBUM, ADD_TRACK, REMOVE_ALBUM} from '../actions/types'

const initialState = {
  album: {},
  tracks: []
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_ALBUM:
      return {album: action.payload, tracks: state.tracks}
    case ADD_TRACK:
      return {album: state.album, tracks: [...state.tracks, action.payload]}
    case REMOVE_ALBUM:
      return initialState
    default:
      return state
  }
}
