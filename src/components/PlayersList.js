import React from 'react'

const PlayersList = ({ players }) => {
  console.log('players :>> ', players)
  console.log('players :>> ', typeof players)
  if (!players) {
    return null
  }
  return (
    <div id="players-list-window">
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default PlayersList
