import React from 'react';
import CardHeader from './CardHeader';

export interface ICardProps {
  title: string;
  hasBackLink?: boolean;
  className?: string;
}

const Card: React.FC<ICardProps> = (props) => {
  return (
    <div
      className={`${props.className} ${props.title}-card w-screen p-8 bg-white shadow-md card rounded-2xl sm:w-96`}
    >
      <div className="card-body">
        <CardHeader title={props.title} hasBackLink={props.hasBackLink} />
        {props.children}
      </div>
    </div>
  );
};
export default Card;
