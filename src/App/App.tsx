import React from 'react';
import Dots from '../components/Dots';
import './App.css';

function App(): React.ReactElement {
   return (
      <div id="app" className="app" tabIndex={1}>
         <Dots />
      </div>
   );
}

export default App;
