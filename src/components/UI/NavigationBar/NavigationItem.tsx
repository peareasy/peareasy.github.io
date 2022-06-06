import React from 'react';
import { NavLink } from 'react-router-dom';

type NavigationItemProps = {
  link: string;
  onClick: () => void;
  children: JSX.Element;
};

const NavigationItem = ({ link, onClick, children }: NavigationItemProps) => (
  <NavLink
    to={link}
    className="px-3 py-2 flex items-center text-sm uppercase leading-snug text-secondary hover:opacity-75"
    onClick={onClick}
  >
    <span className="ml-2">{children}</span>
  </NavLink>
);

export default NavigationItem;