import React from 'react'
import CardHeader from './CardHeader'

const Card = (props) => {
  return (
    <div className="w-screen p-8 bg-white shadow-md card rounded-2xl sm:w-96">
      <div className="card-body">
        <CardHeader title={props.title} hasBackLink={props.hasBackLink} />
        {props.children}
      </div>
    </div>
  )
}
export default Card
