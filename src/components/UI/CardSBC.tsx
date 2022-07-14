type CardSBCProps = {
  title: string;
  onClick: (clickedSBC: boolean, is_marquee_match_up: boolean | undefined) => void;
  changeImg: string;
  restricted: boolean;
  is_marquee_match_up: boolean | undefined
  platform?: string,
  showPlatformMsg?: boolean
};

const CardSBC = ({title, onClick, changeImg, restricted, is_marquee_match_up, platform, showPlatformMsg}: CardSBCProps) => {
  const cardClassName = ['rounded-xl hover:bg-gray-800 bg-gray-900 flex flex-col m-auto cursor-pointer w-full text-secondary']
  
  const onCardClicked = () => {
    onClick(restricted, is_marquee_match_up)
  }

  const subscriptionColor = is_marquee_match_up ? "#22d3ee" : "#FFD700";
  const subscriptionIcon = <div className={'w-4 h-4 rounded-full my-auto'} style={{backgroundColor: subscriptionColor}}/>

  const platform_message = showPlatformMsg && 
    <div className="mx-auto text-xs text-gray-300 mb-2">
      <div className="flex flex-column justify-center gap-x-2 mb-1">
        <span className='my-auto  italic'>Using player prices for</span>
        <img className='my-auto w-6 h-6' src={`${process.env.PUBLIC_URL}/${platform || 'Playstation'}.png`} alt='platform'/>
      </div>
      {platform ? <></> : <span className='italic flex flex-column justify-center'>Log in to change</span>}
    </div>

  return (
    <div key={title} className={cardClassName.join(' ')} onClick={() => onCardClicked()}>
      <div className='px-2 pt-4 text-l mx-2 flex flex-row justify-between gap-x-4'>
        <div className="w-4"></div>
        {title}
        <div className="w-4">{restricted ? subscriptionIcon : <></>}</div>
      </div>
      <div className='mx-auto w-44'>
        <img alt={title} src={process.env.PUBLIC_URL + changeImg}/>
      </div>
      {platform_message}
    </div>
  )
}

export default CardSBC;
