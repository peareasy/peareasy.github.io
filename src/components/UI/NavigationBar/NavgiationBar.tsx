import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import { menu as menuIcon } from '../icons';

const NavigationBar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-6 mb-8">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between mobile:w-auto mobile:static mobile:block mobile:justify-start">
          <NavLink
            className="text-xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-secondary"
            to={'/'}
          >
            easySBC ⚽
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
            <NavigationItem
              link={'https://www.youtube.com/watch?v=sFu6rMaSEDg'}
            >
              tutorial
            </NavigationItem>
          </ul>
          <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
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
