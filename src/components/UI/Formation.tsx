import { Player } from "../../interfaces/Player";

type FormationProps = {
  players: Player[]
  rawFormation: string,
};

const Formation = ({players, rawFormation}: FormationProps) => {
  const formation = ("1-" + rawFormation).split('-').map(Number)

  const formationWithPlayers = []
  let counter = 0;
  for (let i = 0; i < formation.length; i++) {
    const row = []
    for (let j = 0; j < formation[i]; j++) {
      console.log(players)
      row.push(
        <div className="rounded-full bg-primary-800 flex flex-col w-44 m-auto">
          <div className="w-24 m-auto text-center text-secondary">{players[counter].name}</div>
          <div className="m-auto pt-4 text-center text-secondary">{players[counter].position+', '+players[counter].rating}</div>
        </div>)
      counter++
    }
    formationWithPlayers.push(<div className="flex flex-row justify-center gap-x-4">
      {row}
    </div>
    )
  }

  return (
  <div className={"w-3/5 mx-auto flex justify-center"}>
    <div className="flex flex-col gap-y-4">
    <div className="text-secondary text-center text-4xl">{rawFormation}</div>
      {formationWithPlayers.reverse()}
      </div>
  </div>
  )

}

export default Formation