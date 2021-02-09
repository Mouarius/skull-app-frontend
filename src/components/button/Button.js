import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick} className="btn btn-primary btn-sm">
      {props.children}
    </button>
  )
}

export default Button
