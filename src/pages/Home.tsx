import React, {useCallback, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import * as api from "../api/api";
import {SecondaryButton, PrimaryButton} from "../components/UI/Button";
import Spinner from "../components/UI/Spinner/Spinner";
import CardSBC from "../components/UI/CardSBC";
import SolutionView from "../components/UI/SolutionView"
import { Solution } from "../interfaces/Solution";
import { SBC } from "../interfaces/SBC";
import {isMobile} from 'react-device-detect';
import Modal from "../components/UI/Modal";
import { NavLink } from 'react-router-dom';
import { open_link as openLinkIcon } from '../components/UI/icons';
import Info from "../components/UI/Info";


const Home = () => {

  const enum Steps {
    Start,
    HasNotAcceptedTos,
    DownloadExtension,
    ImportPlayers,
    ChooseSBC,
    Solution
  }

  const extensionId = process.env.REACT_APP_EXTENSION_ID!

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
  const [showModal, setShowModal] = useState(false)

  // data
  const [sbcs, setSBCs] = useState<SBC[]>([])
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
      api.verifyUser(cookies["userId"]);
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
      setSBCs(sbcs)
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
    api.solveSBC(userId, sbcs[selectedSBC].name)
      .then((solution: Solution) => {
        const {formation, players, cost, chem, rating, solution_message} = solution;
        setSolution({players, cost, chem, rating, formation, solution_message})
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const emptySolution = (): Solution => ({cost: 0, chem: 0, rating: 0, players: [], formation: "", solution_message: ""})

  const onClearPlayers = () => {
    api.deletePlayersUsedInSBCs(userId, solution?.players)
  }

  const importPlayersView = (
    <div className="flex flex-col">
    <p className="m-auto text-3xl pb-2">Import your players</p>
    <p className="m-auto text-gray-300 italic text-l pb-8">How to import your players from the FUT Web App in 5 easy steps</p>
    <div className="flex flex-row space-between space-x-2 pl-32 pr-32 w-screen ">
      <div className="bg-gray-800 flex flex-col mt-2 mb-24 w-1/5 shadow-2xl laptop:h-64">
        <div className="ml-4 mr-4 mt-8 h-16 shadow-2xl">
          <SecondaryButton title={"Open FUT App"} icon={openLinkIcon} onClick={onImportPlayersClicked}/>
        </div>
        <div className="bg-primary-500 rounded-full w-12 h-12 m-auto mb-4 flex">
          <p className="text-secondary m-auto text-2xl text-bold">1</p>
        </div>
      </div>
      <div className="flex flex-col bg-gray-900 rounded w-3/5 mb-8">
        <div className="flex flex-row space-x-2  pr-2 pl-2">
          <div className="bg-gray-800 w-1/3 flex flex-col z-10 mt-2 shadow-2xl laptop:h-64">
            <img alt="club" className="p-4" src={process.env.PUBLIC_URL+'/club.png'}/>
            <div className="bg-primary-500 rounded-full w-12 h-12 m-auto mb-4 flex">
              <p className="text-secondary m-auto text-2xl text-bold">2</p>
            </div>
          </div>
          <div className="bg-gray-800 w-1/3 flex flex-col z-10 mt-2 shadow-2xl laptop:h-64">
          {/* <div className="bg-primary-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16 w-80 h-4 z-20 "></div> */}
            <img alt="players" className="p-4" src={process.env.PUBLIC_URL+'/players.png'}/>
            <div className="bg-primary-500 rounded-full w-12 h-12 m-auto mb-4 flex">
              <p className="text-secondary m-auto text-2xl text-bold">3</p>
            </div>
          </div>
          <div className="bg-gray-800 w-1/3 flex flex-col z-10 mt-2 shadow-2xl laptop:h-64">
            <img alt="import players" className="p-4" src={process.env.PUBLIC_URL+'/import_players.gif'}/>
            <div className="bg-primary-500 rounded-full w-12 h-12 m-auto mb-4 flex">
              <p className="text-secondary m-auto text-2xl text-bold">4</p>
            </div>
          </div>
        </div>
        <p className="my-auto text-2xl font-light ">Inside the FUT App</p>
      </div>
      <div className="bg-gray-800 flex flex-col mt-2 mb-24 w-1/5 shadow-2xl laptop:h-64">
        <div className="ml-4 mr-4 mt-8 h-16">
          <SecondaryButton title={"Next"} onClick={onGetPlayers} disabled={!nextEnabled}/>
        </div>
        <div className="bg-primary-500 rounded-full w-12 h-12 m-auto mb-4 flex">
          <p className="text-secondary m-auto text-2xl text-bold z-40">5</p>
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
                href="https://www.youtube.com/watch?v=sFu6rMaSEDg"
                target="_blank"> this </a>}
            tutorial</p>
        </div>
      </div>
    </div> : null}
    </div>)

  let sbcsView = (
    <div className="space-y-2">
      <h1 className="text-3xl font-light mb-6">
        Select an SBC 👇🏼
      </h1>
      <div className="grid grid-cols-2 gap-4 pb-2">
        {sbcs.length > 0 ? sbcs.map((sbc, index) =>
          <CardSBC title={sbc.name} key={sbc.name} changeImg={index % 2 === 0}
                   onClick={() => setSelectedSBC(index === selectedSBC ? -1 : index)}
                   selected={selectedSBC === index}/>) : null}
      </div>
      <Info content={<div>
        <p className="font-bold">Players have successfully been imported! 💥</p>
        <p className="text-sm">We have imported {numberOfPlayers} players</p>
      </div>}/>
      <div className="pt-10 flex justify-around">
        <PrimaryButton onClick={() => {
          setStep(Steps.ImportPlayers)
        }} title={"Back"}/>
        <PrimaryButton title={'Solve'} disabled={selectedSBC === -1} onClick={onSolveSBC}/>
      </div>
    </div>
  )

  let solutionView

  if (solution?.players && solution.players.length > 0) {
    solutionView = (
      <div>
        <SolutionView players={solution.players} solution={solution} sbc={sbcs[selectedSBC]} />
        <div className="mt-10 top-10 bottom-10 left-0 right-0">
          <PrimaryButton onClick={() => {
            setShowModal(true)
          }} title={"Solve another SBC"}/>
        </div>
        {showModal ? <Modal header={"❗ Did you use this solution?"}
                            body={"If you want to solve a new SBC we want to make sure that your old players are removed from our database. " +
                            "Please indicate if you used our generated solution"}
                            onNegativeActionClicked={() => {
                              setSolution(emptySolution)
                              setSelectedSBC(-1)
                              setStep(Steps.ChooseSBC)
                              setShowModal(false)
                            }}
                            onPositiveActionClicked={() => {
                              onClearPlayers()
                              setSolution(emptySolution)
                              setSelectedSBC(-1)
                              setStep(Steps.ChooseSBC)
                              setShowModal(false)
                            }}
                            onCloseClicked={() => setShowModal(false)}
                            positiveActionButtonLabel="Yes"
                            negativeActionButtonLabel="No"
        /> : null }
      </div>
    )
  } else {
    solutionView = (
      <div className={'space-y-8'}>
        <h1 className="text-5xl font-bold m-auto">
          Oh no, we couldn't find a solution 😔
        </h1>
        <p>
          {solution?.solution_message}
        </p>
        <p>
          You can try to see if another SBC can be solved!
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
    <h1 className="text-2xl mx-auto h-4/5">
      Our AI is working hard to get you a good solution.
    </h1>
    <h1 className="text-2xl mx-auto pb-12">This might take up to 60 seconds 👊🏽</h1>
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
    <p className="text-xl">
      Please refresh the application once you have downloaded the extension 🔄
    </p>
    <img alt={"img"} className="m-auto w-1/4" src={process.env.PUBLIC_URL+'/chrome.svg'}/>
    <PrimaryButton title={"Download Extension"} icon={openLinkIcon} onClick={() =>
      window.open(
        'https://chrome.google.com/webstore/detail/auto-sbc/mchecdiinfipdfihkoebfbpfnllbllhc?hl=en-GB',
        '_blank'
      )}/>
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
