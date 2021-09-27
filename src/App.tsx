import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from "./pages/Home";

function App() {

    // const sendMsgToExtension = () => {
    //     const id = "gkkejffdkmolljblpfldkobgnkbohioe"
    //
    //     console.log("Sending msg")
    //     chrome.runtime.sendMessage(id, {
    //         messageFromWeb: window.localStorage
    //     }, function (res) {
    //         console.log(res)
    //         console.log("Got response")
    //     })
    // }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={'/'} component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
