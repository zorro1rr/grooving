//variables for client ID and redirect URI
const clientId = '5ac18e2dcacf4b9fba01cb5bc3be2240';
// const redirectUri = 'https://zorro1rr.github.io/Grooving/';
const redirectUri = 'http://localhost:3000';
//variable that will hold user's access token
let accessToken;




//Spotify module
const Spotify = {
    //method to get user's access token
    getAccessToken() {
        //check if there is an accessToken defined, if so return it's value
        if (accessToken) {
            return accessToken;
        }
        //if not already set check the URL to see if it has just been obtained
        //window.location.href checks the current url and .match() with Regex to check for the token
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        //now use same object/method (different regex) to get the experation time
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        //now check if accessTokenMatch and expiresInMatch are in url
        if (accessTokenMatch && expiresInMatch) {
            //set the value of accessToken
            accessToken = accessTokenMatch[1];
            //make variable for the expiration time
            let expiresIn = Number(expiresInMatch[1]);
            //Clear the parameters so we can grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
            //if you still don't have the accessToken redirect users with window.location
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl;
        }
    },
    //method accepting search term input, passes search term value to a Spotify request
    //and returns the response as a list of tracks in JSON format
    search(term) {
        const accessToken = Spotify.getAccessToken();
        //start promise chain be returning GET request using fetch()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
            //convert the response to JSON
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            //make sure that some tracks actually exist
            if (!jsonResponse.tracks) {
                return [];
            }
            // return a mapped array with a list of track objects to pass to states in App.js
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    previewTrack(track) {
        const accessToken = Spotify.getAccessToken();
        //start promise chain be returning GET request using fetch()
        return fetch(`https://api.spotify.com/v1/tracks/${track}?market=US`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
            //convert the response to JSON
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            //make sure that some tracks actually exist
            console.log(jsonResponse.preview_url);
            return jsonResponse.preview_url;
        });
    },

     async getPlaylists() {
        // variables: for current user's access token (grabbed from the method above)
        const accessToken = Spotify.getAccessToken()
        // for Authorization parameter in implicit grant flow request format
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        }
        // empty variable for user's ID
        const userData = await fetch(
            `https://api.spotify.com/v1/me`, {
                headers: headers,
            },
            // convert response to JSON
        )
        const {id: userId} = await userData.json();
        const playlistsData = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
        })
        const playlists = await playlistsData.json();
        if (!playlists.items) {
            console.log('no saved playlists');
            return;
        }
        //variables to push playlist names and tracklists to
             let playlistNames =  [];
             let playlistTracks = [];
            //  let playlistObject = {};
             let playlistArr = [];
        //make array of fetch promises to get each tracklist
         const fetchPromises = playlists.items.map(function(playlist) {
              const playlistArr = playlist.name;
              playlistNames.push(playlistArr);
      
               return fetch(playlist.tracks.href, {
                 headers: {
                   Authorization: `Bearer ${accessToken}`
               }
            })
          })
           fetchPromises.forEach(fProm => {
                  fProm
                    .then(response => response.json())
                    .then(jsonResponse => {
                      console.log('returned json data from each fetch promise', jsonResponse);
                const tracklist =  jsonResponse.items.map(track => {
                        //  return {
                        //    track: track.track.name,
                        //    id: track.track.id
                        //  }
                        return track.track.name
                        })  
                        playlistTracks.push(tracklist);  
                        return tracklist;
                    }) 
                   })
                
                   console.log('playlist names', playlistNames);
                   console.log('playlist tracks', playlistTracks);
                //    setTimeout(function(){  for(let i =0 ; i < playlistNames.length; i++){
                //     playlistObject[playlistNames[i]] = playlistTracks[i]
                //   } }, 1000);
           
                  setTimeout(function(){ 
                      for (let i =0 ; i < playlistNames.length; i++){
                      let playlistAr = [];
                    playlistAr.push(playlistNames[i], playlistTracks[i]);
                    playlistArr.push(playlistAr);
                  } 
                }, 1000);
                  console.log('playlistArr', playlistArr);

            // console.log('playlist Object made from names and tracks, to be returned to App.js', playlistObject);
            // return  playlistObject;   
            return playlistArr;
    },



    //method that writes the learner's custom playlight in this app to their Spotify account
    savePlaylist(name, trackUris) {
        //first make sure name and trackuris actually have values saved to them
        if (!name || !trackUris.length) return;
        //variables: for current user's access token (grabbed from the method above)
        const accessToken = Spotify.getAccessToken();
        //for Authorization parameter in implicit grant flow request format
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        //empty variable for user's ID
        let userId;
        //make request that returns user's Spotify username
        return fetch(`https://api.spotify.com/v1/me`, {
                headers: headers
            }
            //convert response to JSON
        ).then(response => response.json()
            //save the response id to the user's ID variable
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            //Use the returned userId to make POST request with Spotify endpoint
            //to request creation of new playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                //key value for name is one of the parameters for this method
                body: JSON.stringify({
                    name: name
                })
            }).then(response => response.json()).then(jsonResponse => {
                //get the playlist with the response id
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({
                        uris: trackUris
                    })
                });
            });      
        });
    },

    deletePlaylist(playlist) {
    const accessToken = Spotify.getAccessToken();
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };
        return fetch(`https://api.spotify.com/v1/playlists/${playlist}/followers`, {
            headers: headers,
            method: 'DELETE'
        }) 
        
    }

};



export default Spotify;