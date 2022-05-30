import SubscriptionCard from "../components/UI/SubscriptionCard";
import {copied} from "../components/UI/icons";
const Subscription = () => {
  const header = <h1 className={'text-3xl font-light m-auto'}>
    <span className={'text-primary-400 font-medium'}>Easy </span>
    <span className={'text-secondary'}>Subscription</span>
  </h1>

  const subHeader = <h2 className={'text-l m-auto text-gray-300'}>
    Choose a subscription plan that fits your needs
  </h2>

  const subscriptions = <div className={'flex flex-row justify-center gap-x-4'}>
    <SubscriptionCard boxColor={"#22d3ee"} content={<ul className={'flex flex-col gap-y-4'}>
      <div className={'text-primary-400 font-bold'}>
        Current Subscripton
      </div>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 '}>
        Include all SBCs
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 '}>
        Solve with untradeables
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 '}>
        Include players from transfer market
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 '}>
        Custom player exclusion
      </li>
    </ul>} price={0} onClick={() => {}} tier={'Free'} currentSubscription={true}/>


    <SubscriptionCard boxColor={"#fb923c"} content={<>
    <div className={'text-error-500 font-bold'}>
      Coming Soon!
    </div>
    <ul className={'flex flex-col gap-y-4'}>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Include all SBCs
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Solve with untradeables
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Include players from transfer market
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Custom player exclusion
      </li>
    </ul>
    </>} price={6} onClick={() => {}} tier={'Premium'} currentSubscription={false}/>
  </div>

  return <div className='container mx-auto w-1/3 flex font-light flex-col gap-y-8 p-8 bg-gray-900 rounded'>
    {header}
    {subHeader}
    {subscriptions}
  </div>
}

export default Subscription