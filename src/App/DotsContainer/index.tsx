import React from 'react';

import Dot from './Component/Dot';
import SearchDot from './Component/SearchDot';
import SpotifyDot from './Component/SpotifyDot';
import TimerDot from './Component/TimerDot';

import './dots-style.css';

function DotContainer(): React.ReactElement {
  return (
    <div id="dots-container">
      <SearchDot engine="google" />
      <SpotifyDot />
      <Dot />
      <TimerDot action="shutdown" />
    </div>
  );
}

export default DotContainer;
