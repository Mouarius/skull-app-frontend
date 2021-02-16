import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../connection/socket';
import { selectPlayer, setColor } from '../../../features/player/playerSlice';
import { ITakenColors, TeamColor } from '../../../util/types';

import './ButtonColor.scss';

interface ButtonColorProps {
  color: TeamColor;
  takenColors: ITakenColors;
}

const ButtonColor: React.FC<ButtonColorProps> = (props) => {
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();

  const handleColorChange = (_e: ChangeEvent<HTMLInputElement>) => {
    socket.emit('lobby/change_color/request', {
      player: player,
      color: props.color,
    });
    console.log(`Handle color change`);
  };

  const isChecked = (): string => {
    if (props.color === player.color) {
      console.log(
        '🚀 ~ file: ButtonColor.tsx ~ line 27 ~ isChecked ~ player.color',
        player.color
      );
      console.log(
        '🚀 ~ file: ButtonColor.tsx ~ line 27 ~ isChecked ~ props.color',
        props.color
      );
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
  );
};

export default ButtonColor;
