import React from 'react';
import Dot from '../Dot';
import SearchDot from '../SearchDot';
import SpotifyDot from '../SpotifyDot';
import TimerDot from '../TimerDot';
import './Dots.css';

function Dots(): React.ReactElement {
   return (
      <div className="dots">
         <Dot />
         <SearchDot engine="google" />
         <TimerDot action="alarm" />
         <SpotifyDot />
      </div>
   );
}

export default Dots;
