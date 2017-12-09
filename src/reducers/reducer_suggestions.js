import {GET_SUGGESTIONS} from '../actions/types'

export default function (state=[], action) {
  switch(action.type) {
    case GET_SUGGESTIONS:
      return action.payload.data
    default:
      return state
  }
}
