import firebase from 'firebase';
import React, { ChangeEvent, useEffect, useState } from 'react';
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
  let playersInGameRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  if (game.id) {
    playersInGameRef = gamesRef.doc(game.id).collection('players');
  }
  const [playerWithThatColor, setPlayerWithThatColor] = useState<string | null>(
    ''
  );

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`Handle color change to : ${props.color}`);
    if (player.id) {
      playersInGameRef.doc(player.id).update({ color: e.target.value });
    }
  };

  const isChecked = (): string => {
    if (props.color === player.color) {
      return 'checked';
    }
    return '';
  };

  const isTaken = (): string => {
    const colorIsTaken = props.takenColors.find(
      (colorMatch) => colorMatch[1] === props.color
    );
    if (!!colorIsTaken && colorIsTaken[1] !== player.color) {
      return 'taken';
    }
    return '';
  };

  useEffect(() => {
    const thisColorMatch = props.takenColors.find(
      (colorMatch) => colorMatch[1] === props.color
    );
    if (thisColorMatch) {
      setPlayerWithThatColor(thisColorMatch[0]);
    } else {
      setPlayerWithThatColor(null);
    }
  }, [props.takenColors]);

  return (
    <li className="ButtonColor">
      <label
        htmlFor={`${props.color}-radio`}
        className="relative cursor-pointer"
      >
        <span
          className={`color-button-${props.color} radio-mark bg-${
            props.color
          } box-border justify-center items-center align-baseline flex h-14 w-14 sm:w-9 sm:h-9 rounded-full mx-1 border-solid transition-all shadow-sm border-gray-200 hover:border-10 ${isChecked()} ${isTaken()}`}
        >
          <span className="relative text-gray-200">
            {playerWithThatColor?.charAt(0).toUpperCase()}
          </span>
        </span>
        <input
          type="radio"
          id={`${props.color}-radio`}
          name="color"
          value={props.color}
          onChange={handleColorChange}
          checked={props.color === player.color}
          disabled={
            props.takenColors.find(
              (colorMatch) => colorMatch[1] === props.color
            )
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
