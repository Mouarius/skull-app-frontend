import React from 'react'

const Card = (props) => {
  return (
    <div className="shadow card w-96">
      <div className="card-body">{props.children}</div>
    </div>
  )
}
export default Card
