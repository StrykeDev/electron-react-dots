import React from 'react';

import Dot from './Component/Dot';
import SearchComponent from './Component/SearchComponent';
import TimerComponent from './Component/TimerComponent';

import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import './dots-style.css';

function DotContainer(): React.ReactElement {
  const actions = [
    {
      name: 'Shutdown',
      action: 'shutdown',
    },
    {
      name: 'Reboot',
      action: 'reboot',
    },
    {
      name: 'Sleep',
      action: 'sleep',
    },
    {
      name: 'Alarm',
      action: 'alarm',
    },
  ];

  return (
    <div id="dots-container">
      <Dot icon={faGoogle}>
        <SearchComponent provider="google" />
      </Dot>
      <Dot icon={faYoutube}>
        <SearchComponent provider="youtube" />
      </Dot>
      <Dot tall></Dot>
      <Dot icon={faPowerOff}>
        <TimerComponent actions={actions} />
      </Dot>
    </div>
  );
}

export default DotContainer;
