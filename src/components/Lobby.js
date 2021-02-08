import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { socket } from '../connection/socket'
import { teamColor } from '../model/common'
import PlayersList from './PlayersList'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlayer, setColor } from '../features/player/playerSlice'
import {
  addPlayer,
  selectGame,
  setGame,
  updatePlayer,
} from '../features/game/gameSlice'

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

  const handleColorChange = (e) => {
    dispatch(setColor(e.target.value))
    // TODO : update the state of the app on the server
    socket.emit('color_selected', {
      game: game,
      color: e.target.value,
      player: player,
    })
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    // TODO : get the colors of the other players
    if (player.username && game.gameID) {
      dispatch(updatePlayer(player))
    }
  }, [player])

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
      socket.on('color_selected', (payload) => {
        console.log(payload)
        dispatch(updatePlayer(payload.player))
        // ! Doesn't work : need to append the selected color element before
        const takenColorsList = game.players.map((player) => ({
          playerID: player.id,
          color: player.color,
        }))
        console.log('takenColorsList :>> ', takenColorsList)
        const newTakenColors = takenColors.map((el) =>
          el.playerID === payload.playerID
            ? { ...el, color: payload.color }
            : el
        )
        console.log('newTakenColors :>> ', newTakenColors)
        setTakenColors(newTakenColors)
      })
    }
    return () => (mounted = false) // Cleanup fix
  }, [])

  return (
    <div id="login-window" className="window">
      <header>
        <h1>Lobby</h1>
        <Link to="/">Back to home</Link>
        <div>
          Game ID :{' '}
          <input readOnly onFocus={copyToClipboard} value={game.gameID} />
        </div>
      </header>
      <ul>
        {_.map(teamColor, (element) => (
          <li key={`${element}-key`}>
            <label htmlFor={`${element}-radio`}>{element}</label>
            <input
              type="radio"
              id={`${element}-radio`}
              name="color"
              value={element}
              checked={element === player.color}
              onChange={handleColorChange}
              className="color-radio"
            />
          </li>
        ))}
      </ul>
      <PlayersList players={game.players} />
    </div>
  )
}

export default Lobby
