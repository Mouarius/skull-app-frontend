import React from 'react'

function AlertLogo(props) {
  const logoPath = () => {
    switch (props.type) {
      case 'error':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )
      case 'info':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )
      case 'success':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )
      default:
        return null
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6"
    >
      {logoPath()}
    </svg>
  )
}

const Notification = (props) => {
  return (
    <div className={`alert alert-${props.type} items-start absolute`}>
      <div className="flex-1">
        <AlertLogo type={props.type} />
        <label className="ml-2">{props.message}</label>
      </div>
    </div>
  )
}

export default Notification
