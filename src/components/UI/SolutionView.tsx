import { CopyButton } from "./CopyButton";
import {Solution} from "../../interfaces/Solution";
import {SBC} from "../../interfaces/SBC";
import {copied} from "./icons";
import React from "react";

type SolutionViewProps = {
  solution: Solution,
  sbc: SBC
};

const SolutionView = ({solution, sbc}: SolutionViewProps) => {
  const formation = ("1-" + solution.formation).split(/[\s-]+/).map(Number)
  const players = solution.players
  const formationWithPlayers = []

  let counter = 0;
  const cardClasses = "w-30 lg:w-36 xl:w-44 rounded-lg bg-primary-900 flex flex-row m-auto justify-between".split(" ");

  for (let i = 0; i < formation.length; i++) {
    const row = []
    for (let j = 0; j < formation[i]; j++) {
      row.push(
        <div className={cardClasses.join(" ")}>
          <div className="flex flex-col p-2">
            <CopyButton value={players[counter].name} />
            <div className="text-tiny xl:text-xs text-left">{players[counter].position+', '+players[counter].rating}</div>
            <div className="text-tiny xl:text-xs text-left flex flex-row gap-x-1">{players[counter].price}
              <img className="w-3 h-3 my-auto" alt="coins-bin" src={process.env.PUBLIC_URL + '/coins_bin.png'}/>
            </div>
          </div>
          {/*<div className="flex flex-col p-2">*/}
          {/*  {players[counter].loyalty ?*/}
          {/*    <div className="w-6 h-6">*/}
          {/*      <img className="w-4 m-auto" alt="loyalty" src={process.env.PUBLIC_URL + '/loyalty.png'}/>*/}
          {/*    </div>*/}
          {/*    : null }*/}
          {/*  {players[counter].untradeable ?*/}
          {/*    <div className="w-6 h-6">*/}
          {/*    <img className="w-6" alt="untradeable" src={process.env.PUBLIC_URL + '/untradeable.png'}/>*/}
          {/*  </div>: null }*/}
          {/*</div>*/}
        </div>)
      counter++
    }
    formationWithPlayers.push(
      <div className="flex flex-row justify-center gap-x-4" key={i}>
        {row}
      </div>
    )
  }
  return (
      <div className={"mx-auto flex justify-center text-secondary"}>
        <div className="flex flex-row md:flex-col gap-x-2 lg:gap-x-8 xl:gap-x-16 ">
          <div className="text-secondary flex-2 lg:w-32 xl:w-48 text-center font-light text-2xl md:hidden"></div>
          <div className="flex flex-col gap-y-4 flex-1 w-1/3 md:w-full">
            {formationWithPlayers.reverse()}
          </div>

          <div className="space-y-4 text-center flex-2 w-32 lg:w-48 md:mx-auto md:mt-8 md:w-2/3">
            <div className="text-secondary text-xs lg:text-base text-center font-light rounded-lg bg-gray-800 flex flex-col gap-y-4 w-full pb-4">
              <h1 className="font-light mt-4 text-xl">Constraints</h1>
              <p className="text-m flex flex-row mx-auto"><span className="pr-1">{copied}</span>Rating: {sbc.min_rating} ({solution.rating})</p>
              <p className="text-m flex flex-row mx-auto"><span className="pr-1">{copied}</span>Chem: {sbc.min_chemistry} ({solution.chem})</p>
              <p className="text-m flex flex-row mx-auto">Formation: {solution.formation}</p>
              <p className="text-m flex flex-row mx-auto">{solution.cost} <img className="w-5 h-5 my-auto ml-2" alt="coins-bin" src={process.env.PUBLIC_URL + '/coins_bin.png'}/></p>
            </div>
            
          </div>
        </div>
      </div>
  )
}

export default SolutionView
