import {combineReducers} from 'redux'
import ResultsReducer from './reducer_results'
import artistReducer from './reducer_artist'
import albumReducer from './reducer_album'


const rootReducer = combineReducers({
  results: ResultsReducer,
  artist: artistReducer,
  album: albumReducer
})

export default rootReducer
