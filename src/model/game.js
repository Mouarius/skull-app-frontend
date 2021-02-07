class Game {
  constructor() {
    this.players = []
    this.gameID = ''
    this.ownerID = ''
  }
  addPlayer(player) {
    this.players.push(player)
  }
  removePlayer(playerToRemove) {
    this.players.filter((player) => player.id !== playerToRemove.id)
  }
}

export default Game
