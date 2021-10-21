import React from 'react';

import Dot from './Component/Dot';
import SearchComponent from './Component/SearchComponent';

import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import './dots-style.css';

function DotContainer(): React.ReactElement {
  return (
    <div id="dots-container">
      <Dot icon={faGoogle}>
        <SearchComponent provider="google" />
      </Dot>
      <Dot icon={faYoutube}>
        <SearchComponent provider="youtube" />
      </Dot>
      <Dot />
      <Dot icon={faPowerOff}>
        <>Powering off...</>
      </Dot>
    </div>
  );
}

export default DotContainer;
