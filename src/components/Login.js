import React, { useEffect, useState } from 'react'
import { teamColor } from '../model/common'
import _ from 'lodash'
import { useHistory } from 'react-router'
import Player from '../model/player'
import { socket } from '../connection/socket'

const Login = ({ player }) => {
  const history = useHistory()
  const [inputGameID, setInputGameID] = useState('')

  const handleUsernameChange = (e) => {
    player.setUsername(e.target.value)
  }

  const handleCreateGame = () => {
    if (player.state.username !== '') {
      socket.emit('player login', { player: player.state })
      socket.emit('create game', { player: player.state })
    }
  }

  const createNewGame = (payload) => {
    history.push('/game/' + payload.gameID)
  }

  const handleJoinGame = () => {
    socket.emit('player login', { player: player.state })
    socket.emit('join game', { gameID: inputGameID })
  }

  const joinGame = (payload) => {
    if (payload.status) {
      history.push('/game/' + payload.game.gameID)
    }
  }

  useEffect(() => {
    socket.on('create game status', createNewGame)
    socket.on('join game status', joinGame)
  }, [])

  // const handleColorChange = (e) => {
  //   console.log('e.target.value :>> ', e.target.value)
  //   player.setColor(e.target.value)
  // }
  // const handleLoginSubmit = (e) => {
  //   e.preventDefault()
  // }

  return (
    <div className="window">
      <div className="card">
        <h1>Login</h1>
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
          <button onClick={handleCreateGame}>create a game</button>
        </div>
        <div>
          <input
            value={inputGameID}
            onChange={(e) => setInputGameID(e.target.value)}
          />
          <button onClick={handleJoinGame}>join a game</button>
        </div>

        {/* <ul>
          {_.map(teamColor, (element) => (
            <li key={`${element}-key`}>
              <label htmlFor={`${element}-radio`}>{element}</label>
              <input
                type="radio"
                id={`${element}-radio`}
                name="color"
                value={element}
                checked={element === player.state.color}
                onChange={handleColorChange}
                className="color-radio"
              />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  )
}

export default Login
