import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import * as api from "../api/api";
import {PrimaryButton} from "../components/UI/Button";
import Spinner from "../components/UI/Spinner/Spinner";
import CardSBC from "../components/UI/CardSBC";

interface SBC {
  name: string
}

const Home = () => {
  const extensionId = "jjkdpohdgeeohccdmbhmecimolaglhkd";
  const [cookies, setCookie] = useCookies(["peareasy"]);
  const [loading, setLoading] = useState(false)
  const [sbcs, setSBCs] = useState<string[]>([])
  const [players, setPlayers] = useState<string[]>([])
  const [solution, setSolution] = useState<string[]>([])
  const [steps, setSteps] = useState(0)
  const [selectedSBC, setSelectedSBC] = useState<number>(-1)

  useEffect(() => {
    const sendUUIDToExtension = () => {
      chrome.runtime.sendMessage(
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
  }, [cookies, setCookie])

  const onGetPlayers = () => {
    setLoading(true)
    api.getPlayers(cookies['peareasy']).then((players: SBC[]) => {
      const _players = players.map(player => player.name)
      setPlayers(_players)
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const onGetSBCs = () => {
    setLoading(true)
    api.getSBCs().then((sbcs) => {
      setSBCs(sbcs.map((sbc: SBC) => sbc.name))

    }).catch(() => setLoading(false))
  }

  const onSolveSBC = () => {
    setSteps(3)
    if (players.length === 0) {
      return
    }

    setLoading(true)
    api.solveSBC(cookies['peareasy'], sbcs[selectedSBC])
      .then((players: SBC[]) => {
        setSolution(players.map((players) => players.name))
        setLoading(false)
      })
      .catch(() => {
        setSolution([])
        setLoading(false)
      })
  }

  const getStartedView = (<>
      <h1 className="font-extrabold text-transparent text-5xl bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text ">
        Hello there! 👋🏼
      </h1>
      <p className="m-auto">
        Are you tired of spending time on solving squad building challenges (SBCs) in FIFA ultimate team?
      </p>
      <p className="m-auto">
        Then you have come to the right place! We've developed an artificial intelligence which searches for a cheap solution to an SBC with the players in your club!
      </p>
      <div className="absolute bottom-10 left-0 right-0">
        <PrimaryButton onClick={() => setSteps(1)} title={"Get Started!"}/>
      </div>
    </>
  )

  const importPlayersView = (<div className="space-y-8">
    <h1 className="text-5xl font-bold m-auto">
      Import your players! ⚽
    </h1>
    <div className="m-auto">
      We will take you through a few steps, before you can solve SBCs
    </div>
    <div>
      Click
      <a href="https://www.ea.com/fifa/ultimate-team/web-app/" className="no-underline m-auto"
         target="_blank"> here </a>
      to import players
    </div>
    <div className="absolute bottom-10 left-0 right-0">
      <PrimaryButton onClick={() => {
        onGetPlayers()
        setSteps(2)
      }} title={"Done"}/>
    </div>
  </div>)

  let sbcsView = (
    <div className="space-y-2">
      {sbcs.length > 0 ? sbcs.map((sbc, index) =>
        <CardSBC title={sbc} onClick={() => setSelectedSBC(index)} selected={selectedSBC === index}/>) : null}
      <div className="absolute bottom-10 left-0 right-0">
        <PrimaryButton title={'Solve'} onClick={onSolveSBC}/>
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
          <p>It seems like your players weren't imported properly. Please, try again or see this Youtube tutorial</p>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0">
        <PrimaryButton onClick={() => {
          setSteps(1)
        }} title={"Try again!"}/>
      </div>
    </div>
  }

  console.log(solution)

  return (
    <main className='w-2/6 mx-auto h-96 text-secondary text-center relative space-y-8'>
      {steps >= 1 ? progressBar : null}
      {steps === 0 ? getStartedView : null}
      {steps === 1 ? importPlayersView : null}
      {steps === 2 ? sbcsView : null}
      {steps === 3 ? (
        loading ? <Spinner/> : null
      ) : null}
    </main>
  )
};

export default Home;
