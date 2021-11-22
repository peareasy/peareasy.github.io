import React from "react"

import sbcBadge from './sbc.png'
import sbcBadgeGold from './sbc_gold.png'

type CardSBCProps = {
  title: string;
  onClick: () => void;
  selected: boolean;
  changeImg: boolean
};

const CardSBC = ({title, onClick, selected, changeImg}: CardSBCProps) => {
  const greenBorderClassName = ['rounded bg-gray-900 flex flex-row w-full m-auto cursor-pointer border-2']
  if (selected) {
    greenBorderClassName.push('border-primary-500')
  } else {
    greenBorderClassName.push('border-gray-900')
  }
  return (
    <div key={title} className={greenBorderClassName.join(' ')} onClick={onClick}>
      <div className='flex-none mt-auto mb-auto w-16'>
        <img alt={title} src={changeImg ? sbcBadge : sbcBadgeGold} />
      </div>
      <p className='m-auto text-xl'>
        {title}
      </p>
      <div className='flex-none mt-auto mb-auto w-16'>
      </div>
    </div>
  )
}

export default CardSBC;