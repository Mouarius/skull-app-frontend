import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { socket } from '../connection/socket'
import PlayersList from './PlayersList'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlayer } from '../features/player/playerSlice'
import { addPlayer, selectGame, setGame } from '../features/game/gameSlice'
import Button from './button/Button'
import ButtonColorList from './button/ButtonColorList'

const Lobby = () => {
  const dispatch = useDispatch()
  const player = useSelector(selectPlayer)
  const game = useSelector(selectGame)

  const history = useHistory()
  let params = useParams()
  const [takenColors, setTakenColors] = useState([])

  const copyToClipboard = (e) => {
    e.target.select()
    document.execCommand('copy')
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
  }
  const startOrReadyButton = () => {
    if (player.id === game.ownerID) {
      return <Button>Start</Button>
    }
    return <Button>Ready</Button>
  }

  useEffect(() => {
    if (game.players) {
      setTakenColors(game.players.map((player) => player.color))
    }
  }, [game])

  //* At each render, asks the server if the game trying to be rendered exists
  useEffect(() => {
    const fetchGamesList = async () => {
      try {
        const response = await axios.get('/api/games/' + params.gameID)
        dispatch(setGame(response.data))
      } catch (e) {
        // If it doesnt exist, redirect the user to home
        history.push('/')
      }
    }
    fetchGamesList()
  }, [])

  // * Socket listeners
  useEffect(() => {
    let mounted = true
    if (mounted) {
      socket.on('player_joined', (payload) => {
        console.log(`A user has logged in : ${payload.player.username}`)
        dispatch(addPlayer(payload.player))
      })
      socket.on('game_updated', (payload) => {
        dispatch(setGame(payload.game))
      })
    }
    return () => (mounted = false) // Cleanup fix
  }, [])

  return (
    <div id="login-window">
      <div className="shadow card">
        <div className="card-body">
          <header className="card-header">
            <Link to="/">Back to home</Link>
            <h1 className="card-title">Lobby</h1>
            <div>
              Game ID :{' '}
              <input readOnly onFocus={copyToClipboard} value={game.gameID} />
            </div>
          </header>
          <ButtonColorList takenColors={takenColors} />
          <div className="game-controls">{startOrReadyButton()}</div>
          <PlayersList players={game.players} />
        </div>
      </div>
    </div>
  )
}

export default Lobby
