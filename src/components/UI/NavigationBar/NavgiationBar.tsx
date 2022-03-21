import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import { menu as menuIcon } from '../icons';
// import ExternalNavigationItem from "./ExternalNavigation";

const NavigationBar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-6 mb-8">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between mobile:w-auto mobile:static mobile:block mobile:justify-start">
          <NavLink
            className="text-xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-secondary"
            to={'/'}
          >
            SBC Solver ⚽
          </NavLink>
          <button
            className="text-secondary cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block mobile:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
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
            {/*<ExternalNavigationItem*/}
            {/*  link={'https://www.ea.com/fifa/ultimate-team/web-app/'}*/}
            {/*>*/}
            {/*  import club*/}
            {/*</ExternalNavigationItem>*/}
            {/*<NavigationItem*/}
            {/*  link={'/profile'}*/}
            {/*  onClick={() => setNavbarOpen(!navbarOpen)}*/}
            {/*>*/}
            {/*  profile*/}
            {/*</NavigationItem>*/}
            <NavigationItem
              link={'/about'}
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              about
            </NavigationItem>
            <NavigationItem
              link={'/contact'}
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              contact
            </NavigationItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;