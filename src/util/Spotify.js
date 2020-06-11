//variables for client ID and redirect URI
const clientId = process.env.REACT_APP_CLIENTID;
const redirectUri = "https://zorro1rr.github.io/grooving/";
// const redirectUri = "http://localhost:3000";
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
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
      //if you still don't have the accessToken redirect users with window.location
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },
  //method for logout
  logout() {
    const url = "https://www.spotify.com/logout/";
    const spotifyLogoutWindow = window.open(
      url,
      "Spotify Logout",
      "width=700,height=500,top=40,left=40"
    );
    setTimeout(() => {
      spotifyLogoutWindow.close();
      window.location.reload();
    }, 1200);
  },
  //method accepting search term input, passes search term value to a Spotify request
  //and returns the response as a list of tracks in JSON format
  async search(term) {
    const accessToken = Spotify.getAccessToken();
    //start promise chain be returning GET request using fetch()
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      //convert the response to JSON
    );
    const jsonResponse = await response.json();
    //make sure that some tracks actually exist
    if (!jsonResponse.tracks) {
      return [];
    }
    // return a mapped array with a list of track objects to pass to states in App.js
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async previewTrack(track) {
    const accessToken = Spotify.getAccessToken();
    //start promise chain be returning GET request using fetch()
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${track}?market=US`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      //convert the response to JSON
    );
    const jsonResponse = await response.json();
    //make sure that some tracks actually exist
    console.log(jsonResponse.preview_url);
    return jsonResponse.preview_url;
  },

  async getPlaylists() {
    // variables: for current user's access token (grabbed from the method above)
    const accessToken = Spotify.getAccessToken();
    // for Authorization parameter in implicit grant flow request format
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    // empty variable for user's ID
    const userData = await fetch(
      `https://api.spotify.com/v1/me`,
      {
        headers: headers,
      }
      // convert response to JSON
    );
    const { id: userId } = await userData.json();
    const playlistsData = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
      }
    );
    const playlists = await playlistsData.json();

    if (!playlists.items) {
      console.log("no saved playlists");
      return;
    }
    //variables to push playlist names and tracklists to
    let playlistNames = [];
    let playlistTracks = [];
    //  let playlistObject = {};
    let playlistArr = [];
    //grab playlist hrefs, ids, names
    const urls = playlists.items.map((playlist) => {
      const playlistArr = [];
      const Id = playlist.id;
      const name = playlist.name;
      const href = playlist.tracks.href;
      playlistArr.push(name, Id, href);
      playlistNames.push(playlistArr);
      return playlist.tracks.href;
    });

    //fetch each  playlist href
    await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        //pushing tracks and track href to match if playlist name
        let tracks = [];
        const jsonResponse = await response.json();
        const tracklist = jsonResponse.items.map((track) => {
          return track.track.name;
        });
        tracks.push(response.url, tracklist);
        playlistTracks.push(tracks);
      })
    );

    //because the promises are returning at different times we match up the hrefs or the names and the tracks
    //and push them into a single array
    playlistNames.forEach((playlist) => {
      let trackArr = [];
      const href = playlist[2];
      const filteredTracks = playlistTracks.filter(
        (tracks) => tracks[0] === href
      );
      trackArr.push(playlist, filteredTracks[0][1]);
      playlistArr.push(trackArr);
    });

    // for (let i = 0; i < playlistNames.length; i++) {
    //   let playlistAr = [];
    //   playlistAr.push(playlistNames[i], playlistTracks[i]);
    //   playlistArr.push(playlistAr);
    // }
    // console.log('playlist Object made from names and tracks, to be returned to App.js', playlistObject);
    // return  playlistObject;
    // console.log('playlistArr', playlistArr)
    return playlistArr;
  },

  //method that writes the learner's custom playlight in this app to their Spotify account
  async savePlaylist(name, trackUris) {
    //first make sure name and trackuris actually have values saved to them
    if (!name || !trackUris.length) return;
    //variables: for current user's access token (grabbed from the method above)
    const accessToken = Spotify.getAccessToken();
    //for Authorization parameter in implicit grant flow request format
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    //empty variable for user's ID
    let userId;
    //make request that returns user's Spotify username
    const response = await fetch(
      `https://api.spotify.com/v1/me`,
      {
        headers: headers,
      }
      //convert response to JSON
    );
    const jsonResponse = await response.json();
    userId = jsonResponse.id;
    const response_1 = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: "POST",
        //key value for name is one of the parameters for this method
        body: JSON.stringify({
          name: name,
        }),
      }
    );
    const jsonResponse_1 = await response_1.json();
    //get the playlist with the response id
    const playlistId = jsonResponse_1.id;
    return fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );
  },

  deletePlaylist(playlist) {
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return fetch(`https://api.spotify.com/v1/playlists/${playlist}/followers`, {
      headers: headers,
      method: "DELETE",
    });
  },
};

export default Spotify;
