import React from 'react';

type ButtonProps = {
  title: string;
  icon?: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
};

const PrimaryButton = ({ title, onClick, disabled, icon }: ButtonProps) => {
  return (
    <button
      className="bg-primary-500 shadow hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-300 focus:shadow-outline focus:outline-none text-secondary py-2 px-4 rounded"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex flex-row">
        {icon ? <span className="mr-2">{icon}</span> : null}
        <span>{title}</span>
      </div>
    </button>
  );
};

const SecondaryButton = ({ title, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="bg-tertiary-700 shadow hover:bg-tertiary-500 disabled:cursor-not-allowed disabled:bg-primary-300 focus:shadow-outline outline-secondary focus:outline-none text-secondary font-bold py-2 px-4 rounded"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export { PrimaryButton }
export { SecondaryButton }