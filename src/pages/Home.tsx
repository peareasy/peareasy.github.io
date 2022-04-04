import React, {useCallback, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import * as api from "../api/api";
import {SecondaryButton, PrimaryButton} from "../components/UI/Button";
import Spinner from "../components/UI/Spinner/Spinner";
import CardSBC from "../components/UI/CardSBC";
import Formation from "../components/UI/Formation"
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
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [solution, setSolution] = useState<Solution>()
  const [selectedSBC, setSelectedSBC] = useState<number>(-1)

  const sendUUIDToExtension = useCallback(() => {
    if (window.chrome?.runtime) {
      setLoading(true)

      window.chrome.runtime.sendMessage(
          extensionId,
          {
            uuid: cookies["userId"]
          }, (res) => {
            setLoading(false)
            setExtensionInstalled(res.msg === 'confirmation')
            console.log("Response received from extension")
          });
    } else {
      setLoading(false)
      console.error("window.chrome not available");
    }
  }, [cookies, extensionId])

  useEffect(() => {
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
  }, [sendUUIDToExtension, Steps.DownloadExtension, Steps.HasNotAcceptedTos, Steps.ImportPlayers, cookies, extensionId, extensionInstalled])

  const onTosAcceptChange = () => {
    setTosAccepted(!tosAccepted)
  }



  const onImportPlayersClicked = () => {
    api.deletePlayers(userId)
    setNextEnabled(true)
    setImportError(false)
    sendUUIDToExtension()
    window.open(
      'https://www.ea.com/fifa/ultimate-team/web-app/',
      '_blank'
    )
  }

  const onGetPlayers = () => {
    setLoading(true)
    api.getPlayers(userId).then((numberOfPlayers) => {
      if (numberOfPlayers === 0) {
        setImportError(true)
      } else {
        setNumberOfPlayers(numberOfPlayers)
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
    if (numberOfPlayers === 0) {
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

  const importPlayersView = (
    <div className="flex flex-col">
      <p className="m-auto text-3xl pt-8 pb-8">Import your players from the FUT Web App</p>
    <div className="flex flex-row space-between w-screen justify-between pl-4 pr-4">
      <div className="bg-gray-900 w-1/6 flex flex-col mt-4 mb-24">
        <div className="ml-4 mr-4 mt-4 h-28">
          <SecondaryButton title={"Launch FUT Web App"} icon={openLinkIcon} onClick={onImportPlayersClicked}/>
        </div>
        <div className="bg-primary-500 rounded-full w-16 h-16 m-auto mb-4 flex">
          <p className="text-secondary m-auto text-3xl text-bold">1</p>
        </div>
      </div>
      <div className="flex flex-col w-7/12 bg-gray-700 justify-around rounded">
        <div className="flex flex-row justify-around">
          <div className="bg-gray-900 w-3/12 flex flex-col z-10 mt-4">
            <img className="p-4" src={process.env.PUBLIC_URL+'/club.png'}/>
            <div className="bg-primary-500 rounded-full w-16 h-16 m-auto mb-4 flex">
              <p className="text-secondary m-auto text-3xl text-bold">2</p>
            </div>
          </div>
          <div className="bg-gray-900 w-3/12 flex flex-col z-10 mt-4">
            <img className="p-4" src={process.env.PUBLIC_URL+'/players.png'}/>
            <div className="bg-primary-500 rounded-full w-16 h-16 m-auto mb-4 flex">
              <p className="text-secondary m-auto text-3xl text-bold">3</p>
            </div>
          </div>
          <div className="bg-gray-900 w-3/12 flex flex-col z-10 mt-4">
            <img className="p-4" src={process.env.PUBLIC_URL+'/import_players.gif'}/>
            <div className="bg-primary-500 rounded-full w-16 h-16 m-auto mb-4 flex">
              <p className="text-secondary m-auto text-3xl text-bold">4</p>
            </div>
          </div>
        </div>
        <p className="m-auto text-3xl pt-8 pb-8">Inside FUT Web App</p>
      </div>
      <div className="bg-gray-900 w-1/6 flex flex-col mt-4 mb-24">
        <div className="ml-4 mr-4 mt-4 h-28">
          <SecondaryButton title={"Next"} onClick={onGetPlayers} disabled={!nextEnabled}/>
        </div>
        <div className="bg-primary-500 rounded-full w-16 h-16 m-auto mb-4 flex">
          <p className="text-secondary m-auto text-3xl text-bold">5</p>
        </div>
      </div>
    </div>
    { importError ? <div role="alert">
      <div className='w-2/3 m-auto mt-10'>
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
            <p className="text-sm">We have imported {numberOfPlayers} players</p>
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
          We can see that you only have {numberOfPlayers} players in the club that can be used for SBCs.
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

  const loadingView = (<div className="space-y-4">
    <h1 className="text-2xl font-bold mx-auto h-4/5">
      Our AI is working hard to get you a good solution.
    </h1>
    <h1 className="text-2xl font-bold mx-auto pb-12">This might take up to 60 seconds 👊🏽</h1>
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

  return <main className='text-secondary text-center m-auto relative z-10'>
    { isMobile ? mobileView :
      !isChrome ?  nonChromeView :
      <div className='mx-auto'>
        {currentView}
    </div> }
  </main>
};

export default Home;
