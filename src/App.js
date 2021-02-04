import './App.scss'
import Card from './model/card'
import { useState } from 'react'
import Player from './model/player'
import { teamColor } from './model/common'

let _ = require('lodash')

const Login = () => {
  const [username, setUsername] = useState('')
  const [color, setColor] = useState(teamColor.RED)
  const [player, setPlayer] = useState(null)

  const createPlayer = (e) => {
    e.preventDefault()
    const newPlayer = new Player(color, username)
    setUsername('')
    setPlayer(newPlayer)
  }

  return (
    <div id="login-window">
      <form onSubmit={createPlayer}>
        <label for="username">username :</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <ul>
          {_.map(teamColor, (element) => (
            <li>
              <label for={`${element}-radio`}>{element}</label>
              <input
                type="radio"
                id={`${element}-radio`}
                name="color"
                value={element}
                checked={element === color}
                onChange={(e) => setColor(e.target.value)}
                class="color-radio"
              />
            </li>
          ))}
        </ul>

        <br />

        <button type="submit">create</button>
      </form>
    </div>
  )
}

function App() {
  return (
    <div>
      <Login />
    </div>
  )
}

export default App
