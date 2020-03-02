import React from 'react';
import Logo from 'svg-react-loader?name=logo!./logo.svg';
import './App.css';

import EmailForm from './Components/EmailForm';

//  <img src={logo} className="App-logo" alt="logo" />

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          This is the default React App Header
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="Main-Content">
          <EmailForm />
      </div>
    </div>
  );
}

export default App;
