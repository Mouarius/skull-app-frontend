import React from 'react'
import ButtonColor from './ButtonColor'
import _ from 'lodash'
import { teamColor } from '../../../model/common'

const ButtonColorList = (props) => {
  return (
    <ul className="flex flex-row m-auto mb-8">
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
