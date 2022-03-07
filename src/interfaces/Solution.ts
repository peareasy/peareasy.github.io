import {Player} from "./Player";

export interface Solution {
  cost: number,
  formation: string,
  players: Player[]
}