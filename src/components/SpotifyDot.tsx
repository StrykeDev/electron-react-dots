import React from 'react';
import Spotify from '../api/Spotify';
import Dot from './Dot';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

function SpotifyDot(): React.ReactElement {
   return (
      <Dot icon={faSpotify} size="full">
         <Spotify />
      </Dot>
   );
}

export default SpotifyDot;
