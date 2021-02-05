import { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { socket } from '../connection/socket'
import PlayersList from './PlayersList'

const useGameStatus = () => {
  const [players, setPlayers] = useState([])

  const addPlayer = (player) => {
    setPlayers((prev) => prev.concat(player))
  }
  const removePlayer = (playerToRemove) => {
    setPlayers((prev) =>
      prev.filter((player) => player.id !== playerToRemove.id)
    )
  }

  return { players, addPlayer, removePlayer }
}

const Lobby = ({ player }) => {
  let params = useParams()
  const game = useGameStatus()

  // TODO : must update when a use logs into the lobby -> rooms in socket io ?

  useEffect(() => {
    socket.on('join game', (payload) => {})
  }, [])

  useEffect(() => {
    // TODO : Must check if another player already took the same color -> check it in addPlayer() ? Or disable the button ?
    game.addPlayer(player)
  }, [player])

  return (
    <div id="login-window">
      <header>
        <h1>Lobby</h1>
        <div>Game ID : {params.id}</div>
      </header>

      <PlayersList players={game.players} />
    </div>
  )
}

export default Lobby
