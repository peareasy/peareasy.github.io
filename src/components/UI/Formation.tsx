import React from "react";
import { Player } from "../../interfaces/Player";

type FormationProps = {
  titleProp: string;
  formationProp: string;
};


const Formation = ({titleProp}: FormationProps) => {
  const formationProp = "4-3-3"
  const formation = ("1-" + formationProp).split('-').map(Number)

  const players = [{"position":"CM","name":"Ulrik Saltnes"},{"position":"CB","name":"Noë Dussenne"},{"position":"ST","name":"Mushaga Bakenga"},{"position":"LB","name":"James Husband"},{"position":"RB","name":"Thibault Vlietinck"},{"position":"CB","name":"Loïc Mbe Soh"},{"position":"CB","name":"Mario Maloča"},{"position":"ST","name":"Victor Boniface"},{"position":"CDM","name":"Fredrik Sjølstad"},{"position":"CM","name":"Homero Calderón"},{"position":"GK","name":"Cezary Miszta"}]

  const formationWithPlayers = []
  let counter = 0;
  for (let i = 0; i < formation.length; i++) {
    const row = []
    for (let j = 0; j < formation[i]; j++) {
      row.push(
        <span className="rounded-full w-32 h-32 leading-extra-loose text-secondary text-center align-middle">
          {players[counter].name}

        </span>)
      counter++
    }
    formationWithPlayers.push(<div className="flex flex-row justify-center gap-x-4">
      {row}
    </div>
    )
  }
  console.log(formationWithPlayers)


    // <div className="rounded-full bg-secondary w-32 h-32">
    //
    //   {player.name}
    // </div>

  return (
  <div className={"w-3/5 mx-auto flex justify-center"}>
    <div className="flex flex-col gap-y-16">
      {formationWithPlayers.reverse()}
      </div>
  </div>
  )

}

export default Formation