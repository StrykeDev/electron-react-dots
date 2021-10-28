import React, { useState } from 'react';
import { EDotVarient, IDotFunctionProps } from './Dot';

const PLACEHOLDERS = {
   generic: 'What are we searching?',
   video: 'What are we watching?',
   music: 'What are we listening to?',
   research: 'What are we researching?',
};

function SearchDot({
   varient,
   onCollapse,
   onBlock,
}: IDotFunctionProps): React.ReactElement {
   const [searchQuery, setSearchQuery] = useState('');

   function getPlaceholder(): string {
      switch (varient) {
         case EDotVarient.YouTube:
            return PLACEHOLDERS.video;
         case EDotVarient.Wiki:
            return PLACEHOLDERS.research;
         default:
            return PLACEHOLDERS.generic;
      }
   }

   function getUrl(): string {
      switch (varient) {
         case EDotVarient.Google:
            return 'https://www.google.com/search?q=';
         case EDotVarient.Duck:
            return 'https://duckduckgo.com/?q=';
         case EDotVarient.Bing:
            return 'https://www.bing.com/search?q=';
         case EDotVarient.YouTube:
            return 'https://www.youtube.com/results?search_query=';
         case EDotVarient.Wiki:
            return 'https://en.wikipedia.org/w/index.php?search=';
         default:
            throw new Error(`Invalid search varient '${varient}'`);
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
      <form onSubmit={search}>
         <input
            type="text"
            maxLength={32}
            placeholder={getPlaceholder()}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            onFocus={onBlock}
            onBlur={onBlock}
         />
         <input type="submit" hidden={true} />
      </form>
   );
}

export default SearchDot;
