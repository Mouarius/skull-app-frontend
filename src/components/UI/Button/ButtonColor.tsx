import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../connection/socket';
import { selectPlayer } from '../../../features/player/playerSlice';
import { ITakenColors, TeamColor } from '../../../util/types';
import { IButtonProps } from './Button';

interface ButtonColorProps extends IButtonProps {
  color: TeamColor;
  takenColors: ITakenColors;
}

const ButtonColor: React.FC<ButtonColorProps> = (props) => {
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    socket.emit('lobby/change_color/request', {
      playerObject: player,
      color: e.target.value,
    });
    console.log('🚀 ~ file: ButtonColor.tsx ~ line 14 ~ props', props);
    console.log(`Handle color change to : ${props.color}`);
  };

  const isChecked = (): string => {
    if (props.color === player.color) {
      return 'checked';
    }
    return '';
  };

  const isTaken = (): string => {
    const colorIsTaken = props.takenColors.find(
      (color) => color === props.color
    );
    if (!!colorIsTaken && colorIsTaken !== player.color) {
      return 'taken';
    }
    return '';
  };

  return (
    <li className="ButtonColor">
      <label htmlFor={`${props.color}-radio`} className="cursor-pointer">
        {/* <span className="taken-by-label">
          taken by : {findPlayerRelatedToColor(props.color)}
        </span> */}
        <span
          className={`radio-mark bg-${
            props.color
          } box-border flex h-14 w-14 sm:w-9 sm:h-9 rounded-full mx-1 border-solid transition-all shadow-sm border-gray-200 hover:border-10 ${isChecked()} ${isTaken()}`}
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
          className={`hidden`}
        />
      </label>
    </li>
  );
};

export default ButtonColor;
