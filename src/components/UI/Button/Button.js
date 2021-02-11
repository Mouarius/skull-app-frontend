import React from 'react'

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={` active:transform active:scale-95 rounded-lg p-1 uppercase font-medium text-sm border-box border-2 bg-white focus:outline-none hover:bg-purple transition-all leading-none text-purple-dark border-purple hover:border-purple hover:text-white ${props.className}`}
    >
      {props.children}
    </button>
  )
}

export default Button
