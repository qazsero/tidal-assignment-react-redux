import React, { Component } from 'react'
import {connect} from 'react-redux'

import * as actions from '../actions'
import SearchSuggestions from '../components/SearchSuggestions'
import SearchResultsModal from '../components/SearchResultsModal'


class Search extends Component {
  state={
    userInput:'',
    showSuggestions: false,
    showModal: false,
  }

  //These 2 functions hide or show the suggestions box
  showSuggestions = () => {
    this.setState({showSuggestions:true})
  }

  hideSuggestions = () => {
    this.setState({showSuggestions:false})
  }

  //this searches through the API every time a user press a key
  updateSuggestions = userInput => {
    this.setState({userInput})
    this.props.getSearchResults(userInput)
  }

  //these 2 functions hide or show the modal with the results
  showResultsModal = () => {
    this.setState({showModal:true})
  }

  hideResultsModal = () => {
    this.setState({showModal:false})
  }

  //If the user clicks on an artist from the results, he (or she, or the band)
  //should be loaded
  selectArtist = (artistId, artistName) => {
    this.hideSuggestions()
    this.hideResultsModal()
    this.props.getArtistsAlbums(artistId, artistName)
  }


  render() {

    const {results} = this.props.results

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
              suggestions={results}
              visible={this.state.showSuggestions}
              selectArtist={this.selectArtist}
              hideSuggestions={this.hideSuggestions}
            />
          </div>
          <button onClick={() => this.showResultsModal()} className="searchButton">SEARCH</button>
        </div>
        <SearchResultsModal
          results={results}
          searchQuery={this.state.userInput}
          visible={this.state.showModal}
          selectArtist={this.selectArtist}
          hideResultsModal={this.hideResultsModal} />
      </div>
    );
  }
}

function mapStateToProps({results}){
  return {
    results
  }
}

export default connect(mapStateToProps, actions)(Search)
