import React from "react";
import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NavigationBar from "./components/UI/NavigationBar/NavgiationBar";

function App() {
  return (
    <div className="h-screen bg-cover bg-center bg-cover bg-pitch">
      <HashRouter basename="/">
        <NavigationBar />
        <Route path={"/about"} component={About} />
        <Route path={"/profile"} component={Profile} />
        <Route exact path={"/"} component={Home} />
      </HashRouter>
    </div>
  );
}

export default App;
