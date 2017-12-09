import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import ReduxPromise from 'redux-promise'
import thunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

const middleware = [thunk, ReduxPromise]
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

ReactDOM.render(
  <Provider  store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
)
