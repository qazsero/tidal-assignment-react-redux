import {GET_SUGGESTIONS, GET_SUGGESTIONS_FAILED} from '../actions/types'

const initialState = {
  results: [],
  error: null
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_SUGGESTIONS:
      return {...initialState, results: action.payload.data}
    case GET_SUGGESTIONS_FAILED:
      return {...initialState, error: true}
    default:
      return state
  }
}
