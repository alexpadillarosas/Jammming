import * as queryString from 'query-string';

const CLIENT_ID = '88f41d79cf5f4106befab0fc516f4402';
const RESPONSE_TYPE = 'token';
const URI_CALLBACK = 'http://10.0.0.4:3000/callback'
const CLIENT_GENERATED_TOKEN = 'test';
const SCOPE = 'user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private';
const SHOW_DIALOG = true;
const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const BASE_ENDPOINT = 'https://api.spotify.com/v1';
const SEARCH_ENDPOINT = BASE_ENDPOINT + "/search";
const USER_CREDENTIALS = BASE_ENDPOINT + "/me";
const USER_PLAYLIST = BASE_ENDPOINT + "/users";

let accessToken;
let userId;

const Spotify = {
  logIn() {
    // Redirects user to the Spotify authentication
    window.location = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${URI_CALLBACK}&state=${encodeURIComponent(CLIENT_GENERATED_TOKEN)}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`;
    console.log("after redirecting");

  },
  retrieveToken() {
    {/* check the URL*/}
    const query = queryString.parse(window.location.hash);
    console.log(query);
    {/* there is a token in the URL */}
    if(query.access_token){
      accessToken = query.access_token;
      return accessToken;
    }else{
      {/*redirect to spotify website*/}
      this.logIn();
    }
  },
  search(word) {


        if(!accessToken){
          accessToken = this.retrieveToken();
        }
        {/* Fetch all data */}
        console.log(accessToken);
        let endpoint = `${SEARCH_ENDPOINT}?q=${word}&type=track`;
        console.log(endpoint);
        return fetch(endpoint,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then( response => {
            return response.json();
        }).then(jsonResponse => {
            {/*console.log(jsonResponse);*/}
            if(jsonResponse.tracks.items){
              return jsonResponse.tracks.items.map( item => {
                return {
                  id: item.id,
                  name: item.name,
                  album: item.album.name,
                  artist: item.artists[0].name + (item.artists[1]? " / " + item.artists[1].name : ''),
                  uri: item.uri,
                  preview: item.preview_url
                }
              } );
            }
        })

    
  },

  getUserCredentials() {
    try{
         return fetch(USER_CREDENTIALS, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then( response => {
              if(response.ok){
                return response.json();
              }
              throw new Error('Request failed!');
            }, (networkError) => {
                  console.log(networkError.message);
               }
         ).then( jsonResponse => {
              return jsonResponse;
         }) ;
     }catch(error){
       console.log(error);
     }
  },

  savePlaylist(name, tracks){
    const accessToken = this.retrieveToken();
    let userId;
    let playlistId;
    let snapshotid;

    if(name !== '' && tracks !== ''){
      this.getUserCredentials().then( response => {
         if(response.id){
           userId = response.id;
         }
         return fetch(`${USER_PLAYLIST}/${userId}/playlists`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              method: 'POST',
              body: JSON.stringify({name: name})
            }
          ).then(response => {
            if (response.ok) {
              return response.json();
            }else{
              console.log('failed create new playlist');
            }
          }
        ).then( jsonResponse => {
            if(jsonResponse.id){
              playlistId = jsonResponse.id;
            }
            return fetch(`${USER_PLAYLIST}/${userId}/playlists/${playlistId}/tracks`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`
                  },
                  method: 'POST',
                  body: JSON.stringify({ uris: tracks })
                });
        });
       }
     );


    }

  }


}



export default Spotify;
