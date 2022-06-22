type CardSBCProps = {
  title: string;
  onClick: (clickedSBC: boolean, is_marquee_match_up: boolean | undefined) => void;
  changeImg: string;
  restricted: boolean;
  is_marquee_match_up: boolean | undefined
  platform?: string,
  dontHidePlatformMessage?: boolean
};

const CardSBC = ({title, onClick, changeImg, restricted, is_marquee_match_up, platform, dontHidePlatformMessage}: CardSBCProps) => {
  const cardClassName = ['rounded-xl hover:bg-gray-800 bg-gray-900 flex flex-col m-auto cursor-pointer w-full text-secondary']

  const onCardClicked = () => {
    onClick(restricted, is_marquee_match_up)
  }

  let subscriptionIcon;
  if (restricted) {
    if (is_marquee_match_up) {
      subscriptionIcon = <div className={'w-4 h-4 rounded-full my-auto'} style={{backgroundColor: "#22d3ee"}}/>
    } else {
      subscriptionIcon = <div className={'w-4 h-4 rounded-full my-auto'} style={{backgroundColor: "#fb923c"}}/>
    }
  }
  let platform_message
  if (platform) {
    platform_message = 
    <div className="flex flex-row justify-end mr-2 mb-2 gap-x-2">
      <span className='my-auto text-xs text-gray-300'>Using player prices from </span>
      <img className='my-auto w-6 h-6' src={process.env.PUBLIC_URL + '/' + platform+'.png'} alt='platform'/>
    </div> 
  } else if (dontHidePlatformMessage){
    platform_message = 
    <div className="flex flex-col">
      <div className='flex flex-row justify-end mr-2 gap-x-2'>
        <span className='my-auto text-xs text-gray-300'>
        Using player prices from 
        </span>
        <img className='my-auto w-6 h-6' src={process.env.PUBLIC_URL + '/Playstation.png'} alt='platform'/>
      </div>

      <span className='my-auto text-xs text-gray-300 mr-2 mb-2 flex flex-row justify-end'>Log in to change</span>
      
    </div>
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
      {platform_message}
    </div>
  )
}

export default CardSBC;
