import {GET_RESULTS_SUCCESS, GET_RESULTS_FAIL} from '../actions/types'

const initialState = {
  results: [],
  error: null
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_RESULTS_SUCCESS:
      return {...initialState, results: action.payload}
    case GET_RESULTS_FAIL:
      return {...initialState, error: true}
    default:
      return state
  }
}
