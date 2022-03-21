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

const Home = () => {
  const extensionId = process.env.REACT_APP_EXTENSION_ID || "";
  const [cookies, setCookie] = useCookies(["peareasy"]);
  const [loading, setLoading] = useState(false)
  const [sbcs, setSBCs] = useState<string[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [solution, setSolution] = useState<Solution>()
  const [steps, setSteps] = useState(0)
  const [selectedSBC, setSelectedSBC] = useState<number>(-1)

  useEffect(() => {
    const sendUUIDToExtension = () => {
      if (window.chrome)
        window.chrome.runtime.sendMessage(
          extensionId,
          {
            uuid: cookies["peareasy"]
          }
        );
    }
    if (!cookies["peareasy"]) {
      api.loginAsAnonymous().then((uuid: string) => {
        setCookie("peareasy", uuid);
      });
    } else {
      sendUUIDToExtension()
      onGetSBCs()
    }
  }, [cookies, setCookie, extensionId])

  const onGetPlayers = () => {
    setLoading(true)
    api.getPlayers(cookies["peareasy"]).then((players: Player[]) => {
      const _players = players.map(player => {
        return {
          name: player.name,
          position: player.position,
          rating: player.rating
        }
      })
      setPlayers(_players)
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
    setSteps(2)
    if (players.length === 0) {
      setSolution(emptySolution)
      return
    }

    setLoading(true)
    api.solveSBC(cookies["peareasy"], sbcs[selectedSBC])
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

  const importPlayersView = (<div className="space-y-8">
    <h1 className="text-4xl font-bold m-auto">
      Import your players! ⚽
    </h1>
    <img src={process.env.PUBLIC_URL+"/tutorial.gif"} alt="tutorial" className="w-full m-auto"/>
    <div className="text-xl">
      Click
      <a href="https://www.ea.com/fifa/ultimate-team/web-app/"
         rel="noreferrer"
         target="_blank"> here </a>
      to import players
    </div>

    <div className="absolute bottom-10 left-0 right-0">
      <PrimaryButton onClick={() => {
        onGetPlayers()
        setLoading(true)
        setSteps(1)
      }} title={"Next"}/>
    </div>
  </div>)

  let sbcsView = (
    <div className="space-y-2">
      {sbcs.length > 0 ? sbcs.map((sbc, index) =>
        <CardSBC title={sbc} key={sbc} changeImg={index % 2 === 0} onClick={() => setSelectedSBC(index)} selected={selectedSBC === index}/>) : null}
      <div className="absolute bottom-10 left-16">
      <PrimaryButton onClick={() => {
        setSteps(0)
      }} title={"Back"}/>
    </div>
      <div className="absolute bottom-10 right-16">
        <PrimaryButton title={'Solve'} disabled={selectedSBC === -1} onClick={onSolveSBC}/>
      </div>
    </div>
  )

  const progressBarClassName = ["flex flex-col text-center bg-primary-500"]
  const progressBarClassNameParent = ["absolute bottom-0 h-2 w-full bg-primary-200 rounded overflow-hidden text-xs flex"]
  progressBarClassName.push('w-' + steps.toString() + '/3')
  if (steps < 3) {
    progressBarClassNameParent.push('bg-primary-200')
  } else {
    progressBarClassNameParent.push('bg-primary-500')
  }

  const progressBar = (
    <div className={progressBarClassNameParent.join(' ')}>
      <div className={progressBarClassName.join(' ')}/>
    </div>
  )
  if (steps === 2 && players.length === 0 && !loading) {
    progressBarClassNameParent.push('hidden')
    sbcsView = <div role="alert">
      <div className='w-2/3 m-auto'>
        <div className="bg-error-500 text-white font-bold rounded-t px-4 py-2">
          Oh no
        </div>
        <div className="border border-t-0 border-error-400 rounded-b bg-red-100 px-4 py-3 text-red-700 ">
          <p>It seems like your players weren't imported properly. Please, try again or see
            {<a rel="noreferrer"
                href="https://www.youtube.com/watch?v=MvMSYZ8gA2s&list=LLPrmD7AZQwQzstyOwLT0QiQ"
                target="_blank"> this </a>}
            tutorial</p>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0">
        <PrimaryButton onClick={() => {
          setSteps(1)
        }} title={"Try again! 😎"}/>
      </div>
    </div>
  }

  let solutionView

  if (solution?.players && solution.players.length > 0) {
    solutionView = (
      <div>
        <Formation players={solution.players} rawFormation={solution.formation}/>
        <p className="mt-12 text-xl">Approximate cost of players involved is {solution?.cost}</p>
        <br/>
        <div className="absolute bottom-10 left-0 right-0">
          <PrimaryButton onClick={() => {
            setSolution(emptySolution)
            setSelectedSBC(-1)
            setSteps(1)
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
        <div className="absolute bottom-10 left-0 right-0">
          <PrimaryButton onClick={() => {
            setSelectedSBC(-1)
            setSteps(1)
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
      Oh no, you are on not using Chrome! 😔
    </h1>
    <p>In order for you to use our Chrome extension to import your players, you have to use this site from a Chrome browser!</p>
  </div>)

  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);


  return (
    <>
      <main className='w-4/5 sm:w-3/4 lg:w-1/2 mx-auto h-4/5 text-secondary text-center relative z-10'>
        {
          isMobile ? mobileView : 
          !isChrome ?  nonChromeView : 
          (<div className='mx-auto h-4/5 overflow-y-auto'>
          {steps >= 1 && !(steps === 3 && !solution) ? progressBar : null}
          {steps === 0 ? importPlayersView : null}
          {steps === 1 && !loading ? sbcsView : null}
          {steps === 1 && loading ? <Spinner/> : null}
          {steps === 2 ? (
            loading ? <Spinner/> : solutionView
          ) : null}
        </div>)
        }
        
      </main>
    </>
  )
};

export default Home;
