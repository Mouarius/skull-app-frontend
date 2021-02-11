import React from 'react'
import ButtonColor from './ButtonColor'
import _ from 'lodash'
import { teamColor } from '../../../model/common'

const ButtonColorList = (props) => {
  return (
    <div className="ButtonColorList">
      <h2 className="mb-2">Select your color :</h2>
      <ul className="flex flex-row items-center justify-between w-full mb-8">
        {_.map(teamColor, (color) => (
          <ButtonColor
            key={`-key`}
            color={color}
            takenColors={props.takenColors}
          />
        ))}
      </ul>
    </div>
  )
}

export default ButtonColorList
