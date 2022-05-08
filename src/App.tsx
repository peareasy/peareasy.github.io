import { HashRouter, Route} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/Navbar/About";
import Profile from "./pages/Profile";
import NavigationBar from "./components/UI/NavigationBar/NavgiationBar";
import Contact from "./pages/Footer/Contact";
import Tos from "./pages/Footer/Tos";
import Privacy from "./pages/Footer/Privacy";
import Footer from "./components/UI/Footer/Footer";
import Tutorial from "./pages/Navbar/Tutorial";
import Premium from "./pages/Navbar/Premium";

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-cover bg-pitch">
      <HashRouter basename="/">
        <div className="flex flex-col min-h-screen flex-start">
          <NavigationBar />
          <Route path={"/about"} component={About} />
          <Route path={"/profile"} component={Profile} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/tos"} component={Tos} />
          <Route path={"/tutorial"} component={Tutorial} />
          <Route path={"/privacy"} component={Privacy} />
          <Route path={"/premium"} component={Premium} />
          <Route exact path={"/"} component={Home} />
          <Footer/>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
