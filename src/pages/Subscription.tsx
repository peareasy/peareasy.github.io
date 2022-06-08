import SubscriptionCard from "../components/UI/SubscriptionCard";
import {copied} from "../components/UI/icons";
import Modal from "../components/UI/Modal";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router";
import ReactGA from "react-ga4";


type LoggedInProps = {
  isLoggedIn: boolean;
}

const Subscription = ({isLoggedIn}: LoggedInProps) => {
  const navigate = useNavigate()
  const location = useLocation();

  const [showSubscriptionComingSoonModal, setShowSubscriptionComingSoonModal] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const header = <h1 className={'text-3xl font-light m-auto'}>
    <span className={'text-primary-400 font-medium'}>easySBC </span>
    <span className={'text-secondary'}>Subscription</span>
  </h1>

  const subHeader = <h2 className={'text-l m-auto text-gray-300'}>
    Choose a subscription plan that fits your needs
  </h2>

  const premiumSubscriptionClicked = () => {
    ReactGA.event({
      category: "PremiumPage",
      action: "click_premium_page_buy_now",
    });
    setShowModal(true)
    setShowSubscriptionComingSoonModal(true)
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
    modalHeader = '❗ Thank you so much for your interest'
    modalBody = <span>Thank you so much for validating our product! 
      We are working hard on the final details of the premium subscription features. 
      If you sign up we will let you know when it is ready! 🍾</span>
    modalNavigation = '/login' 
    modalPositiveActionButtonLabel = 'Sign me up!'
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
    <SubscriptionCard boxColor={"#22d3ee"} content={<ul className={'flex flex-col gap-y-4'}>
      {isLoggedIn ? <div className={'text-primary-400 font-bold'} style={{color: "#22d3ee"}}>
        Current Subscription
      </div> : <div className={'text-primary-400 font-bold'} style={{color: "#22d3ee"}}>
        Free Subscription
      </div> }
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Unique solutions based on live player prices
      </li>

      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> All SBCs
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> Specify player(s) to include in solution
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> Prioritize leagues, nations or card types in solution
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400'}>
        <span className="pl-6"></span> Exclude leagues, nations and card types
      </li>
    </ul>} price={0} onClick={freeSubscriptionClicked} tier={'Free'} primaryButtonTitle={'Log in to activate'} currentSubscription={isLoggedIn}/>


    <SubscriptionCard boxColor={"#fb923c"} content={<>
    <ul className={'flex flex-col gap-y-4'}>
      <div className={'text-primary-400 font-bold'} style={{color: "#fb923c"}}>
        Premium Subscription
      </div>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Unique solutions based on live player prices
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> All SBCs
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Specify player(s) to include in solution
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Prioritize leagues, nations or card types in solution
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Exclude leagues, nations and card types
      </li>
    </ul>
    </>} price={1.99} onClick={premiumSubscriptionClicked} tier={'Premium'} primaryButtonTitle={'Buy Now'} currentSubscription={false}/>
  </div>

  return showModal ? modal :
    <div className='container mx-auto w-3/5 md:w-full flex font-light flex-col gap-y-8 md:p-2 p-8 bg-gray-900 rounded'>
      {header}
      {subHeader}
      {subscriptions}
    </div>
}

export default Subscription