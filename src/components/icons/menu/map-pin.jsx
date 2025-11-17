//map-pin.jsx
export default function MapPin({ fill = 'currentColor', className = 'w-4 h-4 size-6' }) {
  return (
    <svg
      fill={fill}
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="1.5"
      stroke={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}
