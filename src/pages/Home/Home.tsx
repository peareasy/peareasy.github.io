import {useEffect, useState} from "react";
import CardSBC from "../../components/UI/CardSBC";
import Modal from "../../components/UI/Modal";
import {copied} from '../../components/UI/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {fetchSbcs, getSBCsSelector} from "../../redux/sbcs/sbcsSlice";
import {useNavigate} from "react-router";
import {fetchUser, getUserSelector} from "../../redux/user/userSlice";
import SubscriptionCard from "../../components/UI/SubscriptionCard";
import ReactGA from "react-ga4";
import * as privateApi from "../../api/privateApi";
import { NotifyClickedModal } from "../../components/UI/NotifyClickedModal";
import ChoosePlatform from "../../components/UI/ChoosePlatform";

const Home = () => {

  const mockedSBCs = [
    { name: 'Live', icon_url: "https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/sets/images/sbc_set_image_10004027-04bffd4e-5416.png",
      restricted: true, marquee_match_up: false},
    { name: 'Team of the Season', icon_url: "https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/sets/images/sbc_set_image_10004021-57fa2a14-ff91.png",
      restricted: true, marquee_match_up: false},
    { name: 'Foundation', icon_url: 'https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/sets/images/sbc_set_image_1000012-a0792673-8155.png',
      restricted: true, marquee_match_up: false},
    { name: 'Swaps', icon_url: "https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/sets/images/sbc_set_image_1000186-c359be10-b287.png",
      restricted: true, marquee_match_up: false},
    { name: 'Leagues', icon_url: "https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/sets/images/sbc_set_image_1000099-4bfd0ff3-3b5c.png",
      restricted: true, marquee_match_up: false},
    { name: 'Icons', icon_url: "https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/sets/images/sbc_set_image_10003998-ce27e340-1ee8.png",
      restricted: true, marquee_match_up: false}
  ]

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const sbcs = useSelector(getSBCsSelector);
  const user = useSelector(getUserSelector)
  const [showPremiumSubscriptionComingSoon, setShowPremiumSubscriptionComingSoon] = useState(false)
  const [selectedSBC, setSelectedSBC] = useState<number>(-1)
  const [clickedRestrictedSBC, setClickedRestrictedSBC] = useState(false)
  const [getNotifications, setGetNotifications] = useState(false);
  const [platform, setPlatform] = useState('Playstation')
  const [okClickedWithoutPlatform, setOkClickedWithoutPlatform] = useState(false)
  const [showNotifyClickedModal, setShowNotifyClickedModal] = useState(false)

  const onPlatformChosen = (platform: string) => {
    setPlatform(platform)
  }

  const handleChange = () => {
    setGetNotifications(!getNotifications);
  }

  const onOkClick = async () => {
    if (!platform) {
      setOkClickedWithoutPlatform(true)
    } else {
      setOkClickedWithoutPlatform(false) 
      await privateApi.patchUser({
        platform,
        email_notification: getNotifications,
      })
      dispatch(fetchUser())
    }
  }

  const onBuySubscriptionClicked = () => {
    ReactGA.event({
      category: "click_buy_now",
      action: "click_buy_now"
    });
    setShowPremiumSubscriptionComingSoon(true)
  }

  useEffect(() => {
    dispatch(fetchSbcs())
  }, [ dispatch])

  const onSBCClicked = (index: number, restricted: boolean, is_marquee_match_up?: boolean) => {
    if (restricted && !(is_marquee_match_up && user.data)) {
      setClickedRestrictedSBC(true)
    } else {
      setSelectedSBC(index)
    }
  }

  let modalHeader = ''
  let modalBody = <></>
  let modalNavigation = ''
  let modalPositiveButton = ''
  let modalNegativeButton = ''

  let modalNotShowHeader;
  let modalNotShowFooter;

  if (clickedRestrictedSBC) {

    if (user.data) {
      if (showPremiumSubscriptionComingSoon) {
        modalHeader = '❗ Thank you for your interest!'
        modalBody = <span>Thank you so much for validating our product! 
        We are working hard on the final details of the premium subscription features.
        Indicate here, if you want to get notified when it is ready! 🍾</span>
        modalNavigation = '/'
        modalPositiveButton = 'Notify me'
        modalNegativeButton = 'No thanks!'
      } else {
        modalNotShowFooter = true
        modalHeader = '❗ You need a premium subscription'
        modalBody = <div className={'w-full m-auto flex flex-row md:flex md:flex-col-reverse gap-8'}>
          <SubscriptionCard boxColor={"#22d3ee"} content={
            <ul className={'flex flex-col gap-y-4 text-left'}>
            <div className={'text-primary-400 font-bold'} style={{color: "#22d3ee"}}>
              Current Subscription
            </div>
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
          </ul>} price={0} onClick={() => {}} tier={'Free'} currentSubscription={true} primaryButtonTitle={'yoo'}/>
          <SubscriptionCard boxColor={"#fb923c"} content={<>
            <ul className={'flex flex-col gap-y-4 text-left'}>
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
                <span>{copied}</span> Solve all SBCs
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
          </>} price={1.99} onClick={onBuySubscriptionClicked}
                            tier={'Premium'}
                            primaryButtonTitle={'Buy Now'}
                            currentSubscription={false}/>
        </div>
      }
    } else {
      modalHeader = '❗ Log in required to solve this SBC'
      modalBody = <span>You need to log in to solve this SBC</span>
      modalNavigation = '/login'
      modalPositiveButton = 'Log in'
      modalNegativeButton = 'Cancel'
    }
  }
  const notifyClickedModal = <NotifyClickedModal onClick={() => setShowNotifyClickedModal(false)}/>

  const marquee_matchups = sbcs.data.filter(sbc => sbc.marquee_match_up)

  let sbcsView = (
    <div className="space-y-2">
      <>
        <div className="mb-8">
          <h1 className="text-2xl font-light mb-2 md:pr-4 md:pl-4">
            Cheap and unique AI solutions to any SBC based on live player prices
          </h1>
          <h3>
            Select an SBC below!👇🏼
          </h3>
        </div>
          {showNotifyClickedModal ? notifyClickedModal : null}
          {clickedRestrictedSBC ?
            <Modal header={modalHeader}
                    body={modalBody}
                    onNegativeActionClicked={() => {
                      if (modalPositiveButton === "Notify me") {
                        ReactGA.event({
                          category: "HomePage_notify_popup",
                          action: "click_popup_notify_cancel"
                        });  
                      } else {
                        ReactGA.event({
                          category: "HomePage_login_popup",
                          action: "click_popup_login_cancel"
                        });  
                      }
                      setClickedRestrictedSBC(false)
                      setShowPremiumSubscriptionComingSoon(false)
                    }}
                    onPositiveActionClicked={() => {
                      if (modalPositiveButton === "Notify me") {
                        setShowPremiumSubscriptionComingSoon(false)
                        setClickedRestrictedSBC(false)
                        ReactGA.event({
                          category: "HomePage_notify_popup",
                          action: "click_popup_notify_notify"
                        });
                        privateApi.patchUser({notify: true})
                        setShowNotifyClickedModal(true)
                      } else {
                        ReactGA.event({
                          category: "HomePage_login_popup",
                          action: "click_popup_login",
                        });
                        navigate(modalNavigation)
                      }
                    }}
                    onCloseClicked={() => {
                      if (modalPositiveButton === "Notify me") {
                        ReactGA.event({
                          category: "HomePage_notify_popup",
                          action: "click_popup_notify_close"
                        });
                      } else {
                        ReactGA.event({
                          category: "HomePage_login_popup",
                          action: "click_popup_login_close"
                        });
                      }
                      setShowPremiumSubscriptionComingSoon(false)
                      setClickedRestrictedSBC(false)
                    }}
                    positiveActionButtonLabel={modalPositiveButton}
                    negativeActionButtonLabel={modalNegativeButton}
                    notShowHeader={modalNotShowHeader}
                    notShowFooter={modalNotShowFooter}/> : null }
        <>
          <div className={'m-auto w-2/3 pb-4'}>
            <CardSBC title={'Marquee Matchups'}
                     onClick={() => {
                      ReactGA.event({
                        category: "HomePage",
                        action: "click_sbc_marquee_matchups",
                      });
                       navigate('/sbc', { state: marquee_matchups})
                      }}
                     changeImg={"https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/sets/images/sbc_set_image_1000013-67af5e79-ce1b.png"}
                     restricted={false}
                     is_marquee_match_up={true}/>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 md:w-4/5 m-auto gap-4 pb-8">
            {mockedSBCs.length > 0 ? mockedSBCs.map((sbc, index) =>
              <CardSBC title={sbc.name}
                       key={sbc.name}
                       changeImg={sbc.icon_url}
                       restricted={sbc.restricted}
                       is_marquee_match_up={sbc.marquee_match_up}
                       onClick={(restricted, is_marquee_match_up?: boolean) => {

                         const gaAction = restricted ? 'click_sbc_restricted' : is_marquee_match_up ? 'click_sbc_marquee' : "click_sbc_free"

                        ReactGA.event({
                          category: "HomePage",
                          action: gaAction,
                        });
                         onSBCClicked(index === selectedSBC ? -1 : index, restricted, is_marquee_match_up)
                       }} />) : null}
          </div>
        </>
      </>
    </div>
  )

  if (user.data && !user.data.platform) {
    sbcsView = <Modal header={'Welcome to EasySBC!'}
    body={<div>
     <div className='container mx-auto md:w-full flex font-light flex-col gap-y-8 rounded text-left'>
     <div className={'text-m text-gray-200'}>
     Select your platform to base live player prices on
     </div>
     <ChoosePlatform onSelected={(platform) => onPlatformChosen(platform)}/>
     {okClickedWithoutPlatform ? <div className={'text-m text-error-500'}>Please choose platform</div> : null}
       <div className={'flex flex-row gap-x-2 m-auto'}>
         <input className='my-auto' type={"checkbox"} checked={getNotifications} onChange={handleChange}/>
         <p className='text-m text-gray-200 my-auto'>
           Get email notifications when new features are released
         </p>
       </div>
       <div>
         <img className='w-25 h-6'src={process.env.PUBLIC_URL + 'discord-logo.png'} alt='discord'></img>
         <p>
           Join our discord <a href={'https://discord.gg/hcvAa8ve'}
           target="_blank" rel="noreferrer"
         >
           <span>here</span>
         </a>
         </p>
       </div>
     </div>
    </div>}
    onNegativeActionClicked={() => { }}
    onPositiveActionClicked={() => onOkClick()}
    onCloseClicked={() => { }}
    positiveActionButtonLabel={'Ok'}
    negativeActionButtonLabel=""
    notShowNegativeButton
    notShowCloseButton
    />
  }

  return <main className='text-secondary text-center m-auto relative z-10'>
      <div className='mx-auto'>
        {sbcsView}
    </div>
  </main>
};

export default Home;
