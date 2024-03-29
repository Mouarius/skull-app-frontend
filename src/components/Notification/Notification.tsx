import React from 'react';
import { NotificationObject, NotificationType } from '../../util/types';

interface IAlertLogoProps {
  type: NotificationType;
}

const AlertLogo: React.FC<IAlertLogoProps> = (props) => {
  const displayLogoPath = (type: NotificationType) => {
    switch (type) {
      case 'error':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case 'info':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case 'success':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      default:
        return null;
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6"
    >
      {displayLogoPath(props.type)}
    </svg>
  );
};

const Notification: React.FC<NotificationObject> = (props) => {
  const colorClass = (type: NotificationType) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-dark';
      case 'info':
        return 'bg-blue-100 text-blue-dark';

      case 'success':
        return 'bg-green-100 text-green-dark';

      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`${colorClass(props.type)} ${
        props.message ? 'opacity-100' : 'opacity-0 transform translate-y-10'
      } transition duration-500 bg-opacity-80 flex p-3 rounded-2xl w-96 flex-row items-start fixed bottom-0 mb-2`}
    >
      <AlertLogo type={props.type} />
      <label className="ml-2">{props.message}</label>
    </div>
  );
};

export default Notification;
