import {GET_SUGGESTIONS, GET_SUGGESTIONS_FAILED, GET_ARTIST_INFO, GET_ARTIST_INFO_FAILED, GET_ALBUM, ADD_TRACK, GET_ALBUM_FAILED, REMOVE_ALBUM} from './types'
import {fetchData} from '../utils'

const ROOT_URL = 'https://api.deezer.com'


//Get the search results from the Deezer API
export const getSearchResults = userInput => dispatch => {
  let qstring = `${ROOT_URL}/search/artist?q=artist:"${userInput}"`
  fetchData(qstring)
  .then((data) => {
    if(data.error) {dispatch(getSearchResultsFail())}
    else {dispatch(getSearchResultsSuccess(data))}
  })
  .catch(() => dispatch(getSearchResultsFail()))
}

const getSearchResultsFail = () => ({type:GET_SUGGESTIONS_FAILED})
const getSearchResultsSuccess = data => ({type: GET_SUGGESTIONS, payload: data})


//Get the albums from an artist
export const getArtistsAlbums = (artistId, artistName) => dispatch => {
  let qstring = `${ROOT_URL}/artist/${artistId}/albums`
  fetchData(qstring)
  .then((data) => {
    if(data.error) {dispatch(getArtistsAlbumsFail())}
    else {dispatch(getArtistsAlbumsSuccess(data, artistName))}
  })
  .catch(() => dispatch(getArtistsAlbumsFail()))
}

const getArtistsAlbumsFail = error => ({type:GET_ARTIST_INFO_FAILED})
const getArtistsAlbumsSuccess = (data, artistName) => ({type: GET_ARTIST_INFO, meta: artistName, payload: data})


/*******************
Now we want to fetch the tracks from the selected album.
Before we can do this, we need to fetch de album from the API
******************/

//Function to get the single album, to get the tracks, fetch them, and add them
//to the store
export const getNewAlbum = albumId => dispatch => {
  //If there is any, remove previous Album
  dispatch({type: REMOVE_ALBUM})

  //Fetch the album info
  let qstring = `${ROOT_URL}/album/${albumId}`
  fetchData(qstring)
  .then((album) => {
    if(album.error) {dispatch(getNewAlbumFail())}
    else {
      //Now that we have the full album info We save the basic album info in store
      dispatch(getNewAlbumSuccess(album))
      //And add the tracks, we had to go track by track
      album.tracks.data.forEach((tr) => dispatch(getTrack(tr.id, dispatch)))
    }
  })
  .catch(() => dispatch(getNewAlbumFail()))
}

//Error handling if API limit were exceded
const getNewAlbumFail = error => ({type:GET_ALBUM_FAILED})

//Succesfully saving the track to state
const getNewAlbumSuccess = album => ({type: GET_ALBUM, payload: album})

//Function to retrieve a song
const getTrack = (trackId, dispatch) => dispatch => {
  let qstring = `${ROOT_URL}/track/${trackId}`
  fetchData(qstring)
  .then((data) => {
    if(data.error){dispatch(getNewAlbumFail())}
    else{dispatch(getTrackSuccess(data))}
  })
  .catch(() => dispatch(getNewAlbumFail()))
}

//Succesfully saving the track to state
const getTrackSuccess = data => ({type: ADD_TRACK, payload: data})
