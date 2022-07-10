import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import { menu as menuIcon } from '../icons';
import ReactGA from "react-ga4";
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../../redux/user/userSlice';

type LoggedInProps = {
  isLoggedIn: boolean;
}

const NavigationBar = ({isLoggedIn}:LoggedInProps) => {

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const user = useSelector(getUserSelector);
  const paid = !!user?.data?.paid


  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-6 mb-8 md:mb-0">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between mobile:w-auto mobile:static mobile:block mobile:justify-start">
          <NavLink
            className="text-xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-secondary"
            to={'/'}>
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
            (navbarOpen ? ' flex' : 'hidden')
          }
          id="example-navbar-danger"
        >
          {!navbarOpen ? <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <NavigationItem
              link={'/about'}
              onClick={() => {
                ReactGA.event({
                  category: "NavBar",
                  action: "click_navbar_about",
                });
              }}
            >
              <span>about</span>
            </NavigationItem>
          </ul> : null }
          {!navbarOpen ? <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <NavigationItem
              link={'/import'}
              onClick={() => {
                // ReactGA.event({
                //   category: "NavBar",
                //   action: "click_navbar_about",
                // });
              }}
            >
              <span>import</span>
            </NavigationItem>
          </ul> : null }
          {!navbarOpen ? <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <a href={'https://discord.gg/mmNtdnUcJf'}
              onClick={() => {
                ReactGA.event({
                  category: "NavBar",
                  action: "click_navbar_discord",
                });
              }}
               target="_blank" rel="noreferrer"
               className="px-3 py-2 flex items-center text-sm uppercase leading-snug text-secondary hover:opacity-75"
            >
              <img src={process.env.PUBLIC_URL + '/discord-v2.svg'} className='w-6 h-6 mr-2' alt={"platform"}/>
              <span>discord</span>
            </a>
          </ul> : null }
          {!navbarOpen ? <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <NavigationItem
              link={'/subscription'}
              onClick={() => {
                ReactGA.event({
                  category: "NavBar",
                  action: "click_navbar_premium",
                });
              }}
            >
              <div className={'flex flex-row gap-x-2'}>
                {paid ?  <></> : <div className={'w-4 h-4 rounded-full my-auto'} style={{backgroundColor: "#fb923c"}}/>}
                <span className={'my-auto'}>premium</span>
              </div>
            </NavigationItem>
          </ul> : null }
          {!navbarOpen ? <ul className="flex flex-col mobile:flex-row list-none mobile:ml-auto">
            <NavigationItem
              link={isLoggedIn ? '/profile' : '/login' }
              onClick={() => {
                ReactGA.event({
                  category: "NavBar",
                  action: "click_navbar_profile_login",
                });
              }}
            >
              {isLoggedIn ? <span>profile</span> : <span>login</span> }
            </NavigationItem>
          </ul> : null }
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
