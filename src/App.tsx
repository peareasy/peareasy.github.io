import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NavigationBar from "./components/UI/NavigationBar/NavgiationBar";

function App() {
  return (
    <div className="h-screen bg-cover bg-center bg-gray-800">
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path={"/about"} component={About} />
          <Route path={"/profile"} component={Profile} />
          <Route path={"/peareasy-web-app"} component={Home} />
          <Route path={"/"}>
            <Redirect to={'/peareasy-web-app'}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
