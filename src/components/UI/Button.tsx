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
      className="bg-primary-500 shadow hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-300 focus:shadow-outline focus:outline-none text-secondary py-2 px-4 rounded mb-10"
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

const SecondaryButton = ({ title, onClick, disabled, icon }: ButtonProps) => {
  return (
    <button
      className="bg-primary-600 shadow hover:bg-primary-800  disabled:cursor-not-allowed disabled:bg-primary-300 focus:shadow-outline outline-secondary focus:outline-none text-secondary py-2 px-4 w-full h-full rounded"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex flex-row justify-center">
          <span className="text-l ">{title} </span>
          {icon ? (<div className='flex items-center ml-2 '> <span className="">{icon}</span></div>) : null}
      </div>
    </button>
  );
};

export { PrimaryButton }
export { SecondaryButton }