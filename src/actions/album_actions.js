import {GET_ALBUM, GET_ALBUM_SUCCESS, GET_ALBUM_FAIL} from './types'
import {fetchData} from '../utils'


/*******************
Now we want to fetch the tracks from the selected album.
Before we can do this, we need to fetch de album from the API
******************/

//Function to get the single album, to get the tracks, fetch them, and add them
//to the store
export const getNewAlbum = albumId => dispatch => {
  //Clear the album store and show a loading flag
  dispatch({type: GET_ALBUM})

  //Fetch the album info
  let qstring = `/album/${albumId}`
  fetchData(qstring)
  .then(async (albumData) => {
    if(albumData.error) {dispatch(getNewAlbumFail())}
    else {

      //Create a lightweight object of the album for the store
      const album = (({ title, cover_medium }) => ({ title, cover_medium }))(albumData);

      //Let's save the tracks in an array
      let tracks = []

      await Promise.all(albumData.tracks.data.map(async (tr) => {
        let qstring = `/track/${tr.id}`
        await fetchData(qstring)
        .then((data) => {
          if(data.error){dispatch(getNewAlbumFail())}
          else{
            //Create a lightweight object of the track for the store and save it
            const {title, artist:{name:artistName}, duration, release_date} = data
            tracks.push({title, artistName, duration, release_date})
          }
        })
        .catch(() => dispatch(getNewAlbumFail()))
      }));

      //Sometimes the track array is disodered. Time to order
      tracks.sort((a, b) => a.track_position - b.track_position)

      dispatch(getNewAlbumSuccess({album, tracks}))
    }
  })
  .catch(() => dispatch(getNewAlbumFail()))
}

//Error handling if API limit were exceded
const getNewAlbumFail = error => ({type:GET_ALBUM_FAIL})

//Succesfully saving the track to state
const getNewAlbumSuccess = album => ({type: GET_ALBUM_SUCCESS, payload: album})
