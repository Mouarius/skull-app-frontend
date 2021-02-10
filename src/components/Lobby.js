import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { socket } from '../connection/socket'
import PlayersList from './PlayersList'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlayer } from '../features/player/playerSlice'
import { addPlayer, selectGame, setGame } from '../features/game/gameSlice'
import Button from './UI/Button/Button'
import ButtonColorList from './UI/Button/ButtonColorList'
import InputText from './UI/Input/InputText'
import Card from './UI/Card/Card'
import Notification from './Notification/Notification'

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
    <div id="login-window" className="flex flex-col items-center pt-8">
      <Card>
        <header className="card-header">
          <div className="flex flex-row items-center mb-4">
            <div className="btn btn-circle btn-sm">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 m-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>{' '}
              </Link>
            </div>
            <h1 className="inline-block pl-4 mb-0 card-title">Lobby</h1>
          </div>
          <div className="mb-8">
            <InputText
              label="Game ID"
              readOnly
              onFocus={copyToClipboard}
              value={game.gameID}
            />
          </div>
        </header>
        <ButtonColorList takenColors={takenColors} />
        <div className="game-controls">{startOrReadyButton()}</div>
        <Notification type="error" message="Test Message" />
        <PlayersList players={game.players} />
      </Card>
    </div>
  )
}

export default Lobby
