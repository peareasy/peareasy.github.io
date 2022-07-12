export interface User {
  email: string,
  name: string,
  platform: string,
  paid: boolean,
  subscription: string,
  uuid: string,
  beta: boolean,
  playerCount: number
  lastImportedAt: Date
}
