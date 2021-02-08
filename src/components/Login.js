import React, { useEffect, useState } from 'react'
import { teamColor } from '../model/common'
import _ from 'lodash'
import { useHistory } from 'react-router'
import Player from '../model/player'
import { socket } from '../connection/socket'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlayer, setUsername } from '../features/player/playerSlice'
import Button from './button/Button'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const player = useSelector(selectPlayer)
  const [inputGameID, setInputGameID] = useState('')

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value))
  }

  const handleCreateGameButton = () => {
    if (player.username !== '') {
      // if user has defined his username
      // First, create a new game request to the server, to create a room in socket.io
      // Then get this room id, and make the player to join it
      socket.emit('create_game/request', { player: player })
      // We must wait for the response to redirect the player to the new game and new room
    }
    //TODO : Display notification to ask the user to give a username
  }

  const handleJoinGameButton = () => {
    if (inputGameID) {
      socket.emit('join_game/request', {
        player: player,
        gameID: inputGameID,
      })
    }
  }

  const joinGame = (payload) => {
    // window.localStorage.setItem('skullAppPlayerData', JSON.stringify(player))
    if (payload.game) {
      history.push('/game/' + payload.game.gameID)
    }
  }

  useEffect(() => {
    socket.on('create_game/status', joinGame)
    socket.on('join_game/status', joinGame)
  }, [])

  return (
    <div className="window">
      <div className="card shadow">
        <header className="card-header">
          <h1>Login</h1>
        </header>
        <div>
          <label htmlFor="username">username :</label>
          <input
            type="text"
            id="username"
            value={player.username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <Button onClick={handleCreateGameButton}>create a game</Button>
        </div>
        <div>
          <input
            value={inputGameID}
            onChange={(e) => setInputGameID(e.target.value)}
          />
          <Button onClick={handleJoinGameButton}>join a game</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
