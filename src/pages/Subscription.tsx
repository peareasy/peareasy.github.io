import SubscriptionCard from "../components/UI/SubscriptionCard";
import {copied} from "../components/UI/icons";
import Modal from "../components/UI/Modal";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router";

type LoggedInProps = {
  isLoggedIn: boolean;
}

const Subscription = ({isLoggedIn}: LoggedInProps) => {
  const navigate = useNavigate()
  const location = useLocation();

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSubscriptionComingSoonModal, setShowSubscriptionComingSoonModal] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const header = <h1 className={'text-3xl font-light m-auto'}>
    <span className={'text-primary-400 font-medium'}>EasySBC </span>
    <span className={'text-secondary'}>Subscription</span>
  </h1>

  const subHeader = <h2 className={'text-l m-auto text-gray-300'}>
    Choose a subscription plan that fits your needs
  </h2>

  const premiumSubscriptionClicked = () => {
    setShowModal(true)
    setShowSubscriptionComingSoonModal(true)
  }

  const freeSubscriptionClicked = () => {
    setShowModal(true)
    setShowLoginModal(true)
  }

  let modalHeader = ''
  let modalBody = <></>
  let modalNavigation = ''
  let modalPositiveActionButtonLabel = ''
  if (showLoginModal) {
    modalHeader = '❗ You just need to login in order to access subscriptions'
    modalBody = <span>We kindly ask you to login to access subscriptions</span>
    modalNavigation = '/login'
    modalPositiveActionButtonLabel = 'Login'
  } else if (showSubscriptionComingSoonModal) {
    modalHeader = '❗ Thank you so much for your interest'
    modalBody = <span>We are working hard on the full release which will be out soon. If you have signed-up with your e-mail
      we will let you know once we’re fully live and if not, please sign up</span>
    modalNavigation = '/login'
    modalPositiveActionButtonLabel = 'Sign-up'
  }

  let modal = <Modal header={modalHeader}
                     body={modalBody}
                     onNegativeActionClicked={() => setShowModal(false)}
                     onPositiveActionClicked={() => {
                       setShowModal(false)
                       navigate(modalNavigation,{state: location})
                     }}
                     onCloseClicked={() => setShowModal(false)}
                     positiveActionButtonLabel={modalPositiveActionButtonLabel}
                     negativeActionButtonLabel="Cancel"/>

  const subscriptions = <div className={'flex flex-row justify-center gap-x-4'}>
    <SubscriptionCard boxColor={"#22d3ee"} content={<ul className={'flex flex-col gap-y-4'}>
      {isLoggedIn ? <div className={'text-primary-400 font-bold'}>
        Current Subscription
      </div> : null }
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Marquee Matchups
      </li>
      <li className={'flex flex-row gap-x-2'}>
        <span>{copied}</span> Unique solutions based on live player prices
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 '}>
        All SBCs
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 '}>
        Specify player(s) to include in solution
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 '}>
        Prioritize leagues, nations or card types in solution
      </li>
      <li className={'flex flex-row gap-x-2 text-gray-400 '}>
        Exclude leagues, nations and card types
      </li>
    </ul>} price={0} onClick={freeSubscriptionClicked} tier={'Free'} primaryButtonTitle={'Get Now'} currentSubscription={isLoggedIn}/>


    <SubscriptionCard boxColor={"#fb923c"} content={<>
    <ul className={'flex flex-col gap-y-4'}>
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