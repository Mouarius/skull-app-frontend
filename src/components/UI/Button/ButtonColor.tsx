import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../../connection/socket';
import { selectPlayer } from '../../../features/player/playerSlice';
import { TeamColor } from '../../../util/types';
import { IButtonProps } from './Button';
import './ButtonColor.css';

interface ButtonColorProps extends IButtonProps {
  color: TeamColor;
  takenColors: TeamColor[];
}

const ButtonColor: React.FC<ButtonColorProps> = (props) => {
  const player = useSelector(selectPlayer);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    socket.emit('CHANGE_COLOR', player.id, e.target.value);
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
          className={`color-button-${props.color} radio-mark bg-${
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
