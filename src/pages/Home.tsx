import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import * as api from "../api/api";
import {PrimaryButton} from "../components/UI/Button";
import Spinner from "../components/UI/Spinner/Spinner";
import CardSBC from "../components/UI/CardSBC";
import WaveBackground from "../components/UI/WaveBackground";

interface SBC {
  name: string
}

interface Player {
  name: string,
  position: string
}

interface Solution {
  cost: number,
  players: Player[]
}

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
  }, [cookies, setCookie, extensionId])

  const onGetPlayers = () => {
    setLoading(true)
    api.getPlayers(cookies["peareasy"]).then((players: Player[]) => {
      const _players = players.map(player => {
        return {
          name: player.name,
          position: player.position
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
    setSteps(3)
    if (players.length === 0) {
      return
    }

    setLoading(true)
    api.solveSBC(cookies["peareasy"], sbcs[selectedSBC])
      .then((solution: Solution) => {
        const players = solution.players
        const cost = solution.cost
        setSolution({players, cost})
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const emptySolution = (): Solution => ({cost: 0, players: []})

  const getStartedView = (<div className="space-y-4">
      <h1
        className="font-extrabold text-transparent text-5xl bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text ">
        Hello there! 👋🏼
      </h1>
      <p className="text-left pt-4">
        Are you tired of spending time on solving squad building challenges (SBCs) in FIFA ultimate team?
      </p>
      <p className="text-left">
        Then you have come to the right place! We've developed an artificial intelligence which searches for a cheap
        solution to an SBC with the players in your club!
      </p>
      <div className="absolute bottom-10 left-0 right-0">
        <PrimaryButton onClick={() => setSteps(1)} title={"Get Started! 👊🏼"}/>
      </div>
    </div>
  )

  const importPlayersView = (<div className="space-y-4">
    <h1 className="text-5xl font-bold m-auto">
      Import your players! ⚽
    </h1>
    <div className="text-left pt-4">
      We will take you through a few steps, before you can solve SBCs. The first step is to import your players from FUT.
    </div>
    <div className="text-left">
      Once you have logged in, go to your club and browse through all the players by clicking next. Once you've reached the last page,
      you can go back to peareasy and click done. After the players have been imported, you can choose an SBC to solve.
    </div>
    <div className="text-left">
      If you are still in doubt, you can watch {<a rel="noreferrer"
                                                   href="https://www.youtube.com/watch?v=MvMSYZ8gA2s&list=LLPrmD7AZQwQzstyOwLT0QiQ"
                                                   target="_blank"> this </a>} short video to see the flow
    </div>
    <div>
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
        setSteps(2)
      }} title={"Done"}/>
    </div>
  </div>)

  let sbcsView = (
    <div className="space-y-2">
      {sbcs.length > 0 ? sbcs.map((sbc, index) =>
        <CardSBC title={sbc} key={sbc} changeImg={index % 2 === 0} onClick={() => setSelectedSBC(index)} selected={selectedSBC === index}/>) : null}
      <div className="absolute bottom-10 left-0 right-0">
        <PrimaryButton title={'Solve ✨️'} onClick={onSolveSBC}/>
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

  if (solution) {
    solutionView = (
      <div>
        {solution?.players.map(player => <p>
          {player.name}, {player.position}
        </p>)}
        <br/>
        <p>Approximate cost of players involved is {solution?.cost}</p>
        <div className="absolute bottom-10 left-0 right-0">
          <PrimaryButton onClick={() => {
            setSolution(emptySolution)
            setSteps(2)
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
            setSteps(2)
          }} title={"Try another one! 😎"}/>
        </div>
      </div>
    )
  }

  return (
    <>
      <main className='w-2/6 mx-auto h-2/4 text-secondary text-center relative z-10'>
        <div className='mx-auto h-3/4 overflow-y-scroll'>
          {steps >= 1 && !(steps === 3 && !solution) ? progressBar : null}
          {steps === 0 ? getStartedView : null}
          {steps === 1 ? importPlayersView : null}
          {steps === 2 && !loading ? sbcsView : null}
          {steps === 2 && loading ? <Spinner/> : null}
          {steps === 3 ? (
            loading ? <Spinner/> : solutionView
          ) : null}
        </div>
      </main>
      <WaveBackground/>
    </>
  )
};

export default Home;
