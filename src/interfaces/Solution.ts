import {Player} from "./Player";

export interface Solution {
  cost: number,
  chem: number,
  rating: number,
  formation: string,
  players: Player[],
  solution_message: string,
}
