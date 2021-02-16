import React from 'react';
import { Link } from 'react-router-dom';
import { CardProps } from './Card';

type CardHeaderProps = CardProps;

const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const displayBackLink = () => {
    if (props.hasBackLink) {
      return (
        <button className="mr-3 p-1.5 group rounded-full overflow-hidden transition-colors bg-content-100 hover:bg-content-200">
          <Link to={{ pathname: '/', state: { fromRight: true } }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 m-auto transition-transform transform group-hover:-translate-x-0.5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>{' '}
          </Link>
        </button>
      );
    }
    return null;
  };
  return (
    <header className="flex flex-row items-center mb-4 card-header">
      {displayBackLink()}
      <h1 className="font-semibold text-gray-800 font-display">
        {props.title}
      </h1>
    </header>
  );
};

export default CardHeader;
