import {DisabledButton, PrimaryButton} from "./Button";

type SubscriptionCardProps = {
  tier: string;
  price: number;
  boxColor: string;
  content: JSX.Element;
  currentSubscription: boolean
  onClick: () => void;
  primaryButtonTitle: string
};


const SubscriptionCard = ({tier, price, boxColor, content, currentSubscription, primaryButtonTitle, onClick}: SubscriptionCardProps) => {
  const parentClassName = ['bg-gray-800 rounded-3xl text-secondary w-full p-5']
  
  return <div className={parentClassName.join(' ')}>
    <div className={'flex flex-col gap-y-4'}>
      <h1 className={'flex flex-row justify-between'}>
        <div className={'w-8 h-8 rounded-full'} style={{backgroundColor: boxColor}}></div>
        <div className={'flex flex-col text-right'}>
          <span>{tier}</span>
          <span>
            $ <span className={'font-semibold text-3xl'}>{price}</span>  <span>{'/mo'}</span>
          </span>
        </div>
      </h1>
      {content}
    </div>
    {! currentSubscription ? <div className={'flex flex-col pt-5'}>
      <PrimaryButton title={primaryButtonTitle} onClick={onClick}/>
    </div> : <div className={'flex flex-col pt-5'}> <DisabledButton title="Already active" onClick={onClick} disabled={true}/> </div>
}
  </div>
}

export default SubscriptionCard