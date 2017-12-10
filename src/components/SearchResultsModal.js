import React, { Component } from 'react'

class SearchResultsModal extends Component {

  render() {
    return (
      <div className="resultsModal">
        <h2 className="ResultsTitle">Search Results for "{this.props.searchQuery}"</h2>
        <span className="closeModal pointer" onClick={() => this.props.hideResultsModal()}>X</span>
        <div className="clear"></div>
        <div className="resultsContainer">
          {this.props.results.map((re, i) => (
            <div key={i} onClick={() => this.props.selectArtist(re.id, re.name)} className="resultBox">
              <img className="coverImage pointer" alt="artist" src={re.picture_medium} />
              <p className="pointer">{re.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default SearchResultsModal
