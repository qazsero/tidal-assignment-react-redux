import {GET_ALBUM, GET_ALBUM_SUCCESS, GET_ALBUM_FAIL} from '../actions/types'

const initialState = {
  album: {},
  tracks: [],
  error: null,
  loading: false
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_ALBUM:
      return {...initialState, loading:true}
    case GET_ALBUM_SUCCESS:
      return {...initialState, album: action.payload.album, tracks:action.payload.tracks}
    case GET_ALBUM_FAIL:
      return {...initialState, error: true}
    default:
      return state
  }
}
