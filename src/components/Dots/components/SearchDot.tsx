import React, { useState } from 'react';
import Dot, { EDotSize, IDots } from '../Dot';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
   faGoogle,
   faWikipediaW,
   faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export enum EEngine {
   Google,
   Bing,
   DuckDuckGo,
   YouTube,
   Wiki,
}

export interface ISearchDot extends IDots {
   engine: EEngine;
}

const PLACEHOLDERS = {
   generic: 'What are we searching?',
   video: 'What are we watching?',
   music: 'What are we listening to?',
   research: 'What are we researching?',
};

function SearchDot({
   engine,
   extended,
   onExtend,
   onCollapse,
   onBlock,
}: ISearchDot): React.ReactElement {
   const [searchQuery, setSearchQuery] = useState('');

   function getIcon(): IconProp {
      switch (engine) {
         case EEngine.Google:
            return faGoogle;
         case EEngine.YouTube:
            return faYoutube;
         case EEngine.Wiki:
            return faWikipediaW;
         default:
            return faSearch;
      }
   }

   function getPlaceholder(): string {
      switch (engine) {
         case EEngine.YouTube:
            return PLACEHOLDERS.video;
         case EEngine.Wiki:
            return PLACEHOLDERS.research;
         default:
            return PLACEHOLDERS.generic;
      }
   }

   function getUrl(): string {
      switch (engine) {
         case EEngine.Google:
            return 'https://www.google.com/search?q=';
         case EEngine.Bing:
            return 'https://www.bing.com/search?q=';
         case EEngine.DuckDuckGo:
            return 'https://duckduckgo.com/?q=';
         case EEngine.YouTube:
            return 'https://www.youtube.com/results?search_query=';
         case EEngine.Wiki:
            return 'https://en.wikipedia.org/w/index.php?search=';
         default:
            throw new Error(`Invalid search engine '${engine}'`);
      }
   }

   function search(event: React.FormEvent): void {
      event.preventDefault();

      if (searchQuery) {
         open(getUrl() + searchQuery);
         onCollapse();
         setSearchQuery('');
      }
   }

   return (
      <Dot
         icon={getIcon()}
         size={EDotSize.Wide}
         extended={extended}
         onExtend={onExtend}
         onCollapse={onCollapse}
      >
         <form onSubmit={search} onFocus={onBlock} onBlur={onBlock}>
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

export default SearchDot;
