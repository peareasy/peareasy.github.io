import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    const sendMsgToExtension = () => {
        const id = "gkkejffdkmolljblpfldkobgnkbohioe"

        console.log("Sending msg")
        chrome.runtime.sendMessage(id, {
            messageFromWeb: window.localStorage
        }, function (res) {
            console.log(res)
            console.log("Got response")
        })
    }

  return (
    <div className="App">
      <header className="App-header">
          <button type="button" onClick={() => sendMsgToExtension()}>Click Me!</button>

          <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
    </div>
  );
}

export default App;
