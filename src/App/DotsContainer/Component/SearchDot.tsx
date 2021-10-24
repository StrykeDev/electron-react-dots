import React, { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
   faGoogle,
   faWikipediaW,
   faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import Dot from './Dot';

const PLACEHOLDERS = {
   generic: 'What are we searching?',
   video: 'What are we watching?',
   music: 'What are we listening to?',
   research: 'What are we researching?',
};

function SearchDot({ engine }: IProps): React.ReactElement {
   const [searchQuery, setSearchQuery] = useState('');

   function getIcon(): IconProp {
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

   function getPlaceholder(): string {
      switch (engine) {
         case 'youtube':
            return PLACEHOLDERS.video;
         case 'wiki':
            return PLACEHOLDERS.research;
         default:
            return PLACEHOLDERS.generic;
      }
   }

   function getUrl(): string {
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

   function doSearch(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();

      if (searchQuery) {
         open(getUrl() + searchQuery);
         setSearchQuery('');
      }
   }

   return (
      <Dot icon={getIcon()}>
         <form onSubmit={doSearch} className="form">
            <input
               className="input"
               type="text"
               maxLength={32}
               placeholder={getPlaceholder()}
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
