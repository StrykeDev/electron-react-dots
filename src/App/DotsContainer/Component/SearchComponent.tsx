import React, { useState } from 'react';

function SearchComponent({ provider }: IProps): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const searchEngine = (): string => {
    switch (provider) {
      case 'google':
        return 'https://www.google.com/search?q=';
      case 'youtube':
        return 'https://www.youtube.com/results?search_query=';
      case 'duck':
        return 'https://duckduckgo.com/?q=';
      case 'bing':
        return 'https://www.bing.com/search?q=';
      case 'wiki':
        return 'https://en.wikipedia.org/w/index.php?search=';
      default:
        throw new Error("Unkown search provider '" + provider + "'!");
    }
  };
  const placeholder = (): string => {
    switch (provider) {
      case 'youtube':
        return 'what are we watching?';
      case 'duck':
        return 'what are we hacking?';
      case 'wiki':
        return 'what are we learning?';
      default:
        return 'What are we looking for?';
    }
  };

  function Search(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (searchQuery) {
      switch (provider) {
        case 'google':
          open(searchEngine() + searchQuery, '_blank');
          break;
        case 'youtube':
          open(searchEngine() + searchQuery, '_blank');
          break;
        case 'duck':
          open(searchEngine() + searchQuery, '_blank');
          break;
        case 'bing':
          open(searchEngine() + searchQuery, '_blank');
          break;
        case 'wiki':
          open(searchEngine() + searchQuery, '_blank');
          break;
      }
    }
  }

  return (
    <form onSubmit={Search}>
      <input
        type="search"
        maxLength={32}
        placeholder={placeholder()}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
      />
      <input type="submit" hidden={true} />
    </form>
  );
}

interface IProps {
  provider: string;
}

export default SearchComponent;
