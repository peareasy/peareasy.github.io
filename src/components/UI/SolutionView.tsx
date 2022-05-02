import { Player } from "../../interfaces/Player";
import { CopyButton } from "./CopyButton";
import {Solution} from "../../interfaces/Solution";
import {SBC} from "../../interfaces/SBC";
import {copied} from "./icons";
import React from "react";

type SolutionViewProps = {
  players: Player[]
  solution: Solution,
  sbc: SBC
};

const SolutionView = ({players, solution, sbc}: SolutionViewProps) => {
  const formation = ("1-" + solution.formation).split('-').map(Number)

  const formationWithPlayers = []
  let counter = 0;
  for (let i = 0; i < formation.length; i++) {
    const row = []
    for (let j = 0; j < formation[i]; j++) {
      row.push(
        <div className="rounded bg-primary-800 flex flex-row w-48 m-auto justify-between ">
          <div className="flex flex-col p-2">
            <CopyButton value={players[counter].name} />
            <div className="text-secondary text-left">{players[counter].position+', '+players[counter].rating}</div>
          </div>
          <div className="flex flex-col p-2 my-auto">
            {players[counter].loyalty ?
              <div className="w-6 h-6">
                <img className="w-4 m-auto" alt="loyalty" src={process.env.PUBLIC_URL + '/loyalty.png'}/>
              </div>
              : null }
            {players[counter].untradeable ?
              <div className="w-6 h-6">
              <img className="w-6" alt="untradeable" src={process.env.PUBLIC_URL + '/untradeable.png'}/>
            </div>: null }
          </div>
        </div>)
      counter++
    }
    formationWithPlayers.push(
      <div className="flex flex-row justify-center gap-x-4">
        {row}
      </div>
    )
  }
  return (
  <div className={"mx-auto flex justify-center"}>
    <div className="flex flex-row gap-x-16">
      <div className="text-secondary w-1/5 text-center font-light text-2xl"/>
      <div className="flex flex-col gap-y-4">
        {formationWithPlayers.reverse()}
      </div>

      <div className="space-y-4 text-center">
        <div className="text-secondary text-center font-light rounded-l bg-gray-800 flex flex-col gap-y-4 w-72 pb-4">
          <h1 className="font-light mt-4 text-xl">Constraints</h1>
          <p className="text-m flex flex-row ml-2"><span className="pr-1">{copied}</span>Rating: {sbc.min_rating} ({solution.rating})</p>
          <p className="text-m flex flex-row ml-2"><span className="pr-1">{copied}</span>Chem: {sbc.min_chemistry} ({solution.chem})</p>
          <p className="text-m flex flex-row mx-auto">Formation: {solution.formation}</p>
          <p className="text-m flex flex-row mx-auto">Cost: {solution.cost}</p>
        </div>
        <div className="text-secondary text-center font-light rounded-l bg-gray-800 flex flex-col gap-y-4 w-72 pt-4">
          <div className="flex flex-col m-auto gap-y-4">
            <div className="flex flex-row mx-auto">
              <div className="w-6 m-auto">
                <img className="w-4" alt="loyalty" src={process.env.PUBLIC_URL + '/loyalty.png'}/>
              </div>
              <span>Loyalty</span>
            </div>
            <div className="flex flex-row mx-auto mb-4">
              <img className="w-6" alt="untradeable" src={process.env.PUBLIC_URL + '/untradeable.png'}/>
              <span>Untradable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )

}

export default SolutionView
