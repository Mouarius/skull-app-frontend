import React, { ChangeEvent, FocusEvent } from 'react';
import { BaseComponentProps } from '../../../util/types';

type InputTextProps = BaseComponentProps &
  Partial<HTMLInputElement> & {
    label?: string;
    onChange?: React.EventHandler<ChangeEvent>;
    onFocus?: React.EventHandler<FocusEvent>;
  };

const InputText: React.FC<InputTextProps> = (props) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label className="text-xs font-normal text-gray-400 " htmlFor={props.id}>
        <span className="">{props.label}</span>
      </label>
      <input
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        readOnly={props.readOnly}
        className="w-full p-0.5 pl-2 border-2 outline-none border-gray-200 border-solid transition-all rounded-lg focus:ring-purple focus:ring-opacity-50 focus:ring-2 focus:ring-offset-2"
      />
    </form>
  );
};

export default InputText;
