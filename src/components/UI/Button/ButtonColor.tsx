import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'reactfire';
import { selectGame } from '../../../features/game/gameSlice';
import { selectPlayer } from '../../../features/player/playerSlice';
import { ITakenColors, TeamColor } from '../../../util/types';
import { IButtonProps } from './Button';

interface ButtonColorProps extends IButtonProps {
  color: TeamColor;
  takenColors: ITakenColors;
}

const ButtonColor: React.FC<ButtonColorProps> = (props) => {
  const player = useSelector(selectPlayer);
  const game = useSelector(selectGame);
  const gamesRef = useFirestore().collection('games');

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const playersInGameRef = gamesRef.doc(game.id).collection('players');
    console.log(`Handle color change to : ${props.color}`);
    playersInGameRef.doc(player.id).update({ color: e.target.value });
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
