import React from 'react';
import ButtonColor from './ButtonColor';
import _ from 'lodash';
import { TeamColor } from '../../../util/types';

interface ButtonColorListProps {
  takenColors: TeamColor[];
}

const ButtonColorList: React.FC<ButtonColorListProps> = (props) => {
  return (
    <div className="p-0 list-none">
      <h2 className="mb-2">Select your color :</h2>
      <ul className="flex flex-row items-center justify-between w-full mb-8">
        {_.map(Object.values(TeamColor), (color) => (
          <ButtonColor
            key={color}
            color={color}
            takenColors={props.takenColors}
          />
        ))}
      </ul>
    </div>
  );
};

export default ButtonColorList;
