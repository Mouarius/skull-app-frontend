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
    <div className="flex">
      <div className="m-auto shadow card w-96">
        <div className="card-body">
          <header className="card-header">
            <h1 className="font-mono text-3xl card-title">Login</h1>
          </header>
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={player.username}
              onChange={handleUsernameChange}
              className="input input-sm input-bordered"
            />
          </div>
          <div className="flex flex-col mt-4">
            <Button onClick={handleCreateGameButton}>create a game</Button>
            <span className="text-center">or</span>
            <div className="flex flex-col p-2 bg-purple-500 rounded-lg">
              <label className="label" htmlFor="username">
                <span className="text-white label-text">Game ID</span>
              </label>
              <input
                value={inputGameID}
                onChange={(e) => setInputGameID(e.target.value)}
                className="mb-2 input input-sm input-bordered"
                placeholder="game ID"
              />
              <Button onClick={handleJoinGameButton}>join a game</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
