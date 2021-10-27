import React, { useState } from 'react';
import { IDotFunctionProps } from './Dot';

export enum EEngine {
   google,
   duck,
   bing,
   youtube,
   wiki,
}

export interface ISearchProps extends IDotFunctionProps {
   engine: EEngine;
}

const PLACEHOLDERS = {
   generic: 'What are we searching?',
   video: 'What are we watching?',
   music: 'What are we listening to?',
   research: 'What are we researching?',
};

function SearchDot({ engine }: ISearchProps): React.ReactElement {
   const [searchQuery, setSearchQuery] = useState('');
   function getPlaceholder(): string {
      switch (engine) {
         case EEngine.youtube:
            return PLACEHOLDERS.video;
         case EEngine.wiki:
            return PLACEHOLDERS.research;
         default:
            return PLACEHOLDERS.generic;
      }
   }

   function getUrl(): string {
      switch (engine) {
         case EEngine.google:
            return 'https://www.google.com/search?q=';
         case EEngine.duck:
            return 'https://duckduckgo.com/?q=';
         case EEngine.bing:
            return 'https://www.bing.com/search?q=';
         case EEngine.youtube:
            return 'https://www.youtube.com/results?search_query=';
         case EEngine.wiki:
            return 'https://en.wikipedia.org/w/index.php?search=';
      }
   }

   function search(event: React.FormEvent): void {
      event.preventDefault();

      if (searchQuery) {
         open(getUrl() + searchQuery);
         setSearchQuery('');
      }
   }

   return (
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
   );
}

export default SearchDot;
