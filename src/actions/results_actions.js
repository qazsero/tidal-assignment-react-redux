import {GET_RESULTS_SUCCESS, GET_RESULTS_FAIL} from './types'
import {fetchData} from '../utils'

//Get the search results from the Deezer API
export const getSearchResults = userInput => dispatch => {
  let qstring = `/search/artist?q=artist:"${userInput}"`
  fetchData(qstring)
  .then((data) => {
    if(data.error) {dispatch(getSearchResultsFail())}
    else {
      //Create a lightweight object of the search results
      let results = data.data.map((re) => ({id:re.id, name:re.name, picture_medium: re.picture_medium}))

      //Upload the result
      dispatch(getSearchResultsSuccess(results))
    }
  })
  .catch(() => dispatch(getSearchResultsFail()))
}

const getSearchResultsFail = () => ({type:GET_RESULTS_FAIL})
const getSearchResultsSuccess = data => ({type: GET_RESULTS_SUCCESS, payload: data})
