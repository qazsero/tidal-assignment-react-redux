import {combineReducers} from 'redux'
import SuggestionsReducer from './reducer_suggestions'
import artistReducer from './reducer_artist'
import albumReducer from './reducer_album'


const rootReducer = combineReducers({
  suggestions: SuggestionsReducer,
  artist: artistReducer,
  album: albumReducer
})

export default rootReducer
