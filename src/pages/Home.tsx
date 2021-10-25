import React, {useEffect, useState} from "react";
import { useCookies } from "react-cookie";
import * as api from "../api/api";
import { PrimaryButton, SecondaryButton } from "../components/UI/Button";
import Spinner from "../components/UI/Spinner/Spinner";

interface SBC {
  name: string
}

const Home = () => {
  const extensionId = "jjkdpohdgeeohccdmbhmecimolaglhkd";
  const [cookies, setCookie] = useCookies(["peareasy"]);
  const [loading, setLoading] = useState(false)
  const [sbcs, setSBCs] = useState<JSX.Element[]>([])
  const [players, setPlayers] = useState<JSX.Element[]>([])
  const [solution, setSolution] = useState<JSX.Element[]>([])

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
      api.postUUID().then((uuid: string) => {
        setCookie("peareasy", uuid);
      });
    } else {
      sendUUIDToExtension()
    }
  }, [cookies, setCookie])

  const onGetPlayers = () => {
    api.getPlayers(cookies['peareasy']).then((players: SBC[]) => {
      let ctr = 0
      const _players = players.map(player => {
        ctr++
        return <div className={"text-secondary bg-gray-600 rounded text-s p-1"} key={ctr}>{player}</div>
      })
      setPlayers(_players)
    })
  }

  const onGetSBCs = () => {
    api.getSBCs().then((sbcs: SBC[]) => {
      const _sbcs = sbcs.map(sbc =>
        <PrimaryButton key={sbc.name} onClick={() => onSolveSBC(sbc.name)} title={sbc.name}/>
      )
      setSBCs(_sbcs)
    })
  }

  const onSolveSBC = (sbc: string) => {
    setLoading(true)
    api.solveSBC(cookies['peareasy'], sbc)
    .then((solution: SBC[]) => {
      const players = solution.map(player => <div className={"text-primary-300 bg-gray-600 rounded p-1"}>{player}</div>)
      setSolution(players)
      setLoading(false)
  })
    .catch(() => {
      setSolution([])
      setLoading(false) })
  }

  return (
    <main className='w-2/3 mx-auto space-y-10'>
    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
      <div className="space-y-8">
        <PrimaryButton onClick={onGetPlayers} title={"Get your players"}/>
        <div className="rounded p-6">
            <h1 className="text-secondary text-center text-3xl mt-8 mb-8">Your players</h1>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {players}
          </div>
      </div>
      <div className="space-y-8">
        <PrimaryButton onClick={onGetSBCs} title={"See available SBCs"}/>
        <div className="rounded p-6">
            <h1 className="text-secondary text-center text-3xl mt-8 mb-8">Available SBCs</h1>
            {solution.length > 0 ? <div className="text-secondary text-xl">A solution was found! 🎉 </div> : null }
          </div>
          <div className="flex flex-col gap-4 mt-8">
            {
              loading ? <Spinner/> : (solution.length === 0 ? sbcs :
              <div className="flex flex-wrap gap-2">
                {solution}
              </div>)
            }
            {solution.length > 0 ? <SecondaryButton title="Clear Solution" onClick={() => setSolution([])}/> : null }
          </div>
      </div>
    </div>
  </main>
  )
};

export default Home;
