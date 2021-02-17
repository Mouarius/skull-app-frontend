import React, { EventHandler, MouseEvent } from 'react';
import './Button.css';

export interface IButtonProps {
  onClick?: EventHandler<MouseEvent>;
  className?: string;
  disabled?: boolean;
}

//TODO Quand on gagne écrire Emma c'est la plus belle

const Button: React.FC<IButtonProps> = (props) => {
  const disabledClass = () => {
    if (props.disabled) {
      return 'button-disabled';
    }
    return '';
  };
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
      ${props.className} disabled:bg-white disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed active:transform active:scale-95 rounded-lg p-1 uppercase font-medium text-sm border-box border-2 bg-white focus:outline-none hover:bg-purple transition-all leading-none text-purple-dark border-purple hover:border-purple hover:text-white ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
