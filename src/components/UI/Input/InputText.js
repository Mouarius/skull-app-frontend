import React from 'react'

const InputText = (props) => {
  return (
    <form>
      <label className="text-xs font-normal text-gray-400 " htmlFor={props.id}>
        <span className="">{props.label}</span>
      </label>
      <input
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        readOnly={props.readOnly}
        className="w-full p-0.5 pl-2 border-2 outline-none border-gray-200 border-solid transition-all rounded-lg focus:ring-purple focus:ring-opacity-50 focus:ring-2 focus:ring-offset-2"
      />
    </form>
  )
}

export default InputText
