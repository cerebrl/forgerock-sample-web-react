import React from 'react';

export default function TodoIcon({ completed }) {
  if (completed) {
    return (
      <svg
        className="todo_icon_complete me-2"
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="36px"
        viewBox="0 0 24 24"
        width="36px"
      >
        <rect fill="none" height="24" width="24" />
        <path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z" />
      </svg>
    );
  } else {
    return (
      <svg
        className="todo_icon_incomplete me-2"
        xmlns="http://www.w3.org/2000/svg"
        height="36px"
        viewBox="0 0 24 24"
        width="36px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      </svg>
    );
  }
}
