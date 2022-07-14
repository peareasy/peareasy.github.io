import SubscriptionCard from "../components/UI/SubscriptionCard";
import { Subscription as SubscriptionEnum } from "../enums/Subscription.enum";
import {copied} from "../components/UI/icons";
import Modal from "../components/UI/Modal";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router";
import ReactGA from "react-ga4";
import { NotifyClickedModal } from "../components/UI/NotifyClickedModal";
import * as privateApi from "../api/privateApi"
import { useSelector } from "react-redux";
import { getUserSelector } from "../redux/user/userSlice";
type LoggedInProps = {
  isLoggedIn: boolean;
}

const Subscription = ({isLoggedIn}: LoggedInProps) => {
  const navigate = useNavigate()
  const location = useLocation();
  const user = useSelector(getUserSelector);


  const [showSubscriptionComingSoonModal, setShowSubscriptionComingSoonModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showNotifyClickedModal, setShowNotifyClickedModal] = useState(false)
  
  const notifyClickedModal = <NotifyClickedModal onClick={() => setShowNotifyClickedModal(false)}/>

  const header = <h1 className={'text-3xl font-light m-auto'}>
    <span className={'text-primary-400 font-medium'}>easySBC </span>
    <span className={'text-secondary'}>Subscription</span>
  </h1>
  

  const subHeader = <h2 className={'text-l m-auto text-gray-300'}>
    Choose a subscription plan that fits your needs
  </h2>

  const silverSubscriptionClicked = (priceId: string) => {
    ReactGA.event({
      category: "PremiumPage",
      action: "click_silver_page_buy_now",
    });
    if (isLoggedIn)
      privateApi.createCheckoutSession(priceId)
    else {
      setShowModal(true)
      setShowSubscriptionComingSoonModal(true)
    }
  }

  const goldSubscriptionClicked = (priceId: string) => {
    ReactGA.event({
      category: "PremiumPage",
      action: "click_gold_page_buy_now",
    });
    if (isLoggedIn)
      privateApi.createCheckoutSession(priceId)
    else {
      setShowModal(true)
      setShowSubscriptionComingSoonModal(true)
    }
  }

  const freeSubscriptionClicked = () => {
    ReactGA.event({
      category: "PremiumPage",
      action: "click_premium_page_login",
    });
    navigate("/login",{state: location})
  }

  let modalHeader = ''
  let modalBody = <></>
  let modalNavigation = ''
  let modalPositiveActionButtonLabel = ''
  if (showSubscriptionComingSoonModal) {
    if (isLoggedIn) {
      modalHeader = '❗ Thank you for your interest'
      modalBody = <span>Thank you so much for validating our product!
        We are working hard on the final details of the premium subscription features.
        Indicate here, if you want to get notified when it is ready! 🍾</span>
      modalNavigation = '/'
      modalPositiveActionButtonLabel = 'Notify me'
    }
     else {
      modalHeader = 'You are almost there!'
      modalBody = <span>Please sign in to access premium!</span>
      modalNavigation = '/login'
      modalPositiveActionButtonLabel = 'Sign in'
    }
  }

  let modal = <Modal header={modalHeader}
                     body={modalBody}
                     onNegativeActionClicked={() => {
                      ReactGA.event({
                        category: "BuyPremiumPopup",
                        action: "click_buy_premium_popup_no_thanks"
                      }); 
                      setShowModal(false)
                    }}
                     onPositiveActionClicked={() => {
                      ReactGA.event({
                        category: "BuyPremiumPopup",
                        action: "click_buy_premium_popup_sign_up"
                      });
                       setShowModal(false)
                       if (!isLoggedIn){
                         navigate(modalNavigation,{state: location});
                       } else {
                         setShowNotifyClickedModal(true)
                         privateApi.patchUser({notify: true})
                       }
                     }}
                     onCloseClicked={() => {
                      ReactGA.event({
                        category: "BuyPremiumPopup",
                        action: "click_buy_premium_popup_close"
                      }); 
                      setShowModal(false)
                    }}
                     positiveActionButtonLabel={modalPositiveActionButtonLabel}
                     negativeActionButtonLabel="No thanks!"/>

  const subscriptions = <div className={'flex flex-row md:flex-col md:gap-y-4 justify-center gap-x-4'}>
    <SubscriptionCard showButton={!user?.data?.paid} boxColor={"#22d3ee"} content={<ul className={'flex flex-col gap-y-4'}>
      {isLoggedIn && !user.data?.paid ? <div className={'text-primary-400 font-bold'} style={{color: "#22d3ee"}}>
        Free Subscription - Active
      </div> : <div className={'text-primary-400 font-bold'} style={{color: "#22d3ee"}}>
        Free Subscription
      </div> }
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Unique solutions
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Use player prices from different plaforms
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Import players for Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> General solutions to all SBCs
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 italic'}>
        <span className="pl-6"></span> Player replacement suggestions (coming soon!)
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> Import players for all SBCs
      </li>
    </ul>} price={0} onClick={freeSubscriptionClicked} tier={'Free'} primaryButtonTitle={'Log in to activate'} priceId={'priceId'}
          currentSubscription={isLoggedIn}/>


    <SubscriptionCard showButton={true}  boxColor={"#C0C0C0"} content={<>
    <ul className={'flex flex-col gap-y-4'}>

      { user.data?.subscription === SubscriptionEnum.SILVER ? 
        <div className={'text-primary-400 font-bold'} style={{color: "#C0C0C0"}}>
          Pro Subscription - Active
        </div> : 
        <div className={'text-primary-400 font-bold'} style={{color: "#C0C0C0"}}>
          Pro Subscription
        </div>
      }
      
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Unique solutions
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Use player prices from different plaforms
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Import players for Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> General solutions to all SBCs
      </li>
      <li className={'flex flex-row gap-x-2 italic'}>
        <span>{copied}</span> Player replacement suggestions (coming soon!)
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> Import players for all SBCs
      </li>
    </ul>
    </>} price={2.99} onClick={silverSubscriptionClicked} tier={'Pro'} primaryButtonTitle={'Buy Now'}
    currentSubscription={user?.data?.subscription === SubscriptionEnum.SILVER} 
    priceId={
          process.env.REACT_APP_ENVIRONMENT === "dev" ? 
          process.env.REACT_APP_STRIPE_PRICE_ID_TEST : 
          process.env.REACT_APP_SILVER_PRICE_ID
        } beta={false}/>
  
    <SubscriptionCard showButton={true}  boxColor={"#FFD700"} content={<>
    <ul className={'flex flex-col gap-y-4'}>

      { user.data?.subscription === SubscriptionEnum.GOLD ? 
        <div className={'text-primary-400 font-bold'} style={{color: "#FFD700"}}>
          Elite Subscription (Beta) - Active
        </div> : 
        <div className={'text-primary-400 font-bold'} style={{color: "#FFD700"}}>
          Elite Subscription (Beta)
        </div>
      }
      
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Unique solutions
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Use player prices from different plaforms
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Import players for Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> General solutions to all SBCs
      </li>
      <li className={'flex flex-row gap-x-2 italic'}>
        <span>{copied}</span> Player replacement suggestions (coming soon!)
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Import players for all SBCs
      </li>
    </ul>
    </>} price={6.99} onClick={goldSubscriptionClicked} tier={'Elite (Beta)'} primaryButtonTitle={'Buy Now'}
    currentSubscription={user?.data?.subscription === SubscriptionEnum.GOLD} 
    priceId={
      process.env.REACT_APP_ENVIRONMENT === "dev" ? 
      process.env.REACT_APP_STRIPE_PRICE_ID_TEST : 
      process.env.REACT_APP_GOLD_PRICE_ID
    } beta={user?.data?.beta}/>
  </div>
  

  let view = 
  <div className='container mx-auto w-3/5 md:w-full flex font-light flex-col gap-y-6 md:p-2 p-8 bg-gray-900 rounded'>
    {header}
    {user?.data?.beta ?<span className="italic text-green-500 m-auto">Hey {user?.data?.name}! Beta discount has been added</span> : <></> }
    {subHeader}
    {subscriptions}
  </div>
  if (showModal) {
    view = modal
  } else if (showNotifyClickedModal) {
    view = notifyClickedModal
  }
  return view
}

export default Subscription
