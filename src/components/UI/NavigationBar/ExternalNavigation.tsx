import React from 'react';

type ExternalNavigationItemProps = {
  link: string;
  children: string;
};

const ExternalNavigationItem = ({ link, children }: ExternalNavigationItemProps) => (
  <button
    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-secondary hover:opacity-75"
    onClick={() => window.open(link)}
  >
    <span className="ml-2">{children}</span>
  </button>
);

export default ExternalNavigationItem;