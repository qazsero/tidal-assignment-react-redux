import {GET_SUGGESTIONS, GET_SUGGESTIONS_FAILED} from '../actions/types'

const initialState = {
  suggestions: [],
  error: null
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_SUGGESTIONS:
      return {...initialState, suggestions: action.payload.data}
    case GET_SUGGESTIONS_FAILED:
      return {...initialState, error: true}
    default:
      return state
  }
}
