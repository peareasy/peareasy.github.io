import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NavigationBar from "./components/UI/NavigationBar/NavgiationBar";

function App() {
  return (
    <div className="min-h-screen pb-20 bg-gray-800g">
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path={"/about"} component={About} />
          <Route path={"/profile"} component={Profile} />
          <Route path={"/"} component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
