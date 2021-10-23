import React from 'react';

function Spotify(): React.ReactElement {
  return (
    <iframe
      src="https://open.spotify.com/embed/artist/6ua5bXYLeRXtovhoxtYzdX"
      style={{
        border: 'none',
        borderRadius: '0.6em',
        width: '100%',
        height: '25em',
      }}
    ></iframe>
  );
}

export default Spotify;
