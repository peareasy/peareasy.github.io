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

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-cover bg-pitch">
      <HashRouter basename="/">
        <div className="flex flex-col min-h-screen flex-start">

            <NavigationBar />
            <Routes>
                <Route path={"/about"} element={<About/>} />
                <Route path={"/profile"} element={<Profile/>} />
                <Route path={"/contact"} element={<Contact/>} />
                <Route path={"/tos"} element={<Tos/>} />
                <Route path={"/tutorial"} element={<Tutorial/>} />
                <Route path={"/privacy"} element={<Privacy/>} />
                <Route path={"/"} element={<Home/>} />
            </Routes>
            <Footer/>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
