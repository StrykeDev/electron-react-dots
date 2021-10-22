import React, { useState } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  faGoogle,
  faWikipediaW,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import Dot from './Dot';

const placeholders = {
  generic: 'What are we searching?',
  video: 'What are we watching?',
  music: 'What are we listening to?',
  research: 'What are we researching?',
};

function SearchDot({ engine }: IProps): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('');

  function GetIcon(): IconProp {
    switch (engine) {
      case 'google':
        return faGoogle;
      case 'youtube':
        return faYoutube;
      case 'wiki':
        return faWikipediaW;
      default:
        return faSearch;
    }
  }

  function GetPlaceholder(): string {
    switch (engine) {
      case 'youtube':
        return placeholders.video;
      case 'wiki':
        return placeholders.research;
      default:
        return placeholders.generic;
    }
  }

  function GetUrl(): string {
    switch (engine) {
      case 'google':
        return 'https://www.google.com/search?q=';
      case 'duck':
        return 'https://duckduckgo.com/?q=';
      case 'bing':
        return 'https://www.bing.com/search?q=';
      case 'youtube':
        return 'https://www.youtube.com/results?search_query=';
      case 'wiki':
        return 'https://en.wikipedia.org/w/index.php?search=';
    }
  }

  function Search(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (searchQuery) {
      open(GetUrl() + searchQuery);
      setSearchQuery('');
    }
  }

  return (
    <Dot icon={GetIcon()}>
      <form onSubmit={Search} className="form">
        <input
          className="input"
          type="text"
          maxLength={32}
          placeholder={GetPlaceholder()}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <input type="submit" hidden={true} />
      </form>
    </Dot>
  );
}

interface IProps {
  engine: 'google' | 'duck' | 'bing' | 'youtube' | 'wiki';
}

export default SearchDot;
