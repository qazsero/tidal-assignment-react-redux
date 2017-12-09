import {GET_ARTIST_INFO} from '../actions/types'

export default function (state={}, action) {
  switch(action.type) {
    case GET_ARTIST_INFO:
      return {artistName: action.meta, albums: action.payload.data}
    default:
      return state
  }
}
