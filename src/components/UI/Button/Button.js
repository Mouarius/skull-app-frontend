import React from 'react'

const Button = (props) => {
  let defaultClass =
    'btn btn-sm border-box border-2 bg-white hover:bg-purple leading-none'
  if (props.displayColor === 'white') {
  }
  return (
    <button
      onClick={props.onClick}
      className={`${defaultClass} text-purple-dark border-purple hover:border-purple hover:text-white`}
    >
      {props.children}
    </button>
  )
}

export default Button
