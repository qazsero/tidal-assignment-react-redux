import {GET_SUGGESTIONS, GET_ARTIST_INFO, GET_ALBUM, ADD_TRACK, REMOVE_ALBUM} from './types'
import {fetchData} from '../utils'

const ROOT_URL = 'https://api.deezer.com'


//Get the search results from the Deezer API
export const getSearchResults = userInput => {
  let qstring = `${ROOT_URL}/search/artist?q=artist:"${userInput}"`
  const request = fetchData(qstring)

  return{
    type: GET_SUGGESTIONS,
    payload: request
  }
}

//Get the albums from an artist
export const getArtistsAlbums = (artistId, artistName) => {
  let qstring = `${ROOT_URL}/artist/${artistId}/albums`
  const request = fetchData(qstring)

  return{
    type: GET_ARTIST_INFO,
    meta: artistName,
    payload: request
  }
}


/*******************
Now we want to fetch the tracks from the selected album.
Before we can do this, we need to fetch de album from the API
******************/

//Function to get the single album, to get the tracks, fetch them, and add them
//to the store
export const getNewAlbum = albumId => async dispatch => {

  //If there is any, remove previous Album
  dispatch(removePreviousAlbum())

  //Fetch the album info
  let qstring = `${ROOT_URL}/album/${albumId}`
  let album = fetchData(qstring)
  //Now that we have the full album info We save the basic album info in store
  album.then((album) => dispatch(saveAlbum(album)))
  //And add the tracks
  album.then((album) => {
    album.tracks.data.forEach((tr) => dispatch(getTrack(tr.id)))
  })
}

//Saves the new fetched album to the store
const saveAlbum = album => (
  {
    type: GET_ALBUM,
    payload: album
  }
)

//Function to retrieve a song
const getTrack = (trackId) => {

  let qstring = `${ROOT_URL}/track/${trackId}`
  const request = fetchData(qstring)

  return {
    type: ADD_TRACK,
    payload: request
  }
}

//Removes every track in store
const removePreviousAlbum = () => (
  {type: REMOVE_ALBUM}
)
