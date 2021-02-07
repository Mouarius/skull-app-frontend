import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { socket } from '../connection/socket'
import { teamColor } from '../model/common'
import Game from '../model/game'
import { useGame } from '../util/hooks'
import PlayersList from './PlayersList'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlayer, setColor } from '../features/player/playerSlice'

const Lobby = () => {
  const dispatch = useDispatch()
  const player = useSelector(selectPlayer)

  const history = useHistory()
  let params = useParams()
  const game = useGame()
  const [takenColors, setTakenColors] = useState([])

  const copyToClipboard = (e) => {
    e.target.select()
    document.execCommand('copy')
  }

  const handleColorChange = (e) => {
    console.log('Button selected')
    dispatch(setColor(e.target.value))
    socket.emit('color_selected', {
      game: game.state,
      color: e.target.value,
      playerID: player.id,
    })
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    setTakenColors(
      game.state.players.map((p) => {
        if (p.username !== player.username) {
          return player.color
        }
      })
    )
  }, [player])

  //* At each render, asks the server if the game trying to be rendered exists
  useEffect(() => {
    const fetchGamesList = async () => {
      try {
        const response = await axios.get('/api/games/' + params.gameID)
        game.setGame(response.data.game)
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
        game.addPlayer(payload.player)
      })
      socket.on('color_selected', (payload) => {
        console.log(payload)
        // ! Doesn't work : need to append the selected color element before
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
          <input readOnly onFocus={copyToClipboard} value={game.state.gameID} />
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
      <PlayersList players={game.state.players} />
    </div>
  )
}

export default Lobby
