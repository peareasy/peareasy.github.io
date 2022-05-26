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
  const formation = ("1-" + solution.formation).split(/[\s-]+/).map(Number)

  const formationWithPlayers = []

  let counter = 0;
  const cardClasses = "w-36 lg:w-42 xl:w-48 rounded-lg bg-primary-900 flex flex-row m-auto justify-between".split(" ");

  for (let i = 0; i < formation.length; i++) {
    const row = []
    for (let j = 0; j < formation[i]; j++) {
      row.push(
        <div className={cardClasses.join(" ")}>
          <div className="flex flex-col p-2">
            <CopyButton value={players[counter].name} />
            <div className="text-tiny xl:text-xs text-left">{players[counter].position+', '+players[counter].rating}</div>
          </div>
          <div className="flex flex-col p-2">
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
        <div className="flex flex-row gap-x-2 lg:gap-x-8 xl:gap-x-16 ">
          <div className="text-secondary flex-2 lg:w-32 xl:w-48 text-center font-light text-2xl"></div>
          <div className="flex flex-col gap-y-4 flex-1 w-1/3">
            {formationWithPlayers.reverse()}
          </div>

          <div className="space-y-4 text-center flex-2 w-32 lg:w-48">
            <div className="text-secondary text-xs lg:text-base text-center font-light rounded-lg bg-gray-800 flex flex-col gap-y-4 w-full pb-4">
              <h1 className="font-light mt-4 text-xl">Constraints</h1>
              <p className="text-m flex flex-row mx-auto"><span className="pr-1">{copied}</span>Rating: {sbc.min_rating} ({solution.rating})</p>
              <p className="text-m flex flex-row mx-auto"><span className="pr-1">{copied}</span>Chem: {sbc.min_chemistry} ({solution.chem})</p>
              <p className="text-m flex flex-row mx-auto">Formation: {solution.formation}</p>
              <p className="text-m flex flex-row mx-auto">Cost: {solution.cost}</p>
            </div>
            <div className="text-secondary xl:text-base text-center font-light rounded-lg bg-gray-800 flex flex-col w-full gap-y-4  pt-4">
              <div className="flex flex-col m-auto gap-y-4  text-xs lg:text-base">
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
