import {DisabledButton, PrimaryButton} from "./Button";

type SubscriptionCardProps = {
  tier: string;
  price: number;
  boxColor: string;
  content: JSX.Element;
  currentSubscription: boolean;
  showButton: boolean;
  primaryButtonTitle: string;
  onClick: (priceId: string) => void;
  priceId: string;
  beta?: boolean
};


const SubscriptionCard = ({tier, price, beta, boxColor, content, currentSubscription, primaryButtonTitle, showButton, onClick, priceId}: SubscriptionCardProps) => {
  const parentClassName = ['bg-gray-800 rounded-3xl text-secondary w-full p-5']
  const priceClassName = beta ? ['font-semibold text-3xl line-through'] : ['font-semibold text-3xl']

  return <div className={parentClassName.join(' ')}>
    <div className={'flex flex-col gap-y-4'}>
      <h1 className={'flex flex-row justify-between'}>
        <div className={'w-8 h-8 rounded-full'} style={{backgroundColor: boxColor}}></div>
        <div className={'flex flex-col text-right'}>
          <span>{tier}</span>
          <span>
            $ <span className={priceClassName.join(' ')}>{price}</span> 
            {beta ? <span className={'font-semibold text-3xl text-green-400'}> {Math.round(100.0*price/2.0)/100}</span> : <></>} <span>{'/mo'}</span>
          </span>
        </div>
      </h1>
      {content}
    </div>

    { !showButton ? <></> : !currentSubscription ? <div className={'flex flex-col pt-5'}>
      <PrimaryButton title={primaryButtonTitle} onClick={() => onClick(priceId)}/>
    </div> : <div className={'flex flex-col pt-5'}> <DisabledButton title="Active Subscription" onClick={() => onClick("")} disabled={true}/> </div>
}
  </div>
}

export default SubscriptionCard
