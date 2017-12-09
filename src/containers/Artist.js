import React, { Component } from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'

import * as actions from '../actions'


class Artist extends Component {

  render() {
    const {artist} = this.props

    //If there aren't any albums, do not show anything
    if(_.isEmpty(artist)) {
      return (
        <div className="albums">
        </div>
      )
    }

    //Deconstructing the artist object to get the name and albums
    const {artistName, albums} = artist

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

//La diferencia entre contenedores y componentes es que
//contenedores son componentes conectados con redux
export default connect(mapStateToProps, actions)(Artist)
