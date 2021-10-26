import React, { useState } from 'react';
import Dot from './Dot';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
   faGoogle,
   faWikipediaW,
   faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const PLACEHOLDERS = {
   generic: 'What are we searching?',
   video: 'What are we watching?',
   music: 'What are we listening to?',
   research: 'What are we researching?',
};

function SearchDot({ engine }: ISearch): React.ReactElement {
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

   function search(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();

      if (searchQuery) {
         open(getUrl() + searchQuery);
         setSearchQuery('');
      }
   }

   return (
      <Dot icon={getIcon()} size="wide">
         <form onSubmit={search}>
            <input
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

interface ISearch {
   engine: 'google' | 'duck' | 'bing' | 'youtube' | 'wiki';
}

export default SearchDot;
