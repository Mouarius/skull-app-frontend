import React from 'react'
import { teamColor } from '../../model/common'
import ButtonColor from './ButtonColor'
import './ButtonColorList.scss'
import _ from 'lodash'

const ButtonColorList = (props) => {
  return (
    <ul className="ButtonColorList">
      {_.map(teamColor, (color) => (
        <ButtonColor
          key={`${color}-key`}
          color={color}
          takenColors={props.takenColors}
        />
      ))}
    </ul>
  )
}

export default ButtonColorList
