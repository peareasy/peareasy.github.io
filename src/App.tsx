import { HashRouter, Route, Routes} from "react-router-dom";

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
import Login from "./pages/Login";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";
import {fetchUser} from "./redux/user/userSlice";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  if (localStorage['name'] && !isLoggedIn) {
    dispatch(fetchUser())
    setIsLoggedIn(true)
  }
  return (
    <div className="min-h-screen bg-cover bg-center bg-cover bg-pitch">
      <HashRouter basename="/">
        <div className="flex flex-col min-h-screen flex-start">
            <NavigationBar isLoggedIn={isLoggedIn}/>
            <Routes>
              <Route path={"/about"} element={<About/>} />
              <Route path={"/profile"} element={<Profile setLogin={setIsLoggedIn}/>} />
              <Route path={"/contact"} element={<Contact/>} />
              <Route path={"/tos"} element={<Tos/>} />
              <Route path={"/tutorial"} element={<Tutorial/>} />
              <Route path={"/privacy"} element={<Privacy/>} />
              <Route path={"/login"} element={<Login setLogin={setIsLoggedIn}/>} />
              <Route path={"/"} element={<Home/>} />
            </Routes>
            <Footer/>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
