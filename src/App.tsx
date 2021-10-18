import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import NavigationBar from "./components/UI/NavigationBar/NavgiationBar";

function App() {
  return (
    <div className="min-h-screen mb-20">
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/docs"} component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
