import React from "react";

type CardSBCProps = {
  title: string;
  onClick: (clickedSBC: boolean, is_marquee_match_up: boolean | undefined) => void;
  changeImg: string;
  restricted: boolean;
  is_marquee_match_up: boolean | undefined
};

const CardSBC = ({title, onClick, changeImg, restricted, is_marquee_match_up}: CardSBCProps) => {
  const cardClassName = ['rounded-xl hover:bg-gray-800 flex flex-col m-auto cursor-pointer border-2 w-full text-secondary']

  const onCardClicked = () => {
    onClick(restricted, is_marquee_match_up)
  }

  cardClassName.push('bg-gray-900 border-gray-900')

  let subscriptionIcon;
  if (restricted) {
    if (is_marquee_match_up) {
      subscriptionIcon = <div className={'w-4 h-4 rounded-full my-auto'} style={{backgroundColor: "#22d3ee"}}/>
    } else {
      subscriptionIcon = <div className={'w-4 h-4 rounded-full my-auto'} style={{backgroundColor: "#fb923c"}}/>
    }
  }

  return (
    <div key={title} className={cardClassName.join(' ')} onClick={() => onCardClicked()}>
      <div className='px-2 pt-4 text-l mx-2 flex flex-row justify-between gap-x-4'>
        <div className="w-4"></div>
        {title}
        <div className="w-4">{subscriptionIcon}</div>
        
      </div>
      <div className='mx-auto w-44'>
        <img alt={title} src={process.env.PUBLIC_URL + changeImg}/>
      </div>
    </div>
  )
}

export default CardSBC;
