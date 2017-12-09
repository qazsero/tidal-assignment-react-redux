import React, { Component } from 'react'
import {connect} from 'react-redux'

import * as actions from '../actions'
import SearchSuggestions from '../components/SearchSuggestions'


class Search extends Component {
  state={
    userInput:'',
    areSuggestionsFocused: false,
  }

  //These 2 functions hide or show the box
  showSuggestions = () => {
    this.setState({areSuggestionsFocused:true})
  }

  hideSuggestions = () => {
    this.setState({areSuggestionsFocused:false})
  }

  //this searches through the API every time a user press a key
  updateSuggestions = userInput => {
    this.setState({userInput})
    this.props.getSearchResults(userInput)
  }

  //If the user clicks on an artist from the results, he (or she, or the band)
  //should be loaded
  selectArtist = (artistId, artistName) => {
    this.hideSuggestions()
    this.props.getArtistsAlbums(artistId, artistName)
  }


  render() {

    const {suggestions} = this.props.suggestions

    return (
      <div className="search" >
        <div className="searchRow">
          <div className="inputCol">
            <input
              className="searchInput"
              placeholder="Search here"
              onChange={event => this.updateSuggestions(event.target.value)}
              onFocus={() => this.showSuggestions()} />

            <SearchSuggestions
              suggestions={suggestions}
              areSuggestionsFocused={this.state.areSuggestionsFocused}
              selectArtist={this.selectArtist}
              hideSuggestions={this.hideSuggestions}
            />
          </div>
          <button className="searchButton">SEARCH</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({suggestions}){
  return {
    suggestions
  }
}

export default connect(mapStateToProps, actions)(Search)
