import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { v4 as uuidv4 } from 'uuid'
import { socket } from '../connection/socket'

const Home = ({ createPlayer, player, setPlayer }) => {
  const [inputGameID, setInputGameID] = useState('')

  const history = useHistory()

  const handleCreateGameButton = (e) => {
    e.preventDefault()
    const newGameID = uuidv4()
    // Sends a request to the server to check if the uuid is already taken
    socket.emit('create game', newGameID)
    history.push(`/${newGameID}`)
  }

  const handleJoinGameButton = (e) => {
    e.preventDefault()
    // Ask the server if the game exists
    socket.emit('join game', inputGameID)
  }

  const joinGame = (gameID) => {
    console.log('gameID :>> ', gameID)
    history.push(`/${gameID}`)
  }
  const createGame = (gameID) => {
    history.push(`/${gameID}`)
  }

  useEffect(() => {
    socket.on('join game status', (data) => {
      if (data.status) {
        joinGame(data.gameID)
      } else {
        console.error('This game does not exist.')
      }
    })
    socket.on('create game status', (gameID) => {
      createGame(gameID)
    })
  })

  return (
    <div className="window">
      <button onClick={handleCreateGameButton}>create</button>

      <form onSubmit={handleJoinGameButton}>
        <label htmlFor="game-id">Game ID :</label>
        <input
          type="text"
          id="game-id"
          value={inputGameID}
          onChange={(e) => setInputGameID(e.target.value)}
        />
        <button type="submit">join</button>
      </form>
    </div>
  )
}

export default Home
