//v-down.jsx
export function IconVDown({ fill = 'currentColor', className = 'w-4 h-4' }) {
  return (
    <svg
      fill={fill}
      className={className}
      viewBox="0 0 20 20"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
        <path clipRule="evenodd" filerule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
    </svg>
  );
}

export function IconVLeft({ fill = 'currentColor', className = 'w-4 h-4' }) {
  return (
    <svg
      fill={fill}
      className={className}
      viewBox="0 0 20 20"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
        <path filerule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export function IconVRight({ fill = 'currentColor', className = 'w-4 h-4' }) {
  return (
    <svg
      fill={fill}
      className={className}
      viewBox="0 0 20 20"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
        <path filerule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export function IconVUp({ fill = 'currentColor', className = 'w-4 h-4' }) {
  return (
    <svg
      fill={fill}
      className={"rotate-180 "+className}
      viewBox="0 0 20 20"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
    </svg>
  );
}

export function IconVUpDown({ fill = 'currentColor', className = 'w-4 h-4' }) {
  return (
    <svg
      fill="none"
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="1.5"
      stroke={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
  );
}


