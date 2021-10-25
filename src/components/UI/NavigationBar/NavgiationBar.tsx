import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import { menu as menuIcon } from '../icons';
import ExternalNavigationItem from "./ExternalNavigation";

const NavigationBar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-primary-600 mb-16">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <NavLink
            className="text-m font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-secondary"
            to={'/'}
          >
            SBC Solver ⚽
          </NavLink>
          <button
            className="text-secondary cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {menuIcon}
          </button>
        </div>
        <div
          className={
            'lg:flex flex-grow items-center' +
            (navbarOpen ? ' flex' : ' hidden')
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <ExternalNavigationItem
              link={'https://www.ea.com/fifa/ultimate-team/web-app/'}
            >
              import club
            </ExternalNavigationItem>
            <NavigationItem
              link={'/about'}
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              about
            </NavigationItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;