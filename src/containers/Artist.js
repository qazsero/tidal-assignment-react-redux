import React, { Component } from 'react'
import {connect} from 'react-redux'

import * as actions from '../actions'


class Artist extends Component {

  render() {

    //Deconstructing the artist object to get the name and albums
    const {artistName, albums, error, loading} = this.props.artist

    //If there is an error, report it
    if(error !== null) {
      return (
        <div>An error had happened. Please try again</div>
      )
    }

    //If it is loading, show a loading spinner
    if(loading === true) {
      return (
        <div>Loading...</div>
      )
    }

    //If there aren't any albums, do not show anything
    if(artistName === null) {
      return (
        <div className="albums">
        </div>
      )
    }

    return (
      <div className="albums" >
        <h2>Search results for "{artistName}"</h2>
        <hr className="greyLine" />
        <h2 className="blueTitle">ALBUMS</h2>
        <div className="albumRow">
          {albums.map(a => (
            <div className="singleAlbum" onClick={() => this.props.getNewAlbum(a.id)} key={a.id}>
              <img className="coverImage pointer" alt="cover" src={a.cover_medium} />
              <p className="pointer">{a.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({artist}){
  return {
    artist
  }
}

export default connect(mapStateToProps, actions)(Artist)
