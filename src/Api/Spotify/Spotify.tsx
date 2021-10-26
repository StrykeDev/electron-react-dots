import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Spotify.css';

const CLIENT_ID = '8e80fbf104a44c3492432f5da2d5258a';
const REDIRECT_URI = 'http://localhost:3000/auth.html';
const STATE = 'a5b045c2-9ac7-4e1f-a907-390f448bacf9';
const SHOW_DIALOG = false;
const SCOPE = [
   'user-read-private',
   'user-read-email',
   'user-top-read',
   'user-read-recently-played',
];

function createAuthorizeURL(): string {
   let url = 'https://accounts.spotify.com/authorize?response_type=token';
   url += '&client_id=' + encodeURIComponent(CLIENT_ID);
   url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
   url += '&scope=' + encodeURIComponent(SCOPE.join(' '));
   url += '&state=' + encodeURIComponent(STATE);
   url += '&show_dialog=' + encodeURIComponent(SHOW_DIALOG);
   return url;
}
const AUTHORIZE_URL = createAuthorizeURL();

const spotifyApi = new SpotifyWebApi({
   redirectUri: REDIRECT_URI,
   clientId: CLIENT_ID,
});

function Spotify(): React.ReactElement {
   const [accessToken, setAccessToken] = useState(
      localStorage.getItem('spotify-token'),
   );
   const [user, setUser] = useState({
      country: '',
      display_name: 'User',
      email: 'user.email@domain.com',
      id: 'User id',
      images: [{ url: '' }],
   });
   const [topTracks, setTopTracks] = useState([
      {
         album: {
            external_urls: {
               spotify: 'https://open.spotify.com/album/id',
            },
            href: 'https://api.spotify.com/v1/albums/id',
            id: 'Album ID',
            images: [{ url: '' }],
            name: 'Album Name',
            uri: 'spotify:album:id',
         },
         duration_ms: 0,
         external_urls: {
            spotify: 'https://open.spotify.com/track/id',
         },
         href: 'https://api.spotify.com/v1/tracks/id',
         id: 'id',
         name: 'Track Name',
         uri: 'spotify:track:id',
      },
   ]);
   // eslint-disable-next-line no-unused-vars
   const [nowPlaying, setNowPlaying] = useState('');

   useEffect(() => {
      if (accessToken) {
         spotifyApi.setAccessToken(accessToken);
         spotifyApi.getMe().then(
            function (data: any) {
               setUser(data.body);
               localStorage.setItem('spotify-token', accessToken);
               spotifyApi.getMyTopTracks().then(function (data: any) {
                  setTopTracks(data.body.items);
               });
            },
            function () {
               setAccessToken('');
               localStorage.removeItem('spotify-token');
            },
         );
         localStorage.setItem('spotify-token', accessToken);
      }
   }, [accessToken]);

   function playTrack(track: any) {
      open(track.external_urls.spotify);
      setNowPlaying(track.uri);
      spotifyApi.play({ context_uri: track.uri }).then(
         function () {
            console.log('Now playing: ' + nowPlaying);
         },
         function (err) {
            console.log(err);
         },
      );
   }

   function handlePremission(event: any): void {
      event.preventDefault();

      const token = event.target['token'].value;

      if (token) {
         setAccessToken(token);
      } else {
         const authPage = open(AUTHORIZE_URL, '_blank');
         setTimeout(() => {
            authPage?.close();
         }, 5000);
      }
   }

   function renderAuth(): React.ReactElement {
      return (
         <div className="spotify-premission-container">
            <FontAwesomeIcon icon={faSpotify} className="spotify-logo" />
            <h3>Premission required</h3>
            <p>We need your permission to use this feature.</p>
            <form onSubmit={handlePremission}>
               <input
                  className="btn spotify-premission-btn"
                  type="submit"
                  value="Connect"
               />
               <input
                  className="text-center"
                  type="text"
                  name="token"
                  placeholder="Token"
               />
            </form>
            <sub className="text-muted">Spotify Premium is required.</sub>
         </div>
      );
   }

   function renderPlayer(): React.ReactElement {
      return (
         <div className="spotify-container">
            <div className="user-info">
               {user.images[0] ? (
                  <img
                     className="profile-img"
                     src={user.images[0].url}
                     width={32}
                  />
               ) : (
                  <FontAwesomeIcon
                     className="profile-img"
                     icon={faUser}
                     size="2x"
                  />
               )}
               <span className="profile-details">
                  <h3>Welcome {user.display_name}</h3>
                  <sub>{user.email}</sub>
               </span>
            </div>
            <div>
               {topTracks.map((track) => {
                  return (
                     <div
                        key={track.id}
                        className="track-container"
                        style={{
                           backgroundImage: `url(${track.album.images[0].url})`,
                        }}
                        onClick={() => playTrack(track)}
                     >
                        <h4 className="track-title">{track.name}</h4>
                        <sub className="track-album">{track.album.name}</sub>
                     </div>
                  );
               })}
            </div>
         </div>
      );
   }

   return accessToken ? renderPlayer() : renderAuth();
}

export default Spotify;
