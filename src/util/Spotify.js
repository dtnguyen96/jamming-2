const clientId = '52580a2556754c24b35f547cc6b21976';
const redirectUri = 'http://letsjamm.surge.sh/'
let userAccessToken;
//module to communitcate with Spotify API
const spotify = {
    //method to get get user access token
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }
        //ELSE: extract the access token and expire time from the URL obtained
        //window.locattion.href returns current site URL
        const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        //If access token and expiration time is in the url then set those variables up
        if (userAccessTokenMatch && expiresInMatch) {
            userAccessToken = userAccessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            /*Clear the parameters from the URL, 
            so the app doesn’t try grabbing the access token after it has expired */
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {
            //Else redirect user to the following URL
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirectUri}`
            window.location = accessUrl;
        }
    },
    //method to return a promise that will eventually resolve to a list of tracks
    search(userSearch) {
        //get user Access Token
        const userAccessToken = spotify.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + userAccessToken
        }
        //search spotify api, resolve in a list of tracks
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${userSearch}`, {
            headers: headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
            if (!jsonResponse.tracks) {
                // if there is no tracks, return an empty array
                return [];
            }
            // ELSE map the json object array to a javascript object 
            return jsonResponse.tracks.items.map(track => {
                return ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri

                })
            })
        })
    },
    //method to allow users to save the playlist generated to their local spotify account 
    savePlaylist(playlistName, uriArray) {
        if (!playlistName || !uriArray.length) {
            return;
        }
        const access_token = spotify.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            userId = jsonResponse.id;
            //POST request to create new playlist in users' account
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({
                        name: playlistName
                    }),
                }).then(response => response.json())
                .then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    //POST request to add tracks to playlist
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({
                            uris: uriArray
                        })
                    })
                })
        })
    }


}
export default spotify;