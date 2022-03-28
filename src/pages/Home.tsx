import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import * as api from "../api/api";
import {PrimaryButton} from "../components/UI/Button";
import Spinner from "../components/UI/Spinner/Spinner";
import CardSBC from "../components/UI/CardSBC";
import Formation from "../components/UI/Formation"
import { Player } from "../interfaces/Player";
import { Solution } from "../interfaces/Solution";
import { SBC } from "../interfaces/SBC";
import {isMobile} from 'react-device-detect';
import { NavLink } from 'react-router-dom';
import { open_link as openLinkIcon } from '../components/UI/icons';


const Home = () => {

  const enum Steps {
    Start,
    HasNotAcceptedTos,
    DownloadExtension,
    ImportPlayers,
    ChooseSBC,
    Solution
  }

  const extensionId = process.env.REACT_APP_EXTENSION_ID || "";

  // setup phase
  const [cookies, setCookie] = useCookies(["userId"]);
  const [userId, setUserId] = useState("")
  const [tosAccepted, setTosAccepted] = useState(false)
  const [extensionInstalled, setExtensionInstalled] = useState(false)

  // navigation
  const [step, setStep] = useState(Steps.Start)
  const [importError, setImportError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nextEnabled, setNextEnabled] = useState(false)

  // data
  const [sbcs, setSBCs] = useState<string[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [solution, setSolution] = useState<Solution>()
  const [selectedSBC, setSelectedSBC] = useState<number>(-1)

  useEffect(() => {
    const sendUUIDToExtension = () => {
      if (window.chrome?.runtime) {
        setLoading(true)
        window.chrome.runtime.sendMessage(
          extensionId,
          {
            uuid: cookies["userId"]
          }, (res) => {
            setLoading(false)
            setExtensionInstalled(res.msg === 'confirmation')
          });
      } else {
        setLoading(false)
        console.error("window.chrome not available");
      }
    }
    if (!cookies["userId"]) {
      setStep(Steps.HasNotAcceptedTos)
    } else {
      if (extensionInstalled) {
        setStep(Steps.ImportPlayers)
      } else {
        setStep(Steps.DownloadExtension)
      }
      sendUUIDToExtension()
      onGetSBCs()
      setUserId(cookies["userId"])
    }
  }, [Steps.DownloadExtension, Steps.HasNotAcceptedTos, Steps.ImportPlayers, cookies, extensionId, extensionInstalled])

  const onTosAcceptChange = () => {
    setTosAccepted(!tosAccepted)
  }

  const onImportPlayersClicked = () => {
    setNextEnabled(true)
    setImportError(false)
    window.open(
      'https://www.ea.com/fifa/ultimate-team/web-app/',
      '_blank'
    )
  }

  const onGetPlayers = () => {
    setLoading(true)
    api.getPlayers(userId).then((players: Player[]) => {
      if (players.length === 0) {
        setImportError(true)
      } else {
        const _players = players.map(player => {
          return {
            name: player.name,
            position: player.position,
            rating: player.rating
          }
        })
        setPlayers(_players)
        setStep(Steps.ChooseSBC)
        setImportError(false)
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const onGetSBCs = () => {
    setLoading(true)
    api.getSBCs().then((sbcs) => {
      setSBCs(sbcs.map((sbc: SBC) => sbc.name))
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const onSolveSBC = () => {
    setStep(Steps.Solution)
    if (players.length === 0) {
      setSolution(emptySolution)
      return
    }

    setLoading(true)
    api.solveSBC(userId, sbcs[selectedSBC])
      .then((solution: Solution) => {
        const formation = solution.formation
        const players = solution.players
        const cost = solution.cost
        setSolution({players, cost, formation})
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const emptySolution = (): Solution => ({cost: 0, players: [], formation: ""})

  const importPlayersView = (<div className="space-y-12">
    <div className="grid grid-cols-6 gap-8">
      <h1 className="text-m m-auto text-left space-y-3 col-start-1 col-end-1">
        <p className="border-2 border-secondary rounded p-2">1. Click the Import Players button</p>
        <p className="border-2 border-secondary rounded p-2">2. Navigate through all your player pages</p>
        <p className="border-2 border-secondary rounded p-2">3. Go back to EasySBC</p>
      </h1>
      <img src={process.env.PUBLIC_URL+"/tutorial.gif"} alt="tutorial" className="w-full col-start-2 col-end-7 m-auto rounded"/>
    </div>

    <div className="bottom-10 grid grid-cols-5">
      <div className="col-start-3">
        <PrimaryButton title={"Import Players"} icon={openLinkIcon} onClick={onImportPlayersClicked}/>
      </div>
      <div className="col-start-5">
        <PrimaryButton onClick={() => {
          onGetPlayers()
        }} title={"Next"} disabled={!nextEnabled}/>
      </div>
    </div>

    { importError ? <div role="alert">
      <div className='w-2/3 m-auto'>
        <div className="bg-error-500 text-white font-bold rounded-t px-3 py-1">
          Oh no
        </div>
        <div className="border border-t-0 border-error-400 rounded-b bg-red-100 px-4 py-3 text-red-700 ">
          <p>It seems like your players weren't imported properly. Please try again or see
            {<a rel="noreferrer"
                href="https://www.youtube.com/watch?v=MvMSYZ8gA2s&list=LLPrmD7AZQwQzstyOwLT0QiQ"
                target="_blank"> this </a>}
            tutorial</p>
        </div>
      </div>
    </div> : null}
  </div>)

  let sbcsView = (
    <div className="space-y-2">
      <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-2 shadow-md mx-20 mb-10" role="alert">
        <div className="flex">
          <div className="py-1">
            <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20">
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
            </svg>
          </div>
          <div>
            <p className="font-bold">Players have successfully been imported! 💥</p>
            <p className="text-sm">We have imported {players.length} players</p>
          </div>
        </div>
      </div>
      {sbcs.length > 0 ? sbcs.map((sbc, index) =>
        <CardSBC title={sbc} key={sbc} changeImg={index % 2 === 0} onClick={() => setSelectedSBC(index === selectedSBC ? -1 : index)} selected={selectedSBC === index}/>) : null}
      <div className="pt-10 flex justify-around">
        <PrimaryButton onClick={() => {
          setStep(Steps.ImportPlayers)
        }} title={"Back"}/>
        <PrimaryButton title={'Solve'} disabled={selectedSBC === -1} onClick={onSolveSBC}/>
      </div>
    </div>
  )

  console.log(importError)

  let solutionView

  if (solution?.players && solution.players.length > 0) {
    solutionView = (
      <div>
        <Formation players={solution.players} rawFormation={solution.formation}/>
        <p className="mt-12 text-xl">Approximate cost of players involved is {solution?.cost}</p>
        <br/>
        <div className="top-10 bottom-10 left-0 right-0">
          <PrimaryButton onClick={() => {
            setSolution(emptySolution)
            setSelectedSBC(-1)
            setStep(Steps.ChooseSBC)
          }} title={"Try another one! 😎"}/>
        </div>
      </div>
    )
  } else {
    solutionView = (
      <div className={'space-y-8'}>
        <h1 className="text-5xl font-bold m-auto">
          Oh no, we couldn't find a solution 😔
        </h1>
        <p>
          We can see that you only have {players.length} players in the club that can be used for SBCs.
        </p>
        <p>
          With your current players, we couldn't find a solution - you can try to see if another SBC can be solved.
        </p>
        <div className="top-10 bottom-10 left-0 right-0">
          <PrimaryButton onClick={() => {
            setSelectedSBC(-1)
            setStep(Steps.ChooseSBC)
          }} title={"Try another one! 😎"}/>
        </div>
      </div>
    )
  }

  const mobileView = (<div className="space-y-8">
    <h1 className="text-3xl font-bold m-auto">
      Oh no, you are on mobile! 😔
    </h1>
    <p>In order for you to use our Chrome extension to import your players, you have to use this site from a desktop computer!</p>
  </div>)

  const nonChromeView = (<div className="space-y-8">
    <h1 className="text-3xl font-bold mx-auto h-4/5 overflow-y-auto">
      Oh no, you are not using Chrome! 😔
    </h1>
    <p>In order for you to use our Chrome extension to import your players, you have to use this site from a Chrome browser!</p>
  </div>)

  const loadingView = (<div className="space-y-8">
    <h1 className="text-2xl font-bold mx-auto h-4/5 overflow-y-auto mb-24">
      We're trying to get you one of the optimal solutions. This might take up to 30 seconds 👊🏽
    </h1>
    <Spinner/>
  </div>)

  const tosView = (
    <div className="space-y-12 text-center">
      <img alt={"img"} className="m-auto w-1/3 " src={process.env.PUBLIC_URL+'/sbc_gold.png'}/>
    <div className="form-check flex justify-center">
      <input
        className="form-check-input h-4 w-4 border rounded-sm focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="checkbox"
        checked={tosAccepted}
        onChange={onTosAcceptChange}
      />
      <label>
        <p>I hereby declare that I have read and accept both</p>
        <p><NavLink to={"/tos"} target="_blank">Terms of Service</NavLink> and <NavLink to={"/privacy"} target="_blank">Privacy Policy</NavLink></p>
      </label>
    </div>
    <PrimaryButton disabled={!tosAccepted} onClick={() => {
      setLoading(true)
      setStep(Steps.DownloadExtension)
      api.loginAsAnonymous().then((uuid: string) => {
        setCookie("userId", uuid);
      });
      setTosAccepted(tosAccepted)
    }} title={"Start Solving SBCs"}/>
  </div>)

  const getChromeExtensionView = <div className="space-y-12 text-center">
    <h1 className="text-xl">
      You need our Chrome extension to import your players
    </h1>
    <img alt={"img"} className="m-auto w-1/4" src={process.env.PUBLIC_URL+'/chrome.svg'}/>
    <PrimaryButton title={"Download Extension"} icon={openLinkIcon} onClick={() =>
      window.open(
        'https://chrome.google.com/webstore/detail/auto-sbc/mchecdiinfipdfihkoebfbpfnllbllhc?hl=en-GB',
        '_blank'
      )}/>
    <p className="text-l">
      Please refresh the application once you have downloaded the extension 🔄
    </p>
  </div>

  const isChrome = !!window.chrome
  let currentView

  if (step === Steps.HasNotAcceptedTos) {
    currentView = loading ?  <Spinner/> : tosView
  } else if (step === Steps.DownloadExtension) {
    currentView = loading ?  <Spinner/> : getChromeExtensionView
  } else if (step === Steps.ImportPlayers) {
    currentView = loading ?  <Spinner/> : importPlayersView
  } else if (step === Steps.ChooseSBC) {
    currentView = loading ?  <Spinner/> : sbcsView
  } else if (step === Steps.Solution) {
    currentView = loading ? loadingView : solutionView
  }

  return <main className='w-1/2 mx-auto h-3/5 text-secondary text-center relative z-10'>
    { isMobile ? mobileView :
      !isChrome ?  nonChromeView :
      <div className='mx-auto'>
        {currentView}
    </div> }
  </main>
};

export default Home;
