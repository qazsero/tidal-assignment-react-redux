import React, { Component } from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'

import * as actions from '../actions'
import {fancyTimeFormat} from '../utils'


class Album extends Component {

  renderTrackList() {
    const {tracks} = this.props.album

    return tracks.map((tr, index) => {

      let duration = tr.duration ? fancyTimeFormat(tr.duration) : '0:00'
      let release_year = tr.release_date ? tr.release_date.substr(0,4) : '0000'

      return (
        <tr key={index}>
          <td></td>
          <td>{index+1}</td>
          <td className="tableSeparator" >{tr.title}</td>
          <td className="tableSeparator" >{tr.artistName}</td>
          <td className="tableSeparator" >{duration}</td>
          <td className="tableSeparator" >{release_year}</td>
        </tr>
      )
    })
  }

  ErrorComponent = () => {
    const {error} = this.props.album

    //If there is an error, report it
    if(error !== null) {
      return (
        <div>An error had happened. Please try again</div>
      )
    }
  }

  LoadingComponent = () => {
    const {loading} = this.props.album


    //If it is loading, show a loading spinner
    if(loading === true) {
      return (
        <div>Loading...</div>
      )
    }
  }

  AlbumComponent = () => {
    const {album, error, loading} = this.props.album

    //If there is no info, do not show anything
    if(!_.isEmpty(album)) {
      return (
        <div>
          <div className="albumInfo">
            <img className="coverImage" alt="cover-main" src={album.cover_medium} />
            <h2 className="blueTitle" >{album.title}</h2>
          </div>

          <table>
            <thead>
              <tr>
                <th className="table__whitespace-header"></th>
                <th className="table__number-header">#</th>
                <th className="table__title-header">Title</th>
                <th className="table__artist-header">Artist</th>
                <th className="table__time-header">Time</th>
                <th className="table__release-header">Released</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTrackList()}
            </tbody>

          </table>
        </div>
      )
    }
  }


  render() {

    return (
      <div className="tracks" >
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={200}>
          {this.LoadingComponent()}
          {this.ErrorComponent()}
          {this.AlbumComponent()}
        </CSSTransitionGroup>
      </div>
    );
  }
}

function mapStateToProps({album}){
  return {
    album
  }
}

export default connect(mapStateToProps, actions)(Album)
