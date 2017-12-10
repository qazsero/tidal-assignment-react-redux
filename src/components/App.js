import React, { Component } from 'react'

import Search from '../containers/Search'
import Album from '../containers/Album'
import Artist from '../containers/Artist'
import '../App.css'
import '../Transitions.css'


class App extends Component {
  render() {
    return (
      <div className="app">
        <Search />
        <Artist />
        <Album />
      </div>
    );
  }
}


export default App
