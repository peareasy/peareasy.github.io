import React from "react"

type CardSBCProps = {
  title: string;
  onClick: () => void;
  selected: boolean;
};

const CardSBC = ({title, onClick, selected}: CardSBCProps) => {
  const greenBorderClassName = ['h-10 rounded bg-gray-700 flex flex-row w-full m-auto cursor-pointer border-primary-500 ']
  if (selected) greenBorderClassName.push('border-2')
  return (
    <div key={title} className={greenBorderClassName.join(' ')} onClick={onClick}>
      <div className='flex-none mt-auto mb-auto w-16'>
        ✨
      </div>
      <p className='m-auto'>
        {title}
      </p>
      <div className='flex-none mt-auto mb-auto w-16'>
      </div>
    </div>
  )
}

export default CardSBC;