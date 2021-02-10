import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGame } from '../../../features/game/gameSlice'
import {
  selectPlayer,
  setPlayerColorAndUpdate,
} from '../../../features/player/playerSlice'

import './ButtonColor.scss'

const ButtonColor = (props) => {
  const player = useSelector(selectPlayer)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  const handleColorChange = (e) => {
    dispatch(setPlayerColorAndUpdate(e.target.value))
  }

  const isChecked = () => {
    if (props.color === player.color) {
      return 'checked'
    }
  }

  const isTaken = () => {
    const colorIsTaken = props.takenColors.find(
      (color) => color === props.color
    )
    if (!!colorIsTaken && colorIsTaken !== player.color) {
      return 'taken'
    }
  }

  const findPlayerRelatedToColor = (color) => {
    const player = game.players.find((player) => player.color === color)
    if (player) {
      return player.username
    }
    return ''
  }

  return (
    <li className="ButtonColor">
      <label htmlFor={`${props.color}-radio`} className="radio-container">
        {/* <span className="taken-by-label">
          taken by : {findPlayerRelatedToColor(props.color)}
        </span> */}
        <span
          className={`radio-mark bg-${props.color} ${isChecked()} ${isTaken()}`}
        ></span>
        <input
          type="radio"
          id={`${props.color}-radio`}
          name="color"
          value={props.color}
          onChange={handleColorChange}
          checked={props.color === player.color}
          disabled={
            props.takenColors.find((color) => color === props.color)
              ? true
              : false
          }
          className={`color-radio`}
        />
      </label>
    </li>
  )
}

export default ButtonColor
