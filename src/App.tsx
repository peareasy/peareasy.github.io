import {HashRouter, Route, Routes} from "react-router-dom";


import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/Navbar/About";
import Profile from "./pages/Profile";
import NavigationBar from "./components/UI/NavigationBar/NavigationBar";
import Contact from "./pages/Footer/Contact";
import Tos from "./pages/Footer/Tos";
import Privacy from "./pages/Footer/Privacy";
import Footer from "./components/UI/Footer/Footer";
import Login from "./pages/Login";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";
import {fetchUser} from "./redux/user/userSlice";
import {fetchSbcsSets} from "./redux/sbcs/sbcSetsSlice";
import Subscription from "./pages/Subscription";
import TagManager from 'react-gtm-module';
import ReactGA from "react-ga4";
import SBCPage from "./pages/SBCs/SBCPage";
import CookieConsent from "react-cookie-consent";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const tagManagerArgs = {
    gtmId: 'GTM-MLMG3W4'
  };

  TagManager.initialize(tagManagerArgs)

  ReactGA.initialize("G-VVZ00C9GVY", {testMode: process.env.REACT_APP_ENVIRONMENT === 'dev'});

  if (localStorage['name'] && !isLoggedIn) {
    dispatch(fetchUser())
    setIsLoggedIn(true)
  }
  useEffect(() => {
    dispatch(fetchSbcsSets())
  }, [ dispatch])

  return (
    <div className="min-h-screen bg-cover bg-center bg-cover bg-pitch">
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience. Read more {<a href={'#/privacy'}>here</a>}
      </CookieConsent>
      <HashRouter basename="/">
        <div className="flex flex-col min-h-screen flex-start">
            <NavigationBar isLoggedIn={isLoggedIn}/>
            <Routes>
              <Route path={"/about"} element={<About/>} />
              <Route path={"/profile"} element={<Profile setLogin={setIsLoggedIn}/>} />
              <Route path={"/contact"} element={<Contact/>} />
              <Route path={"/tos"} element={<Tos/>} />
              <Route path={"/sbc/:id"} element={<SBCPage/>} />
              <Route path={"/sbc"} element={<SBCPage/>} />
              <Route path={"/privacy"} element={<Privacy/>} />
              <Route path={"/login"} element={<Login setLogin={setIsLoggedIn}/>} />
              <Route path={"/subscription"} element={<Subscription isLoggedIn={isLoggedIn}/>}/>
              <Route path={"/"} element={<Home/>} />
            </Routes>
            <Footer/>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
