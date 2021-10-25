import React from 'react';

type PrimaryButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
};

const PrimaryButton = ({ title, onClick, disabled }: PrimaryButtonProps) => {
  return (
    <button
      className="bg-primary-600 shadow hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-primary-300 focus:shadow-outline focus:outline-none text-secondary font-bold py-2 px-4 rounded"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

const SecondaryButton = ({ title, onClick, disabled }: PrimaryButtonProps) => {
  return (
    <button
      className="bg-primary-300 shadow hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-primary-300 focus:shadow-outline outline-secondary focus:outline-none text-secondary font-bold py-2 px-4 rounded"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export { PrimaryButton }
export { SecondaryButton }