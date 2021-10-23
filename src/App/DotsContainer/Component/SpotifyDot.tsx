import React from 'react';

import Spotify from '../../Api/Spotify';

import { faSpotify } from '@fortawesome/free-brands-svg-icons';

import Dot from './Dot';

function SpotifyDot(): React.ReactElement {
  return (
    <Dot icon={faSpotify} tall>
      <Spotify />
    </Dot>
  );
}

export default SpotifyDot;
