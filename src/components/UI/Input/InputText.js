import React from 'react'

const InputText = (props) => {
  return (
    <form>
      <label className="label" htmlFor={props.id}>
        <span className="label-text">{props.label}</span>
      </label>
      <input
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        readOnly={props.readOnly}
        className="w-full input input-sm input-bordered"
      />
    </form>
  )
}

export default InputText
