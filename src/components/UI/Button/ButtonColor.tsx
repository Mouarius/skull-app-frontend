import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../connection/socket';
import { selectPlayer, setColor } from '../../../features/player/playerSlice';
import { TeamColor } from '../../../util/types';

import './ButtonColor.scss';

interface ButtonColorProps {
  color: TeamColor;
  takenColors: TeamColor[];
}

const ButtonColor: React.FC<ButtonColorProps> = (props) => {
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`Clicked`);
    socket.emit('change_color/request', { player: player, color: props.color });
    dispatch(setColor(e.target.value));
  };

  const isChecked = () => {
    if (props.color === player.color) {
      return 'checked';
    }
  };

  const isTaken = () => {
    const colorIsTaken = props.takenColors.find(
      (color) => color === props.color
    );
    if (!!colorIsTaken && colorIsTaken !== player.color) {
      return 'taken';
    }
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
