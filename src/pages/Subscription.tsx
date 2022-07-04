import SubscriptionCard from "../components/UI/SubscriptionCard";
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
  const priceId = process.env.REACT_APP_ENVIRONMENT === "dev" ? process.env.REACT_APP_STRIPE_PRICE_ID_TEST 
                  : process.env.REACT_APP_STRIPE_PRICE_ID_PREMIUM
  
  const notifyClickedModal = <NotifyClickedModal onClick={() => setShowNotifyClickedModal(false)}/>

  const header = <h1 className={'text-3xl font-light m-auto'}>
    <span className={'text-primary-400 font-medium'}>easySBC </span>
    <span className={'text-secondary'}>Subscription</span>
  </h1>
  

  const subHeader = <h2 className={'text-l m-auto text-gray-300'}>
    Choose a subscription plan that fits your needs
  </h2>

  const premiumSubscriptionClicked = (priceId: string) => {
    ReactGA.event({
      category: "PremiumPage",
      action: "click_premium_page_buy_now",
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

  const subscriptions = <div className={'flex flex-row justify-center gap-x-4'}>
    <SubscriptionCard showButton={!user?.data?.paid} boxColor={"#22d3ee"} content={<ul className={'flex flex-col gap-y-4'}>
      {isLoggedIn && !user.data?.paid ? <div className={'text-primary-400 font-bold italic'} style={{color: "#22d3ee"}}>
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
      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> General solutions to all SBCs
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 italic'}>
        <span className="pl-6"></span> Player replacement suggestions (coming soon!)
      </li>
      {/* <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> Prioritize leagues, nations or card types in solution
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> Exclude leagues, nations and card types
      </li> */}
    </ul>} price={0} onClick={freeSubscriptionClicked} tier={'Free'} primaryButtonTitle={'Log in to activate'} 
          currentSubscription={isLoggedIn} priceId={priceId}/>


    <SubscriptionCard showButton={!user?.data?.paid}  boxColor={"#fb923c"} content={<>
    <ul className={'flex flex-col gap-y-4'}>

      { user.data?.paid ? 
        <div className={'text-primary-400 font-bold italic'} style={{color: "#fb923c"}}>
          Premium Subscription - Active
        </div> : 
        <div className={'text-primary-400 font-bold'} style={{color: "#fb923c"}}>
          Premium Subscription
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
        <span>{copied}</span> General solutions to all SBCs
      </li>
      <li className={'flex flex-row gap-x-2 italic'}>
        <span>{copied}</span> Player replacement suggestions (coming soon!)
      </li>
      {/* <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Prioritize leagues, nations or card types in solution
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Exclude leagues, nations and card types
      </li> */}
    </ul>
    </>} price={2.99} onClick={premiumSubscriptionClicked} tier={'Premium'} primaryButtonTitle={'Buy Now'} currentSubscription={false} priceId={priceId}/>
  </div>

  let view = 
  <div className='container mx-auto w-3/5 md:w-full flex font-light flex-col gap-y-8 md:p-2 p-8 bg-gray-900 rounded'>
    {header}
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