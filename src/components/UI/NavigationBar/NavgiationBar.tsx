import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import { menu as menuIcon } from '../icons';
import ReactGA from "react-ga4";

type LoggedInProps = {
  isLoggedIn: boolean;
}

const NavigationBar = ({isLoggedIn}:LoggedInProps) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-6 mb-8">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between mobile:w-auto mobile:static mobile:block mobile:justify-start">
          <NavLink
            className="text-xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-secondary"
            to={'/'} onClick={() => {
              window.location.href = "#"
              window.location.reload()
          }}
          >
            easySBC ⚽
          </NavLink>
          <button
            className="text-secondary cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block mobile:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => {
              ReactGA.event({
                category: "NavBar",
                action: "click_navbar_home",
              });  
              setNavbarOpen(!navbarOpen)
            }}
          >
            {menuIcon}
          </button>
        </div>
        <div
          className={
            'mobile:flex flex-grow items-center' +
            (navbarOpen ? ' flex' : ' hidden')
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <NavigationItem
              link={'/tutorial'}
              onClick={() => {
                ReactGA.event({
                  category: "NavBar",
                  action: "click_navbar_tutorial",
                });
                setNavbarOpen(!navbarOpen)}}
            >
              tutorial
            </NavigationItem>
          </ul>
          <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <NavigationItem
              link={'/about'}
              onClick={() => {
                ReactGA.event({
                  category: "NavBar",
                  action: "click_navbar_about",
                });
                
                setNavbarOpen(!navbarOpen);
              }}
            >
              about
            </NavigationItem>
          </ul>
          {isLoggedIn ? <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <NavigationItem
              link={'/subscription'}
              onClick={() => {
                ReactGA.event({
                  category: "NavBar",
                  action: "click_navbar_premium",
                });
                setNavbarOpen(!navbarOpen)}
              }
            >
              subscriptions
            </NavigationItem>
          </ul> : null}
          <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <NavigationItem
              link={isLoggedIn ? '/profile' : '/login' }
              onClick={() => {
                ReactGA.event({
                  category: "NavBar",
                  action: "click_navbar_profile_login",
                });
                setNavbarOpen(!navbarOpen)}
              }
            >
              {isLoggedIn ? 'profile' : 'login' }
            </NavigationItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
