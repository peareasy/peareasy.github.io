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
    <span className={'text-primary-400 font-medium'}>Easy </span>
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
    modalHeader = '❗ You just need to login in order to access the free tier'
    modalBody = <span>We kindly ask you to login to access the free tier</span>
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
        Current Subscripton
      </div> : null }
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
    </ul>} price={0} onClick={freeSubscriptionClicked} tier={'Free'} primaryButtonTitle={'Get Now'} currentSubscription={isLoggedIn}/>


    <SubscriptionCard boxColor={"#fb923c"} content={<>
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
    </>} price={6} onClick={premiumSubscriptionClicked} tier={'Premium'} primaryButtonTitle={'Buy Now'} currentSubscription={false}/>
  </div>

  return showModal ? modal :
    <div className='container mx-auto w-1/3 flex font-light flex-col gap-y-8 p-8 bg-gray-900 rounded'>
      {header}
      {subHeader}
      {subscriptions}
    </div>
}

export default Subscription