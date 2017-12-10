import {GET_ARTIST_INFO, GET_ARTIST_INFO_SUCCESS, GET_ARTIST_INFO_FAIL } from './types'
import {fetchData} from '../utils'


//Get the albums from an artist
export const getArtistsAlbums = (artistId, artistName) => dispatch => {
  //Starting the fetch albums process
  dispatch({type:GET_ARTIST_INFO})

  let qstring = `/artist/${artistId}/albums`
  fetchData(qstring)
  .then((data) => {
    if(data.error) {dispatch(getArtistsAlbumsFail())}
    else {
      //Creating lightweight array of the albums
      let albums = data.data.map((a) => ({id:a.id, title:a.title, cover_medium:a.cover_medium}))
      //Uploading to the store
      dispatch(getArtistsAlbumsSuccess(albums, artistName))
    }
  })
  .catch(() => dispatch(getArtistsAlbumsFail()))
}

const getArtistsAlbumsFail = error => ({type:GET_ARTIST_INFO_FAIL})
const getArtistsAlbumsSuccess = (data, artistName) => ({type: GET_ARTIST_INFO_SUCCESS, meta: artistName, payload: data})
