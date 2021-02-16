import React from 'react';
import CardHeader from './CardHeader';

export interface CardProps {
  title: string;
  hasBackLink?: boolean;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="w-screen p-8 bg-white shadow-md card rounded-2xl sm:w-96">
      <div className="card-body">
        <CardHeader title={props.title} hasBackLink={props.hasBackLink} />
        {props.children}
      </div>
    </div>
  );
};
export default Card;
